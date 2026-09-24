# M02 Teaching Contract Draft: Oxygenation, ventilation, and respiratory demand

**Status:** generated instructional-design draft; not source-mapped, clinically reviewed, clinical-ready, implemented, or assigned to a course/stage.
**Content version:** draft 0.1 · 2026-09-16
**Prerequisite:** M01 — *What do we actually know?*
**Intended learner:** practicing adult acute/ICU respiratory therapist.

## Visual-first authoring rule

For M02, explanatory visuals are the default teaching tool whenever a learner must understand a physiological relationship, pathway, before/after or side-by-side comparison, provenance/time context, sequence, interacting variables, waveform, or spatial/mechanical concept. The author first asks:

> Can the learner understand this relationship more directly by seeing it?

If yes, design the visual first and use adjacent prose to support it. This is not a request for more media. A visual must carry instructional meaning, reduce rather than add cognitive load, and be inspected or used by the learner. It is not decoration.

Do not add decorative images, generic ICU stock imagery, dense dashboards, animations that do not explain a changing relationship, redundant diagrams, color-only distinctions, or complexity intended only to make a scene appear sophisticated.

Prefer simple schematics, side-by-side comparisons, progressive reveal, directional arrows, layered diagrams, small evidence cards, selective variable highlighting, and one visual idea at a time. Keep explanatory words adjacent to the relevant visual element rather than creating split attention between distant prose and graphics. A static or progressively revealed visual is preferable to an elaborate simulator unless interaction materially improves the reasoning objective.

Every visual must have a clear instructional purpose, readable text equivalent, semantic structure where appropriate, labels and units, provenance for measured/calculated/modeled/authored values, and no reliance on color alone. The text equivalent must preserve the essential instructional information without revealing an independent answer early.

### Later learner-facing authoring constraint

The target learner is a practicing adult acute/ICU RT. When learner-facing authoring is later authorized, prefer visual explanation over redundant prose; use signaling and adjacent labels; ask for a prediction before revealing the explanation; and keep post-reveal explanation concise when the visual carries the relationship. Do not force experienced learners through novice-level arithmetic narration. Retain complete accessible text equivalents without unnecessarily duplicating them as visible explanatory prose. This is an authoring/presentation constraint, not a clinical-content expansion or accessibility exception.

## 1. Learner change

An experienced ICU RT already recognizes saturation, inspired-oxygen support, exhaled minute volume, CO2 results, respiratory rate, and a patient who looks uncomfortable. The expert shortcut this module addresses is more subtle: allowing a familiar reassuring output to stand in for the whole respiratory state—for example, treating an acceptable saturation, a large total minute volume, or a nonalarming CO2 result as proof that oxygen transfer, CO2 elimination, and the work required to sustain breathing are all acceptable.

M02 changes the learner from **using one respiratory signal as a global reassurance signal** to **naming the physiological question each signal can answer, using it in its support/time context, and integrating the distinct answers without collapsing them into one judgment**.

By the end, a learner should be able to say, in ordinary bedside language: “This evidence addresses oxygenation under these support conditions; this evidence addresses CO2 elimination only to this extent; and this patient evidence says something different about the demand or effort required to produce the observed output.” They should neither invent a quantified effort nor retreat to “nothing can be concluded.”

## 2. Central bedside question

> Which physiological question does each number or observation actually answer?

**Locked central overclaim:** “If the SpO2, PaCO2, and minute ventilation all look reassuring, the patient’s respiratory state is reassuring.” M02 dismantles this global-reassurance shortcut by requiring support, patient, and time context alongside the distinct physiological questions those values address.

## 3. Primary objectives

| ID | Observable learner behavior |
|---|---|
| M02-O1 | Sort supplied respiratory evidence into the question it addresses—oxygenation/oxygen pathway, effective CO2 elimination, or respiratory demand/effort—and state one limit on what that evidence establishes. |
| M02-O2 | Use an explicitly limited dead-space/alveolar-ventilation comparison to explain why equal total minute ventilation need not imply equal effective ventilation or equivalent inference about CO2 elimination. |
| M02-O3 | Integrate oxygenation, CO2, support, and patient/bedside evidence into one bounded interpretation without treating patient experience or an effort-related observation as a quantified work-of-breathing measurement. |

