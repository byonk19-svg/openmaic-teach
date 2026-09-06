import { describe, expect, it } from 'vitest';

import { runContinuityGateV4 } from '../fixtures/continuity-gate-v4';

const liveIt = process.env.RUN_LIVE_CONTINUITY_EVAL === '1' ? it : it.skip;

describe('manual V4 continuity fixture', () => {
  liveIt(
    'rejects the V3 contradiction and persists the consistent linked simulation',
    async () => {
      const result = await runContinuityGateV4();
      console.log(JSON.stringify(result, null, 2));
      expect(result.contradictory).toMatchObject({
        isError: true,
        error: 'continuity-semantic-revise',
        persistedSceneOrders: [1],
      });
      expect(result.contradictory.violations.length).toBeGreaterThan(0);
      expect(result.consistent).toMatchObject({
        isError: false,
        error: null,
        violations: [],
        persistedSceneOrders: [1, 2],
      });
    },
    180_000,
  );
});
