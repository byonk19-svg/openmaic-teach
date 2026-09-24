# M01 Gold-Standard Instructional Exemplar

**Curriculum position:** M01 — What do we actually know?
**Version:** 0.1 · 2026-09-15
**Status:** fully written instructional-design draft; **not clinical-ready**.
**Clinical reviewer:** unassigned.
**Actual course/artifact ID:** unmapped. Do not bind or overwrite an existing “Module 01.”

“Gold standard” describes the teaching specificity and quality to aim for. It does not assert that the clinical claims, cases, or rubric have completed human review. The source map at the end records remaining work.

This is an author-facing reference. Do not render author notes, answer keys, fixture tables, or the target misconception as learner-facing material before the intended answer exposure.

## 1. The transformation

**Before:** “I calculated the minute ventilation, so I can judge whether the patient is adequately supported.”

**After:** “I can calculate what these inputs establish. I can separate that from the CO2 and effort questions, use additional evidence when it is present, and identify a relevant next assessment.”

**Primary tempting overclaim:**

> “The calculated minute ventilation is 11.2 L/min, so CO2 clearance is adequate and the patient's breathing effort is acceptable.”

The target is not the opposite claim. The snapshot must not teach that 11.2 L/min necessarily means inadequate ventilation, excessive effort, or a needed setting change. It also must not teach that calculations or patient reports are useless.

### Three primary objectives

| ID | Observable objective | Primary assessment |
|---|---|---|
| M01-O1 | Select time-matched total-rate and mean exhaled-volume inputs and calculate the interval's exhaled minute volume. | Worked A; independently calculated B. |
| M01-O2 | Distinguish that result from conclusions about CO2 clearance and effort, using any additional supplied evidence. | Separate interpretations in case B. |
| M01-O3 | Identify specific evidence/assessment relevant to the unresolved questions, without using a test name as a password. | Case B and transfer C. |

**Supporting exposure, not a hidden gate:** provenance vocabulary and timestamp comparison. Full dead-space mathematics, acid-base classification, waveform diagnosis, mode selection, and treatment plans are out of scope.

**Author terminology note:** “Adequate CO2 clearance” is shorthand here for CO2 status appropriate to the physiological and clinical context; it is not a direct measurement of exhaled CO2 flux. Current CO2/pH information contributes evidence, not a universal normal-value target or proof of complete safety. Keep that distinction in the reviewed explanation without turning M01 into an acid-base lesson.

## 2. Non-negotiable case design

The main calculation is valid. The inputs are trustworthy for the exercise, cover the same exact 60-second interval, and summarize the same set of counted breaths. There is no hidden leak, sampling fault, or timestamp mismatch. The lesson concerns the limits of a correct inference—not a trick about bad inputs.

No current PaCO2, muscle-pressure estimate, complete examination, or patient diagnosis is silently invented. A missing finding is not an observed absence. No normal range or adequacy badge is attached to minute volume.

Do not infer a patient-effort mechanism from total rate exceeding set rate. This module does not ask the learner to establish how individual breaths were triggered. Additional device behavior or mode detail should be added only if a reviewed prompt actually needs it.

## 3. Six-scene teaching storyboard

| Scene | Purpose | Learner action | Author constraint |
|---|---|---|---|
| 1. A bedside snapshot | Orient to the patient and the question. | Identify which evidence they would use first. | No diagnosis or target overclaim in the title. |
| 2. Three questions, different evidence | Establish a simple mental model. | Connect a question with its relevant evidence. | Teach before testing; no decorative simulator. |
| 3. Work one example | Demonstrate valid arithmetic and bounded interpretation. | Brief prediction, then worked explanation. | This is supported instruction, not independent retrieval. |
| 4. Interpret a new snapshot | Test the same distinction with additional patient evidence. | Submit a concise evidence-based response. | Valid calculation inputs again; new evidence must matter. |
| 5. Revise and explain | Respond to the actual error or accept a good alternative. | Revise only what remains unresolved. | One targeted follow-up; track assistance honestly. |
| 6. Transfer the distinction | Apply provenance to a different evidence limitation. | Explain what an older sample does and does not establish. | Timestamp mismatch occurs here, not as the main case's hidden answer. |

