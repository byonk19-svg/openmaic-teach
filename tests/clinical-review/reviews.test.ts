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

const validSubmission = {
  reviewerName: 'Brianna Yonkin',
  credential: 'RRT',
  jurisdiction: 'Texas',
  relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
  attestedHumanReview: true,
};

describe('clinical review submissions', () => {
  it('requires reviewer identity, qualification context, attestation, and the exact fingerprint', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    for (const input of [
      { ...validSubmission, reviewerName: ' ', manifestFingerprint: manifest.fingerprint },
      { ...validSubmission, credential: ' ', manifestFingerprint: manifest.fingerprint },
      { ...validSubmission, jurisdiction: ' ', manifestFingerprint: manifest.fingerprint },
      {
        ...validSubmission,
        relevantRoleOrExperience: ' ',
        manifestFingerprint: manifest.fingerprint,
      },
      { ...validSubmission, attestedHumanReview: false, manifestFingerprint: manifest.fingerprint },
      { ...validSubmission, manifestFingerprint: 'sha256:stale' },
    ]) {
      expect(() => validateClinicalReviewSubmission(input, manifest)).toThrow();
    }

    const decision = createClinicalReviewDecision({
      id: 'review-1',
      binding,
      manifest,
      reviewerOwnerId: 'owner-from-session',
      input: {
        ...validSubmission,
        reviewerName: '  Brianna Yonkin  ',
        jurisdiction: ' Texas ',
        relevantRoleOrExperience: ' Practicing adult acute/ICU respiratory therapist ',
        manifestFingerprint: manifest.fingerprint,
      },
      now: '2026-09-14T12:00:00.000Z',
    });
    expect(decision).toMatchObject({
      reviewerOwnerId: 'owner-from-session',
      reviewerName: 'Brianna Yonkin',
      credential: 'RRT',
      jurisdiction: 'Texas',
      relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
      manifestFingerprint: manifest.fingerprint,
    });
  });

  it('rejects malformed reviewer fields with a bounded validation error', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    expect(() =>
      validateClinicalReviewSubmission(
        {
          ...validSubmission,
          reviewerName: undefined as never,
          manifestFingerprint: manifest.fingerprint,
        },
        manifest,
      ),
    ).toThrow('Reviewer name is required.');
  });

  it('captures the exact manifest instead of a mutable reference', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    const review = createClinicalReviewDecision({
      id: 'review-1',
      binding,
      manifest,
      reviewerOwnerId: 'owner-1',
      input: {
        ...validSubmission,
        manifestFingerprint: manifest.fingerprint,
      },
      now: '2026-09-14T12:00:00.000Z',
    });
    expect(review.manifest).toEqual(manifest);
    expect(review.manifest).not.toBe(manifest);
  });
});
