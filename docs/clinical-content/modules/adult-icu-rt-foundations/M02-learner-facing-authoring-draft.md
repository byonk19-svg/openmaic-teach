# M02 learner-facing authoring draft

> **Status:** pre-implementation learner-facing authoring draft derived from the qualified-RT-approved M02 teaching design. It is not a stage, implementation, clinical-ready label, or evidence of bedside competence.

> **Approved bounded addition:** Brianna's qualified-RT approval was recorded on 2026-09-22 for the exact oxygenation teaching section below. This approval authorizes that section's limited-prototype implementation; it does not approve the surrounding historical authoring file, the complete M02 module, clinical-ready status, release, or educational effectiveness.

> **Approved bounded addition:** Brianna's qualified-RT approval was recorded on 2026-09-22 for the exact demand/effort, CO2-application, and assessment-alignment section below, including the actual-assistance and feedback-loop clarifications. This approval authorizes that section's limited-prototype implementation; it does not approve the surrounding historical authoring file, Case B changes, the complete M02 module, clinical-ready status, release, or educational effectiveness.

## 1. Identity, authority, and authoring constraints

| Field | Value |
|---|---|
| Module | M02 — *Oxygenation, ventilation, and respiratory demand* |
| Intended learner | Practicing adult acute/ICU respiratory therapist |
| Authoritative design | [M02 teaching contract](../../../rt-foundations/M02_TEACHING_CONTRACT_DRAFT.md) draft 0.1 and [qualified-RT review decision](M02-qualified-rt-review-decision.md) |
| Clinical scope | Source-mapped, qualified-RT-approved teaching design; final learner-facing copy and implementation remain separately unapproved. |
| Implementation state | No stage or learner scenes exist. |

This draft preserves the approved seven-function learning arc. The functions need not become seven implementation scenes.

**Authoring constraint:** Use a visual when it makes the relationship more direct than prose. Signal the relevant element beside the visual, ask for a prediction before explanation, and keep the reveal concise. Preserve complete text equivalents and do not use color, position, or animation as the sole carrier of meaning. Do not make an experienced RT complete novice-level arithmetic narration.

## 2. Function 1 — Orientation: one snapshot, different questions

### Learner-facing copy

**Title:** One snapshot. Different questions.

> A saturation, a minute-volume display, and a patient who says breathing feels hard may all be true at the same time.

**Ungraded prompt:**

> Which question does each piece of evidence actually help answer?

No response is scored or saved as independent retrieval. Do not reveal the three pathway names at this point.

### Orientation visual specification

| Requirement | Specification |
|---|---|
| Instructional purpose | Activate familiar bedside evidence without classifying it or implying a diagnosis. |
| Initial display | Three equal-weight, unclassified evidence tiles: `SpO2 94%`; `Exhaled minute volume 10.0 L/min`; `Patient: “Breathing feels hard right now.”` |
| Information hierarchy | Prompt first; then three tiles; then a single neutral question mark beneath them. |
| Reveal | After the learner continues, replace the question mark with: `Each helps with a different question.` Do not reveal pathway labels yet. |
| Provenance | SpO2 and minute volume are labeled `DISPLAYED`; patient statement is labeled `PATIENT REPORT`. All values are explicitly fictional teaching facts. |
| Must not imply | That the three facts belong to one severity score, that 94%/10.0 are adequate, or that the patient needs a particular intervention. |
| Text equivalent | “A fictional snapshot contains a displayed SpO2 of 94%, displayed exhaled minute volume of 10.0 L/min, and a patient report that breathing feels hard right now. The learner is asked which question each item helps answer.” |
| Accessibility | Semantic heading level 2; three list items in reading order; no interactive control required; after continue, announce: “These evidence items answer different questions.” |

## 3. Function 2 — Progressive three-pathway model

### Learner-facing visual and copy

**Heading:** Put each signal with the question it can answer.

```text
PATIENT + CURRENT SUPPORT + TIME CONTEXT

OXYGEN PATHWAY                  EFFECTIVE CO2 PATHWAY                 BREATHING DEMAND / EFFORT-RELATED EVIDENCE
Inspired O2 / support            Total gas moved                       Drive, load, and support are related
→ lung transfer                  → non-gas-exchanging portion         Patient-reported breathing experience
→ arterial oxygenation           → modeled alveolar portion            Effort-related bedside observation
→ hemoglobin / content /         → CO2 evidence in context             Measured muscle effort is a different datum
  perfusion as downstream
  context
```

**Adjacent teaching copy:**

> Oxygenation evidence belongs to the support producing it. Total gas moved is not automatically the portion reaching exchange units. A patient report or visible observation can matter now without becoming a measurement of muscle effort or work of breathing.

**Construct boundary, learner-visible on request:**

> Drive, load, support, breathing experience, effort-related observations, measured muscle effort, and work of breathing are related concepts. This module does not treat them as interchangeable measurements.

### Progressive reveal

1. Show `PATIENT + CURRENT SUPPORT + TIME CONTEXT`.
2. Reveal the oxygen pathway and its downstream-context endpoint.
3. Reveal the effective-CO2 pathway.
4. Reveal the breathing-demand / effort-related-evidence pathway.
5. Reveal the sentence: `Related questions. Different evidence.`

All pathway titles, arrow labels, and the construct boundary remain visible after reveal. No pathway is color-coded as normal, abnormal, good, or bad.

### Supported matching interaction

**Prompt:**

> Match each item to the physiological question it most directly helps address. A match does not make that question fully answered.

| Evidence item | Correct pathway/question | Reveal after match |
|---|---|---|
| `Current FiO2 setting` | Oxygen pathway | “FiO2 is support context for interpreting oxygenation evidence. It is not an oxygen-delivery calculation.” |
| `Time-matched arterial PaCO2` | Effective-CO2 pathway | “This is arterial CO2 evidence under stated conditions. It is not a global adequacy label.” |
| `Exhaled minute volume from a stated interval` | Effective-CO2 pathway | “This tells you total gas moved for the stated interval. It does not by itself supply effective/alveolar ventilation.” |
| `Patient report of breathing discomfort` | Breathing demand / effort-related evidence | “This is meaningful qualitative evidence. It does not quantify muscle effort or establish why it is occurring.” |

If a learner makes an incorrect match, show only the relevant one-sentence reveal; do not present a score or a diagnosis.

### Accessibility specification

| Item | Specification |
|---|---|
| Semantic structure | Heading; ordered reveal list; three named regions; then a four-item matching list. |
| Interactive names | “Match current FiO2 setting to a physiological question,” and equivalent descriptive names for each item. |
| Keyboard behavior | Each draggable interaction has an equivalent select/list interaction; tab order follows evidence item then available pathways. |
| Announcements | After match: item, chosen pathway, and one-sentence reveal. Announce correctness without relying on color. |
| Text equivalent | The full diagram text above, in left-to-right pathway order, followed by the four evidence matches and their explanations. |

## Proposed addition after Function 2 — From oxygen support to delivery context

