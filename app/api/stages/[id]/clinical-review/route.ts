import { randomUUID } from 'node:crypto';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  MODULE_01_ID,
  buildClinicalReviewManifest,
  clinicalReviewStatus,
  reviewBindingHasRequiredEvidence,
  type ClinicalReviewBinding,
} from '@/lib/clinical-review/manifest';
import {
  createClinicalReviewDecision,
  type ClinicalReviewSubmission,
} from '@/lib/clinical-review/reviews';
import { isAgentRuntimeConfigured, isClinicalReviewEnabled } from '@/lib/config/feature-flags';
import {
  appendClinicalReviewDecision,
  listClinicalReviewDecisions,
  readClinicalReviewBinding,
  upsertClinicalReviewBinding,
} from '@/lib/persistence/clinical-reviews';
import { getStageAccessDb } from '@/lib/server/stage-access';
import { getOwnerScopedDocumentStore } from '@/lib/server/agent-runtime/owner-scoped-documents';
import { ownerApiError, ownerJson, ownerNotFound } from '@/lib/server/agent-runtime/route-response';
import { withRequestOwnerId } from '@/lib/server/agent-runtime/with-owner';

export const runtime = 'nodejs';
type Params = { params: Promise<{ id: string }> };

function disabledResponse() {
  return NextResponse.json({ error: 'clinical_review_disabled' }, { status: 404 });
}

function authenticated(ownerId: string, headers: Headers) {
  return ownerId.startsWith('anon:')
    ? ownerApiError(
        'UNAUTHENTICATED',
        401,
        'sign-in is required to record clinical review',
        headers,
      )
    : null;
}

function bindingFrom(body: unknown, stageId: string): ClinicalReviewBinding | null {
  const value = body as Partial<ClinicalReviewBinding>;
  if (
    !value ||
    value.moduleId !== MODULE_01_ID ||
    !Array.isArray(value.sourceRecords) ||
    !Array.isArray(value.dependencies)
  )
    return null;
  return {
    stageId,
    moduleId: MODULE_01_ID,
    sourceRecords: value.sourceRecords,
    dependencies: value.dependencies,
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  if (!isClinicalReviewEnabled()) return disabledResponse();
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const { id } = await params;
    const document = await (await getOwnerScopedDocumentStore(ownerId)).loadDocument(id);
    if (!document) return ownerNotFound(headers);
    const db = await getStageAccessDb();
    const [binding, decisions] = await Promise.all([
      readClinicalReviewBinding(db, id),
      listClinicalReviewDecisions(db, id),
    ]);
    const manifest =
      binding && reviewBindingHasRequiredEvidence(binding)
        ? buildClinicalReviewManifest(document, binding)
        : null;
    const status = clinicalReviewStatus({ binding: binding ?? undefined, manifest, decisions });
    // Credentials and reviewer identity stay server-side; authors receive only decision timing/scope/status.
    return ownerJson(
      {
        status,
        manifestFingerprint: manifest?.fingerprint ?? null,
        binding: binding
          ? {
              stageId: binding.stageId,
              moduleId: binding.moduleId,
              sourceRecords: binding.sourceRecords,
              dependencies: binding.dependencies,
            }
          : null,
      },
      200,
      headers,
    );
  });
}

/** Explicitly attach an owned persisted stage to the fixed Module 01 pilot and its bounded dependencies. */
export async function PUT(req: NextRequest, { params }: Params) {
  if (!isClinicalReviewEnabled()) return disabledResponse();
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('invalid JSON', { status: 400 });
  }
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const denied = authenticated(ownerId, headers);
    if (denied) return denied;
    const { id } = await params;
    const document = await (await getOwnerScopedDocumentStore(ownerId)).loadDocument(id);
    if (!document) return ownerNotFound(headers);
    const binding = bindingFrom(body, id);
    if (!binding || !reviewBindingHasRequiredEvidence(binding))
      return ownerApiError(
        'INVALID_REQUEST',
        400,
        'Module 01 source and dependency fingerprints are required',
        headers,
      );
    await upsertClinicalReviewBinding(await getStageAccessDb(), binding, ownerId);
    return ownerJson({ ok: true, moduleId: binding.moduleId }, 200, headers);
  });
}

export async function POST(req: NextRequest, { params }: Params) {
  if (!isClinicalReviewEnabled()) return disabledResponse();
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('invalid JSON', { status: 400 });
  }
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const denied = authenticated(ownerId, headers);
    if (denied) return denied;
    const { id } = await params;
    const document = await (await getOwnerScopedDocumentStore(ownerId)).loadDocument(id);
    if (!document) return ownerNotFound(headers);
    const db = await getStageAccessDb();
    const binding = await readClinicalReviewBinding(db, id);
    if (!binding || !reviewBindingHasRequiredEvidence(binding))
      return ownerApiError('INVALID_REQUEST', 409, 'review binding is unavailable', headers);
    const manifest = buildClinicalReviewManifest(document, binding);
    try {
      const decision = createClinicalReviewDecision({
        id: `clinical-review:${randomUUID()}`,
        binding,
        manifest,
        reviewerOwnerId: ownerId,
        input: body as ClinicalReviewSubmission,
        now: new Date().toISOString(),
      });
      await appendClinicalReviewDecision(db, decision);
      return ownerJson(
        { ok: true, status: clinicalReviewStatus({ binding, manifest, decisions: [decision] }) },
        201,
        headers,
      );
    } catch (error) {
      return ownerApiError(
        'INVALID_REQUEST',
        409,
        error instanceof Error ? error.message : 'invalid review decision',
        headers,
      );
    }
  });
}

/** Preserve a revocation as a new human decision; historical approvals are never rewritten. */
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isClinicalReviewEnabled()) return disabledResponse();
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('invalid JSON', { status: 400 });
  }
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const denied = authenticated(ownerId, headers);
    if (denied) return denied;
    const { id } = await params;
    const document = await (await getOwnerScopedDocumentStore(ownerId)).loadDocument(id);
    if (!document) return ownerNotFound(headers);
    const db = await getStageAccessDb();
    const binding = await readClinicalReviewBinding(db, id);
    if (!binding || !reviewBindingHasRequiredEvidence(binding))
      return ownerApiError('INVALID_REQUEST', 409, 'review binding is unavailable', headers);
    const manifest = buildClinicalReviewManifest(document, binding);
    try {
      const decision = createClinicalReviewDecision({
        id: `clinical-review:${randomUUID()}`,
        binding,
        manifest,
        reviewerOwnerId: ownerId,
        input: { ...(body as ClinicalReviewSubmission), decision: 'revoked' },
        now: new Date().toISOString(),
      });
      await appendClinicalReviewDecision(db, decision);
      return ownerJson({ ok: true }, 201, headers);
    } catch (error) {
      return ownerApiError(
        'INVALID_REQUEST',
        409,
        error instanceof Error ? error.message : 'invalid review revocation',
        headers,
      );
    }
  });
}
