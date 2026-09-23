import { afterEach, describe, expect, it, vi } from 'vitest';

import { isClinicalReviewEnabled, shouldShowClinicalReviewUi } from '@/lib/config/feature-flags';

afterEach(() => vi.unstubAllEnvs());

describe('clinical review containment flags', () => {
  it('defaults both server capability and author control off', () => {
    vi.stubEnv('OPENMAIC_ENABLE_CLINICAL_REVIEW', '');
    vi.stubEnv('NEXT_PUBLIC_ENABLE_CLINICAL_REVIEW', '');
    expect(isClinicalReviewEnabled()).toBe(false);
    expect(shouldShowClinicalReviewUi()).toBe(false);
  });

  it('requires server configuration even when the public display control is enabled', () => {
    vi.stubEnv('OPENMAIC_ENABLE_CLINICAL_REVIEW', 'false');
    vi.stubEnv('NEXT_PUBLIC_ENABLE_CLINICAL_REVIEW', 'true');
    expect(isClinicalReviewEnabled()).toBe(false);
    expect(shouldShowClinicalReviewUi()).toBe(true);
  });
});
