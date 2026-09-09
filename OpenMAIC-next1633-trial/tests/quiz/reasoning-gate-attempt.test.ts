import { describe, expect, it, vi } from 'vitest';
import {
  runReasoningGateAttempt,
  reasoningReviewKey,
  canRestoreReasoningReview,
  hydrateReasoningAttempt,
} from '@/lib/quiz/reasoning-gate-attempt';

const question = {
  id: 'q',
  type: 'short_answer' as const,
  question: 'Explain the evidence and next assessment.',
  analysis: 'Hidden explanation',
  reasoningGate: {
    rubric: 'Require evidence, mechanism and a specific next step.',
    passThreshold: 0.8,
  },
};
const revise = {
  decision: 'revise',
  score: 0.9,
  feedback: 'You recognized reassessment is needed.',
  followUp: 'Which specific factor would you assess next?',
};
const pass = {
  decision: 'pass',
  score: 0.9,
  feedback: 'You linked evidence to a specific assessment.',
};
function deps(result: unknown = revise) {
  return {
    saveAnswer: vi.fn().mockResolvedValue(undefined),
    grade: vi.fn().mockResolvedValue(result),
    saveReview: vi.fn().mockResolvedValue(undefined),
  };
}

describe('reasoning gate attempt transaction', () => {
  it('restores unfinished saved answers without inventing revision feedback', () => {
    const r = hydrateReasoningAttempt(question, {
      sessionId: 'a',
      status: 'active',
      phase: 'draft',
      answers: { q: 'My saved answer' },
    });
    expect(r).toEqual({ phase: 'answering', answers: { q: 'My saved answer' }, results: [] });
    expect(r).not.toHaveProperty('followUp');
  });
  it('rejects blank input before grading', async () => {
    const d = deps();
    const r = await runReasoningGateAttempt(question, '  ', d);
    expect(r.phase).toBe('answering');
    expect(d.grade).not.toHaveBeenCalled();
    expect(d.saveReview).not.toHaveBeenCalled();
  });
  it('keeps a vague answer locked and returns one follow-up even at a high score', async () => {
    const d = deps();
    const r = await runReasoningGateAttempt(
      question,
      'I would reassess the patient and ventilator.',
      d,
    );
    expect(r).toMatchObject({
      phase: 'answering',
      feedback: revise.feedback,
      followUp: revise.followUp,
    });
    expect(JSON.stringify(r)).not.toContain(question.analysis);
    expect(d.saveReview).not.toHaveBeenCalled();
  });
  it('allows a revised answer to pass only after review persistence', async () => {
    const d = deps(pass);
    const r = await runReasoningGateAttempt(
      question,
      'Specific evidence, mechanism, and assessment.',
      d,
    );
    expect(r.phase).toBe('reviewing');
    expect(d.saveAnswer).toHaveBeenCalledOnce();
    expect(d.saveReview).toHaveBeenCalledOnce();
  });
  for (const failure of ['saveAnswer', 'grade', 'saveReview'] as const)
    it(`fails closed on ${failure} failure`, async () => {
      const d = deps(pass);
      d[failure].mockRejectedValue(new Error('offline'));
      const r = await runReasoningGateAttempt(question, 'Specific answer', d);
      expect(r.phase).toBe('answering');
      expect(JSON.stringify(r)).not.toContain(question.analysis);
    });
  it.each([
    null,
    { score: 1, feedback: 'ok' },
    { decision: 'pass', score: 0.1, feedback: 'ok' },
    { decision: 'revise', score: 1, feedback: 'try' },
  ])('fails closed for ambiguous output %j', async (value) => {
    const d = deps(value);
    expect((await runReasoningGateAttempt(question, 'Answer', d)).phase).toBe('answering');
    expect(d.saveReview).not.toHaveBeenCalled();
  });
  it('does not restore ordinary or stale reviews as gated passes', () => {
    expect(
      canRestoreReasoningReview(question, [
        { questionId: 'q', correct: true, status: 'correct', earned: 1 },
      ]),
    ).toBe(false);
    const result = {
      questionId: 'q',
      correct: true,
      status: 'correct' as const,
      earned: 1,
      reasoningReviewKey: reasoningReviewKey(question),
    };
    expect(canRestoreReasoningReview(question, [result])).toBe(true);
    expect(canRestoreReasoningReview({ ...question, question: 'Changed question' }, [result])).toBe(
      false,
    );
  });
});
