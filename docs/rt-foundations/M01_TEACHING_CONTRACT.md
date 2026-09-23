# M01 Teaching Contract: What Do We Actually Know?

**Status:** qualified RT approval includes the feedback-priority delta at `1a174fe337897741727c926022d64c89fb7726f0b0575464e4d720c79ecbe054`; not clinical-ready pending manual accessibility checks.
**Content version:** 0.2, 2026-09-16.
**Actual course/artifact ID:** `stage-iNchX3Sscq1_`. The original four-scene stage remains the failed prototype; this six-scene stage is the review target.

## Identity and scope

| Field | Value |
|---|---|
| Curriculum module | M01 |
| Intended learner | Practicing adult acute/ICU RT |
| Intended reasoning change | From treating a trustworthy number as a complete assessment to making the strongest conclusion the evidence supports. |
| Central bedside question | What does this snapshot establish, what remains unresolved, and what evidence would change that? |
| Tempting overclaim | “The calculated minute ventilation is 11.2 L/min, so CO₂ clearance is adequate and the patient’s breathing effort is acceptable.” |
| Correct bounded conclusion | A valid calculation establishes exhaled gas moved per minute during its stated interval. It does not, by itself, establish CO2 clearance or breathing effort/experience. |
| Explicit exclusions | Treatment settings, full differential diagnosis, full acid-base analysis, dead-space mathematics, waveform diagnosis, hidden measurement defects in the main cases. |

## Primary objectives

| ID | Learner behavior | Where taught | Worked use | Independent assessment |
|---|---|---|---|---|
| M01-O1 | Select valid, time-matched total-rate and mean exhaled-volume inputs to calculate exhaled minute volume. | Scene 2–3 | Case A: 28 × 0.40 = 11.2 L/min | Cases B1/B2: 20 × 0.45 = 9.0 L/min |
| M01-O2 | Separate a calculation from conclusions about CO2 clearance and breathing effort/experience. | Scene 2–3 | Case A limits both conclusions | Case B uses new patient evidence without overclaiming cause or quantified work. |
| M01-O3 | Name specific evidence that would address the unresolved CO2 and breathing questions. | Scene 3 | Supported explanation | Case B gate and Case C transfer |

Supporting exposure, not a graded vocabulary test: observed, set, measured, calculated, and modeled provenance; time/context applicability.

## Locked six-part flow

| Scene/function | Learner-visible evidence and action | Reveal timing | Objective |
|---|---|---|---|
| 1. Orient | Prompt: “When a displayed value looks reassuring, what else would you want to know before describing the patient’s breathing as acceptable?” | Non-graded; welcome any sensible bedside consideration without completing the answer. | Activation |
| 2. Explain visually | `PATIENT + RESPIRATORY SUPPORT` connects three questions: **gas moved per minute**, **CO2 clearance**, **breathing effort/experience**. | Instructional only. Evidence answering one question does not automatically answer the others. | O2 |
| 3. Work Case A | Set rate 16/min; total rate 28/min; mean exhaled tidal volume 0.40 L from the same 60-second interval; no current CO2/pH or effort assessment. Prediction: select the rate and calculate; then choose what 11.2 L/min establishes. | Both pauses are supported practice. Reveal that 11.2 L/min is calculated exhaled minute volume only; it establishes neither adequacy conclusion. | O1–O3 |
| 4. Independent Case B | B1 and B2 each contain 20 reliably counted breaths and mean exhaled tidal volume 0.45 L in the same minute. B2 additionally supplies reliable communicated breathing difficulty and visible inspiratory neck-muscle recruitment. | No answer/explanation before submission. | O1–O3 |
| 5. Revise and synthesize | Existing reasoning-gate states: initial answer, one targeted follow-up, revision, then synthesis. | First response is independent; revision is assisted learning. A competent first response receives concise affirmation and synthesis without a fake revision. | O1–O3 |
| 6. Transfer Case C | Current rate/volume calculation remains valid, while PaCO2/pH is from before a meaningful support change. | Teach that historical evidence remains legitimate but has limited current applicability. | O2–O3 |

## Scene 2 visual specification

```
                        PATIENT + RESPIRATORY SUPPORT
                               |
        +----------------------+----------------------+
        |                      |                      |
 CALCULATED EXHALED         CO2 QUESTION      BREATHING EFFORT/EXPERIENCE
 MINUTE VOLUME              Relevant gas data Bedside assessment and report
 “Gas moved per minute”     Time and context  Qualitative unless measured
```

Text equivalent: the first branch introduces **calculated exhaled minute volume**, called **gas moved per minute** in this lesson, as calculated exhaled volume over time. The second asks about CO2 clearance in physiological, support, and time context. The third asks about observed breathing and patient experience. They are related questions, not interchangeable measurements. Do not display green/red adequacy badges.

