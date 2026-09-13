import type { QuizQuestion, Scene } from '@/lib/types/stage';
import { canRestoreReasoningReview } from '@/lib/quiz/reasoning-gate-attempt';
import type { QuizAttemptState } from '@/lib/quiz/runtime';

export interface LearnerCompletionSummary {
  requiredGateCount: number;
  passedGateCount: number;
  isComplete: boolean;
}

type RequiredReasoningGate = {
  sceneId: string;
  question: QuizQuestion;
  legacy: boolean;
};

function requiredReasoningGates(scenes: readonly Scene[]): RequiredReasoningGate[] {
  return scenes.flatMap((scene) => {
    if (scene.type !== 'quiz' || scene.content.type !== 'quiz') return [];
    return scene.content.questions.flatMap((question) => {
      const structured = question.reasoningGate !== undefined;
      const legacy =
        question.type === 'short_answer' &&
        /^gated grading rubric:/i.test(question.commentPrompt ?? '');
      return structured || legacy
        ? [{ sceneId: scene.id, question, legacy: legacy && !structured }]
        : [];
    });
  });
}

function hasPassedGate(
  gate: RequiredReasoningGate,
  attempt: QuizAttemptState | undefined,
): boolean {
  if (attempt?.phase !== 'reviewed') return false;
  if (gate.legacy) {
    return (
      attempt.results?.some(
        (result) => result.questionId === gate.question.id && result.correct === true,
      ) ?? false
    );
  }
  return canRestoreReasoningReview(gate.question, attempt.results ?? []);
}

/**
 * Learner completion is intentionally distinct from course generation. A generated
 * course becomes learner-complete only after every authored reasoning gate has a
 * durable pass bound to its current question and rubric.
 */
export function learnerCompletionSummary(
  scenes: readonly Scene[],
  attempts: ReadonlyMap<string, QuizAttemptState | undefined>,
): LearnerCompletionSummary {
  const gates = requiredReasoningGates(scenes);
  const passedGateCount = gates.filter((gate) =>
    hasPassedGate(gate, attempts.get(gate.sceneId)),
  ).length;
  return {
    requiredGateCount: gates.length,
    passedGateCount,
    isComplete: passedGateCount === gates.length,
  };
}

export function isLearnerCourseComplete(
  scenes: readonly Scene[],
  attempts: ReadonlyMap<string, QuizAttemptState | undefined>,
): boolean {
  return learnerCompletionSummary(scenes, attempts).isComplete;
}

export function reasoningGateSceneIds(scenes: readonly Scene[]): string[] {
  return [...new Set(requiredReasoningGates(scenes).map((gate) => gate.sceneId))];
}
