import type { QuizQuestion } from '@/lib/types/stage';
import type { QuestionResult } from './grading';
import type { QuizAttemptState } from './runtime';
import { parseReasoningGateResult } from './reasoning-gate';

export type ReasoningAttemptOutcome =
  | { phase: 'answering'; feedback: string; followUp?: string }
  | { phase: 'reviewing'; result: QuestionResult };

/** Bind a durable pass to the exact question/rubric that was assessed. */
export function reasoningReviewKey(question: QuizQuestion): string {
  return JSON.stringify([
    question.id,
    question.question,
    question.analysis,
    question.reasoningGate,
  ]);
}

export function canRestoreReasoningReview(
  question: QuizQuestion,
  results: QuestionResult[],
): boolean {
  return (
    results.length === 1 &&
    results[0].questionId === question.id &&
    results[0].correct === true &&
    results[0].reasoningReviewKey === reasoningReviewKey(question)
  );
}

export function hydrateReasoningAttempt(question: QuizQuestion, state?: QuizAttemptState) {
  const results = state?.results ?? [];
  const reviewed = state?.phase === 'reviewed' && canRestoreReasoningReview(question, results);
  return {
    phase: reviewed ? ('reviewing' as const) : ('answering' as const),
    answers: state?.answers ?? {},
    results: reviewed ? results : [],
  };
}

/** No reviewed persistence or visible review occurs until an explicit, valid pass. */
export async function runReasoningGateAttempt(
  question: QuizQuestion,
  answer: string,
  deps: {
    saveAnswer(): Promise<void>;
    grade(): Promise<unknown>;
    saveReview(result: QuestionResult): Promise<void>;
  },
): Promise<ReasoningAttemptOutcome> {
  if (!answer.trim())
    return { phase: 'answering', feedback: 'Write your reasoning before submitting.' };
  try {
    if (!question.reasoningGate) throw new Error('Missing reasoning gate');
    await deps.saveAnswer();
    const grade = parseReasoningGateResult(
      await deps.grade(),
      question.reasoningGate.passThreshold,
    );
    if (grade.decision === 'revise') {
      return { phase: 'answering', feedback: grade.feedback, followUp: grade.followUp };
    }
    const result: QuestionResult = {
      questionId: question.id,
      correct: true,
      status: 'correct',
      earned: grade.score * (question.points ?? 1),
      aiComment: grade.feedback,
      reasoningReviewKey: reasoningReviewKey(question),
    };
    await deps.saveReview(result);
    return { phase: 'reviewing', result };
  } catch {
    return {
      phase: 'answering',
      feedback:
        'Your answer could not be safely graded or saved. The explanation remains locked. Please resubmit.',
    };
  }
}
