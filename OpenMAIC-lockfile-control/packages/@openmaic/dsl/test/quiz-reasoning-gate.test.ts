import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';
import { generateSchema } from '../scripts/gen-schema.mjs';

const schema = generateSchema('SerializedScene');
const validate = new Ajv({ strict: false }).compile({
  ...schema,
  $ref: '#/definitions/QuizQuestion',
});
const question = { id: 'q1', type: 'short_answer', question: 'Explain both causes.' };

describe('QuizQuestion reasoningGate schema', () => {
  it('keeps ordinary questions valid and preserves an optional gate', () => {
    expect(validate(question)).toBe(true);
    expect(
      validate({
        ...question,
        reasoningGate: { rubric: 'Explain both causes.', passThreshold: 0.8 },
      }),
    ).toBe(true);
  });
  it.each([0, 1])('accepts threshold boundary %s', (passThreshold) => {
    expect(validate({ ...question, reasoningGate: { rubric: 'Explain.', passThreshold } })).toBe(
      true,
    );
  });
  it.each([
    null,
    {},
    { rubric: '', passThreshold: 0.8 },
    { rubric: ' \n ', passThreshold: 0.8 },
    { rubric: 'Explain.', passThreshold: -0.01 },
    { rubric: 'Explain.', passThreshold: 1.01 },
    { rubric: 'Explain.', passThreshold: '0.8' },
    { rubric: 'Explain.', passThreshold: 0.8, extra: true },
  ])('rejects invalid gate %j', (reasoningGate) => {
    expect(validate({ ...question, reasoningGate })).toBe(false);
  });
});
