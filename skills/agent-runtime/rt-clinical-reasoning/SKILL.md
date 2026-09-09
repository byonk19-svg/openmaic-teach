---
name: rt-clinical-reasoning
description: Design native OpenMAIC clinical reasoning courses for practicing ICU respiratory therapists, with short-answer checkpoints before ventilator waveform and physiology simulations. Use for RT case interpretation, measurement validity, and controlled causal experiments.
metadata:
  title: "RT Clinical Reasoning"
---

# RT clinical reasoning

Teach a practicing ICU RT. Use clinically precise English at an experienced
clinician's level. All learner-facing content and controls must be English-only,
including navigation, buttons, axes, units, legends, presets, tooltips, annotations,
feedback, accessibility labels, narration, and retry/reset states. Audit inherited
widget defaults as well as authored text.

## Plan and generate a native course

Use `create_stage`, `set_roster`, and `generate_scene` for native OpenMAIC scenes.
Carry this contract into each scene's generation brief and relevant `keyPoints`;
the page generator needs the constraints, not just the course planner. Use
`stage-dsl` before unfamiliar `read_stage` or `patch_stage` operations.

An optional opening slide establishes patient observations and the clinical
question. Before **every simulation**, place a native `quiz` scene containing
exactly one `short_answer` question. The sequence is observations, committed
reasoning, successful checkpoint, experiment, then evidence-based debrief.
Use neutral titles such as "Interpret the observations" and "Test your prediction".

Before reasoning passes, titles, annotations, presets, tooltips, thumbnails,
narration, and other visible surfaces must not reveal the diagnosis or suggested
intervention. Present raw observations and neutral control names. Keep the
case-specific answer and rationale in grading/post-gate material; do not copy them
into the question, scene title, or pre-gate feedback. A failed attempt requests
the missing reasoning component without supplying the answer.

Use the native question-level `reasoningGate` object with exactly
`{rubric: string, passThreshold: 0.8}`. This belongs on the question, not the quiz,
widget, or outline constraint file. Do not substitute an iframe text box,
multiple-choice question, acknowledgement button, or self-reported confidence.
The numeric threshold is internal gate evaluation, not a learner score.

For every new checkpoint, pass `generate_scene` both typed fields: `quizConfig`
with `{questionCount: 1, difficulty: "hard", questionTypes: ["text"]}`, and the
case-specific top-level `reasoningGate`. The generator carries the gate
into the question prompt as an authoritative authoring constraint, then the host
attaches the exact typed object after generated content passes structural checks.
It rejects the complete generated quiz before persistence unless the final content
contains exactly one `short_answer` question with the exact rubric and threshold.
If it returns `reasoning-gate-revise`, regenerate the
complete checkpoint using the listed violations; do not patch a newly generated
checkpoint into apparent compliance.

After `generate_scene` creates each checkpoint, inspect that scene with
`read_stage` using `detail:"source"`. Confirm exactly one `short_answer` question,
the exact two-field gate, and a non-empty gated `analysis`. Treat older courses
without this typed generation contract as legacy content requiring separate review;
do not use post-generation patching as proof that new checkpoint generation works.

The following is a native quiz-content example for a measurement-validity case;
adapt its observations and rubric together for each case:

```json
{
  "type": "quiz",
  "questions": [
    {
      "id": "measurement-reasoning",
      "type": "short_answer",
      "question": "During an end-expiratory occlusion, the tracing shows continued expiratory muscle activity and an unstable pressure plateau. Interpret these observations, explain the mechanism, and specify your next assessment and the finding you would use to judge it.",
      "reasoningGate": {
        "rubric": "Require all three components: (1) interpret the continued expiratory muscle activity and unstable plateau as evidence that this occlusion does not establish a valid static end-expiratory pressure; (2) explain that active expiratory effort contributes muscle-generated pressure, so the displayed value cannot be attributed solely to passive respiratory-system recoil; (3) specify assessment of expiratory effort and plateau stability before repeating the maneuver under passive conditions, and use absence of expiratory effort plus a stable plateau as the stated validity criteria. Accept equivalent clinically specific wording. Reject diagnosis labels alone, generic reassess or monitor responses, repeating the hold without checking effort, or treating the displayed pressure as a valid static measurement. Missing any component or contradicting these validity conditions must remain below 0.8; verbosity cannot compensate.",
        "passThreshold": 0.8
      }
    }
  ]
}
```

For every checkpoint, write a specific rubric requiring interpretation evidence
from that case, a physiological mechanism connecting the evidence to the claim,
and a specific assessment/intervention with an observable decision criterion.
Reject vague "reassess", "monitor", or "adjust settings" without specifying what,
why, and which finding would support or change the decision. Require all three
components; a diagnosis or intervention guessed correctly is insufficient.

The native gate locks that quiz question's analysis on empty, revising, pending,
or failed-to-grade attempts. It does not lock classroom navigation or later
interactive scenes. Place the canonical explanation in the gated question's
analysis, not in an unguarded later page. Do not promise that simulations are
access-controlled: sequencing is instructional only in this prototype. Verify
revisit and reload behavior and report unsupported navigation restrictions;
a skill alone cannot enforce them. Do not claim a working gate from prose alone.

Default to descriptive feedback without scores, achievements, badges, streaks,
leaderboards, countdowns, or artificial urgency. Introduce timed or scored training
only when explicitly requested, with its purpose clear to the learner.