> **Review state:** bounded qualified-RT approval recorded on 2026-09-22 for this exact instructional addition. It adds no patient finding, threshold, or treatment recommendation. Implementation authority is limited to adding this section to the existing standalone M02 prototype while preserving its later reviewed interactions and boundaries.

### Learning purpose

Help the learner explain the connected oxygen pathway rather than memorize that SpO2 has limits. The learner should be able to follow oxygen from the set support context to ventilated and perfused gas-exchange units, then distinguish arterial saturation, arterial oxygen content, and cardiac-output-dependent systemic delivery.

### Exact proposed learner-facing explanation

> **FiO2 identifies the set inspired-oxygen context.** Ventilation brings oxygen-containing gas to the alveoli. For gas exchange, those alveoli also need pulmonary capillary blood flow: ventilation and perfusion meet at the gas-exchange surface. Their relative distribution across lung regions helps shape the arterial oxygen result.
>
> After oxygen enters arterial blood, saturation describes the fraction of hemoglobin binding sites occupied by oxygen. SpO2 is the pulse oximeter's estimate of arterial saturation. Saturation does not tell us how much hemoglobin is present, so the same saturation can accompany different arterial oxygen contents when hemoglobin concentration differs.
>
> Systemic oxygen delivery then depends on how much oxygen the arterial blood carries and the cardiac output moving that blood forward. SpO2 is therefore useful arterial-oxygenation evidence in its support context, but it is not by itself a measurement of oxygen content, cardiac output, systemic oxygen delivery, regional tissue perfusion, or the cause of an individual patient's findings.

### Coherent visual sequence

Display one left-to-right sequence on wide screens and one top-to-bottom sequence on narrow screens. Each step remains visible as the next is introduced; no step requires a separate page or learner response.

```text
1 · SET SUPPORT             2 · GAS REACHES ALVEOLI       3 · AIR AND BLOOD MEET
FiO2                        Ventilation                    Ventilated alveoli +
Set inspired-oxygen         Brings fresh gas to            pulmonary capillary perfusion
context                     gas-exchange regions           V/Q relationship shapes exchange

                                      ↓

4 · ARTERIAL OXYGENATION         HEMOGLOBIN CONCENTRATION
SaO2 = arterial saturation                  ↘
SpO2 = pulse-oximeter              5 · OXYGEN CONTENT
estimate of saturation             Mostly hemoglobin-bound oxygen
                                   + small dissolved-oxygen contribution

5 · OXYGEN CONTENT ────────────────→ 6 · SYSTEMIC OXYGEN DELIVERY
CARDIAC OUTPUT ─────────────────────→ Content moved by systemic blood flow
                                      Not regional tissue use or a target
```

### Brief regional V/Q contrast within step 3

Use three adjacent regional lung-unit sketches. Keep alveolar size and capillary size consistent so the relative ventilation/perfusion arrows carry the comparison.

```text
BETTER MATCHED REGION          RELATIVELY LOW V/Q          RELATIVELY HIGH V/Q
Fresh gas  →→                 Fresh gas  →               Fresh gas  →→
Blood flow →→                 Blood flow →→              Blood flow →

Ventilation and perfusion     Less ventilation for the   More ventilation for the
are better aligned            region's perfusion          region's perfusion
                              Blood leaves the region      Some ventilation has little
                              less oxygenated              blood available for exchange
```

**Exact learner-facing explanation:**

> V/Q is a regional relationship. Different lung regions can receive different amounts of ventilation relative to their perfusion. When ventilation is relatively low for a region's blood flow, blood leaves that region less oxygenated. When ventilation is relatively high for its blood flow, some ventilation contributes less to gas exchange. Blood leaving many regions then mixes into the arterial result.

**Boundary:** This contrast introduces regional mismatch. It does not assign a V/Q pattern, shunt, diagnosis, or response to Case A, and it does not make V/Q mismatch the only cause of impaired oxygenation.

**Exact adjacent labels:**

- `SET: FiO2 — inspired-oxygen support context`
- `VENTILATION — fresh gas reaches gas-exchange regions`
- `PERFUSION — pulmonary capillary blood reaches gas-exchange regions`
- `V/Q RELATIONSHIP — regional ventilation relative to regional perfusion`
- `SpO2 — pulse-oximeter estimate of arterial saturation`
- `OXYGEN CONTENT — amount carried in arterial blood; depends mainly on saturation and hemoglobin concentration, with a small dissolved-oxygen contribution`
- `CARDIAC OUTPUT — systemic blood flow available to carry arterial oxygen content`
- `SYSTEMIC OXYGEN DELIVERY — arterial oxygen content carried forward by cardiac output`
- `Simplified qualitative pathway — not a patient calculation or treatment target`

**Visual behavior and assumptions:**

- Use a single continuous pathway, not six disconnected cards. Ventilation and perfusion converge visibly before arterial oxygenation.
- Use arrows only to show the sequence of the simplified pathway. Do not imply that increasing FiO2 guarantees a proportional rise at every later step.
- Show arterial saturation and hemoglobin concentration as separate branches into oxygen content. Represent the small dissolved-oxygen contribution with a quiet secondary label, not a calculation.
- Show oxygen content and cardiac output as separate branches into systemic oxygen delivery. Keep regional pulmonary perfusion visually distinct from systemic cardiac output.
- In the fresh application, use equal-volume blood samples with the same occupied fraction and different numbers of hemoglobin carriers.
- Do not display an oxygen-content or delivery equation, numerical target, severity color, diagnosis, or treatment control.
- Keep `SpO2` identified as an estimate and keep `SaO2`, content, and delivery as distinct labels.
- Text alternative: read the six labeled steps in order, including the ventilation/perfusion convergence and the final model-boundary label.

### Worked application using existing Teaching Case A facts

**Learner sees:** the six-step pathway with two nodes filled from the existing case and the remaining patient-specific nodes outlined as not supplied.

```text
SET SUPPORT                              ARTERIAL OXYGENATION
FiO2 0.50                               SpO2 95%
Known: current set support context       Known: pulse-oximeter estimate
                                         under that support

V/Q RELATIONSHIP             HEMOGLOBIN / CONTENT          CARDIAC OUTPUT / DELIVERY
Not supplied in this case    Not supplied in this case     Not supplied in this case
```

**Exact worked explanation:**

> Case A gives a displayed SpO2 of 95% while FiO2 is set at 0.50. That is useful oxygenation evidence in its current support context. The case does not supply patient-specific ventilation/perfusion information, hemoglobin concentration, arterial oxygen content, cardiac output, or regional tissue perfusion. Label those pathway steps “not supplied in this case” rather than leaving them blank or assuming they are normal, abnormal, or absent. The displayed saturation does not establish oxygen content, systemic oxygen delivery, a minimum oxygen requirement, or a treatment response.

This application adds no new Case A datum and makes no claim about why Case A has its observed saturation.

### Brief fresh application

**Prompt:**

