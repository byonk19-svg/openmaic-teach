---
name: rt-clinical-reasoning
title: "RT Clinical Reasoning"
description: Design native OpenMAIC clinical reasoning courses for practicing ICU respiratory therapists, with short-answer checkpoints before ventilator waveform and physiology simulations. Use for RT case interpretation, measurement validity, and controlled causal experiments.
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

After `generate_scene` creates each checkpoint, inspect that scene with
`read_stage` using `detail:"source"`. Generation may omit `reasoningGate` because
its output schema does not retain unknown fields; the generation brief is not
proof that the gate was persisted. Confirm exactly one `short_answer` question.
If the gate is missing, use `patch_stage` with the explicit `stageId`,
`target:"/scenes/<sceneId>"`, a clear intent, and a `set` operation at
`/content/questions/0/reasoningGate` whose value is the case-specific
`{rubric: string, passThreshold: 0.8}` object. Repair an incorrect question type or
count before attaching the gate. Read the source again to verify the saved
question, rubric, threshold, and gated `analysis`; report any rejected patch as
unfinished integration. This repair enables the question's explanation gate,
not cross-scene navigation control.

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
checks quiz presence, simulation presence/type, populated simulation outline
fields, and adjacent simulations. It does **not** prove checkpoint adjacency,
rubric quality, English-only controls, answer hiding, runtime gating, or clinical
correctness. Validate those separately; do not invent constraint fields to imply
they are enforced.

Report what was inspected and what remains unverified. Clinical QA is not
guaranteed by this skill, generation success, a passing structural check, or a
learner passing the rubric. Flag questionable physiology with the exact claim and
scene evidence for qualified clinical review before calling the course ready.