## Case A: supported worked example

The inputs are valid and cover the same 60-second interval. There is no hidden leak, artifact, or timestamp mismatch.

1. **Prediction:** Which supplied rate belongs in the calculation, and what exhaled minute volume does it produce?
2. **Reveal:** `28 breaths/min × 0.40 L/breath = 11.2 L/min`; the total rate describes the counted breaths in this interval, not the programmed rate.
3. **Prediction:** Does this establish adequate CO2 clearance, acceptable breathing effort, both, or neither?
4. **Reveal:** neither adequacy conclusion is established. Current CO2/pH data and effort/experience assessment are not supplied.
5. Ask what relevant evidence would help each remaining question.

## Case B: independent retrieval gate

### Learner-visible facts

| Fact | B1 | B2 |
|---|---|---|
| Set rate | 16 breaths/min | 16 breaths/min |
| Total rate | 20 reliably counted breaths/min | 20 reliably counted breaths/min |
| Mean exhaled tidal volume | 0.45 L/breath, same exact minute | 0.45 L/breath, same exact minute |
| CO2/pH | Not supplied | Not supplied |
| Breathing evidence | No assessment supplied | Patient writes “Breathing feels hard right now”; visible inspiratory neck-muscle recruitment |
| Not supplied | Diagnosis, waveform, pressure, airway examination, quantified muscle effort | Same |

**Exact prompt:**

> Respond in three parts.
> **1. Calculate.** Calculate exhaled minute volume for each snapshot using the supplied interval inputs. Show calculation and units.
> **2. Interpret.** State separately what each snapshot supports about CO2 clearance and about the patient’s breathing experience and effort-related observations. Identify what is established and unresolved.
> **3. Identify next evidence.** Name one specific assessment or evidence source for the remaining CO2 question and one for the breathing assessment. Briefly explain what each would clarify.

### Assessment contract

| Criterion | Required | Not required |
|---|---|---|
| Calculation | Correct valid calculation: 20 × 0.45 = 9.0 L/min for each snapshot. | Particular notation. |
| Bounded interpretation | Neither establishes adequate CO2 clearance. B1 lacks breathing assessment. B2 includes meaningful report and effort-related observation, without proving a cause or measured work. | Diagnosis, treatment plan, dead-space equation, full differential. |
| Next evidence | Relevant current CO2/gas information in time/support context and a focused bedside breathing assessment/report clarification. | A mandatory test name or specialized monitor. |

Correct arithmetic never offsets an unsupported adequacy claim. “Need more information” alone is insufficient. Competent alternatives pass without wording matching.

### Targeted feedback examples

| Learner response | Focused next feedback |
|---|---|
| Uses set rate | Which supplied rate represents the breaths occurring during the calculation interval? |
| Calculates correctly and says clearance/effort are acceptable | Your calculation is correct. Which supplied evidence supports your conclusion about breathing effort? |
| Addresses effort but assumes CO2 clearance | You have addressed effort. What evidence supports the remaining conclusion about CO2 clearance? |
| Says only “need more information” | Choose one unresolved question. What specific information would help answer it? |
| Ignores B2 report | What does the patient’s report add, even though it is not a numerical effort measurement? |
| Claims B2 proves a cause or quantified effort | Which supplied measurement establishes that mechanism or quantifies effort? |

## Transfer Case C

Current total rate and exhaled volume are valid and time-matched for their own interval. An available PaCO2/pH sample predates a meaningful support change. The learner must state that the current calculation is valid, the earlier gas remains legitimate historical evidence, and current CO2 interpretation requires matching time and support context. Do not imply a direction of unseen change.

## Gate and exposure contract

Scene 5 is a teaching function inside Scene 4’s existing gate, not a separate page. Preserve the first Case B answer as the independent attempt. Provide one actual-gap follow-up, preserve revisions as assisted learning, and reveal synthesis after a competent first answer or bounded revision support. Do not trap a struggling learner indefinitely or make navigation architecture dictate pedagogy.

## Content and review boundaries

All examples, answer keys, rubric decisions, visuals, and feedback remain generated/source-mapped drafts until claim-level mapping and qualified adult ICU RT review. Replacing the failed prototype does not make a replacement clinical-ready. Reopen the content/review chain when a consequential case fact, calculation, rubric, feedback, model, or source applicability changes.

## Current bounded next step

Replace the failed four-scene prototype only after this contract is converted into the stage’s exact authored content and isolated fixture coverage. Audit the resulting learner flow against this document; do not add a new simulator, scheduling system, review feature, or treatment algorithm.