> Two separate fictional snapshots have the same arterial oxygen saturation, the same PaO2, and the same cardiac output. Snapshot B has a lower hemoglobin concentration than Snapshot A. Under those stated comparison conditions, which snapshot carries less oxygen per volume of arterial blood, and what does that imply for systemic oxygen delivery? Explain in one or two sentences.

**Expected reasoning:**

> Snapshot B has lower arterial oxygen content because less hemoglobin is available to carry oxygen even though the arterial saturation is the same. With cardiac output held equal for this comparison, lower oxygen content also means lower systemic oxygen delivery. This comparison does not establish regional tissue perfusion, tissue oxygen use, a treatment threshold, or what caused the lower hemoglobin.

**Focused feedback:**

| Learner response pattern | Useful first feedback |
|---|---|
| Says the snapshots carry the same oxygen because saturation is the same | “Saturation is the fraction of available hemoglobin binding sites occupied. Which snapshot has fewer hemoglobin carriers available?” |
| Correctly identifies lower content but says delivery is known without using the held-cardiac-output condition | “You identified the content difference. Which stated variable allows you to carry that comparison forward to systemic delivery?” |
| Gives the supported explanation | “Yes. With arterial saturation, PaO2, and cardiac output held equal, lower hemoglobin means lower arterial oxygen content and lower systemic oxygen delivery in this simplified comparison.” |

This is ungraded local application. The learner responds before seeing the expected reasoning. It does not use Teaching Case A, Case B, C1/C2, a provider, or a semantic grader.

### Claim-level source support for the proposed addition

| Proposal claim | Exact proposed wording supported | Source passage and locator | Inspection record / limitation |
|---|---|---|---|
| `M02-OX-P01` | “FiO2 identifies the set inspired-oxygen context.” | Hopkins, *Ventilation/Perfusion Relationships and Gas Exchange: Measurement Approaches* (2020), **General considerations and theoretical basis of gas exchange**, Equations 1–3 and surrounding text; existing `M02-C01`; Goodfellow et al., AARC PVA CPG (2024), journal p. 1046 recommendation 6 and implementation considerations. | Hopkins official PMC full text and the AARC publisher PDF were directly inspected. The AARC recommendation is conditional with very-low-certainty evidence and does not supply a threshold or treatment rule. |
| `M02-OX-P02` | Ventilation and perfusion meet at the gas-exchange surface; their relative regional distribution shapes arterial oxygenation; low- and high-V/Q regions have different exchange consequences. | Hopkins (2020), Abstract, Introduction, and **General considerations and theoretical basis of gas exchange**, especially Equations 5–7 and the discussion of regional ventilation/perfusion matching, flow-weighted arterial oxygen, and mismatch. | Official PMC full text was directly inspected. The proposed contrast is regional, names no disease, and does not portray V/Q as two whole-lung numbers whose equality guarantees normal exchange or as Case A's mechanism. |
| `M02-OX-P03` | “SpO2 is the pulse oximeter's estimate of arterial saturation” and “the same saturation can accompany different arterial oxygen contents when hemoglobin concentration differs.” | Collins et al., *Relating oxygen partial pressure, saturation and content* (2015), DOI `10.1183/20734735.001415`, sections **Oxygen carriage in the blood**, **Understanding oxygen saturation and partial pressure**, and **Anaemia**. Existing record: `M02-C01`; approved depth source `S2`. | The exact full-text sections were previously inspected and recorded in the repository. Fresh search retrieval exposed the oxygen-carriage passage and PubMed metadata; direct PMC open was blocked by browser verification in this pass. |
| `M02-OX-P04` | Arterial saturation and hemoglobin concentration contribute to oxygen content; oxygen content and cardiac output contribute to systemic oxygen delivery; dissolved oxygen makes a small additional contribution to content. | Collins et al. (2015), **Oxygen carriage in the blood**, **Oxygen delivery to the tissues**, and Introduction; the article distinguishes partial pressure, content, saturation, hemoglobin concentration, and cardiac output/distribution. | Existing repository full-text verification plus complete official Europe PMC XML inspection. This does not support a patient-specific delivery target, regional tissue-perfusion conclusion, or management recommendation. |
| `M02-OX-P05` | Case A worked application: FiO2 0.50 and SpO2 95% fill only support-context and displayed-saturation nodes. | Existing authored Case A facts plus `M02-C01` and `M02-DS-001`; no new physiology datum is assigned to the case. | Current repository records and the approved physiology-depth packet were inspected. Patient-specific V/Q, hemoglobin, content, and blood flow remain explicitly unsupplied. |
| `M02-OX-P06` | Fresh comparison: under equal arterial saturation, PaO2, and cardiac output, lower hemoglobin produces lower arterial oxygen content and lower systemic oxygen delivery. | Authored derivation from the Collins oxygen-carriage and oxygen-delivery relationships, with comparison variables stated explicitly. | Proposed consequential application wording; requires bounded qualified-RT review before learner use. Identical SpO2 readings are not used as a substitute for equal arterial saturation. No numerical values, threshold, diagnosis, or treatment implication is introduced. |

### Proposed source register and inspection provenance