**Supporting exposure, not a pass requirement:** inspired oxygen concentration/support, lung transfer, arterial oxygenation, hemoglobin/oxygen content, and perfusion are parts of the oxygen pathway. M02 names their relationship only far enough to prevent saturation from being treated as the whole oxygen-delivery story. It does not require calculation of oxygen content or delivery.

## 4. Smallest useful visual model

### The three-question pathway card

The learner sees one patient in the center and three plain-language horizontal pathways beneath it. The pathways originate from the same patient/support snapshot but deliberately do **not** join into a single “adequacy” score.

```text
PATIENT + CURRENT SUPPORT + TIME CONTEXT

OXYGEN PATHWAY              EFFECTIVE CO2 PATHWAY             BREATHING DEMAND / EFFORT-RELATED EVIDENCE
Inspired O2/support  -->    Total gas moved                    Drive / load / support
Lung transfer        -->    minus dead-space portion           What the patient reports
Arterial oxygenation -->    = modeled alveolar portion         What the bedside shows
O2 content/perfusion -->    CO2 evidence in context            Not a quantified effort value

Question: “How is oxygen getting from support to tissue?”
Question: “How much gas may be reaching exchange units?”
Question: “What is required of the patient to sustain this output?”
```

The first pathway uses a restrained sequence of arrows: **inspired oxygen/support → movement across the lung → arterial oxygenation → hemoglobin-bound oxygen/content and perfusion**. A small boundary label says, “This is a map of questions, not a calculation of delivery or a patient-specific model.”

The second pathway makes the only equation visible in M02:

`illustrative alveolar ventilation = (tidal volume − stated dead-space assumption) × respiratory rate`

Its label says **MODELED FOR COMPARISON**, not measured patient data. A callout below total minute ventilation states, “Gas moved per minute is not automatically gas reaching exchange units.”

The third pathway separates **respiratory demand/drive**, **muscle effort**, **support**, **patient report**, and **effort-related observation** into related labels. It never places a number on effort and never claims that a visible sign proves a mechanism.

**Why this builds on M01:** M01 separated a useful calculation from unsupported conclusions. M02 retains that evidence discipline, then gives the learner a positive map for deciding which distinct physiological question to ask next. It does not reuse M01’s three branches as three isolated evidence bins.

**Text alternative:** A single snapshot can contain evidence for three connected pathways. Oxygenation evidence follows oxygen from inspired support through the lung to arterial blood and then depends on oxygen content and perfusion for tissue delivery. Total minute ventilation is gas moved per minute; under an explicitly stated teaching assumption, subtracting dead space from each breath estimates the portion reaching exchange units. Patient report and visible breathing observations add evidence about the burden of breathing but do not quantify muscle work or establish a cause. An answer on one pathway does not automatically answer either other pathway.

## 5. Worked example concept

### Recommendation: retain the equal-minute-ventilation comparison, with a tightly bounded model

The curriculum-map candidate is clinically useful, understandable after M01, appropriately challenging, and sourceable/reviewable **if it is presented as an illustrative comparison rather than a patient-specific prediction**.

It creates the needed “same visible number, different meaning” moment without an obscure diagnosis or a long equation. It also builds directly on M01: M01 taught that total minute ventilation alone cannot establish CO2 clearance; M02 lets the learner see one reason why, using a transparent simplified model.

#### Worked comparison: two explicitly modeled breathing patterns

| Learner-visible fact | Pattern A | Pattern B |
|---|---:|---:|
| Respiratory rate | 20 breaths/min | 40 breaths/min |
| Tidal volume | 0.50 L/breath | 0.25 L/breath |
| Calculated total minute ventilation | 10.0 L/min | 10.0 L/min |
| **Teaching assumption: non-gas-exchanging volume** | 0.15 L/breath | 0.15 L/breath |
| **Modeled alveolar ventilation** | `(0.50 − 0.15) × 20 = 7.0 L/min` | `(0.25 − 0.15) × 40 = 4.0 L/min` |