These are teaching scenes, not an instruction to create six new platform components or impose a universal gate count.

## 4. Scene 1 — Learner-facing orientation

**Title:** A bedside snapshot

**Copy:**

> You are reviewing information for an adult receiving invasive ventilation. Before deciding what the information means, separate three questions: what the support system is delivering, what is known about CO2 clearance, and what is known about the patient's experience and effort.
>
> This exercise asks for an interpretation and the next relevant evidence—not a ventilator prescription.

**Optional orientation prompt:**

> “When a displayed value looks reassuring, what else would you want to know before describing the patient's breathing as acceptable?”

Do not grade this as a clinical gate or reveal a diagnosis in response. It is an invitation to the lesson, not a test of advanced knowledge.

## 5. Scene 2 — Simple visual and explanatory copy

**Visual specification:** Three neutral cards connected to the patient. Reveal one card at a time. Do not put an equals sign between them.

```text
                        PATIENT + SUPPORT
                               |
        +----------------------+----------------------+
        |                      |                      |
  AIR PER MINUTE         CO2 QUESTION           EFFORT QUESTION
  Rate and volume        Relevant gas data      Bedside assessment
  Calculation window     Time and context      Patient report
```

**Text equivalent:** The first card concerns an amount of air over time. The other cards concern CO2 interpretation and breathing effort/experience. They require relevant evidence of their own. The connections indicate related questions, not interchangeable measurements.

**Short teaching copy:**

> A volume calculation answers an amount-over-time question. It does not itself measure muscle work or supply a CO2 result. Some ventilated volume does not contribute to gas exchange, and the CO2 question also depends on physiological context. A patient's report of breathing discomfort adds useful information, but it is not a numerical measurement of inspiratory effort.

**Author source notes:** Clinical claims M01-C02–C04 below require completion of the stated source/review work. Keep the explanation this simple; detailed alveolar-ventilation equations belong in M02. Do not invent a numerical dead-space or muscle-effort value to animate the cards.

## 6. Scene 3 — Worked example A

### A. Learner-visible facts

**Case ID:** M01-A-v0.1 · fictional adult receiving invasive ventilation.

| Fact ID | Supplied fact | Provenance and conditions |
|---|---|---|
| A01 | Set respiratory rate: **16 breaths/min**. | Programmed value; unchanged during the example interval. |
| A02 | Total delivered-breath rate: **28 breaths/min**. | Derived from 28 reliably counted breaths during the exact 60-second interval. |
| A03 | Mean exhaled tidal volume: **0.40 L/breath**. | Mean of those same 28 breaths; trustworthy volume inputs for the exercise. |
| A04 | Rate and volume data cover the same interval. | Explicit case assumption; no measurement trick. |
| A05 | Current CO2/pH data are **not supplied**. | Unknown in this snapshot, not assumed normal or abnormal. |
| A06 | A current breathing-effort assessment and patient comfort report are **not supplied**. | Not supplied is not the same as “no distress.” |

Mode-specific behavior, diagnosis, oxygen targets, pressures, and a treatment decision are not part of the question. Do not add them merely to fill the screen.

### B. Prediction pause

> “Using the supplied interval, which rate belongs in the calculation, and what exhaled minute volume does it give?”

Let the learner commit an answer before revealing the calculation. A hint or explanation makes this supported practice; no independent-retrieval label is needed.

### C. Worked calculation

> “Use the total rate for the counted breaths, not the programmed rate: **28 breaths/min × 0.40 L/breath = 11.2 L/min**. The result describes the calculated exhaled volume per minute for this interval.”

Author arithmetic check: 28 × 400 mL = 11,200 mL in 60 seconds = 11.2 L/min. Using the set rate would produce 6.4 L/min, which does not represent the supplied interval's counted breath volume.

Label the result **calculated from the supplied data**. Do not call it a second independent measurement or assume a commercial device's display uses this exact averaging method.

### D. Interpretation pause

> “Does that result establish adequate CO2 clearance, acceptable breathing effort, both, or neither? Explain the limit without assuming the patient is doing poorly.”

### E. Worked explanation, revealed after the intended pause

> “The calculation is useful and correct. It establishes the calculated minute volume for this interval. It does not establish either adequacy conclusion from this snapshot.
>
> I would interpret current CO2 information in its physiological and support context, and assess the patient's breathing and interaction with support. I would use a patient report when available. These answer different questions; the calculation does not replace them.”

