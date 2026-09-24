# M01 qualified-RT review packet

> **Review state:** qualified RT approval recorded for the exact corrected candidate. This packet does not confer a clinical-ready label; separate release gates remain.

## 1. Review target and version identity

| Field | Value |
|---|---|
| Module | `adult-icu-rt-foundations-01` — M01, *What Do We Actually Know?* |
| Persisted stage | `stage-iNchX3Sscq1_` |
| Learner-content version | SHA-256 `f24f537c7f0f31df3194a096a87d9b326334ee3cb527b16c22743196c265c394` |
| Hash projection | Ordered scene IDs, order, title, type, content, and actions; excludes timestamps and review metadata. |
| Teaching contract | [M01_TEACHING_CONTRACT.md](../../../rt-foundations/M01_TEACHING_CONTRACT.md), v0.1 dated 2026-09-15 |
| Terminology | [TERMINOLOGY.md](../../../rt-foundations/TERMINOLOGY.md) |
| Intended learner/scope | Practicing adult acute/ICU RT; reasoning refresher, not patient-specific direction, credentialing, or a treatment protocol. |
| Current status | Private generated/source-mapped draft prepared for review; not clinical-ready. |

This packet is tied to the stage hash above. Any change to a case fact, visual label, explanation, rubric, feedback, or dependent source requires a new hash and renewed review scope.

## 2. Materials presented to the reviewer

### Learner-facing captures

- `output/playwright/m01-qualified-rt-review-corrected/stage-iNchX3Sscq1_-scene-1.png` through `-scene-6.png`: corrected six-page learner sequence captured 2026-09-16.
- `output/playwright/m01-qualified-rt-review-corrected/scene-2-corrected-terminology.png`: first-use terminology correction.
- `output/playwright/m01-qualified-rt-review-corrected/case-a-refined-reveal-2.png`: Case A bounded-inference reveal.
- `output/playwright/m01-qualified-rt-review-corrected/scene-5-corrected-case-b.png`: Case B actual paragraph breaks and corrected gate guidance.

### Calculations and explicit assumptions

| Case | Calculation | Declared assumptions | Not established |
|---|---|---|---|
| A | `28 breaths/min × 0.40 L/breath = 11.2 L/min` | Total rate and mean exhaled volume are reliable and cover the same 60-second interval. | CO2 adequacy, breathing effort/experience, diagnosis, treatment, safety. |
| B1/B2 | `20 breaths/min × 0.45 L/breath = 9.0 L/min` each | Same exact one-minute interval; synthetic facts. | CO2 adequacy; B1 breathing assessment; B2 cause, severity, or quantified effort. |
| C | Valid current rate × exhaled-volume calculation for its own interval. | Earlier PaCO2/pH predates a meaningful support change. | Current PaCO2/pH under later support; direction of any unseen change; a required retest. |

### Semantic rubric boundaries

- **Case A:** two ordinary one-question supported-practice quizzes; neither is a reasoning gate. Immediate explanation follows each submitted prediction. Prediction 2 cannot be exposed while Prediction 1 is being reviewed.
- **Case B:** sole independent reasoning checkpoint. Pass requires all three: correct `9.0 L/min` calculations, separate bounded CO2/breathing interpretation that uses B2’s patient report and neck-muscle observation without cause or quantified-effort overclaim, and one relevant current CO2/gas-context source plus one focused breathing assessment/report clarification.
- Correct arithmetic cannot offset an unsupported adequacy conclusion. Exact wording, a specific test name, treatment settings, diagnosis, full differential, dead-space equation, and a specialized monitor are not required.
- A first partial/incorrect Case B response receives one actual-gap question without the full answer; revision is assisted learning. A competent first answer receives synthesis without a fake revision.
- **Case C:** tests time/support-context applicability; it must not teach that historical data are invalid, that PaCO2 necessarily changed, or that a setting change follows.

## 3. Claim-level source-record inventory

