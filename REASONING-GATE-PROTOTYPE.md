# Reasoning Gate prototype

Local branch: `codex/rt-reasoning-gate`, based on checkpoint `5ccf0e53`.

## Contract

Opt in on exactly one native `short_answer` question:

```json
"reasoningGate": {
  "rubric": "Require case evidence, its mechanism, and a specific next assessment with what to observe. Reject vague reassessment.",
  "passThreshold": 0.8
}
```

The endpoint returns explicit `pass` or `revise`. A pass also needs the configured threshold. Invalid JSON, ambiguous output, network/provider errors, and failed persistence never unlock review. Ordinary quizzes retain their existing behavior and fallback.

Gated answers remain drafts until pass. Revision feedback and follow-up are transient: reload restores the saved answer but no follow-up. A successful review stores the existing result shape with an additive question/rubric binding. A changed question/rubric or an old ordinary review cannot restore a gated pass. There is no storage migration or revision-attempt limit.

This locks the question analysis in normal learner UI, not other scenes, exports, developer tools, or a hostile client. Grading is model-based and is not a guarantee of clinical truth. The RT skill explicitly documents the navigation limitation.

Passed reviews are conditionally appended against the exact saved answer's session and sequence number. A stale grading response cannot roll over into another tab's newer retry. An opt-in draft flag allows gated revisions over unfinished ordinary submissions; ordinary quiz phase ordering is unchanged. These are request-time guards, not new persisted schema fields.

## Live fixture

`tests/fixtures/reasoning-gate-prototype.json` creates only a separate disposable two-scene course (one gate and one ordinary quiz).

Local classroom: http://localhost:3001/classroom/stage-reasoning-gate-prototype-20260906

Observed with the configured live grader:

- Blank submission disabled; explanation not rendered.
- `I would reassess the patient and ventilator.` returned revise and kept analysis hidden.
- Initial live follow-up was too broad. The generic prompt was tightened to select one missing rubric element, then retested.
- Retest follow-up: `What exact abnormality do you observe on the inspiratory pressure-time tracing?`
- Reload restored the vague answer with no prior follow-up or analysis.
- A revised answer naming scooping, demand/flow mismatch, a specific assessment/flow test and held-constant variables passed. Answer-specific feedback and analysis appeared only afterward.
- Reload retained the passed review.
- Ordinary quiz still showed its cover, required an answer, graded the choice, and revealed its normal score and analysis.

No V1/V2 document was edited. No credentials, Docker settings, volumes, or database schema were changed. Fixture creation and its learner-attempt records are the only new course/runtime data from this validation.

## Automated validation

- Final focused integrated suite: 300 tests passed across 13 files with process-local `NODE_OPTIONS=--no-experimental-global-navigator` (all `tests/quiz`, grading route/parser, built-in skills, RT constraints, and Workbench patch integration). The normal-environment 254-test focused suite had also passed before the checkpoint comparison.
- DSL schema tests: 11 passed.
- Application `tsc --noEmit -p tsconfig.build.json`: passed.
- Focused ESLint: passed; final checks recorded at handoff.
- The four historical runtime timeouts were compared individually against detached checkpoint `5ccf0e53`, using the same installed dependencies, Node v24.13.0, one worker, no file parallelism, and 15-second test timeouts. All four timed out on BOTH checkouts; none was feature-only.

### Concurrency comparison

| Exact test name in `tests/quiz/runtime.test.ts` | Feature | Checkpoint | Classification |
| --- | --- | --- | --- |
| recovers when another tab wins the same session create race without Web Locks | 15s timeout | 15s timeout | Pre-existing/environmental |
| deduplicates concurrent identical lifecycle writes without Web Locks | 15s timeout | 15s timeout | Pre-existing/environmental |
| rolls over when another tab completes after this tab observed active | 15s timeout | 15s timeout | Pre-existing/environmental |
| reuses one active retry for concurrent retry requests across tabs | 15s timeout | 15s timeout | Pre-existing/environmental |

Node 24 exposes `navigator.locks`. These tests coordinate two simulated callers with barriers intended for the no-Web-Locks path; a real global lock serializes them before both can reach the barrier. With the process-local environment `NODE_OPTIONS=--no-experimental-global-navigator`, the entire 27-test runtime file passed on BOTH checkouts (feature 443ms test time; checkpoint 1.42s). Passing this flag only to the launcher did not reliably propagate it to Vitest workers; the diagnostic used NODE_OPTIONS. No test, runtime setting, or global Node configuration was changed to mask the issue.

The detached comparison checkout is at `C:\Users\byonk\AppData\Local\Temp\openmaic-checkpoint-5ccf0e53-compare`. It reuses the installed node_modules via a junction; no secrets or application environment files were copied and no saved-course/database content was accessed during comparison. It is not part of the feature commit.

No full production build or clinical-model validation is claimed. No push was performed.

## Final acceptance pass before checkpoint

- Blank input: submit disabled.
- Vague reassessment: revise; one focused waveform question; no analysis.
- Partial waveform-only answer: acknowledged the correct observation, then asked for the missing mechanism; no analysis.
- Confidently incorrect normal/comfortable claim: revise; no analysis.
- Reload of that unfinished attempt: saved incorrect answer restored; follow-up absent; analysis absent.
- A specific adequate revision submitted after reload passed and revealed the explanation with answer-specific feedback.
- Ordinary quiz retains normal cover, choice selection, scoring, and review behavior.

Known limitation for a future generated V3: classroom navigation and subsequent simulations are NOT locked by this question-level gate. A three-scene generated course can test instructional sequencing, but must not claim that its simulation is technically inaccessible until the first gate passes. That is explicitly outside this prototype.