This is an illustrative educational response, not a mandate to order a new ABG or use a specialized effort monitor. Accept another relevant evidence pathway when its purpose and limitations are explained.

### F. What the worked example should make clear

The correct inference is bounded, not pessimistic. The number is not “good,” “bad,” “too high,” or “too low” without a relevant context. No diagnosis or intervention is justified merely by multiplying the inputs.

The worked case's essential source dependencies are M01-C01–C03. Clinical-ready status remains blocked until the source map and qualified review are complete.

## 7. Scene 4 — Fresh independent case B

This is a **different fictional patient**, not a predicted response to an intervention in A. The calculation remains valid. The deliberate new evidence is a patient report, so repeating “we know nothing” is no longer an adequate interpretation.

### Learner-visible facts

**Case ID:** M01-B-v0.1 · fictional adult receiving invasive ventilation.

| Fact ID | Supplied fact | Provenance and conditions |
|---|---|---|
| B01 | Set respiratory rate: **16 breaths/min**. | Programmed value for this case. |
| B02 | Total delivered-breath rate: **32 breaths/min**. | 32 reliably counted breaths in the exact 60-second interval. |
| B03 | Mean exhaled tidal volume: **0.35 L/breath**. | Mean of those same 32 breaths; trustworthy inputs. |
| B04 | The awake patient uses a writing board to report: **“Breathing feels hard right now.”** | Direct patient report; the case explicitly establishes reliable communication. |
| B05 | Current CO2/pH data and a quantified effort measurement are **not supplied**. | Do not infer normal values, a measured work-of-breathing level, or a particular cause. |
| B06 | No waveform, pressure, or full airway/examination findings are supplied. | Enough information for the stated interpretation task, not a treatment prescription. |

### Exact learner prompt

> “Calculate exhaled minute volume for this interval. Then explain separately what the snapshot supports about CO2 clearance and about the patient's breathing experience/effort. What specific additional evidence or assessment would help resolve the remaining questions?”

**Response guidance:** A few sentences are enough. Use the supplied facts. Do not prescribe settings or give a full differential diagnosis.

### Author answer logic

The calculation is again 11.2 L/min: 32 × 0.35 = 11.2. That repeated result is intentional; the evidence configuration, not merely the numeric result, must change the response.

The report establishes that the patient describes current breathing difficulty. It is relevant and should prompt attention to the patient. It does not by itself quantify inspiratory muscle effort or establish why the patient feels this way. CO2 adequacy remains unresolved from the supplied data.

Do not require the learner to choose a particular intervention or diagnose dyssynchrony. Do not reward waiting for a laboratory result before attending to the complaint. Prompt bedside reassessment/communication can be appropriate without a numerical effort estimate. Exact response wording and urgency framing require qualified RT review before release.

### Example of a concise adequate answer

> “32 × 0.35 gives 11.2 L/min. That alone does not establish CO2 clearance. Here we do know the patient reports that breathing feels hard, so I would not describe the situation as comfortable or adequately supported on the strength of the number. I would observe the breathing pattern and patient–ventilator interaction, clarify the reported difficulty, and review available current CO2 information in context; neither the cause nor a quantified effort level is supplied.”

### A different adequate answer

> “The exhaled minute volume is 11.2 L/min. The complaint is useful patient evidence, not a muscle-pressure measurement, and the case still has no current CO2 result. I would ask about the complaint while observing the breathing pattern, and relate a relevant current gas assessment to the support and trend rather than infer adequacy from minute volume.”

These are anchors, not scripts the learner must reproduce. “Current gas assessment,” “current CO2 measurement in context,” and other clinically defensible language may meet the criterion without naming a new ABG order or using every provenance label.

## 8. Scene 5 — Case-specific rubric and targeted feedback

### Three criteria, not a hidden comprehensive checklist