| ID | Exact claim or bounded instructional assertion | Source record and review state | Principal dependent assets |
|---|---|---|---|
| M01-CR-001 | Patient-ventilator assessment is comprehensive and patient-centered. | [M01-CR-001](source-records/M01-CR-001-patient-ventilator-assessment.md) — source-mapped scope claim. | Scene 1 framing; Scene 2 patient/support model. |
| M01-DS-001 | Provenance labels are a product learning convention, not a clinical taxonomy. | [M01-DS-001](source-records/M01-DS-001-provenance-taxonomy.md) — generated design convention. | Terminology; Scene 2 labels. |
| M01-DS-002 | Synthetic matched-window cases are original educational assets, not patient data or treatment examples. | [M01-DS-002](source-records/M01-DS-002-synthetic-provenance-case.md) — generated design asset. | Case facts and arithmetic contexts. |
| M01-C01 | Time-matched breaths/min × exhaled L/breath produces calculated exhaled L/min for the stated interval. | [M01-C01](source-records/M01-C01-exhaled-minute-volume-calculation.md) — source-mapped derivation. | Case A/B/C calculations and labels. |
| M01-C02 | Minute volume alone does not establish CO2 adequacy; current CO2/gas context answers a different question. | [M01-C02](source-records/M01-C02-minute-volume-co2-limit.md) — source-mapped limited physiology claim. | Scene 2 CO2 branch; A/B/C explanations, rubric, feedback. |
| M01-C03 | Minute volume does not quantify patient effort or establish acceptable effort. | [M01-C03](source-records/M01-C03-breathing-effort-limit.md) — source-mapped limited assessment claim. | Scene 2; Case A reveal; Case B rubric/feedback; terminology. |
| M01-C04 | B2 patient report and neck-muscle recruitment are distinct qualitative evidence, not cause/severity/quantified work. | [M01-C04](source-records/M01-C04-breathing-experience-and-observation.md) — source-mapped bounded symptom/observation claim. | Case B prompt, analysis, rubric, feedback, terminology. |
| M01-C05 | Pre-change PaCO2/pH is historical evidence, not a direct measurement under later support. | [M01-C05](source-records/M01-C05-time-support-applicability.md) — source-mapped provenance inference with review caveat. | Case C prompt/analysis; terminology. |

Each record contains source organization/authors, version/date, stable identifier, exact section/page or derivation, applicability, limitations, dependent assets, unresolved work, and review status. No module-level bibliography is used as a substitute.

## 4. Source set and limits

| Source | Version/date and exact locator | Supports | Does not support |
|---|---|---|---|
| Goodfellow et al., AARC *Patient-Ventilator Assessment* | Respir Care 69(8), 2024, pp.1042-1054, DOI `10.4187/respcare.12007`; PDF p.1043 Introduction/Figure 1; recommendation 7-8. | Comprehensive patient-centered and direct bedside assessment framing. | A universal CO2 target, an effort cutoff, a particular test, or a treatment change. |
| Wang et al., *Teaching an intuitive derivation of the clinical alveolar equations* | Adv Physiol Educ 44(2), 2020, pp.145-152, DOI `10.1152/advan.00064.2019`; **Alveolar ventilation** derivation, Equation 1. | Distinction between total minute volume and alveolar ventilation; conceptual CO2 limit. | Adult-ICU protocol, dead-space calculation requirement, or patient-specific conclusion. |
| van Oosten et al., *Monitoring respiratory muscles effort during mechanical ventilation* | Curr Opin Crit Care 31(1), 2025, pp.12-20, DOI `10.1097/MCC.0000000000001229`; **Physiology of breathing effort** and Table 1. | Effort is not inferable from volume/waveform alone; accessory-muscle use is a clinical screening sign without a cutoff. | A severity score, a cause, an optimal effort target, or mandatory monitor. |
| Guttormson et al., ATS *Symptom Assessment for Mechanically Ventilated Patients* | Ann Am Thorac Soc 20(4), 2023, pp.491-498, DOI `10.1513/AnnalsATS.202301-023ST`; **Symptom Assessment Principles and Strategies**. | Self-report when possible; communication facilitation; observation as qualitative symptom assessment. | A work-of-breathing measurement, diagnosis, severity score, or treatment algorithm. |
| Haouzi, *Last Word on Viewpoint* | J Appl Physiol 133(4), 2022, p.918, DOI `10.1152/japplphysiol.00501.2022`; paragraph on acute mechanical-support changes and CO2 exchange. | Need to retain support context in CO2 interpretation. | A universal re-sampling interval, mandatory ABG, or predicted direction after a support change. |

