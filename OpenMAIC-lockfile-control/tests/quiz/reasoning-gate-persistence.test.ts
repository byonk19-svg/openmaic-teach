import { describe, expect, it } from 'vitest';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { BrowserRuntimeStore } from '@openmaic/storage';
import { recordQuizAttempt, loadQuizAttemptState } from '@/lib/quiz/runtime';
import {
  hydrateReasoningAttempt,
  runReasoningGateAttempt,
} from '@/lib/quiz/reasoning-gate-attempt';

describe('reasoning gate existing persistence integration', () => {
  it('persists a revision as draft, restores its answer, then persists only a passed review', async () => {
    Object.defineProperty(globalThis, 'IDBKeyRange', { configurable: true, value: IDBKeyRange });
    const store = new BrowserRuntimeStore({
      indexedDB: new IDBFactory(),
      dbName: 'reasoning-integration',
    });
    let seq = 0;
    const deps = { store, learnerKey: 'learner', mintRecordId: () => `gate-record-${++seq}` };
    const question = {
      id: 'q',
      type: 'short_answer' as const,
      question: 'Interpret the evidence.',
      analysis: 'Hidden teaching',
      reasoningGate: { rubric: 'Evidence plus mechanism plus specific action', passThreshold: 0.8 },
    };
    const initial = await loadQuizAttemptState({ stageId: 'stage', sceneId: 'scene' }, deps);
    const base = { stageId: 'stage', sceneId: 'scene', attemptId: initial.attemptId };
    let answer = 'I would reassess the patient and ventilator.';
    const run = (grade: unknown) =>
      runReasoningGateAttempt(question, answer, {
        saveAnswer: () =>
          recordQuizAttempt({ ...base, phase: 'draft', answers: { q: answer } }, deps),
        grade: async () => grade,
        saveReview: (result) =>
          recordQuizAttempt(
            { ...base, phase: 'reviewed', answers: { q: answer }, results: [result] },
            deps,
          ),
      });
    expect(
      (
        await run({
          decision: 'revise',
          score: 0.2,
          feedback: 'Be specific.',
          followUp: 'What evidence would you assess?',
        })
      ).phase,
    ).toBe('answering');
    const revised = await loadQuizAttemptState(base, deps);
    expect(revised.state?.phase).toBe('draft');
    expect(hydrateReasoningAttempt(question, revised.state)).toEqual({
      phase: 'answering',
      answers: { q: answer },
      results: [],
    });
    answer = 'Specific evidence, mechanism, and action';
    expect(
      (await run({ decision: 'pass', score: 0.9, feedback: 'You explained the required links.' }))
        .phase,
    ).toBe('reviewing');
    const passed = await loadQuizAttemptState(base, deps);
    expect(hydrateReasoningAttempt(question, passed.state).phase).toBe('reviewing');
    expect(passed.state?.answers).toEqual({ q: answer });
  });
});