## Controlled causal experiments

Each simulation changes one independent variable. Populate `widgetOutline.concept`
and `widgetOutline.keyVariables` with the mechanism under study and the actual
input with units. State the prediction before manipulation and compare the result
against the same baseline. Derived outputs may change through the declared model;
they are not extra independent inputs.

Hold unrelated mechanics, respiratory drive, comfort, and ventilator settings
fixed. For example, a timing experiment must not silently change resistance,
compliance, drive, sedation/comfort, or other settings to make the tracing improve.
Expose the assumptions and fixed values so the comparison can be interpreted.
Label any preset that changes multiple independent inputs as a **bundle**, list
its changes, and make no single-variable causal claim about its result.

Maintain patient state across checkpoint, experiment, debrief, revisit, and
resume. Preserve identity, baseline, settings, effort state, current variable, and
observations unless an explicitly described transition changes them. Reset must
restore the declared experiment baseline and derived outputs together, with clear
feedback; it must not silently create a new patient or preserve stale results.
Changing the clinical case requires fresh reasoning for that case.

## Linked scenario continuity

When a downstream interactive simulation represents the **same patient and clinical state**
as an earlier checkpoint, pass `generate_scene` an explicit `continuity` contract. Do not rely
on repeating prose in `brief` or `materialFacts`. Use stable, concise canonical names for
baseline and variable keys across the contract and `widgetOutline`. The contract identifies
the earlier source page, the baseline values that must be implemented, the variables that stay
fixed, model assumptions that may not be contradicted, and the abnormal finding that must still
be present before the learner changes a control.

Do not attach a continuity contract to unrelated cases. If the patient, clinical state, or
baseline intentionally changes, use a new `scenarioId` and state the transition explicitly.
Never reuse a prior scenario ID to imply continuity that does not exist.

For example, the linked simulation call for a previously established flow-demand case should
carry a shape like this (adapt the actual facts to the case):

```json
{
  "stageId": "stage-example",
  "order": 2,
  "title": "Test one ventilator variable",
  "type": "interactive",
  "widgetType": "simulation",
  "widgetOutline": {
    "concept": "Effect of set inspiratory flow on the established pressure waveform",
    "keyVariables": ["flow (L/min)"]
  },
  "brief": "Reproduce the established baseline first, then let the learner vary set inspiratory flow only.",
  "continuity": {
    "scenarioId": "flow-demand-case",
    "sourceSceneOrder": 1,
    "baseline": [
      { "name": "flow", "value": 60, "unit": "L/min" },
      { "name": "VT", "value": 450, "unit": "mL" },
      { "name": "RR", "value": 20, "unit": "/min" },
      { "name": "PEEP", "value": 8, "unit": "cm H2O" }
    ],
    "fixedVariables": ["VT", "RR", "PEEP", "compliance", "resistance", "respiratory drive", "sedation", "comfort"],
    "assumptions": ["patient inspiratory flow demand exceeds 60 L/min at baseline"],
    "expectedBaselineFindings": ["inspiratory pressure scooping remains present at the 60 L/min baseline"]
  }
}
```

The application requires the generated `widget-config` to echo the continuity metadata and
checks it before persistence. A semantic check evaluates consistency with the declared
contract, not whether the contract is clinically correct. If `generate_scene` returns a
continuity violation, use its listed violations to regenerate the complete page; do not patch
clinical or model values silently after generation. Inspect the persisted source afterward and
verify that baseline, controls, presets, calculations, assumptions, and baseline findings agree.

## Measurement and model honesty

Distinguish **set** inputs, **calculated** values (formula and source inputs),
**modeled** outputs (simulation assumptions), and **measured** observations
(measurement method and validity conditions). Label units and provenance where
the value is used. A modeled waveform or pressure is not a measured patient value.
Every percentage needs a defined quantity, denominator/reference, and calculation;
omit undefined percentages and invented precision.

State measurement assumptions before asking the learner to interpret a value.
Active expiratory effort invalidates a static end-expiratory occlusion estimate:
do not equate the resulting pressure with passive static pressure or accept that
interpretation in the rubric. Mark invalid measurements as invalid, retain the
observed evidence, and teach the specific assessment needed to establish valid
conditions. Check case-specific assumptions against supplied clinical sources;
identify unresolved evidence instead of inventing normal ranges or guarantees.

## Verify before handoff

Use `list_scenes` and `read_stage` to inspect the generated sequence, quiz source,
widget source, visible text, and actions. Follow paginated reads to completion.
Check each simulation's preceding single-question checkpoint and its rubric,
threshold, answer visibility, failure/retry behavior, and patient continuity.
Inspect every initial, tooltip, preset, reset, and post-gate state for English
controls, answer leakage, causal confounding, and measurement-label errors.

The sibling `outline-constraints.json` uses only existing structural fields. It
checks quiz presence, permits only the simulation widget type, checks populated
simulation outline fields when present, and rejects adjacent simulations. It does **not** prove checkpoint adjacency,
rubric quality, English-only controls, answer hiding, runtime gating, or clinical
correctness. Validate those separately; do not invent constraint fields to imply
they are enforced.

Report what was inspected and what remains unverified. Clinical QA is not
guaranteed by this skill, generation success, a passing structural check, or a
learner passing the rubric. Flag questionable physiology with the exact claim and
scene evidence for qualified clinical review before calling the course ready.