### Required visual: paired-breath comparison

Do not teach this primarily as a table and equation. The learner sees two representative breaths side by side before seeing the modeled result:

```text
PATTERN A                                         PATTERN B
0.50 L total breath                               0.25 L total breath
┌──────────────────┬─────────────────────┐       ┌──────────────────┬─────────────┐
│ 0.15 L stated    │ 0.35 L modeled      │       │ 0.15 L stated    │ 0.10 L      │
│ non-gas-         │ exchange-reaching   │       │ non-gas-         │ modeled     │
│ exchanging       │ portion              │       │ exchanging       │ exchange-   │
│ portion          │                      │       │ portion          │ reaching    │
└──────────────────┴─────────────────────┘       └──────────────────┴─────────────┘
        × 20 breaths/min                                  × 40 breaths/min

Total gas moved: 10.0 L/min                       Total gas moved: 10.0 L/min
Modeled alveolar ventilation: 7.0 L/min            Modeled alveolar ventilation: 4.0 L/min
```

The fixed 0.15 L portion is labelled **STATED TEACHING ASSUMPTION — THIS COMPARISON ONLY**. The final result label is prominent: **MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT**. The diagram uses text labels and partition boundaries, not color alone.

The progressive reveal is locked:

1. Show the two breathing patterns and their rate/volume values.
2. Establish that both move 10.0 L/min of total gas.
3. Ask whether equal total gas moved means equal gas reaching exchange units.
4. Reveal the same stated non-gas-exchanging teaching assumption within each representative breath.
5. Reveal the modeled exchange-reaching portion of each breath.
6. Reveal 7.0 versus 4.0 L/min under that assumption.
7. State the reasoning boundary.

The reveal states only the supported conclusion: *under these stated illustrative assumptions, the modeled alveolar-ventilation values differ; equal total minute ventilation did not answer the same effective-ventilation question.* It does **not** claim either fictional pattern’s PaCO2, disease, effort, or treatment need.

**Text equivalent:** Pattern A is a 0.50 L representative breath with a stated 0.15 L non-gas-exchanging portion and a 0.35 L modeled exchange-reaching portion, repeated 20 times each minute. Pattern B is a 0.25 L representative breath with the same stated 0.15 L non-gas-exchanging portion and a 0.10 L modeled exchange-reaching portion, repeated 40 times each minute. Both total 10.0 L/min of gas moved. Under the stated teaching assumption only, the modeled alveolar-ventilation comparison is 7.0 L/min for A and 4.0 L/min for B. This is not a patient measurement or a clinical rule.

The final prompt is deliberately conceptual: “What question does total minute ventilation answer here, and what extra assumption did the comparison need before it could estimate a gas-exchange-relevant portion?”

#### Why this is not an equation lecture

- One comparison, one fixed and conspicuous non-gas-exchanging teaching assumption, and no rearrangement, normal ranges, or individualized prediction.
- The arithmetic is a worked reveal, not the independent gate’s main hurdle.
- The instructional payoff is a reasoning boundary: **a rate-times-volume total is not automatically effective ventilation**.

#### Source/review risk to resolve later

The final authoring pass must source-map the relationship among alveolar ventilation, dead space, and CO2 elimination, including the model’s units and limits; check the fixed per-breath teaching assumption for the intended adult ICU context; and have qualified RT review confirm that the example does not imply a patient-specific PaCO2 prediction. The 0.15 L value must never be presented as a normal adult dead-space value, a patient estimate, a measurement, or a clinical rule. The numeric visual is locked because it makes the otherwise hidden assumption inspectable.

## 6. Independent retrieval case

### New configuration: satisfactory displayed outputs under high oxygen support, with meaningful breathing-burden evidence

This is not “Pattern A with different numbers.” The worked example is a transparent modeled comparison of effective ventilation. The independent case requires the learner to integrate three distinct kinds of evidence—oxygenation under current support, direct CO2 evidence, and patient/bedside breathing evidence—without calculating the worked model again.

**Case ID:** M02-B-draft · fictional adult ICU patient. All facts are synthetic and must receive source/review work before authoring.

