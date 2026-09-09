import { z } from 'zod';

export const reasoningGateSchema = z.strictObject({
  rubric: z.string().refine((value) => value.trim().length > 0, 'Rubric must not be blank'),
  passThreshold: z.number().min(0).max(1),
});

export type ReasoningGateConfig = z.infer<typeof reasoningGateSchema>;

export interface ReasoningGateResult {
  decision: 'pass' | 'revise';
  score: number;
  feedback: string;
  followUp?: string;
}

/** Validate without coercing or silently repairing caller input. Throws on invalid input. */
export function validateReasoningGate(input: unknown): ReasoningGateConfig {
  return reasoningGateSchema.parse(input);
}

const resultSchema = z.strictObject({
  decision: z.enum(['pass', 'revise']),
  score: z.number().min(0).max(1),
  feedback: z.string().refine((value) => value.trim().length > 0),
  followUp: z
    .string()
    .refine((value) => value.trim().length > 0)
    .optional(),
});

/** Accepts a decoded JSON object. JSON text must be decoded strictly by the caller. */
export function parseReasoningGateResult(input: unknown, threshold: number): ReasoningGateResult {
  z.number().min(0).max(1).parse(threshold);
  // Some OpenAI-compatible providers serialize an omitted optional field as
  // `null`. For a pass, that has the same safe meaning as omitting followUp;
  // retain strict validation for every other shape, especially revisions.
  const normalized =
    typeof input === 'object' &&
    input !== null &&
    !Array.isArray(input) &&
    (input as { decision?: unknown; followUp?: unknown }).decision === 'pass' &&
    (input as { followUp?: unknown }).followUp === null
      ? (() => {
          const { followUp: _followUp, ...rest } = input as Record<string, unknown>;
          return rest;
        })()
      : input;
  const result = resultSchema.parse(normalized);
  if (result.decision === 'pass') {
    if (result.score < threshold || result.followUp !== undefined) {
      throw new Error('A pass requires the threshold score and no follow-up');
    }
  } else if (
    !result.followUp ||
    /[\r\n\u2028\u2029]/u.test(result.followUp.trim()) ||
    (result.followUp.match(/[?？]/gu)?.length ?? 0) > 1
  ) {
    throw new Error('A revision requires one nonempty, single-line follow-up');
  }
  return result;
}
