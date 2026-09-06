# Clinical Continuity Gate prototype

Branch: `codex/clinical-continuity-gate`, based on reasoning-gate checkpoint `16d5d4da`.

## Architecture

`generate_scene` accepts an optional generic continuity contract for a linked interactive simulation:

- stable `scenarioId` and earlier `sourceSceneOrder`;
- named scalar baseline facts with optional units;
- fixed variables;
- assumptions;
- expected baseline findings.

Continuity is restricted to interactive simulations in this prototype. The existing scene-content AI callback is wrapped so the serialized contract is passed as an explicit authoritative prompt block. Ordinary generation receives the original prompts and performs no extra evaluation.

The generated page must echo a machine-readable `widget-config.continuity` manifest and identify all `changingVariables`. Before action generation or persistence:

1. Deterministic validation compares scenario identity, source-page existence, baseline values/units, actual control defaults, fixed variables, presets, assumptions, and expected findings.
2. A structured semantic evaluator compares the complete bounded HTML, widget config, scene brief, and continuity contract. It returns strict `pass | revise` JSON with violations. Generated HTML/config is treated as untrusted content.

Missing metadata, mismatches, semantic `revise`, malformed/duplicate JSON, provider errors, timeout, oversize input, or cancellation all fail closed. Violations are returned to the Workbench agent. The application does not silently repair generated values.

No persisted schema, core DSL, database migration, Docker setting, provider credential, or Pi dependency changed. The continuity manifest uses the existing app-specific `WidgetConfigBase` extension point.

## Deterministic and semantic validation

- A control must use the same canonical name as a declared baseline fact.
- Its default scalar and unit must match the contract exactly.
- Every actual control must be listed in `changingVariables`, and every listed changing variable must be an actual control.
- A fixed variable cannot be an adjustable control or a preset change.
- Required assumptions and baseline findings must be carried into the manifest.
- Semantic evaluation checks generated code and visible baseline behavior for contradictions the manifest alone cannot prove.
- Diagnostics include the actual and expected control defaults/units.

The gate checks consistency with a caller-authored contract. It does not establish that the contract is clinically true, and it does not derive baseline facts from the source scene. `sourceSceneOrder` is checked for existence and ordering only.

## Manual V4 fixture with live evaluator

The opted-in test `tests/agent-runtime/continuity-gate-v4.live.test.ts` exercises the actual `generate_scene` pre-persistence path using an in-memory two-scene course and the configured live evaluator.

Contradictory generated HTML echoed the manifest but set `patientDemandLMin = 60` with baseline flow 60. The live evaluator returned `revise` because:

- visible text said no pressure scooping at the 60 L/min baseline;
- demand equaled baseline despite the assumption that demand exceeded it;
- the calculated baseline pressure scoop was zero.

Only source Scene A remained in the store.

The first nominally consistent fixture was also rejected because its slider was not wired into the mismatch calculation. After correcting the fixture so the flow control updates the modeled mismatch while demand remains 80 L/min, the live evaluator passed it and `generate_scene` persisted Scene B. This validates consistency enforcement, not ventilator-model correctness.

## Real Workbench V4 run

Session: `ccd03c4f-b311-4850-91e9-f9af47896d39`

Disposable stage: `stage-3M1XVS9x3v` (`Clinical Continuity V4 — Workbench Test`)

- Scene 1 persisted.
- Scene 2 was generated four times.
- All four attempts were rejected deterministically before persistence because the generated `flow` control default did not match the declared 60 L/min baseline.
- The Workbench agent received the violation and regenerated the complete page each time.
- No Scene 2 or contradictory simulation was persisted; the stage contains one scene.
- The run then stopped because the OpenAI API account reported no credits remaining.
- Scene 1's unrepaired generated draft contains three questions instead of the requested single gated short answer because the session ended before its final repair/verification steps.

After this run, the diagnostic was improved to report actual versus expected values. A second real Workbench attempt was not made because it would require additional OpenAI credits.

## Validation and boundaries

Final validation:

- `353/353` focused tests passed across 15 files, including the complete existing reasoning-gate suite, ordinary generation, continuity schema/deterministic/semantic checks, generation-tool persistence boundaries, skill loading, and stage patch validation.
- The opted-in live V4 semantic test passed `1/1` before API credits were exhausted.
- `tsc --noEmit -p tsconfig.build.json` passed.
- Scoped ESLint passed.
- Prettier and `git diff --check` passed.
- The shared skill validator reported `Skill is valid!`.
- No full production build was run; this prototype was exercised through the native development server and real Workbench generation path.

Known limitations:

- model-based semantic evaluation can produce false positives or false negatives;
- the contract is caller-authored and source-page existence is checked, but source prose is not independently extracted into the contract;
- continuity is implemented only for interactive simulations;
- generated HTML above 120,000 characters fails closed;
- no cross-scene learner navigation gate;
- no clinical truth or medical-model certification;
- the real Workbench passing regeneration remains unverified until API credits are available.

V1, V2, V3, and the reasoning-gate fixture were not edited. Their stored scene hashes were checked before and after the V4 run.
