# Module Authoring Standard

**Version:** 0.1 · 2026-09-15
**Type:** product requirements proposed for adoption; clinical claims need the separate review process.

## 1. Start with the change in reasoning

Complete this sentence before writing lesson content:

> “Before this module, the learner is likely to ____. After it, the learner should use ____ to distinguish ____ from ____.”

Choose two or three observable primary objectives. Each must be taught, used in a worked example, and assessed in a fresh exercise. Supporting exposure is labeled separately and must not become a hidden pass requirement.

The [curriculum](CURRICULUM_INTENT.md) owns scope. The [M01 exemplar](examples/M01_GOLD_STANDARD.md) demonstrates specificity, not a compulsory screen layout for every module.

## 2. Author the learning arc

| Element | Required content | Common failure |
|---|---|---|
| Orientation | A recognizable bedside question and a plain-language purpose. | A long table of contents or a diagnosis that spoils the case. |
| Simple visual | One relationship, clear labels, a text equivalent, and stated simplifications. | Decorative graphics, invented physiology, or unexplained arrows. |
| Worked example | A fixed case, a small prediction pause, and a concise explanatory walkthrough. | Either a lecture with no use, or a puzzle with no instruction. |
| Independent exercise | A genuinely new evidence configuration and an answerable, focused prompt. | A renamed worked example or a new prerequisite never taught. |
| Feedback | Recognition of what is correct, the specific gap, and one next question. | “Incorrect,” a model-answer dump, or exact-word matching. |
| Transfer/revisit | A meaningful variation requiring the same distinction. | Immediate repetition labeled as independent retrieval. |

The module may use fewer or more scenes as needed. A concise lesson is a design goal, not a reason to omit necessary explanation. Default to short, interruptible segments; timing estimates are not guarantees.

## 3. Write the learner-visible evidence before the answer key

For every case, specify the source, unit, time interval, and relevant conditions of each consequential value. Distinguish a value that was not supplied from one that was assessed and found absent.

Use provenance labels when they improve interpretation: observed, set, measured, calculated, and modeled. A patient-reported symptom is explicitly labeled patient report. These categories can overlap; a display may process a sensor signal and a calculation may consume measurements. Do not turn the taxonomy into a compulsory labeling exercise.

The grader receives the same clinical facts as the learner, plus the approved rubric. Author notes may explain the rubric; they may not add hidden diagnoses, measurements, normal findings, or reasons required to pass.

A finding obtained after the learner's attempt is new evidence, not evidence the learner should have guessed earlier. Update the case version or stage explicitly.

## 4. Make calculations auditable

Show the equation, variables, units, time window, rounding, and assumptions. Verify the arithmetic independently. Distinguish a calculated quantity from a separately displayed or measured one.

When using rate times mean breath volume, state that the rate and mean cover the same counted breaths and interval. Do not multiply two arbitrary instantaneous display numbers and assume their result equals the device's differently averaged minute-volume display.

Correct arithmetic cannot offset the module's central consequential reasoning error. A calculation mistake and an interpretation mistake receive different feedback.

No unexplained normal-range shading, green patient-status indicators, or action recommendations may be inferred from a calculation merely because the result is correct.

## 5. Use simulations only when they teach something essential

Default to a static visual or authored before/after case. A simulator needs a reviewed model, declared inputs and outputs, units, assumptions, operating limits, a fixed baseline, and reproducible reset behavior.

Changing one input may change multiple outputs only when their dependency is actually represented in the model. Do not silently vary unrelated mechanics, effort, oxygenation, circulation, or medication effects. A prerecorded case transition is not a patient-specific prediction.

Illustrative traces are labeled illustrative; computed traces are modeled. Neither is a measured patient waveform. No invented “synchrony,” “lung health,” “adequacy,” or “competence” percentage.

A visual change is not automatically a clinical improvement. Ask the learner to interpret the supplied response and remaining uncertainties.

## 6. Keep the gate fair and focused

The prompt tells the learner the kind of reasoning being assessed. Use a few explicit criteria, accepted alternatives, and consequential unsupported conclusions. A two-sentence response can be complete; length is not quality.

Accept plain language, equivalent calculations, sensible abbreviations, and clinically defensible alternatives. Do not penalize spelling unless the meaning becomes unclear. Do not require a full differential, complete plan, or every assessment in a broad guideline unless the prompt explicitly asks and the module has taught that task.

“Insufficient information” earns credit only when linked to a real missing fact and a relevant next assessment. Conversely, when the case does provide useful evidence, the learner must use it. Unknown does not mean normal, abnormal, safe, or useless.

Keep educational judgments separate from numeric grading machinery. Do not silently tune existing thresholds or alter gate architecture to satisfy this document; surface a concrete mismatch for authorized repair.

## 7. Give feedback that responds to the actual answer

| Situation | Feedback behavior |
|---|---|
| Wrong inputs or arithmetic. | Focus on the inputs or calculation; preserve credit for sound interpretation. |
| Correct number, unsupported conclusion. | Acknowledge the number; ask for the evidence behind that conclusion. |
| One of two questions addressed. | Name the resolved question and ask about the remaining one. |
| Vague request for more data. | Ask which uncertainty the proposed data would resolve. |
| Reasonable alternative. | Accept it when it accounts for the supplied evidence. |
| Contradictory answer. | Ask the learner to reconcile the consequential contradiction. |
| Grader output is malformed or unavailable. | Preserve the response and report an evaluation problem; do not label the learner wrong or grant a pass. |

Do not reveal unrelated answer components after the first mistake. Do not withhold teaching indefinitely either. Use existing help/scaffold behavior; after explanation exposure, treat subsequent success as assisted learning. If the current platform lacks the needed help path, report that specific limitation instead of inventing a bypass or rebuilding the gate system.

In a scenario with an immediate threat, communicate the safety issue promptly. No-spoiler behavior must never teach delayed emergency recognition or escalation.

## 8. Make the interface support interpretation

Keep the evidence visible while the learner answers. Use progressive disclosure for explanations, not for essential facts required to answer the current prompt. Draft status is visible without overwhelming the lesson.

Use readable type, clear units, keyboard access, sufficient contrast, and a text equivalent for every diagram. Do not rely on color alone. Captions, alt text, headings, image labels, hints, and narration must follow the same reveal rules as the main text. Accessible descriptions must convey the visible evidence without leaking a hidden answer.

Do not add auto-advancing timers, speed penalties, or required long essays. Preserve existing supported save/resume behavior; do not claim it works without verification.

## 9. Submit a complete authoring package

Use [MODULE_SPEC.md](templates/MODULE_SPEC.md). Include the teaching copy and actual learner prompts, not just a promise to write them. Include the independent-case facts, bounded rubric, feedback fixtures, transfer plan, claim/source map, and QA limitations.

Authoring completion is not clinical approval. A passed software test is not evidence that the lesson teaches accurately or that a human RT reviewed it.
