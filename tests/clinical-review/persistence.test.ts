import { describe, expect, it, vi } from 'vitest';

import {
  CLINICAL_REVIEW_SCHEMA,
  appendClinicalReviewDecision,
} from '@/lib/persistence/clinical-reviews';
import type { ClinicalReviewDecision } from '@/lib/clinical-review/manifest';

const decision: ClinicalReviewDecision = {
  id: 'review-1',
  stageId: 'stage-1',
  moduleId: 'adult-icu-rt-foundations-01',
  reviewerOwnerId: 'owner-1',
  reviewerName: 'Brianna Yonkin',
  credential: 'RRT',
  jurisdiction: 'Texas',
  relevantRoleOrExperience: 'Practicing adult acute/ICU respiratory therapist',
  attestedHumanReview: true,
  decision: 'approved',
  reviewedAt: '2026-09-23T12:00:00.000Z',
  manifestFingerprint: 'sha256:manifest',
  manifest: {
    version: 1,
    moduleId: 'adult-icu-rt-foundations-01',
    stageId: 'stage-1',
    instructionalContent: {},
    sourceRecords: [],
    dependencies: [],
    fingerprint: 'sha256:manifest',
  },
};

describe('clinical review persistence', () => {
  it('migrates existing review tables to retain reviewer qualification context', () => {
    expect(CLINICAL_REVIEW_SCHEMA).toContain('ADD COLUMN IF NOT EXISTS reviewer_name');
    expect(CLINICAL_REVIEW_SCHEMA).toContain('ADD COLUMN IF NOT EXISTS jurisdiction');
    expect(CLINICAL_REVIEW_SCHEMA).toContain(
      'ADD COLUMN IF NOT EXISTS relevant_role_or_experience',
    );
  });

  it('writes reviewer identity and qualification context with the decision', async () => {
    const query = vi.fn().mockResolvedValue({ rows: [] });
    await appendClinicalReviewDecision({ query } as never, decision);
    expect(query).toHaveBeenCalledTimes(1);
    const [sql, values] = query.mock.calls[0]!;
    expect(sql).toContain('reviewer_name');
    expect(sql).toContain('jurisdiction');
    expect(sql).toContain('relevant_role_or_experience');
    expect(values).toEqual(expect.arrayContaining([decision.reviewerName, decision.jurisdiction]));
    expect(values).toContain(decision.relevantRoleOrExperience);
  });
});
