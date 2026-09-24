import { describe, expect, it } from 'vitest';
import {
  REASONING_CHECKPOINT_GUIDANCE,
  shortAnswerAccessibleName,
  shouldActivateChoiceWithSpace,
} from '@/components/scene-renderers/quiz-view';

describe('reasoning checkpoint guidance', () => {
  it('does not require a mechanism when the objective only requires evidence and assessment', () => {
    expect(REASONING_CHECKPOINT_GUIDANCE).toContain('interpretation');
    expect(REASONING_CHECKPOINT_GUIDANCE).toContain('supporting evidence');
    expect(REASONING_CHECKPOINT_GUIDANCE).toContain('remaining uncertainty');
    expect(REASONING_CHECKPOINT_GUIDANCE).toContain('next assessment or evidence');
    expect(REASONING_CHECKPOINT_GUIDANCE).not.toMatch(/mechanism/i);
  });
});

describe('choice keyboard activation', () => {
  it('handles Space without handling Enter twice', () => {
    expect(shouldActivateChoiceWithSpace(' ')).toBe(true);
    expect(shouldActivateChoiceWithSpace('Enter')).toBe(false);
  });
});

describe('short-answer accessibility', () => {
  it('derives a programmatic name from the learner-visible question without adding visible copy', () => {
    expect(shortAnswerAccessibleName('Respond in three parts.')).toBe(
      'Your answer for: Respond in three parts.',
    );
  });
});