| Fact ID | Learner-visible fact | Provenance/conditions |
|---|---|---|
| B01 | Pulse-oximeter saturation is **94%**. | Observed display during this snapshot; signal quality is stated reliable for the teaching case. |
| B02 | Inspired oxygen fraction is **0.70**. | Set current support condition; no support-change trajectory is supplied. |
| B03 | Current arterial PaCO2 is **42 mm Hg**. | Measured from a current arterial sample explicitly matched to the support/time snapshot. M02 uses this as current evidence about arterial CO2 under present support conditions, not as a full acid-base classification task. |
| B04 | Exhaled minute volume is **10.0 L/min**. | Measured/calculated display over a stated 60-second interval; dead space is not supplied. |
| B05 | The awake patient reports, “Breathing feels hard right now.” Visible inspiratory neck-muscle recruitment is present. | Reliable patient report and effort-related observation. No esophageal pressure, diaphragm signal, waveform, diagnosis, or mechanism is supplied. |
| B06 | Dead-space estimate, diagnosis, waveform, quantified respiratory-muscle effort, PaO2, hemoglobin, and perfusion assessment are not supplied. | These are explicitly unavailable, not normal or abnormal. |

### Required visual presentation: compact bedside snapshot

The independent case is presented as four compact evidence cards, not a long paragraph, dense table, or pre-sorted physiology diagram:

```text
CURRENT SUPPORT                 MONITOR / RESPIRATORY DISPLAY
FiO2 0.70                       SpO2 94% (reliable signal)
                                Exhaled minute volume 10.0 L/min

CURRENT GAS EVIDENCE            PATIENT / BEDSIDE
PaCO2 42 mm Hg                  Patient: “Breathing feels hard right now.”
Matched to current support       Observed: visible inspiratory neck-muscle recruitment
and time snapshot
```

The cards deliberately do **not** label facts as oxygenation, CO2, or effort evidence. Determining which physiological question each datum addresses is part of independent retrieval. Labels identify provenance and conditions only; the learner receives all values, units, and the current-snapshot relationship before answering. The text equivalent reproduces the same four cards and their evidence without classification or interpretation.

**Exact learner prompt:**

> Use the current snapshot in three short parts.
> **1. Name the question:** What does each of these address: saturation with FiO2, current PaCO2, exhaled minute volume, and the patient/bedside breathing evidence?
> **2. Integrate:** State the strongest supported interpretation of oxygenation, CO2 elimination, and breathing burden without converting one into evidence for the others.
> **3. Name one next assessment:** Identify one unresolved question and a specific assessment or evidence source that would clarify it. Explain why.

### Contract for a strong answer

A strong answer must notice all of the following:

- Saturation is an arterial-oxygenation observation **under substantial inspired-oxygen support**; it does not by itself establish the whole oxygen pathway, oxygen content, perfusion, or low support requirement.
- A current, matched PaCO2 establishes that measured arterial CO2 value under the present support conditions and is relevant direct evidence for the CO2 question. It is not replaced by total minute ventilation, and M02 does not ask the learner to perform full acid-base analysis or claim a trajectory not supplied.
- The 10.0 L/min total does not establish effective/alveolar ventilation because dead-space assumptions are absent; it cannot override the directly supplied current CO2 result.
- The report and neck-muscle recruitment are meaningful breathing-burden evidence requiring attention. They do not quantify muscle work, prove a specific cause, or establish a particular support intervention.
- At least one unresolved question must be tied to an appropriate next assessment—for example, a focused oxygen-pathway/perfusion assessment, clarification and bedside assessment of breathing burden, or a specific question about the current support context. No particular test name is a password.

**Tempting wrong conclusion:** “The SpO2, PaCO2, and minute volume look reassuring, so the patient’s respiratory state is reassuring.”

**What must not be a hidden requirement:** a diagnosis; a device/mode choice; a treatment escalation; a normal-range recitation; calculation of alveolar ventilation with an invented dead-space value; an oxygen-content calculation; a specific order such as “get an ABG”; a claim that neck-muscle activity quantifies effort; a PaO2 value; or a full acid-base interpretation.

## 7. Feedback behavior