## 5. Known limitations and evidence gaps

1. **No source establishes a universal “adequate CO2 clearance” or “acceptable breathing effort” threshold.** M01 intentionally teaches no threshold. The qualified RT reviewer must confirm that the bounded wording is clinically sound for an adult ICU refresher.
2. **Case C is a provenance inference, not a guideline recommendation.** Its source set supports the relevance of support context, but does not define “meaningful” support change, retesting interval, or unseen PaCO2 direction.
3. **The patient report and neck-muscle observation are qualitative.** The module correctly avoids a cause or a numerical work-of-breathing claim; the reviewer must confirm case realism and wording.
4. **Corrected-version verification completed.** The generic reasoning-checkpoint helper now requests interpretation, supporting evidence, remaining uncertainty, and relevant next assessment/evidence. Case B renders actual paragraph breaks, and Scene 2 introduces calculated exhaled minute volume alongside the teaching label. Brianna Yonkin approved the exact hashed candidate on 2026-09-16.
5. **Two requested governance files are absent:** `docs/rt-foundations/EVIDENCE_AND_REVIEW.md` and `docs/rt-foundations/QUALITY_GATES.md`. This packet used the existing [Clinical Content, Evidence, and Review Policy](../../../rt-foundations/CLINICAL_CONTENT_POLICY.md), [clinical-content standard](../../README.md), and source-record/review templates instead. The missing files should be reconciled before any release process, but do not change the reviewed learner content.
6. **Source currency/retraction monitoring remains a release responsibility.** Sources were checked for identity and version in this pass; qualified review must recheck updates/corrections and local-policy applicability at decision time.

## 6. Questions for the qualified adult ICU RT reviewer

1. Is **gas moved per minute** an accurate, clear label for the stated calculated exhaled volume, and does it avoid implying alveolar ventilation or clinical adequacy?
2. Are the limits placed on calculated minute volume clinically sound: it supports only the stated interval calculation, not adequate CO2 clearance or acceptable breathing effort?
3. Is the **CO2-evidence** language appropriately bounded—current relevant CO2/gas information with time/support context—without making ABG a password, implying a target, or requiring a specific action?
4. Are **breathing experience** and **effort-related observations** represented correctly: patient report and visible neck-muscle recruitment are meaningful qualitative evidence, but not numerical work, cause, or severity?
5. Are Case B’s accepted/rejected reasoning boundaries fair? In particular, should a response pass when it uses equivalent relevant assessment language without naming an ABG, specialized monitor, diagnosis, or treatment plan?
6. Does Case C correctly handle time/support-context applicability while preserving the historical value of the earlier PaCO2/pH and avoiding a predicted direction or mandatory retest?
7. Does any wording, visual label, distractor, feedback path, or the generic reasoning-gate helper teach an unsafe shortcut, especially the visible “mechanism” instruction that is not an M01 requirement?
8. Do the synthetic cases remain appropriate for adult acute/ICU RT learners without being misconstrued as an actual bedside protocol or delaying assessment/escalation?

## 7. Qualified-review decision record

Reviewer identity, credential, jurisdiction, adult acute/ICU experience, conflicts, date, reviewed source set, and decision must be completed by the qualified reviewer in the repository’s [qualified-RT review template](../../templates/qualified-rt-review.md). Do not populate them automatically.

## 8. Packet disposition

**Qualified RT approval recorded for the exact corrected candidate.** The package closes claim-level source records for the current version and explicitly exposes the remaining source limitations. It is **not** clinical-ready until separate release gates are completed.
