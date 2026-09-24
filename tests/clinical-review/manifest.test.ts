import { describe, expect, it } from 'vitest';

import {
  buildClinicalReviewManifest,
  clinicalReviewStatus,
  reviewBindingHasRequiredEvidence,
  type ClinicalReviewBinding,
  type ClinicalReviewDecision,
} from '@/lib/clinical-review/manifest';

const binding: ClinicalReviewBinding = {
  stageId: 'stage-module-01',
  moduleId: 'adult-icu-rt-foundations-01',
  sourceRecords: [{ id: 'M01-CR-001', fingerprint: 'sha256:source-v1' }],
  dependencies: [
    { kind: 'asset', id: 'patient-support-layers', fingerprint: 'sha256:asset-v1' },
    { kind: 'model', id: 'reasoning-rubric', fingerprint: 'sha256:rubric-v1' },
  ],
};

const document = {
  stage: { id: 'stage-module-01', name: 'Module 01', updatedAt: 123 },
  scenes: [
    {
      id: 'scene-1',
      order: 1,
      content: {
        type: 'quiz',
        questions: [
          {
            id: 'question-1',
            question: 'What is known?',
            analysis: 'Classify the evidence.',
            reasoningGate: { rubric: 'Name evidence and uncertainty.', passThreshold: 0.8 },
          },
        ],
      },
    },
  ],
  outline: { generationComplete: true },
};

function approved(fingerprint: string): ClinicalReviewDecision {
  return {
    id: 'review-1',
    stageId: binding.stageId,
    moduleId: binding.moduleId,
    reviewerOwnerId: 'owner-1',
    reviewerName: 'Brianna Yonkin',
    credential: 'RRT',
    jurisdiction: 'Texas',
    relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
    attestedHumanReview: true,
    decision: 'approved',
    reviewedAt: '2026-09-14T12:00:00.000Z',
    manifestFingerprint: fingerprint,
    manifest: buildClinicalReviewManifest(document, binding),
  };
}

describe('clinical review manifest', () => {
  it('is stable across irrelevant object-key order and volatile stage metadata', () => {
    const first = buildClinicalReviewManifest(document, binding);
    const reordered = buildClinicalReviewManifest(
      {
        scenes: [{ ...document.scenes[0], content: { ...document.scenes[0].content } }],
        outline: { generationComplete: true },
        stage: {
          updatedAt: 999,
          name: 'Renamed without instructional change',
          id: 'stage-module-01',
        },
      },
      { ...binding, dependencies: [...binding.dependencies].reverse() },
    );
    expect(reordered.fingerprint).toBe(first.fingerprint);
  });

  it.each([
    [
      'learner content',
      (value: typeof document) => ({
        ...value,
        scenes: [
          {
            ...value.scenes[0],
            content: {
              ...value.scenes[0].content,
              questions: [
                {
                  ...(value.scenes[0].content as { questions: { question: string }[] })
                    .questions[0]!,
                  question: 'Changed question',
                },
              ],
            },
          },
        ],
      }),
    ],
    [
      'answer logic or rubric',
      (value: typeof document) => ({
        ...value,
        scenes: [
          {
            ...value.scenes[0],
            content: {
              ...value.scenes[0].content,
              questions: [
                {
                  ...(value.scenes[0].content as { questions: { reasoningGate: object }[] })
                    .questions[0]!,
                  reasoningGate: { rubric: 'Changed.', passThreshold: 0.8 },
                },
              ],
            },
          },
        ],
      }),
    ],
  ])('changes fingerprint for %s', (_label, change) => {
    expect(buildClinicalReviewManifest(change(document), binding).fingerprint).not.toBe(
      buildClinicalReviewManifest(document, binding).fingerprint,
    );
  });

  it.each([
    [
      'source version',
      { ...binding, sourceRecords: [{ id: 'M01-CR-001', fingerprint: 'sha256:source-v2' }] },
    ],
    [
      'model dependency',
      {
        ...binding,
        dependencies: [
          { ...binding.dependencies[0]!, fingerprint: 'sha256:asset-v2' },
          binding.dependencies[1]!,
        ],
      },
    ],
  ])('changes fingerprint for %s', (_label, changedBinding) => {
    expect(buildClinicalReviewManifest(document, changedBinding).fingerprint).not.toBe(
      buildClinicalReviewManifest(document, binding).fingerprint,
    );
  });

  it('reports only a matching attested approval as current', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    expect(
      clinicalReviewStatus({ binding, manifest, decisions: [approved(manifest.fingerprint)] }),
    ).toMatchObject({
      label: 'Review current',
      current: true,
    });
  });

  it('never promotes missing attestation, stale, revoked, expired, or missing evidence reviews', () => {
    const manifest = buildClinicalReviewManifest(document, binding);
    expect(clinicalReviewStatus({ binding, manifest, decisions: [] }).label).toBe('Not reviewed');
    expect(
      clinicalReviewStatus({
        binding,
        manifest,
        decisions: [{ ...approved(manifest.fingerprint), attestedHumanReview: false }],
      }).label,
    ).toBe('Re-review required');
    expect(
      clinicalReviewStatus({
        binding,
        manifest,
        decisions: [{ ...approved(manifest.fingerprint), reviewerName: '' }],
      }).label,
    ).toBe('Re-review required');
    expect(
      clinicalReviewStatus({ binding, manifest, decisions: [{ ...approved('sha256:old') }] }).label,
    ).toBe('Re-review required');
    expect(
      clinicalReviewStatus({
        binding,
        manifest,
        decisions: [{ ...approved(manifest.fingerprint), revokedAt: '2026-09-14T12:01:00.000Z' }],
      }).label,
    ).toBe('Re-review required');
    expect(
      clinicalReviewStatus({
        binding,
        manifest,
        decisions: [{ ...approved(manifest.fingerprint), expiresAt: '2026-09-13T12:00:00.000Z' }],
        now: '2026-09-14T12:00:00.000Z',
      }).label,
    ).toBe('Re-review required');
    expect(
      clinicalReviewStatus({
        binding: { ...binding, sourceRecords: [] },
        manifest: null,
        decisions: [],
      }).label,
    ).toBe('Review status unavailable');
    expect(
      reviewBindingHasRequiredEvidence({
        ...binding,
        sourceRecords: [{} as { id: string; fingerprint: string }],
      }),
    ).toBe(false);
  });
});
