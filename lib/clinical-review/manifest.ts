import { createHash } from 'node:crypto';

export const MODULE_01_ID = 'adult-icu-rt-foundations-01';

export type ClinicalReviewDependencyKind = 'asset' | 'model' | 'scenario';

export interface ClinicalReviewDependency {
  kind: ClinicalReviewDependencyKind;
  id: string;
  fingerprint: string;
}

export interface ClinicalReviewBinding {
  stageId: string;
  moduleId: string;
  sourceRecords: Array<{ id: string; fingerprint: string }>;
  dependencies: ClinicalReviewDependency[];
}

export interface ClinicalReviewManifest {
  version: 1;
  moduleId: string;
  stageId: string;
  instructionalContent: unknown;
  sourceRecords: Array<{ id: string; fingerprint: string }>;
  dependencies: ClinicalReviewDependency[];
  fingerprint: string;
}

export type ClinicalReviewDecisionKind = 'approved' | 'changes_requested' | 'revoked';

export interface ClinicalReviewDecision {
  id: string;
  stageId: string;
  moduleId: string;
  reviewerOwnerId: string;
  reviewerName: string;
  credential: string;
  jurisdiction: string;
  relevantRoleOrExperience: string;
  attestedHumanReview: boolean;
  decision: ClinicalReviewDecisionKind;
  reviewedAt: string;
  manifestFingerprint: string;
  manifest: ClinicalReviewManifest;
  notes?: string;
  expiresAt?: string;
  revokedAt?: string;
}

export type ClinicalReviewStatusLabel =
  | 'Not reviewed'
  | 'Review current'
  | 'Re-review required'
  | 'Review status unavailable';

export interface ClinicalReviewStatus {
  label: ClinicalReviewStatusLabel;
  current: boolean;
  reason: string;
  latestDecision?: ClinicalReviewDecision;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => key !== 'updatedAt' && key !== 'createdAt')
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nested]) => [key, canonicalize(nested)]),
    );
  }
  return value;
}

function sorted<T extends { id: string; fingerprint: string }>(values: T[]): T[] {
  return [...values].sort((left, right) =>
    `${left.id}\u0000${left.fingerprint}`.localeCompare(`${right.id}\u0000${right.fingerprint}`),
  );
}

function instructionalProjection(document: unknown): unknown {
  const value = document as { scenes?: unknown; outline?: unknown };
  return {
    scenes: canonicalize(value.scenes ?? []),
    outline: canonicalize(value.outline ?? null),
  };
}

function fingerprintOf(value: unknown): string {
  return `sha256:${createHash('sha256').update(JSON.stringify(value), 'utf8').digest('hex')}`;
}

export function reviewBindingHasRequiredEvidence(binding: ClinicalReviewBinding): boolean {
  return (
    binding.moduleId === MODULE_01_ID &&
    binding.sourceRecords.length > 0 &&
    binding.sourceRecords.every(
      (source) =>
        typeof source?.id === 'string' &&
        typeof source?.fingerprint === 'string' &&
        source.id.trim() !== '' &&
        source.fingerprint.trim() !== '',
    ) &&
    binding.dependencies.every(
      (dependency) =>
        (dependency?.kind === 'asset' ||
          dependency?.kind === 'model' ||
          dependency?.kind === 'scenario') &&
        typeof dependency.id === 'string' &&
        typeof dependency.fingerprint === 'string' &&
        dependency.id.trim() !== '' &&
        dependency.fingerprint.trim() !== '',
    )
  );
}

export function buildClinicalReviewManifest(
  document: unknown,
  binding: ClinicalReviewBinding,
): ClinicalReviewManifest {
  const manifest = {
    version: 1 as const,
    moduleId: binding.moduleId,
    stageId: binding.stageId,
    instructionalContent: instructionalProjection(document),
    sourceRecords: sorted(binding.sourceRecords),
    dependencies: [...binding.dependencies].sort((left, right) =>
      `${left.kind}\u0000${left.id}\u0000${left.fingerprint}`.localeCompare(
        `${right.kind}\u0000${right.id}\u0000${right.fingerprint}`,
      ),
    ),
  };
  return { ...manifest, fingerprint: fingerprintOf(manifest) };
}

export function clinicalReviewStatus(input: {
  binding?: ClinicalReviewBinding;
  manifest: ClinicalReviewManifest | null;
  decisions: ClinicalReviewDecision[];
  now?: string;
}): ClinicalReviewStatus {
  if (!input.binding || !input.manifest || !reviewBindingHasRequiredEvidence(input.binding)) {
    return {
      label: 'Review status unavailable',
      current: false,
      reason: 'The Module 01 stage binding or required source/dependency evidence is unavailable.',
    };
  }
  const latestDecision = [...input.decisions].sort((left, right) =>
    right.reviewedAt.localeCompare(left.reviewedAt),
  )[0];
  if (!latestDecision)
    return { label: 'Not reviewed', current: false, reason: 'No completed human review exists.' };
  const now = input.now ?? new Date().toISOString();
  const current =
    latestDecision.decision === 'approved' &&
    latestDecision.attestedHumanReview &&
    latestDecision.reviewerName.trim() !== '' &&
    latestDecision.credential.trim() !== '' &&
    latestDecision.jurisdiction.trim() !== '' &&
    latestDecision.relevantRoleOrExperience.trim() !== '' &&
    latestDecision.revokedAt === undefined &&
    (latestDecision.expiresAt === undefined || latestDecision.expiresAt > now) &&
    latestDecision.manifestFingerprint === input.manifest.fingerprint;
  if (current)
    return {
      label: 'Review current',
      current: true,
      reason: 'A self-attested human approval matches the current review manifest.',
      latestDecision,
    };
  return {
    label: 'Re-review required',
    current: false,
    reason: 'The latest review is not an active approval for the current review manifest.',
    latestDecision,
  };
}
