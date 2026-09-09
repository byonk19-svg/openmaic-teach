import { describe, expect, it } from 'vitest';
import {
  LEARNER_KEY_STORAGE_KEY,
  parseLearnerBrowserArgs,
  seedLearnerKey,
} from '@/scripts/learner-browser';

describe('learner browser harness arguments', () => {
  it('uses the native listener and a bounded timeout by default', () => {
    expect(parseLearnerBrowserArgs(['--stage', 'stage-1'])).toMatchObject({
      baseURL: 'http://127.0.0.1:3001',
      stageId: 'stage-1',
      headless: true,
      timeoutMs: 15_000,
    });
  });

  it('accepts an explicit learner identity, browser mode, and artifact directory', () => {
    expect(
      parseLearnerBrowserArgs([
        '--stage',
        'stage-1',
        '--learner-key',
        'anon:preserved',
        '--headed',
        '--screenshot-dir',
        'output/playwright/live',
        '--timeout-ms',
        '30000',
      ]),
    ).toMatchObject({
      stageId: 'stage-1',
      learnerKey: 'anon:preserved',
      headless: false,
      screenshotDir: 'output/playwright/live',
      timeoutMs: 30_000,
    });
  });

  it('fails closed on missing stage IDs and unsafe timeout values', () => {
    expect(() => parseLearnerBrowserArgs([])).toThrow(/--stage/);
    expect(() => parseLearnerBrowserArgs(['--stage', 'stage-1', '--timeout-ms', '0'])).toThrow(
      /timeout/i,
    );
  });

  it('seeds only the JSON-serialized device learner key before page bootstrap', () => {
    const writes: Array<[string, string]> = [];
    seedLearnerKey({ setItem: (key, value) => writes.push([key, value]) }, 'anon:preserved');
    expect(writes).toEqual([[LEARNER_KEY_STORAGE_KEY, JSON.stringify('anon:preserved')]]);
  });
});