First feedback addresses the dominant reasoning error, preserves what the learner did use correctly, and asks one manageable next question. It does not reveal a full model answer or turn assisted revision into independent retrieval.

| Learner pattern | Targeted first feedback |
|---|---|
| Discusses oxygenation only | “You used the saturation and its support condition. Which supplied evidence addresses the CO2 question, and which evidence says something different about the patient’s breathing burden?” |
| Equates total minute ventilation with adequate CO2 elimination | “Total minute ventilation tells us gas moved per minute. What assumption would be needed before it estimated the gas-exchanging portion, and what current CO2 evidence is already supplied here?” |
| Ignores important effort/patient evidence | “The numerical outputs are useful. What does the patient’s report and visible neck-muscle recruitment add, even though neither is a numerical work-of-breathing measurement?” |
| Retreats into blanket uncertainty | “Some questions remain open, but the snapshot does contain useful evidence. State what the matched PaCO2 establishes and what the saturation under FiO2 establishes—then state one limit for each.” |
| Competent alternative reasoning | “You kept oxygenation, CO2 evidence, and breathing burden separate; used the support context; and avoided turning the observation into a measured mechanism. Your named next assessment fits the unresolved question.” |

If a response makes a consequential unsupported treatment recommendation, feedback first asks what supplied evidence establishes that action rather than silently accepting the otherwise good reasoning. If evaluation is unavailable or malformed, preserve the response and report an evaluation problem rather than failing or passing the learner.

## 8. Transfer

### Recommended later M02 transfer: same saturation, materially different oxygen-pathway context

Use two fresh fictional snapshots side by side. Both have a reliable **SpO2 94%**, while the inspired-oxygen condition is the only intended changed variable:

| Snapshot C1 | Snapshot C2 |
|---|---|
| SpO2 94% | SpO2 94% |
| FiO2 0.30 | FiO2 0.70 |

The exact final values remain subject to source mapping and qualified RT review; they are not treatment thresholds. CO2 and effort evidence are explicitly unchanged, explicitly outside this comparison, or otherwise controlled so inspired-oxygen support remains the meaningful contrast.

### Required visual: same output, different support context

Show C1 and C2 as equal-weight snapshot cards. Make the identical saturation and differing inspired-oxygen support equally conspicuous using labels, position, and values—not green/red status colors. The immediate tension is: **Same displayed oxygen saturation. Different support context.** The learner supplies the interpretation.

**Text equivalent:** C1 and C2 each have a reliable displayed SpO2 of 94%. C1 has FiO2 0.30; C2 has FiO2 0.70. The comparison changes support context, not CO2 or breathing-burden evidence. Neither card is labeled good, bad, safe, or inadequate.

The transfer prompt asks: “What remains the same, what changes the oxygenation interpretation, and which pathway question is still unanswered?” A bounded answer recognizes that the saturation number is the same while the support context changes what can be said about oxygenation; it must not declare a diagnosis, prescribe HFNC/NIV, or infer oxygen delivery without hemoglobin/perfusion evidence.

This is the best M02 transfer because it tests the intended skill—**same output, different physiological/support context**—without stealing M03’s acid-base interpretation, M04’s modality-selection and trajectory decisions, M05 mechanics, M06 waveform/dyssynchrony, or M08 lung-protection decisions. It complements rather than repeats the worked dead-space comparison.

## 9. Boundaries

M02 does **not** teach:

- full ABG/acid-base classification, compensation, or timing analysis (**M03**);
- modality selection, HFNC/NIV escalation algorithms, or support-trajectory decisions (**M04**);
- detailed invasive mechanics, mode behavior, compliance/resistance calculations, or intervention mechanics (**M05**);
- waveform interpretation, dyssynchrony, or waveform-derived effort claims (**M06**);
- detailed ARDS phenotype, lung-protection, PEEP, recruitment, or heart–lung tradeoffs (**M08**);
- oxygen-content or oxygen-delivery calculations, transfusion/vasopressor reasoning, or a circulatory-management curriculum;
- patient-specific treatment prescriptions, a hidden “normal” target, or a simulator that predicts a patient response.