| Criterion | Required | Not required |
|---|---|---|
| **R1: valid calculation** | Uses the correct interval inputs and obtains 11.2 L/min, or equivalent units. | The same formatting or notation as the exemplar. |
| **R2: bounded interpretation** | Does not infer CO2 adequacy; uses the patient's breathing-difficulty report; does not transform it into quantified muscle work or a definitive cause. | A diagnosis, dead-space equation, exhaustive limitation list, or exact phrase “insufficient information.” |
| **R3: specific next evidence** | Identifies relevant CO2 information/context and a concrete patient assessment, such as observing breathing pattern or interaction while clarifying the complaint. “Assess the patient” alone is insufficient. | A mandated new test, specialized monitor, intervention, or full treatment plan. |

Case A's effort information is missing. Case B's patient report is present. The grader must not apply an A answer key to B and ignore that difference.

A consequential unsupported conclusion cannot be offset by correct arithmetic. Minor language variation is not a defect. Where reasoning is genuinely ambiguous, ask a focused question or route for review rather than hallucinating facts.

### Representative response fixtures

These are manual content/feedback fixtures, not an instruction to build a live evaluation service or alter existing thresholds.

| ID | Case / learner answer | Expected response | Targeted feedback example |
|---|---|---|---|
| F01 | A: “11.2, so ventilation and effort are fine.” | Revise the inference. | “Your calculation is correct. Which supplied evidence supports the conclusion about breathing effort?” |
| F02 | A: “6.4 L/min. It still doesn't prove CO2 clearance or acceptable effort; I'd review current gas information and assess breathing.” | Correct arithmetic only; retain credit for the limits. | “Your interpretation identifies the limits. Which rate represents the breaths counted during this interval?” |
| F03 | A: “11.2. Need more information.” | Ask for specificity. | “Choose one unresolved question: what information would help you address it?” |
| F04 | A: “11.2; no effort information, but that amount clears enough CO2.” | Revise remaining overclaim. | “You recognized the effort limitation. What supplied evidence supports your conclusion about CO2 clearance?” |
| F05 | A: “11.2, but unknown effort means the patient is failing.” | Reject unsupported opposite conclusion. | “What evidence in this snapshot establishes failure rather than an unanswered question?” |
| F06 | B: “11.2; neither question is answered and there is nothing useful about effort or comfort.” | Require use of the new report. | “What does the patient's written report add, even though it is not a numerical effort measurement?” |
| F07 | B: “11.2; the report proves excessive muscle work from inadequate pressure support.” | Limit severity/mechanism inference. | “Which supplied measurement establishes that mechanism or quantifies muscle effort?” |
| F08 | B: Concise adequate answer using different words and equivalent units. | Pass the stated criteria. | “You used the calculation and the report without claiming they establish CO2 clearance or a measured effort level.” |
| F09 | B: “11.2. Get an ABG.” | Not enough reasoning. | “Which unresolved question would that information address, and what evidence here concerns the patient directly?” |
| F10 | B: Sound bounded interpretation plus “so automatically increase support.” | Resolve consequential contradiction. | “What additional evidence supports the automatic change you proposed?” |
| F11 | B: “5.6 L/min; the report matters and doesn't quantify effort; I need current CO2 context and bedside assessment.” | Correct use of rate only. | “You used the programmed rate. Which rate summarizes this case's actual counted breaths?” |
| F12 | Evaluation cannot complete or returns invalid output. | Evaluation problem, not learner failure or pass. | “Your response is preserved. The evaluation could not be completed.” |

For case A after a consequential inference error, address one gap at a time. For B, do not reveal the full explanation just because the answer omits a component. A competent alternative should pass without repeated demands for additional detail outside the stated criteria.

### Help and explanation exposure

Use the existing supported hint/revision/explanation behavior. Offer a scaffold when the learner remains stuck; do not make the experience an endless locked interrogation. If the platform cannot supply that behavior safely, report the specific limitation rather than overriding gates or claiming a feature exists.

A successful revised answer can satisfy the learning exercise but is not retroactively an independent first attempt. If a complete explanation has been shown, later independent retrieval requires a new item or later session.

### Revealed feedback summary

> “The calculation stayed the same, but the evidence did not. In the second case the patient contributed a report that should change your assessment. Use the number, use the report, and keep the remaining questions separate.”

## 9. Scene 6 — Transfer C: the right measurement, wrong time for the conclusion

This is a distinct transfer exercise after the main valid-calculation lesson. It is not a retroactive explanation that invalidates A or B.

