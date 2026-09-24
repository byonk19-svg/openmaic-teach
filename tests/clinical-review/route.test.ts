import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  ownerId: 'owner-1',
  document: { stage: { id: 'stage-1' }, scenes: [], outline: {} },
  append: vi.fn(),
  reviewEnabled: true,
  getOwnerStore: vi.fn(),
}));

vi.mock('@/lib/config/feature-flags', () => ({
  isAgentRuntimeConfigured: () => true,
  isClinicalReviewEnabled: () => mocks.reviewEnabled,
}));
vi.mock('@/lib/server/agent-runtime/with-owner', () => ({
  withRequestOwnerId: (
    _req: Request,
    handler: (ownerId: string, headers: Headers) => Promise<Response>,
  ) => handler(mocks.ownerId, new Headers()),
}));
vi.mock('@/lib/server/agent-runtime/owner-scoped-documents', () => ({
  getOwnerScopedDocumentStore: mocks.getOwnerStore,
}));
vi.mock('@/lib/server/stage-access', () => ({ getStageAccessDb: async () => ({}) }));
vi.mock('@/lib/persistence/clinical-reviews', () => ({
  readClinicalReviewBinding: async () => ({
    stageId: 'stage-1',
    moduleId: 'adult-icu-rt-foundations-01',
    sourceRecords: [{ id: 'M01-CR-001', fingerprint: 'sha256:source' }],
    dependencies: [{ kind: 'model', id: 'rubric', fingerprint: 'sha256:rubric' }],
  }),
  listClinicalReviewDecisions: async () => [],
  appendClinicalReviewDecision: (...args: unknown[]) => mocks.append(...args),
  upsertClinicalReviewBinding: vi.fn(),
}));

import { DELETE, GET, POST, PUT } from '@/app/api/stages/[id]/clinical-review/route';
import { buildClinicalReviewManifest } from '@/lib/clinical-review/manifest';

const params = { params: Promise.resolve({ id: 'stage-1' }) };
const binding = {
  stageId: 'stage-1',
  moduleId: 'adult-icu-rt-foundations-01',
  sourceRecords: [{ id: 'M01-CR-001', fingerprint: 'sha256:source' }],
  dependencies: [{ kind: 'model' as const, id: 'rubric', fingerprint: 'sha256:rubric' }],
};

function request(fingerprint: string, extra: Record<string, unknown> = {}) {
  return new NextRequest('http://localhost/api/stages/stage-1/clinical-review', {
    method: 'POST',
    body: JSON.stringify({
      reviewerName: 'Brianna Yonkin',
      credential: 'RRT',
      jurisdiction: 'Texas',
      relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
      attestedHumanReview: true,
      manifestFingerprint: fingerprint,
      reviewerOwnerId: 'forged-owner',
      ...extra,
    }),
  });
}

describe('clinical-review route', () => {
  beforeEach(() => {
    mocks.ownerId = 'owner-1';
    mocks.reviewEnabled = true;
    mocks.append.mockReset().mockResolvedValue(undefined);
    mocks.getOwnerStore.mockReset().mockResolvedValue({ loadDocument: async () => mocks.document });
  });

  it('short-circuits every route while disabled before owner or persistence access', async () => {
    mocks.reviewEnabled = false;
    const requests = [
      GET(new NextRequest('http://localhost/api/stages/stage-1/clinical-review'), params),
      PUT(
        new NextRequest('http://localhost/api/stages/stage-1/clinical-review', {
          method: 'PUT',
          body: '{}',
        }),
        params,
      ),
      POST(request('sha256:any'), params),
      DELETE(
        new NextRequest('http://localhost/api/stages/stage-1/clinical-review', {
          method: 'DELETE',
          body: '{}',
        }),
        params,
      ),
    ];
    for (const response of await Promise.all(requests)) {
      expect(response.status).toBe(404);
      await expect(response.json()).resolves.toEqual({ error: 'clinical_review_disabled' });
    }
    expect(mocks.getOwnerStore).not.toHaveBeenCalled();
  });

  it('rejects anonymous sessions before recording any review', async () => {
    mocks.ownerId = 'anon:00000000-0000-4000-8000-000000000000';
    const response = await POST(request('sha256:any'), params);
    expect(response.status).toBe(401);
    expect(mocks.append).not.toHaveBeenCalled();
  });

  it('returns the server-calculated review fingerprint only through the owner-scoped review read', async () => {
    const response = await GET(
      new NextRequest('http://localhost/api/stages/stage-1/clinical-review'),
      params,
    );
    const body = await response.json();
    expect(body.manifestFingerprint).toBe(
      buildClinicalReviewManifest(mocks.document, binding).fingerprint,
    );
    expect(body.binding).toMatchObject({ moduleId: 'adult-icu-rt-foundations-01' });
    expect(body.status).not.toHaveProperty('latestDecision');
  });

  it('rejects a stale review and derives reviewer identity from the session', async () => {
    const manifest = buildClinicalReviewManifest(mocks.document, binding);
    expect((await POST(request('sha256:stale'), params)).status).toBe(409);
    const response = await POST(request(manifest.fingerprint), params);
    expect(response.status).toBe(201);
    expect(mocks.append.mock.calls[0]![1]).toMatchObject({
      reviewerOwnerId: 'owner-1',
      reviewerName: 'Brianna Yonkin',
      credential: 'RRT',
      jurisdiction: 'Texas',
      relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
      manifestFingerprint: manifest.fingerprint,
    });
    expect(mocks.append.mock.calls[0]![1]).not.toHaveProperty('reviewerOwnerId', 'forged-owner');
  });
});
