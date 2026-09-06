import { beforeEach, describe, expect, it } from 'vitest';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { BrowserRuntimeStore, type RuntimeStore } from '@openmaic/storage';
import {
  captureQuizAttemptTail,
  loadQuizAttemptState,
  quizAttemptId,
  recordQuizAttempt,
  type QuizAttemptRuntimeDeps,
} from '@/lib/quiz/runtime';

const base = {
  stageId: 'stage',
  sceneId: 'quiz',
  attemptId: quizAttemptId('stage', 'quiz', 'learner'),
};
const answers = { q: 'Evidence supporting the answer.' };
const results = [
  {
    questionId: 'q',
    correct: true,
    status: 'correct' as const,
    earned: 1,
    reasoningReviewKey: 'binding',
  },
];

function harness() {
  const store = new BrowserRuntimeStore({
    indexedDB: new IDBFactory(),
    dbName: 'gate-concurrency',
  });
  let tick = 0;
  const deps: QuizAttemptRuntimeDeps = {
    store,
    learnerKey: 'learner',
    now: () => new Date(Date.UTC(2026, 8, 6, 12, 0, tick++)).toISOString(),
    mintRecordId: () => `record-${tick}`,
  };
  return { store, deps };
}

function wrapStore(store: RuntimeStore, overrides: Partial<RuntimeStore>): RuntimeStore {
  return new Proxy(store, {
    get(target, property) {
      if (property in overrides) return overrides[property as keyof RuntimeStore];
      const value = Reflect.get(target, property);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
}

describe('reasoning gate durable concurrency', () => {
  it('allows only opted-in gated drafts to revise an unfinished submitted answer', async () => {
    const { deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'submitted', answers }, deps);
    const revised = { q: 'Specific revised reasoning' };
    await recordQuizAttempt({ ...base, phase: 'draft', answers: revised }, deps);
    expect((await loadQuizAttemptState(base, deps)).state?.answers).toEqual(answers);
    await recordQuizAttempt(
      { ...base, phase: 'draft', answers: revised, allowSubmittedDraftRevision: true },
      deps,
    );
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'draft',
      answers: revised,
    });
  });
  it('refuses capture if the saved answer no longer matches the answer being graded', async () => {
    const { deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers }, deps);
    await expect(
      captureQuizAttemptTail({ ...base, answers: { q: 'different' } }, deps),
    ).rejects.toThrow();
  });
  beforeEach(() => {
    Object.defineProperty(globalThis, 'IDBKeyRange', { configurable: true, value: IDBKeyRange });
  });

  it('captures a saved draft and accepts exactly that tail for review', async () => {
    const { deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers }, deps);
    const expectedTail = await captureQuizAttemptTail(base, deps);
    expect(expectedTail).toEqual({ sessionId: base.attemptId, seq: 0 });
    await recordQuizAttempt({ ...base, phase: 'reviewed', answers, results, expectedTail }, deps);
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'reviewed',
      answers,
      results,
    });
  });

  it('rejects a pass after another draft replaced its captured answer', async () => {
    const { deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers }, deps);
    const expectedTail = await captureQuizAttemptTail(base, deps);
    const revised = { q: 'Newer answer from another tab' };
    await recordQuizAttempt({ ...base, phase: 'draft', answers: revised }, deps);
    await expect(
      recordQuizAttempt({ ...base, phase: 'reviewed', answers, results, expectedTail }, deps),
    ).rejects.toThrow();
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'draft',
      answers: revised,
    });
  });

  it('does not roll a late pass into a newer retry, but captures the retry through the root id', async () => {
    const { store, deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers }, deps);
    const expectedTail = await captureQuizAttemptTail(base, deps);
    await recordQuizAttempt({ ...base, phase: 'reviewed', answers, results }, deps);
    await recordQuizAttempt({ ...base, phase: 'draft', answers: {}, startNewAttempt: true }, deps);
    const revised = { q: 'New retry answer' };
    await recordQuizAttempt({ ...base, phase: 'draft', answers: revised }, deps);
    await expect(
      recordQuizAttempt({ ...base, phase: 'reviewed', answers, results, expectedTail }, deps),
    ).rejects.toThrow();
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'draft',
      answers: revised,
    });
    const retryTail = await captureQuizAttemptTail(base, deps);
    expect(retryTail).toEqual({ sessionId: `${base.attemptId}:retry:1`, seq: 1 });
    await recordQuizAttempt(
      { ...base, phase: 'reviewed', answers: revised, results, expectedTail: retryTail },
      deps,
    );
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'reviewed',
      answers: revised,
    });
    expect(await store.listSessions('stage', 'learner')).toHaveLength(2);
  });

  it('rechecks the original token after a compare-and-append conflict', async () => {
    const { store, deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers }, deps);
    const expectedTail = await captureQuizAttemptTail(base, deps);
    let injected = false;
    const racedStore = wrapStore(store, {
      async appendRecord(record, options) {
        if (!injected) {
          injected = true;
          await store.appendRecord(
            {
              ...record,
              id: 'racing-draft',
              payload: { payloadVersion: 1, phase: 'draft', answers: { q: 'Racing revision' } },
            },
            { expectedLastSeq: expectedTail.seq },
          );
        }
        return store.appendRecord(record, options);
      },
    });
    await expect(
      recordQuizAttempt(
        { ...base, phase: 'reviewed', answers, results, expectedTail },
        { ...deps, store: racedStore },
      ),
    ).rejects.toThrow();
    expect((await loadQuizAttemptState(base, deps)).state).toMatchObject({
      phase: 'draft',
      answers: { q: 'Racing revision' },
    });
  });

  it('rejects an answer mismatch if another tab saved before capture', async () => {
    const { deps } = harness();
    await recordQuizAttempt({ ...base, phase: 'draft', answers: { q: 'Other tab answer' } }, deps);
    const expectedTail = await captureQuizAttemptTail(base, deps);
    await expect(
      recordQuizAttempt({ ...base, phase: 'reviewed', answers, results, expectedTail }, deps),
    ).rejects.toThrow();
  });
});
