import { describe, expect, it } from 'vitest';
import type { Scene } from '@/lib/types/stage';
import { reasoningReviewKey } from '@/lib/quiz/reasoning-gate-attempt';

const gateQuestion = {
  id: 'gate-question',
  type: 'short_answer' as const,
  question: 'Interpret the bedside evidence and state the next step.',
  analysis: 'Hidden teaching explanation.',
  reasoningGate: { rubric: 'Require evidence, mechanism, and next action.', passThreshold: 0.8 },
};

const gateScene = {
  id: 'gate-scene',
  stageId: 'stage-1',
  type: 'quiz',
  order: 1,
  title: 'Reasoning gate',
  content: { type: 'quiz', questions: [gateQuestion] },
} as Scene;

const ordinaryQuiz = {
  id: 'ordinary-quiz',
  stageId: 'stage-1',
  type: 'quiz',
  order: 2,
  title: 'Ordinary quiz',
  content: {
    type: 'quiz',
    questions: [{ id: 'ordinary', type: 'single', question: 'Choose one.', options: ['A', 'B'] }],
  },
} as Scene;

const legacyGateScene = {
  id: 'legacy-gate',
  stageId: 'stage-1',
  type: 'quiz',
  order: 3,
  title: 'Legacy reasoning gate',
  content: {
    type: 'quiz',
    questions: [
      {
        id: 'legacy-question',
        type: 'short_answer',
        question: 'Make and justify a clinical decision.',
        analysis: 'Hidden explanation.',
        commentPrompt: 'Gated grading rubric: require evidence and a safe next action.',
      },
    ],
  },
} as Scene;

describe('learner completion', () => {
  it('requires every reasoning gate to have a valid persisted pass', async () => {
    const module = (await import('@/lib/classroom/learner-completion')) as Record<string, unknown>;
    const isLearnerCourseComplete = module.isLearnerCourseComplete as
      | ((scenes: Scene[], attempts: Map<string, unknown>) => boolean)
      | undefined;

    expect(isLearnerCourseComplete).toBeTypeOf('function');
    if (!isLearnerCourseComplete) return;

    const passed = new Map([
      [
        gateScene.id,
        {
          phase: 'reviewed',
          results: [
            {
              questionId: gateQuestion.id,
              correct: true,
              reasoningReviewKey: reasoningReviewKey(gateQuestion),
            },
          ],
        },
      ],
    ]);

    expect(isLearnerCourseComplete([gateScene, ordinaryQuiz], passed)).toBe(true);
    expect(isLearnerCourseComplete([gateScene, ordinaryQuiz], new Map())).toBe(false);
    expect(
      isLearnerCourseComplete(
        [gateScene],
        new Map([[gateScene.id, { phase: 'reviewed', results: [] }]]),
      ),
    ).toBe(false);
  });

  it('does not invent a mastery requirement for a course without reasoning gates', async () => {
    const module = (await import('@/lib/classroom/learner-completion')) as Record<string, unknown>;
    const isLearnerCourseComplete = module.isLearnerCourseComplete as
      | ((scenes: Scene[], attempts: Map<string, unknown>) => boolean)
      | undefined;

    expect(isLearnerCourseComplete).toBeTypeOf('function');
    if (!isLearnerCourseComplete) return;

    expect(isLearnerCourseComplete([ordinaryQuiz], new Map())).toBe(true);
  });

  it('requires a pass for legacy generated gates that carry a gated grading rubric', async () => {
    const module = (await import('@/lib/classroom/learner-completion')) as Record<string, unknown>;
    const isLearnerCourseComplete = module.isLearnerCourseComplete as
      | ((scenes: Scene[], attempts: Map<string, unknown>) => boolean)
      | undefined;

    expect(isLearnerCourseComplete).toBeTypeOf('function');
    if (!isLearnerCourseComplete) return;

    expect(isLearnerCourseComplete([legacyGateScene], new Map())).toBe(false);
    expect(
      isLearnerCourseComplete(
        [legacyGateScene],
        new Map([
          [
            legacyGateScene.id,
            {
              phase: 'reviewed',
              results: [{ questionId: 'legacy-question', correct: true }],
            },
          ],
        ]),
      ),
    ).toBe(true);
  });

  it('treats a legacy gate id as immutable compatibility identity', async () => {
    const module = (await import('@/lib/classroom/learner-completion')) as Record<string, unknown>;
    const isLearnerCourseComplete = module.isLearnerCourseComplete as
      | ((scenes: Scene[], attempts: Map<string, unknown>) => boolean)
      | undefined;

    expect(isLearnerCourseComplete).toBeTypeOf('function');
    if (!isLearnerCourseComplete) return;

    const revisedPrompt = {
      ...legacyGateScene,
      content: {
        ...legacyGateScene.content,
        questions: [
          {
            ...legacyGateScene.content.questions[0],
            commentPrompt: 'Gated grading rubric: revised wording, same legacy gate id.',
          },
        ],
      },
    } as Scene;

    expect(
      isLearnerCourseComplete(
        [revisedPrompt],
        new Map([
          [
            legacyGateScene.id,
            {
              phase: 'reviewed',
              results: [{ questionId: 'legacy-question', correct: true }],
            },
          ],
        ]),
      ),
    ).toBe(true);
  });
});
