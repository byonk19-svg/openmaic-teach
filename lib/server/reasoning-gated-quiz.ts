import type { QuizQuestion } from '@openmaic/dsl';

import { validateReasoningGate, type ReasoningGateConfig } from '@/lib/quiz/reasoning-gate';
import type { GeneratedQuizContent, SceneOutline } from '@/lib/types/generation';

export type ReasoningGatedQuizFinalization =
  | { ok: true; content: GeneratedQuizContent }
  | { ok: false; violations: string[] };

/**
 * Validates model-provided quiz content and attaches host-owned gate metadata.
 * The outline is authoritative; model metadata can only agree with it.
 */
export function finalizeReasoningGatedQuiz(
  outline: Pick<SceneOutline, 'type' | 'reasoningGate'>,
  content: GeneratedQuizContent,
): ReasoningGatedQuizFinalization {
  const expected = outline.reasoningGate;
  if (expected === undefined) return { ok: true, content };

  let canonical: ReasoningGateConfig;
  try {
    canonical = validateReasoningGate(expected);
  } catch (error) {
    return {
      ok: false,
      violations: [
        `authoritative reasoningGate is invalid: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
  if (outline.type !== 'quiz') {
    return { ok: false, violations: ['reasoningGate requires a quiz scene'] };
  }
  if (content.questions.length !== 1) {
    return {
      ok: false,
      violations: [`reasoningGate requires exactly one question; generated ${content.questions.length}`],
    };
  }

  const question = content.questions[0]!;
  const violations: string[] = [];
  if (question.type !== 'short_answer') {
    violations.push(`reasoningGate requires a short_answer question; generated ${question.type}`);
  }
  if (typeof question.analysis !== 'string' || !question.analysis.trim()) {
    violations.push('gated short-answer question requires a non-empty analysis');
  }
  if (question.reasoningGate !== undefined) {
    try {
      const emitted = validateReasoningGate(question.reasoningGate);
      if (emitted.rubric !== canonical.rubric) {
        violations.push('generated reasoningGate rubric does not match the requested rubric');
      }
      if (emitted.passThreshold !== canonical.passThreshold) {
        violations.push(
          `generated reasoningGate passThreshold ${emitted.passThreshold} does not match ${canonical.passThreshold}`,
        );
      }
    } catch (error) {
      violations.push(
        `generated reasoningGate is invalid: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  if (violations.length) return { ok: false, violations };

  const finalizedQuestion: QuizQuestion = {
    ...question,
    reasoningGate: { rubric: canonical.rubric, passThreshold: canonical.passThreshold },
  };
  return { ok: true, content: { ...content, questions: [finalizedQuestion] } };
}