- **S-O2-1:** Hopkins SR. *Ventilation/Perfusion Relationships and Gas Exchange: Measurement Approaches.* **Comprehensive Physiology.** 2020;10(3):1155–1205. [DOI 10.1002/cphy.c180042](https://doi.org/10.1002/cphy.c180042); [PMCID PMC8274320](https://pmc.ncbi.nlm.nih.gov/articles/PMC8274320/). Official PMC full text was inspected: Abstract, Introduction, and **Gas Exchange Methods → General considerations and theoretical basis of gas exchange**, Equations 1–7 and surrounding discussion.
- **S-O2-2:** Collins J-A, Rudenski A, Gibson J, Howard L, O'Driscoll R. *Relating oxygen partial pressure, saturation and content: the haemoglobin–oxygen dissociation curve.* **Breathe.** 2015;11(3):194–201. [DOI 10.1183/20734735.001415](https://doi.org/10.1183/20734735.001415); [PMCID PMC4666443](https://pmc.ncbi.nlm.nih.gov/articles/PMC4666443/). The complete article XML from the official Europe PMC archive was inspected at **Oxygen carriage in the blood**, **Oxygen delivery to the tissues**, **Understanding oxygen saturation and partial pressure**, **Anaemia**, and **What is the difference between SaO2 and SpO2?** Direct PMC HTML presented a browser-verification page in this pass.
- **S-O2-3:** Goodfellow LT, Miller AG, Varekojis SM, et al. *AARC Clinical Practice Guideline: Patient-Ventilator Assessment.* **Respiratory Care.** 2024;69(8):1042–1054. [DOI 10.4187/respcare.12007](https://doi.org/10.4187/respcare.12007). The AARC publisher PDF was inspected at pp. 1042–1043 and p. 1046. Existing source record [`M02-C01`](source-records/M02-C01-oxygenation-support-context.md) remains the governing support-context record.

No comprehensive retraction, correction, or supersession audit was performed. These sources support a general qualitative pathway; they do not approve the proposed learner wording, visual implications, worked application, or feedback.

### Bounded review decision for this addition

Brianna approved all five items below on 2026-09-22 for this exact oxygenation section:

1. The connected pathway is physiologically accurate at the intended introductory depth and does not imply a linear FiO2-to-delivery response.
2. The regional low-/high-V/Q contrast explains mismatch without turning M02 into an exhaustive V/Q or hypoxemia-mechanism lesson.
3. The saturation and hemoglobin branches into content, and the content and cardiac-output branches into systemic delivery, are accurate without requiring a calculation.
4. Every unavailable Case A node is clearly labeled “not supplied in this case” and adds no patient-specific inference.
5. The fresh comparison holds arterial saturation, PaO2, and cardiac output constant, supports its stated conclusion, and remains useful for practicing adult ICU RTs.

## 4. Function 3 — Worked comparison: same total gas moved, different modeled portion

### Learner-facing sequence

**Heading:** The same minute volume can hide a different modeled exchange-reaching portion.

**Initial visual labels:**

| Pattern A | Pattern B |
|---|---|
| `RR 20/min` | `RR 40/min` |
| `VT 0.50 L` | `VT 0.25 L` |

**Reveal 1:**

> Both patterns move **10.0 L/min total gas**.

**Prediction prompt:**

> If total gas moved is the same, will the modeled gas reaching exchange units also be the same? Choose `same`, `different`, or `cannot tell until an assumption is stated`.

**Supported answer/reveal:** `Cannot tell until an assumption is stated.`

**Reveal 2 label:**

> **0.15 L/breath non-gas-exchanging portion for this teaching comparison only**

**Reveal 3 visual:**

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

**Prominent model label:**

> **MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT**

**Concise explanation, revealed last:**

> Equal total gas moved per minute does not guarantee equal modeled gas reaching exchange units. This comparison does not predict a patient's PaCO2, diagnosis, severity, work of breathing, or treatment need.

### Visual specification

| Requirement | Specification |
|---|---|
| Instructional purpose | Make the non-gas-exchanging assumption and the 7-versus-4 consequence inspectable before explanation. |
| Dimensions/hierarchy | Two equal-width pattern columns. Each breath partition scales visibly to total breath size: A is twice B; each has an identically sized 0.15 L stated portion. Rate appears below each breath; total-gas comparison appears before modeled result. |
| Initial view | Rate and VT only. |
| Learner action before result | Prediction after equal total-gas reveal but before the assumption/partitions. |
| Progressive reveal | Rate/VT → equal 10.0 L/min → prediction → fixed assumption → partitions → 7 versus 4 → boundary. |
| Provenance | RR/VT are authored modeled inputs; 0.15 L is `AUTHORED TEACHING ASSUMPTION`; 10.0, 7.0, and 4.0 are `CALCULATED MODEL OUTPUTS`. |
| Units | L/breath and breaths/min at the breath/rate level; L/min for totals and modeled result. |
| Must not imply | A measured patient dead space, a normal value, an adult estimate, an individual PaCO2 prediction, or a rapid/shallow-breathing rule. |
| Text equivalent | Pattern A: 0.50 L/breath at 20/min equals 10.0 L/min. Under the same stated 0.15 L non-gas-exchanging teaching assumption, 0.35 L/breath is modeled exchange-reaching and 7.0 L/min is modeled alveolar ventilation. Pattern B: 0.25 L/breath at 40/min also equals 10.0 L/min. Under the same assumption, 0.10 L/breath is modeled exchange-reaching and 4.0 L/min is modeled alveolar ventilation. This is a teaching comparison, not a patient measurement. |
| Accessibility | Heading, initial two-column table, then an ordered reveal sequence. Prediction uses a grouped radio control named “Predict modeled exchange-reaching ventilation.” Reveal announcements name the newly displayed assumption or result. Partition identity is conveyed by labels/borders as well as any visual fill. |

## 5. Function 4 — Output versus burden bridge

### Learner-facing copy

**Heading:** Useful output does not answer every patient question.

> A displayed output can be useful and still leave the breathing experience and measured muscle effort unanswered.

### Supported prediction

**Prompt:**

> What does the patient/bedside evidence add that the minute-volume display does not?

The learner writes or selects a short ungraded thought before continuing. This is supported instruction, not an independent free-response gate.

**Reveal:**

> It adds meaningful evidence about the patient’s breathing experience and an effort-related observation. Neither is a measurement of respiratory-muscle effort or work of breathing.

### Visual and accessibility specification

```text
OBSERVED / DISPLAYED OUTPUT          PATIENT REPORT                 EFFORT-RELATED OBSERVATION
Exhaled minute volume                “Breathing feels hard          Visible inspiratory
10.0 L/min                           right now.”                    neck-muscle recruitment

Useful for its own question          Meaningful breathing           Meaningful bedside sign
                                     experience evidence            Not a quantified effort value
```

The three panels remain separate; no arrows collapse them into a single score. They use exact labels, icons only as redundant reinforcement, and no effort magnitude scale. Text equivalent is the panel text in order. The short response control has the accessible name “What patient or bedside evidence adds.” After reveal, announce the concise explanation.

> **Historical implementation boundary:** Function 4 above is preserved as part of the earlier approved authoring history. Do not restore it as a detached prototype lesson. The proposed consolidated section below supplies the current candidate teaching and local applications for demand, assistance, effort, breathing experience, and CO2 directionality.

## Proposed consolidated addition after Function 4 — demand, effort, breathing experience, and CO2 application

> **Review state:** bounded qualified-RT approval recorded on 2026-09-22 for implementation in the existing standalone `/m02-prototype`. This section does not change Teaching Case A, Case B, the approved paired-breath model, or any grading rubric. It authorizes no provider call, score, treatment recommendation, or patient-specific calculation.

### Learning purpose

Teach the relationships behind the breathing-burden evidence. The learner should be able to distinguish respiratory demand, neural respiratory drive, respiratory-muscle effort, mechanical load, muscle capacity, ventilator assistance, achieved breathing, and patient-reported experience—then use those relationships in a bounded model without assigning a cause or measured effort to Case A.

### Exact proposed learner-facing explanation

> **Respiratory demand describes what breathing must accomplish under the current physiological and mechanical conditions. Respiratory drive is the neural command generated by the respiratory centers.** They are related, but neither is the same as the muscular effort that follows.
>
> Respiratory muscles generate effort to move gas against the respiratory system's elastic and resistive load. Muscle capacity affects how much pressure the muscles can generate. During assisted ventilation, ventilator assistance and patient muscle effort can both contribute to the achieved breath, so a displayed volume does not reveal the patient's share.
>
> The brain also receives sensory feedback about the breathing that was achieved. A mismatch between the expected result associated with respiratory drive and the actual sensory feedback can contribute to breathing discomfort. This is a general explanatory model, not a diagnosis of an individual patient.

### Coherent visual relationship

Use one connected diagram. Do not turn each label into a separate card or screen.

```text
WHAT BREATHING MUST ACCOMPLISH
Respiratory demand
        ↓ influences, but is not identical to
NEURAL COMMAND
Respiratory drive
        ├──────── expected sensory consequences ────────────────┐
        ↓ activates                                             │
PATIENT RESPIRATORY MUSCLES
Muscle capacity limits available force
Mechanical load opposes movement
        ↓ patient muscular effort
        ├──────────────────────────────┐
        │                              │
PATIENT CONTRIBUTION           VENTILATOR ASSISTANCE
        └──────────────┬───────────────┘
                       ↓
ACHIEVED BREATHING / GAS MOVED
Flow, volume, and timing
                       └── actual sensory feedback returns ─────┤
                                                              ↓
                         EXPECTED ↔ ACTUAL COMPARISON
                                      ↓ can contribute to
PATIENT-REPORTED BREATHING EXPERIENCE
```

**Exact visible labels:**

- `RESPIRATORY DEMAND — what breathing must accomplish in the current conditions`
- `RESPIRATORY DRIVE — neural output from the respiratory centers`
- `MECHANICAL LOAD — elastic and resistive forces that oppose movement`
- `MUSCLE CAPACITY — ability of respiratory muscles to generate force`
- `PATIENT MUSCLE EFFORT — mechanical output of the respiratory muscles`
- `VENTILATOR ASSISTANCE — machine contribution during assisted ventilation`
- `ACHIEVED BREATHING — resulting flow, volume, and timing`
- `SENSORY FEEDBACK — information about the breathing that was achieved`
- `BREATHING EXPERIENCE — what the patient reports`
- `General relationship map — not measurements or a diagnosis of this patient`

**Visual and accessibility requirements:**

- Keep respiratory demand, drive, muscle effort, assistance, achieved breathing, and experience as distinct nodes. Do not use one shared gauge.
- Show mechanical load opposing muscle action and muscle capacity bounding the patient contribution. Do not introduce compliance/resistance calculations, strength scores, or fatigue thresholds.
- Show patient contribution and ventilator assistance converging before achieved breathing. Do not use percentages, numerical shares, patient-response sliders, or setting recommendations.
- Show the respiratory command generating expected sensory consequences, and show actual sensory feedback returning from achieved breathing toward the brain. Join both at an expected-versus-actual comparison; do not draw breathing experience as the endpoint of a one-way chain. Use a two-direction comparison symbol rather than an arrow that declares discomfort inevitable.
- Do not place Case A facts inside this general mechanism diagram. Present the Case A evidence strip separately.
- Text equivalent: read the relationship from demand to drive to muscle action; name load and capacity; combine patient effort with ventilator assistance; describe achieved breathing and sensory feedback; then state that mismatch can contribute to breathing discomfort without diagnosing a cause.

### Worked connection to Teaching Case A

Show only the approved evidence strip:

```text
PATIENT REPORT                         EFFORT-RELATED OBSERVATION
“I have to work for each breath        Visible inspiratory accessory-muscle activity
right now.”
Meaningful evidence of experience      Meaningful bedside observation

RESPIRATORY DRIVE     MECHANICAL LOAD     MUSCLE CAPACITY     MUSCLE WORK
Not measured here     Not measured here   Not measured here   Not measured here
```

**Exact worked explanation:**

> Case A's report already establishes that breathing feels difficult to the patient. Visible inspiratory accessory-muscle activity adds an effort-related bedside observation. Neither provides a numerical muscle-effort value, and the case does not supply respiratory drive, mechanical load, muscle capacity, ventilator-versus-patient contribution, or the cause of the discomfort. Keep the report and observation as positive evidence while leaving those mechanisms unassigned.

### Fresh local application — assistance and patient contribution

**Model conditions supplied before the response:**

- Two fictional assisted breaths achieve the same modeled volume-and-flow pattern over time.
- Resistance, elasticity, end-expiratory conditions, timing, starting conditions, and respiratory-muscle capacity are held constant.
- Model A supplies more actual delivered inspiratory assistance from the ventilator.
- Model B supplies less actual delivered inspiratory assistance from the ventilator.
- No patient diagnosis, device mode, setting value, or treatment decision is represented.

**Prompt 1:**

> Under these teaching-model conditions, which breath requires the greater respiratory-muscle contribution to produce the same modeled volume-and-flow pattern over time?

**Expected reasoning:**

> Model B requires the greater respiratory-muscle contribution because the ventilator supplies less actual inspiratory assistance while the modeled volume-and-flow pattern, mechanical and starting conditions, timing, and muscle capacity are held constant. This identifies the contribution required to produce that modeled breath; it does not establish that an individual patient can supply it or predict symptoms, drive, or a response to a displayed setting.

**Competent alternatives:** `Model B requires more patient effort`; `the patient's muscles must supply more of the modeled breath in B`; or an equivalent explanation that uses the held conditions. Do not require a numerical share. Do not accept a displayed-setting comparison as a substitute for the stated difference in actual delivered assistance.

**Focused feedback:**

| Learner response pattern | Useful first feedback |
|---|---|
| Chooses Model A | “Both models produce the same volume-and-flow pattern. Which model receives less actual inspiratory assistance from the ventilator?” |
| Says the contribution is the same because displayed volume is the same | “The modeled output is held equal, but actual assistance is not. What contribution is required to change under the stated conditions?” |
| Treats a lower setting as proof of less actual assistance | “This model states the delivered contribution directly. It does not infer assistance from a displayed setting.” |
| Assumes the patient will necessarily compensate or feel different | “The model identifies the greater muscular contribution required to produce the same breath. It does not establish that a patient can supply it or predict the patient's experience.” |
| Chooses Model B with supported reasoning | “Yes. With the same volume-and-flow pattern and mechanical, starting, timing, and muscle-capacity conditions, less actual inspiratory assistance requires greater respiratory-muscle contribution in this teaching model.” |

**Prompt 2 — breathing experience:**

> A separate general model shows respiratory drive signaling an expected breathing result, while sensory feedback reports that the achieved breathing fell short. Which relationship may contribute to breathing discomfort?

**Expected reasoning:**

> A mismatch between the expected result associated with respiratory drive and the sensory feedback from achieved breathing can contribute to discomfort. This is one general explanatory model, not proof of a diagnosis, severity, or treatment need.

**Focused feedback:**

- If the learner equates effort with experience: `Muscular effort and breathing experience are related, but not interchangeable. Compare expected and achieved breathing in this model.`
- If the learner assigns the model to Case A: `Use this as a general relationship only. Case A's report is real evidence, but its mechanism remains unresolved.`
- If the learner identifies the mismatch: `Yes. Expected-versus-achieved sensory mismatch can contribute to discomfort without being the only possible mechanism.`

Both prompts use local, ungraded selection followed by the reviewed explanation. No unrestricted free text is graded, no keyword matching is used, and no provider or score is involved.

### Short local application — CO2 relationship

**Conditions visible before response:**

- simplified steady state;
- negligible inspired CO2;
- CO2 production held constant;
- only modeled alveolar ventilation differs;
- this is not Case A and does not predict a patient value.

**Prompt:**

> Model Y has lower alveolar ventilation than Model X. Under the stated conditions, which model has the higher modeled PaCO2, and why?

**Expected reasoning:**

> Model Y has the higher modeled PaCO2 because PaCO2 varies inversely with alveolar ventilation when CO2 production is held constant. At each resulting steady state, CO2 elimination equals production; the different PaCO2 does not represent a continuing production/elimination imbalance.

**Competent alternatives:** `Lower alveolar ventilation corresponds to higher PaCO2`; `Y has the smaller denominator in the simplified relationship`; or an equivalent directional explanation that states or uses the held-production condition.

**Focused feedback:**

| Learner response pattern | Useful first feedback |
|---|---|
| Chooses Model X | “CO2 production is held constant. Which model has the smaller alveolar-ventilation denominator?” |
| Says production must exceed elimination in Model Y | “At the new steady state, production and elimination are equal. What changes is the CO2 concentration associated with eliminating that production.” |
| Chooses Model Y with supported reasoning | “Yes. With production held constant, lower alveolar ventilation corresponds to higher modeled PaCO2 at steady state.” |

This is an ungraded local response/reveal. It introduces no numerical `K`, model value, patient dead-space assumption, acid-base classification, or Case A prediction.

### Claim-level source support for the consolidated proposal

| Proposed claim | Exact source passage / locator | Inspection record and boundary |
|---|---|---|
| `M02-EF-P01` — respiratory demand, drive, and muscle effort are related but not synonyms | Jonkman, de Vries, and Heunks (2020), **Introduction**, **Definition of Respiratory Drive**, and **What Determines the Respiratory Drive?** Respiratory drive is defined as respiratory-center neural output; effort is respiratory-muscle mechanical output. | Complete official Europe PMC full-text XML directly inspected. `Respiratory demand` is an explicit teaching label for the task breathing must accomplish, not a measured bedside variable or a source-defined synonym for drive. |
| `M02-EF-P02` — muscle effort acts against elastic/resistive load and is constrained by muscle capacity | van Oosten, Akoumianaki, and Jonkman (2025), **PHYSIOLOGY OF BREATHING EFFORT**, first three paragraphs. | Complete official Europe PMC full-text XML directly inspected. No calculations, strength score, fatigue diagnosis, or M05 mechanics are imported. |
| `M02-EF-P03` — assisted tidal volume can reflect both ventilator assistance and patient effort | van Oosten et al. (2025), final paragraph of **PHYSIOLOGY OF BREATHING EFFORT** immediately before **MONITORING INSPIRATORY EFFORT**. | Full text directly inspected. Supports a qualitative two-contributor model, not percentages, a mode/setting recommendation, or Case A's assistance level. |
| `M02-EF-P04` — clinical signs are screening observations, not quantified effort | van Oosten et al. (2025), Table 1 row **Clinical signs: accessory or abdominal muscle use, respiratory rate, rapid shallow breathing index**; existing `M02-C04`. | Full text directly inspected. No cut-off, severity score, named causal muscle, or measured-work claim is added. |
| `M02-EF-P05` — breathing experience is patient-reported evidence; expected/actual sensory mismatch can contribute to dyspnoea | Demoule et al., ERS/ESICM statement (2024), **Definition of dyspnoea and operational issues**, **Self-report of dyspnoea**, **What is dyspnoea the symptom of?**, and Figure 3 caption **Mechanisms of dyspnoea**. | Official ERS body passages and Figure 3 caption directly retrieved through targeted search; direct article/PDF opens returned HTTP 403. The model is general and is not assigned to Case A. |
| `M02-EF-P06` — for the same volume-and-flow pattern and mechanical conditions, ventilator pressure and muscle pressure jointly meet the elastic and resistive requirements | *The equation of motion: a brief guide to ventilator adjustment* (2025), **The equation of motion**, Equations 1 and 2 and the paragraph defining `Pvent + Pmus` against resistive and elastic loads. | Oxford Academic indexed full-text passage directly inspected. Supports the constrained qualitative contribution comparison, not a setting-to-assistance guarantee, patient compensation, symptom prediction, or treatment recommendation. |
| `M02-CO2-P01` — under stated steady-state conditions, lower alveolar ventilation corresponds to higher PaCO2 when production is held constant | Wang et al. (2020), **Introduction**, **The Ventilation Identities** assumptions 1 and 3, **Carbon dioxide** Equation 6, and **The alveolar ventilation equation** Equations 9 and 10. | Official APS full-text body, assumptions, and equations directly inspected in the research pass. No numerical `K`, patient calculation, or Case A steady-state assumption is added. |

Full citations, retrieval provenance, verification anchors, and access limitations are recorded in the [M02 demand/effort and CO2 research handoff](../../../../output/m02-effort-co2-authoring-research-2026-09-22.md).

### Assessment-coverage alignment

| Understanding / evidence | What the earlier or proposed local practice demonstrates | What unchanged approved Case B demonstrates | Deliberate limit |
|---|---|---|---|
| Total versus modeled alveolar ventilation | Existing paired-breath practice applies the fixed teaching assumption and explains 7 versus 4 L/min. | Learner must identify 10.0 L/min as total gas moved and must not invent an alveolar value. | Case B does not derive the model again. |
| CO2 production/alveolar-ventilation relationship | The proposed local Model X/Y task applies directionality under explicit conditions. | Learner uses matched PaCO2 as direct current evidence and does not replace it with minute volume. | Case B does not retest the steady-state equation. |
| Demand, drive, load, capacity, assistance, effort, and experience | The proposed visual and local model require using the contribution and mismatch relationships. | Learner includes the patient report and effort-related observation without quantifying effort or assigning a mechanism. | Case B does not require explaining the entire demand/effort model. |
| Integrated bedside reasoning | Earlier activities teach mechanisms with support. | Case B independently integrates oxygen-support, current PaCO2, total minute volume, and patient/bedside evidence. | Case B is not evidence of independent mastery of every underlying mechanism. |

**Approved assessment decision:** preserve the existing approved Case B prompt, rubric, error priorities, and first assembled exposure unchanged. The local CO2 and demand/effort applications provide bounded practice with the newly taught mechanisms before reveal; Case B continues to assess integrated bounded interpretation. No additional essay or Case B rubric requirement is approved for this batch.

**Review-requiring fallback only:** if a future owner decision requires Case B itself to demonstrate mechanism transfer, the smallest candidate post-response prompt is:

> Choose one relationship from the module that helps explain why the displayed output does not settle the patient's breathing burden. State the relationship without assigning a cause or measured effort to this patient.

Do not add that sentence to the current Case B contract or grader without a separate bounded rubric review.

### Bounded review decision for the consolidated batch

Brianna approved the following six consequential decisions on 2026-09-22, including the clarified actual-assistance comparison and feedback-loop visual:

1. Does the demand → drive → muscle effort model distinguish the constructs accurately at M02 depth?
2. Do mechanical load, muscle capacity, patient contribution, and actual delivered ventilator assistance connect correctly without importing M05 mechanics, treating a setting as delivered assistance, or inventing quantitative shares?
3. Does the expected-versus-actual sensory-feedback loop teach one useful dyspnoea mechanism without becoming a one-way causal chain or diagnosing Case A?
4. Are the same-volume-and-flow, mechanical, timing, starting, and muscle-capacity conditions sufficient to support the conclusion that greater muscular contribution is required, without implying guaranteed patient compensation?
5. Are the CO2 application conditions, directional conclusion, alternatives, and steady-state feedback valid without predicting Case A?
6. Is preserving the existing Case B rubric, while using the two local activities for mechanism application, sufficient and fair for this M02 scope?

## 6. Function 5 — Independent Case B bedside snapshot

### Learner-visible evidence

**Heading:** Current bedside snapshot

```text
CURRENT SUPPORT                 MONITOR / RESPIRATORY DISPLAY
FiO2 0.70                       SpO2 94% — reliable signal
SET                             OBSERVED DISPLAY
                                Exhaled minute volume 10.0 L/min
                                CALCULATED FOR THE STATED CURRENT INTERVAL

CURRENT GAS EVIDENCE            PATIENT / BEDSIDE
PaCO2 42 mm Hg                  Patient: “Breathing feels hard right now.”
MEASURED ARTERIAL SAMPLE        PATIENT REPORT
Matched to current support      Visible inspiratory neck-muscle recruitment
and time snapshot               OBSERVED
```

**Not supplied:** dead-space estimate; diagnosis; waveform; quantified respiratory-muscle effort; PaO2; hemoglobin; perfusion assessment.

The four cards are intentionally unsorted. They must not be headed “oxygenation,” “CO2,” or “effort.” Their grouping communicates provenance and current support/time context only.

### Exact independent prompt

> Respond in three concise parts.
>
> **1. Name the question.** What question does each of these help address: SpO2 with FiO2, current PaCO2, exhaled minute volume, and the patient/bedside evidence?
>
> **2. Integrate.** State the strongest supported interpretation of oxygenation, current CO2 evidence, total minute ventilation, and breathing-burden evidence. Do not use one as proof of the others.
>
> **3. Choose one unresolved question.** Name one assessment or evidence source that would clarify it, and briefly say why.

**Response guidance:** A few sentences are enough. Use ordinary bedside language. Do not diagnose, prescribe treatment, select a modality, calculate oxygen content, invent dead space, or name a test without saying what question it would clarify.

### Independent response contract

| Required reasoning | Accepted ordinary wording | Not required / not accepted as a substitute |
|---|---|---|
| SpO2 in support context | “94% is oxygenation evidence on FiO2 0.70; it does not tell us the whole oxygen pathway.” | A severity label, PaO2, oxygen-content calculation, or modality recommendation. |
| Current PaCO2 | “42 is current arterial CO2 evidence under the stated conditions.” | “Therefore ventilation is globally adequate,” acid-base classification, trend, or target-range recital. |
| Total minute ventilation limit | “10.0 L/min is total gas moved; no dead-space estimate is supplied.” | An invented alveolar value, a diagnosis, or a claim that minute volume is useless. |
| Breathing-burden evidence | “The report and neck recruitment matter now, without quantifying effort or naming a mechanism.” | A measured-work value, drive/effort synonym claim, diagnosis, or treatment requirement. |
| One next evidence path | A purpose-linked focused breathing assessment/report clarification, oxygen-pathway/perfusion question, or support-context assessment. | “Get an ABG,” “assess the patient,” or “need more data” with no stated purpose. |

### Case B visual and accessibility specification

| Requirement | Specification |
|---|---|
| Instructional purpose | Keep all evidence visible and inspectable without revealing the physiological classification task. |
| Hierarchy | Heading → four equal-weight cards → explicitly-not-supplied strip → prompt. |
| Initial/reveal behavior | All facts necessary for independent retrieval are visible initially. No explanatory labels, pathway mapping, answer keys, or hints appear before initial submission. |
| Provenance/units | Each card carries SET, OBSERVED DISPLAY, MEASURED, CALCULATED, PATIENT REPORT, or OBSERVED; values have FiO2, mm Hg, and L/min units/time statement. |
| Must not imply | That any card is a global score, that FiO2 0.70 is a threshold, that PaCO2 42 is globally adequate, or that report/recruitment is measured effort. |
| Text equivalent | The card text above followed by the not-supplied list and exact prompt. |
| Semantic/keyboard | Semantic heading; four labeled regions in visual reading order; not-supplied heading/list; one multiline response field labeled “Case B response”; visible prompt remains adjacent; keyboard focus moves from facts to response without hidden interactive regions. |
| Status announcement | On initial submission: “Independent response submitted. Feedback will address one reasoning gap if needed.” No correctness is announced until evaluation succeeds. |

## 7. Function 6 — Semantic rubric, targeted feedback, and synthesis

### Evaluation principle

Evaluate the learner’s reasoning, not similarity to a model answer. Equivalent concise clinical wording passes. Correctly repeating a number cannot compensate for a cross-domain overclaim.

### Assessment disposition

| Disposition | Criteria |
|---|---|
| Competent initial response | Uses the four evidence domains with their limits; uses the report/recruitment; avoids construct collapse; and names one purpose-linked next evidence path. |
| Actual-gap follow-up | Initial response has one dominant consequential gap. Ask only the corresponding first feedback question below. Revision is assisted learning. |
| Evaluation unavailable | Preserve the response, state that evaluation could not be completed, and do not mark pass/fail. |

### Dominant-error priority and exact first feedback

Apply the first matching consequential error in this order; do not dump the full rubric.

| Priority | Dominant error | Exact first feedback | One manageable next question |
|---:|---|---|---|
| 1 | Global reassurance / cross-domain overclaim | “You used several reassuring-looking values. Which supplied evidence establishes that the patient’s whole respiratory state is reassuring?” | “Separate what SpO2 on FiO2, current PaCO2, minute volume, and the patient report each answer.” |
| 2 | Minute ventilation equals adequate CO2 elimination | “Minute volume tells us total gas moved for this interval. What assumption would be needed before it estimated the gas-exchanging portion?” | “What current CO2 evidence is already supplied, and what does it establish?” |
| 3 | Ignores patient/breathing-burden evidence | “The numerical values are useful. What do the patient’s words and visible neck-muscle recruitment add?” | “State their value without turning either into a measured effort or a cause.” |
| 4 | Blanket uncertainty | “Some questions remain open, but this snapshot is not empty.” | “Name one conclusion supported by the matched PaCO2 and one limit of SpO2 on FiO2.” |
| 5 | Construct collapse | “The report and neck-muscle observation matter, but no measurement here quantifies muscle effort or proves why it is happening.” | “Rewrite that part as qualitative evidence and name what remains unmeasured.” |
| 6 | Otherwise competent, one bounded component absent | “Your interpretation is well bounded. One component still needs to be named.” | Ask only for the omitted component: support context, minute-volume limit, patient evidence, or purpose-linked next evidence. |

**Competent first response acknowledgment:**

> You kept the pathways separate: oxygenation under support, current arterial CO2 evidence, total gas moved, and meaningful breathing-burden evidence. Your next assessment is linked to a real unresolved question.

Initial response remains **independent retrieval**. Any response after targeted feedback is **assisted learning**, even when it becomes complete.

### Post-pass/post-revision synthesis

Reuse the three-pathway visual with Case B evidence attached to its relevant pathway only after the learner has completed the initial attempt.

> This snapshot supplied meaningful evidence on several pathways. SpO2 belongs with its FiO2 context. Current PaCO2 is current arterial CO2 evidence, not a global adequacy label. Minute volume is total gas moved, not an alveolar estimate without an assumption. The patient’s report and neck-muscle recruitment add a different concern without becoming a measured work value. Use each for its question; keep the remaining questions visible.

**Accessibility:** Feedback appears in a semantic status region after submission. Its heading is “Feedback on your reasoning.” It announces only the targeted message and next question, not a hidden score. Synthesis appears after a competent first response or assisted revision and is labeled “Synthesis after your response.”

## 8. Function 7 — Transfer: same saturation, different support context

### Learner-visible comparison

**Heading:** Same displayed saturation. Different support context.

| C1 | C2 |
|---|---|
| `SpO2 94%` — reliable signal | `SpO2 94%` — reliable signal |
| `FiO2 0.30` — current support | `FiO2 0.70` — current support |

**Controlled/outside this comparison:** CO2 and breathing-burden evidence. Neither is supplied as a changed variable.

### Exact transfer prompt

> Compare C1 and C2 in three short statements: what stayed the same, what changes the oxygenation interpretation, and what still cannot be concluded from these cards?

No modality, escalation, ARDS-classification, diagnosis, oxygen-delivery calculation, or treatment choice is required.

### Reveal after response

> Both cards show the same reliable SpO2. C2 shows the same displayed SpO2 while receiving higher FiO2. The cards do not establish a severity category, oxygen delivery, a cause, a modality choice, or what CO2 and breathing-burden evidence would show.

### Transfer visual and accessibility specification

| Requirement | Specification |
|---|---|
| Instructional purpose | Make unchanged output and changed support context simultaneously visible. |
| Hierarchy | Equal-width C1/C2 cards; identical SpO2 line aligned in the same position; FiO2 line directly below. |
| Initial/reveal behavior | Both cards and controlled-evidence note are visible before response. The reveal appears only afterward. |
| Provenance | SpO2 is `OBSERVED DISPLAY`; FiO2 is `SET SUPPORT`; all values are fictional authored teaching facts. |
| Must not imply | Safe/unsafe, mild/severe, diagnosis, ARDS classification, intervention, or escalation. |
| Text equivalent | “C1 and C2 both have reliable SpO2 94%. C1 has FiO2 0.30; C2 has FiO2 0.70. CO2 and breathing-burden evidence are controlled or outside this comparison.” |
| Accessibility | Heading; two equal list sections read C1 then C2; no color-only difference; multiline response labeled “Transfer response”; reveal in a status region after response. |

## 9. Clinical fidelity check

| Learner-facing element | Supporting M02 claim ID(s) | Approved / gap |
|---|---|---|
| Orientation’s noninterchangeable-evidence premise | M02-CR-001, M02-DS-001 | Approved |
| Three-pathway visual and matching | M02-CR-001, M02-C01, M02-C02, M02-C03, M02-C04 | Approved |
| Oxygen pathway’s hemoglobin/content/perfusion endpoint | M02-C01 | Approved; names context only, no calculation |
| Approved support → V/Q exchange → saturation → content → delivery explanation | M02-C01, M02-CR-001, proposed-addition claims `M02-OX-P01` through `M02-OX-P04` | Approved 2026-09-22 for bounded limited-prototype implementation; not clinical-ready |
| Approved Case A oxygen-pathway worked application | M02-C01, M02-DS-001, proposed-addition claim `M02-OX-P05` | Approved 2026-09-22; reuses existing facts and adds no patient finding |
| Approved held-variable oxygen-content fresh application | Proposed-addition claims `M02-OX-P03`, `M02-OX-P04`, `M02-OX-P06` | Approved 2026-09-22; separate from Case A, Case B, and C1/C2 |
| Approved demand/drive/load/capacity/assistance explanation and application | `M02-C04`, `M02-CR-001`, approved addition claims `M02-EF-P01` through `M02-EF-P06` | Approved 2026-09-22 for bounded limited-prototype implementation; not clinical-ready |
| Approved steady-state CO2 directional application | `M02-C02`, `M02-C03`, approved addition claim `M02-CO2-P01` | Approved 2026-09-22 for bounded limited-prototype implementation; nonpatient model only |
| Approved assessment alignment decision | Existing approved Case B contract plus local application evidence | Approved 2026-09-22; Case B prompt and rubric remain unchanged, and the fallback prompt remains deferred |
| Paired-breath equation, 0.15 L assumption, 10/7/4 values, and boundary | M02-C02, M02-DS-001 | Approved |
| Output-versus-burden bridge | M02-C04, M02-CR-001 | Approved |
| Case B cards, exact facts, prompt, and response limits | M02-C01, M02-C02, M02-C03, M02-C04, M02-DS-001 | Approved |
| Feedback priority and synthesis | M02-CR-001, M02-C01 through M02-C04 | Approved; no treatment or target claim added |
| C1/C2 transfer and reveal | M02-C01, M02-CR-001, M02-DS-001 | Approved |

**Oxygenation-addition review state:** the ventilation/perfusion explanation and held-variable oxygen-content application are source-supported claims `M02-OX-P01` through `M02-OX-P06`, approved by Brianna on 2026-09-22 for the bounded standalone-prototype use stated above. This does not approve the surrounding historical authoring file or make the complete module clinical-ready. The previously reviewed draft remains unchanged outside the clearly marked addition and the fidelity table entries above.

**Demand/effort and CO2 batch review state:** claims `M02-EF-P01` through `M02-EF-P06`, `M02-CO2-P01`, their local applications/feedback, the actual-assistance and feedback-loop clarifications, and the no-Case-B-rubric-change assessment decision were approved on 2026-09-22 for bounded implementation in the standalone prototype. This is not a clinical-ready or release decision.

## 10. Implementation handoff constraints

- Reuse existing OpenMAIC classroom and reasoning-checkpoint primitives; do not infer a need for new interaction architecture from this draft.
- This authoring draft does not itself authorize stage creation, provider calls, or grader implementation. Those require a separately authorized implementation task using existing OpenMAIC primitives.
- Preserve all evidence cards while Case B is answered.
- Preserve initial Case B response as independent retrieval and mark later revision as assisted learning.
- Do not add a treatment recommendation, threshold badge, patient-specific response simulation, or new scoring architecture as part of implementation.
- Any consequential change to approved clinical meaning, visual relationship, teaching assumption, case fact, rubric/feedback boundary, source applicability, or transfer interpretation reopens qualified-RT review scope.