M02 may name support intensity as context and may name hemoglobin/content/perfusion as missing parts of the oxygen pathway. Those mentions prevent false completeness; they do not make the module a support-algorithm or circulatory-physiology lesson.

## 10. Source and review needs

No source closure is claimed. The draft needs claim-level records for the final visual, worked comparison, independent case, feedback, and transfer.

| Claim family | What eventually needs support/review | Likely source type; not yet a locator |
|---|---|---|
| Guideline-supported assessment concepts | A patient-centered respiratory assessment integrates patient examination/experience, physiological data, support conditions, and relevant reassessment; oxygen support and patient burden should not be reduced to one displayed value. | Current authoritative AARC assessment guidance and any applicable professional-society assessment statements, checked for population, setting, recommendation strength, and current status. |
| Foundational oxygenation physiology | Inspired oxygen/support, gas transfer, arterial oxygenation, hemoglobin-bound oxygen content, and perfusion answer connected but distinct parts of the oxygen pathway; saturation is not a complete oxygen-delivery assessment. | Authoritative physiology source(s), with qualified review of scope and wording. This is not a claim that M02 teaches a complete oxygen-delivery model. |
| Foundational CO2/dead-space physiology | Total minute ventilation differs from alveolar/effective ventilation; the stated model subtracts dead space per breath; dead space and CO2 production/context limit inferences about CO2 elimination. | Primary or authoritative physiology sources, including equation derivation, units, assumptions, and limits. Review that the teaching comparison does not imply patient-specific PaCO2. |
| Demand/effort and breathing experience | Patient-reported breathing difficulty and effort-related observations are relevant but do not quantify muscle work or establish mechanism; observed output can coexist with substantial breathing burden. | Official dyspnea/respiratory assessment statements and primary effort-measurement literature where needed; qualified RT review must prevent overgeneralization of device- or mode-specific evidence. |
| Teaching-only synthetic assumptions | Fictional values, reliable signal/report assumptions, the fixed 0.15 L non-gas-exchanging teaching assumption used only in the worked comparison, and the deliberately matched timing/support conditions. | Explicit author declaration and internal arithmetic/continuity check; not represented as measured patients, guideline targets, normal values, or clinical prediction. |

The final claim map must record exact source locators, applicability, limitations, dependent assets, reviewer status, and revision triggers. It must not inherit M01’s review or source mapping merely because the concepts are related.

## M02 visual-quality requirement

Before later M02 authoring is considered complete, each major teaching step must answer all of these questions:

1. Is there a physiological relationship that is easier to understand visually than verbally?
2. If yes, is that relationship actually shown rather than merely described?
3. Does the visual reduce explanatory burden instead of adding clutter?
4. Is the learner asked to inspect or use the visual rather than passively look at it?
5. Does the visual preserve the distinction among observed, set, measured, calculated, modeled, and authored teaching assumptions?
6. Could a learner using the text equivalent obtain the same essential instructional information?

A decorative image does not satisfy this requirement. The educational-design literature supplied by the owner is a rationale for this authoring standard, not a claim of source closure for M02 clinical content; exact bibliographic/source validation is outside this design-only pass.

## 11. Proposed learning arc

The draft proposes seven learner-facing functions. This is a storyboard, not an implementation request or a required scene count.

