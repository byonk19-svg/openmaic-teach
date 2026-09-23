# Qualified RT delta review: M01 feedback-priority policy

> **Review state:** qualified-RT delta approved and live validation passed. The prior approval remains historical; this decision approves only the candidate hash below.

## Candidate identity

- Stage: `stage-iNchX3Sscq1_`
- Candidate learner-content hash: `1a174fe337897741727c926022d64c89fb7726f0b0575464e4d720c79ecbe054`
- Previously approved learner-content hash: `f24f537c7f0f31df3194a096a87d9b326334ee3cb527b16c22743196c265c394`
- Scope: Case B semantic-grader feedback priority only. Case A/B/C prompts, case facts, calculations, answer analyses, source records, and Case B pass threshold remain unchanged.

## Root cause

The live gate correctly returned `revise` for “Need more information.” It selected missing calculation as the first follow-up, although the approved M01 fixture requires the first teaching move to convert blanket uncertainty into a specific unresolved question and relevant evidence.

Two artifacts controlled that outcome:

1. The shared system prompt in `app/api/quiz-grade/route.ts` directed entirely vague answers toward the first missing rubric element.
2. The persisted `m01-case-b` `reasoningGate.rubric` contained no M01-specific feedback-priority policy.

The persisted rubric participates in the learner-content hash. The shared prompt does not, but it changes clinically consequential feedback behavior and is included in this delta review.

## Exact change

| Artifact | Previous behavior | Candidate behavior |
|---|---|---|
| `app/api/quiz-grade/route.ts` reasoning-gate system prompt | For an entirely vague answer, begin with the first missing evidence/observation. | When multiple deficiencies exist, target the dominant reasoning error; honor any rubric feedback-priority policy; absent a policy, ask for one unresolved question and specific evidence. |
| Persisted Case B rubric | Requires calculation, bounded interpretation, and next evidence, but has no feedback ordering. | Adds an explicit M01 feedback-priority policy: unsupported inference → blanket uncertainty → ignored B2 evidence → arithmetic/input error with otherwise meaningful reasoning → otherwise missing component. |

### Required M01 behavior

| Learner pattern | Required first revision move |
|---|---|
| Unsupported adequacy or causal overclaim | Challenge the unsupported inference. |
| “Need more information.” | “Choose one unresolved question. What specific information would help answer it?” |
| Ignores B2 evidence | Direct attention to the patient report or effort-related observation. |
| Arithmetic/input error with otherwise meaningful reasoning | Address arithmetic/input. |
| Otherwise competent response missing one component | Address that component. |

The policy still requires exactly one focused follow-up and prohibits revealing the model answer.

## Non-live verification

- Added/updated API prompt test and ran 66 focused tests across quiz-grade, gate transaction, and feedback-copy coverage: all passed.
- The prior four live results are preserved in [M01-live-semantic-grader-validation.md](M01-live-semantic-grader-validation.md). No additional provider calls have been made for this candidate.
- The candidate stage remains private. Its description now accurately identifies the delta-review pending state.

## Reviewer decision required

Reviewer: Brianna Yonkin, Texas RT license.

Please review only this delta, its intended priority behavior, and the next four bounded live validation results. A qualified-RT approval must name candidate hash `1a174fe337897741727c926022d64c89fb7726f0b0575464e4d720c79ecbe054` before the four live calls are considered release evidence.

Decision: Brianna Yonkin, Texas RT license, approved candidate hash `1a174fe337897741727c926022d64c89fb7726f0b0575464e4d720c79ecbe054` on 2026-09-16. The bounded four-call live regression validation passed; see [delta live validation](M01-feedback-priority-delta-live-validation.md).
