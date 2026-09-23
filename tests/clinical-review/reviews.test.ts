import { describe, expect, it } from 'vitest';

import {
  createClinicalReviewDecision,
  validateClinicalReviewSubmission,
} from '@/lib/clinical-review/reviews';
import {
  buildClinicalReviewManifest,
  type ClinicalReviewBinding,
} from '@/lib/clinical-review/manifest';

const binding: ClinicalReviewBinding = {
  stageId: 'stage-1',
  moduleId: 'adult-icu-rt-foundations-01',
  sourceRecords: [{ id: 'M01-CR-001', fingerprint: 'sha256:source-1' }],
  dependencies: [{ kind: 'model', id: 'rubric', fingerprint: 'sha256:rubric-1' }],
};
const document = {
  stage: { id: 'stage-1' },
  scenes: [{ id: 'scene-1', content: { type: 'quiz' } }],
};

describe('clinical review submissions', () => {
  it('rejects absent human attestation, credential, forged owner, and stale fingerprints', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    for (const input of [
      { credential: 'RRT', attestedHumanReview: false, manifestFingerprint: manifest.fingerprint },
      { credential: ' ', attestedHumanReview: true, manifestFingerprint: manifest.fingerprint },
      { credential: 'RRT', attestedHumanReview: true, manifestFingerprint: 'sha256:stale' },
    ]) {
      expect(() => validateClinicalReviewSubmission(input, manifest)).toThrow();
    }
    expect(
      createClinicalReviewDecision({
        id: 'review-1',
        binding,
        manifest,
        reviewerOwnerId: 'owner-from-session',
        input: {
          credential: 'RRT',
          attestedHumanReview: true,
          manifestFingerprint: manifest.fingerprint,
        },
        now: '2026-09-14T12:00:00.000Z',
      }).reviewerOwnerId,
    ).toBe('owner-from-session');
  });

  it('captures the exact manifest instead of a mutable reference', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    const review = createClinicalReviewDecision({
      id: 'review-1',
      binding,
      manifest,
      reviewerOwnerId: 'owner-1',
      input: {
        credential: 'RRT',
        attestedHumanReview: true,
        manifestFingerprint: manifest.fingerprint,
      },
      now: '2026-09-14T12:00:00.000Z',
    });
    expect(review.manifest).toEqual(manifest);
    expect(review.manifest).not.toBe(manifest);
  });
});