**Learner-visible facts:** A different fictional case has an arterial PaCO2 result of **40 mm Hg sampled at 08:00**. The current snapshot is **10:00**, and respiratory support changed at **09:30**. No sample after that change is supplied.

**Prompt:**

> “What time and conditions does this result belong to? Does it directly establish the PaCO2 under the present support? What would you verify next?”

**Bounded answer:** It is a measured value from 08:00, useful as prior context, not a direct measurement under support changed at 09:30. Verify the time/support relationship and obtain or review relevant current assessment information as appropriate. Do not automatically declare a change in PaCO2, prescribe a new setting, or dismiss the earlier value as worthless.

No pH classification or universal PaCO2 target is required. The exercise tests time attribution, not a new acid-base skill. Claim M01-C05 requires review of the teaching interpretation.

**Final learner takeaway:**

> “Use the evidence for the question it actually answers. When the evidence changes, update the conclusion—without assuming more than it establishes.”

## 10. Revisit plan, not scheduler implementation

Revisit M01-O2 with a new evidence configuration in M02, and M01-O3 with a laboratory-timing case in M03. A later M05 mechanics case can use the same distinction between a valid calculation and its clinical applicability.

If spaced practice already exists, use its supported mechanism. Otherwise author the revisit items and identify where they belong; do not build a scheduler or invent mastery metrics for this pilot.

## 11. Claim-level source and review map

All sources are defined in [CLINICAL_CONTENT_POLICY.md](../CLINICAL_CONTENT_POLICY.md). Numeric case facts are authored, not taken from study patients. Every clinical interpretation remains subject to qualified RT review.

| Claim ID | Exact claim / role | Source or derivation | Applicability and work remaining | Dependent assets |
|---|---|---|---|---|
| M01-C01 | Under the defined interval assumptions, counted breaths/min × mean exhaled L/breath yields calculated exhaled L/min. | Direct dimensional derivation; A: 28 × 0.40; B: 32 × 0.35. | Arithmetic checked in pack QA. Not a claim about every device's averaging algorithm. | A/B fact sheets, calculation reveal, R1, F02/F11. |
| M01-C02 | The minute-volume result alone does not establish adequate CO2 elimination relative to physiological need. | E03 primary physiology lead; E01 assessment framework; explicit author synthesis. | Complete full-text/primary-physiology mapping for general dead-space/CO2-production explanation. No universal target or intervention follows. | Scene 2, A explanation, B key, R2/R3, F01/F04. |
| M01-C03 | The volume calculation does not quantify patient inspiratory effort or establish acceptable effort. | E02 primary mode-specific effort study, supported by E01's broader assessment framework. | General lesson claim is an inference requiring qualified review; do not generalize the study's cutoff performance or require its instrument. | Scene 2, A/B interpretations, R2/R3, F01/F05/F07. |
| M01-C04 | A reliable report of breathing difficulty is meaningful symptom evidence, not a direct numerical measurement of muscle work or proof of cause. | E04 official statement lead; E01 contextual assessment framework. | Retrieve and verify relevant full statement sections; review case wording, feedback, and timely reassessment framing. | B04, B key, R2/R3, F06/F07/F08. |
| M01-C05 | A sample drawn before a support change is historical evidence, not a direct measurement under the later conditions. | Case chronology plus clinical interpretation requiring review. | Does not imply that the value necessarily changed or mandate a new test. Review teaching wording. | Transfer C and recap. |

**Record status:** generated draft with source leads and partial claim mapping. This is not yet a source-mapped or reviewed clinical-ready module. No reviewer identity, date, or approval has been invented.

## 12. Exemplar acceptance criteria

The pilot meets its instructional target only when the learner can complete a supported worked example, make an independent interpretation that changes with B's report, receive targeted feedback, and transfer the evidence-limitation distinction without a hidden trick.

Use the common [quality bar](../QUALITY_BAR.md). In particular, reject a version that awards a pass for “11.2, therefore fine,” rejects a sensible alternative for wording, ignores the patient's report, or converts an unknown into evidence of failure. Reject a version that solves this content problem by inventing a clinical simulator or altering unrelated platform state.

A human reviewer must judge the clinical content and rubric before clinical-ready release. Matching this document's text does not itself establish approval.
