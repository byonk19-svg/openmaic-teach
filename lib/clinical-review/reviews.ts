import type {
  ClinicalReviewBinding,
  ClinicalReviewDecision,
  ClinicalReviewManifest,
} from './manifest';

export interface ClinicalReviewSubmission {
  reviewerName: string;
  credential: string;
  jurisdiction: string;
  relevantRoleOrExperience: string;
  attestedHumanReview: boolean;
  manifestFingerprint: string;
  decision?: 'approved' | 'changes_requested' | 'revoked';
  notes?: string;
  expiresAt?: string;
}

function requireText(value: unknown, message: string): void {
  if (typeof value !== 'string' || value.trim() === '') throw new Error(message);
}

export function validateClinicalReviewSubmission(
  input: ClinicalReviewSubmission,
  manifest: ClinicalReviewManifest,
): void {
  requireText(input.reviewerName, 'Reviewer name is required.');
  requireText(input.credential, 'A self-attested credential is required.');
  requireText(input.jurisdiction, 'Reviewer jurisdiction is required.');
  requireText(
    input.relevantRoleOrExperience,
    'Relevant adult acute/ICU role or experience is required.',
  );
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
    reviewerName: input.input.reviewerName.trim(),
    credential: input.input.credential.trim(),
    jurisdiction: input.input.jurisdiction.trim(),
    relevantRoleOrExperience: input.input.relevantRoleOrExperience.trim(),
    attestedHumanReview: true,
    decision: input.input.decision ?? 'approved',
    reviewedAt: input.now,
    manifestFingerprint: input.manifest.fingerprint,
    manifest: structuredClone(input.manifest),
    ...(input.input.notes?.trim() ? { notes: input.input.notes.trim() } : {}),
    ...(input.input.expiresAt ? { expiresAt: input.input.expiresAt } : {}),
  };
}