| Step/function | What the learner sees | What the learner does | What is revealed afterward | Objective(s) | Learning function |
|---|---|---|---|---|---|
| 1. Orient: familiar numbers, different questions | A short prompt beside three unclassified values/observations: saturation, minute volume, and a patient who says breathing is hard. | Offers an ungraded initial thought about which question each might answer. | Acknowledge that the module will separate related questions, not identify a diagnosis or treatment. | Activation for O1–O3 | Instruction/orientation |
| 2. Build the three-question pathway card | The core patient-plus-support card, progressively revealing oxygen pathway, effective CO2 pathway, and demand/effort pathway with provenance labels and text alternative. | Matches 3–4 sample facts to the pathway/question they most directly address. | Each match receives a one-sentence boundary: related evidence is not interchangeable evidence. | O1 | Instruction with supported prediction |
| 3. Worked comparison: same total minute ventilation | The required paired-breath visual: Pattern A and B side by side, equal total gas moved, then the same stated non-gas-exchanging assumption within each breath. | Predicts whether equal total minute ventilation means equal modeled effective ventilation. | Progressively reveal modeled exchange-reaching portions and 7.0 versus 4.0 L/min; state what remains unknown. | O1, O2 | Supported practice |
| 4. Bridge: output is not burden | A simple patient/support schematic in which visible output, patient report, and effort-related observation remain separately labeled. | Selects the statement that preserves the distinction between patient report/observation and quantified work. | Explain that qualitative evidence is meaningful but not a numerical effort measure or a mechanism diagnosis. | O3 | Instruction with supported practice |
| 5. Independent retrieval: current snapshot | The required four-card bedside snapshot: current support, monitor/respiratory display, current gas evidence, and patient/bedside. Cards do not pre-sort the data into pathways. | Separates evidence by physiological question, integrates it, and names one purpose-linked next assessment. | No answer content before submission. | O1–O3 | Independent retrieval |
| 6. Actual-gap feedback and synthesis | The learner’s response with the relevant evidence card(s) still visible and one targeted first feedback question if needed. | Revises after feedback only when there is an actual gap. | A synthesis reuses the pathway card to show how the snapshot contained meaningful but noninterchangeable oxygenation, CO2, and breathing-burden evidence. Preserve the first answer as independent; revision is assisted learning. | O1–O3 | Feedback / assisted revision |
| 7. Transfer: same saturation, different support context | The required equal-weight C1/C2 cards: both SpO2 94%, with FiO2 0.30 versus 0.70 plainly visible and no status colors. | States what the unchanged output does and does not establish, and identifies one remaining pathway question. | Bounded recap: use the number for its question, with support/time context, before integrating it with other pathways. | O1, O3 | Transfer |

### Suggested final learner takeaway

> Familiar respiratory numbers are not competing versions of the same answer. Before treating one as reassuring, ask which physiological question it answers, what support and time context it belongs to, and which linked question still needs its own evidence.

## 12. Locked decisions and authoring readiness

No consequential instructional-design decision remains unresolved before learner-facing M02 authoring. The following are locked:

1. The central overclaim is global reassurance from apparently reassuring SpO2, PaCO2, and minute ventilation.
2. The worked example is the numeric equal-total-minute-ventilation comparison using the explicit 0.15 L per-breath teaching assumption, paired-breath visual, progressive reveal, and modeled—not measured—label.
3. Independent Case B is the integrated current snapshot with SpO2 94% on FiO2 0.70, matched PaCO2 42 mm Hg, exhaled minute volume 10.0 L/min, and meaningful patient/bedside breathing-burden evidence; pH is not included.
4. Transfer is equal reliable SpO2 94% under FiO2 0.30 versus FiO2 0.70, with CO2/effort evidence controlled and no modality-selection or escalation task.
5. M02 uses the visual-first authoring rule and its visual-quality requirement; broader RT Foundations adoption remains a future documentation decision and is not changed by this pass.

Remaining work is not a design choice: claim-level source mapping, qualified RT review, exact learner-visible copy, technical implementation, and learner-facing verification must occur in later authorized tasks.

## Draft QA / handoff

| Field | Result |
|---|---|
| Authorized scope | One new M02 teaching-contract/design draft only. |
| Instructional-design result | Draft specifies learner change, visual, worked use, fresh independent retrieval, feedback behavior, transfer, boundaries, source/review needs, and decisions. |
| Technical verification | Prettier ran on this owned Markdown file and `git diff --check` passed. No application, browser, database, stage, or provider action is part of this task. |
| Source-mapping status | Not started or claimed; source families and review questions are identified without invented locators. |
| Clinical-review status | Unassigned; generated draft only. |
| Changes that reopen review | Any consequential change to a clinical claim, visual relationship, model assumption, case fact, rubric, feedback, source applicability, or transfer interpretation. |
| Current bounded next step | A later authorized authoring task can produce full learner-visible content, claim-level records, and the defined visual assets without reopening the locked instructional design. |
