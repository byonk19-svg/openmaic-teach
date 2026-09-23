import type {
  ClinicalReviewBinding,
  ClinicalReviewDecision,
  ClinicalReviewManifest,
} from './manifest';

export interface ClinicalReviewSubmission {
  credential: string;
  attestedHumanReview: boolean;
  manifestFingerprint: string;
  decision?: 'approved' | 'changes_requested' | 'revoked';
  notes?: string;
  expiresAt?: string;
}

export function validateClinicalReviewSubmission(
  input: ClinicalReviewSubmission,
  manifest: ClinicalReviewManifest,
): void {
  if (input.credential.trim() === '') throw new Error('A self-attested credential is required.');
  if (input.attestedHumanReview !== true) throw new Error('Human review attestation is required.');
  if (input.manifestFingerprint !== manifest.fingerprint) {
    throw new Error('The reviewed material changed; reload before submitting a decision.');
  }
  if (input.expiresAt !== undefined && Number.isNaN(Date.parse(input.expiresAt))) {
    throw new Error('Review expiry must be an ISO timestamp when supplied.');
  }
}

export function createClinicalReviewDecision(input: {
  id: string;
  binding: ClinicalReviewBinding;
  manifest: ClinicalReviewManifest;
  reviewerOwnerId: string;
  input: ClinicalReviewSubmission;
  now: string;
}): ClinicalReviewDecision {
  validateClinicalReviewSubmission(input.input, input.manifest);
  return {
    id: input.id,
    stageId: input.binding.stageId,
    moduleId: input.binding.moduleId,
    reviewerOwnerId: input.reviewerOwnerId,
    credential: input.input.credential.trim(),
    attestedHumanReview: true,
    decision: input.input.decision ?? 'approved',
    reviewedAt: input.now,
    manifestFingerprint: input.manifest.fingerprint,
    manifest: structuredClone(input.manifest),
    ...(input.input.notes?.trim() ? { notes: input.input.notes.trim() } : {}),
    ...(input.input.expiresAt ? { expiresAt: input.input.expiresAt } : {}),
  };
}
