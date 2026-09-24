# M02 physiology-depth additions: bounded review packet

**Status:** Brianna's bounded qualified-RT approval recorded on 2026-09-21 for the five additions in this exact packet version. This packet does not revise the live prototype, approved Case B, claim/source map, or prior approval history.

**Scope:** deepen only the approved Teaching Case A → paired-breath model → Teaching Case A prototype slice. No Case B, transfer, grading, treatment selection, patient-specific prediction, or full-module content is proposed.

**Approval scope:** proposed wording; model labels and approved accounting; the ratio visual; the general breathing-experience explanation; and the worked Teaching Case A synthesis. This approval does not cover prototype implementation, full-module release, patient-specific calculations, live grading, clinical-ready status, or prior approval records.

## Review summary

| Addition                                | Existing claim IDs                 | New instructional assertion                                                              | Review needed                               |
| --------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- |
| Non-gas-exchanging portion              | `M02-C02`, `M02-DS-001`            | Meaning of the fixed teaching assumption, including anatomical and alveolar contributors | Yes: learner wording and visual implication |
| One breath to one minute                | `M02-C02`, `M02-DS-001`            | Per-breath and per-minute accounting of the existing model                               | Yes: explanatory visual labels              |
| Alveolar ventilation and PaCO2          | `M02-C02`, `M02-C03`               | Simplified steady-state relationship, explicitly not a Case A prediction                 | Yes: wording and boundary                   |
| Oxygen/support and breathing experience | `M02-C01`, `M02-C04`, `M02-CR-001` | Short mechanism explanations behind existing distinctions                                | Yes: learner-facing relationship wording    |

## 1. What does the non-gas-exchanging portion represent?

**Question answered:** Why is subtracting a fixed portion from each breath a meaningful teaching model?

**Proposed learner-facing copy:**

> A breath can move gas without all of that gas participating in exchange. Some gas occupies conducting airways before it reaches alveoli; some reaches alveoli that are ventilated but contribute little or no exchange because perfusion is limited. In this model, those contributors are deliberately collapsed into one fixed **0.15 L teaching assumption per breath**. It is not this patient's dead-space measurement, a normal adult value, or a treatment target.

**Visual/interaction specification:** Label the pale segment `0.15 L assumed non-gas-exchanging portion`; label the dark segment `Modeled gas-exchanging portion`; label the final output `Modeled alveolar ventilation`; and show `Fixed teaching assumption—not a patient measurement` as the model boundary.

**Learner should now explain:** The subtraction represents a modeled portion that does not contribute to exchange in the comparison; it does not mean every non-gas-exchanging breath portion stays outside alveoli.

**Claim/support:** Wang et al. derives alveolar ventilation as `RR × VT × (1 − VD/VT)`, algebraically `(VT − VD) × RR`; its dead-space discussion supports the distinction. Hinkson et al. supports dead-space relevance to CO2 interpretation while common ventilator variables are held constant. Existing record: `M02-C02`.

**Limit:** This wording does not teach a patient-specific dead-space estimate, distinguish a measured anatomical versus physiological dead-space value in Case A, or infer PaCO2, severity, diagnosis, or treatment.

## 2. How does one breath become one minute?

**Question answered:** Why do equal 10.0 L/min total volumes leave different modeled alveolar volumes under the same stated assumption?

**Proposed learner-facing copy:**

> First compare one representative breath. Pattern A has 0.50 L total volume: under the stated assumption, 0.15 L is assumed non-gas-exchanging and 0.35 L is modeled gas-exchanging. Pattern B has 0.25 L total volume: the same 0.15 L assumption leaves 0.10 L modeled gas-exchanging. Then count each pattern for one minute. The assumed portion is counted 20 times in A (`0.15 × 20 = 3 L/min`) and 40 times in B (`0.15 × 40 = 6 L/min`). Both move 10 L/min total, leaving `10 − 3 = 7 L/min` versus `10 − 6 = 4 L/min` modeled alveolar ventilation.

**Visual/interaction specification:** After the ungraded prediction, reveal a two-row stepped comparison:

| Label      | Pattern A                                                                                                | Pattern B                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| One breath | `0.15 L assumed non-gas-exchanging portion + 0.35 L modeled gas-exchanging portion`                      | `0.15 L assumed non-gas-exchanging portion + 0.10 L modeled gas-exchanging portion`                      |
| One minute | `10 L/min total = 3 L/min assumed non-gas-exchanging ventilation + 7 L/min modeled alveolar ventilation` | `10 L/min total = 6 L/min assumed non-gas-exchanging ventilation + 4 L/min modeled alveolar ventilation` |

The total-breath bars retain the common reference scale: A is 0.50 L wide, B is 0.25 L wide, and both 0.15 L segments use the same absolute width. The text alternative states every value and equation in the table at the same reveal.

**Learner should now explain:** A fixed per-breath assumed portion consumes a larger share of a smaller breath and is repeated more often at the higher rate; equal total minute volume therefore does not force equal modeled alveolar volume.

**Claim/support:** Existing `M02-C02` and `M02-DS-001`; arithmetic has the approved A/B inputs and outputs. No new model value is introduced.

**Limit:** These are fictional arithmetic consequences, not a patient measurement, normal range, or recommendation.

## 3. How does the model relate to arterial CO2?

**Question answered:** Why can total minute volume be insufficient context for a current PaCO2 result?

**Proposed learner-facing copy:**

> At steady state, assuming negligible inspired CO2, the body eliminates CO2 at the rate it produces it. In the simplified clinical model, with production unchanged, lower alveolar ventilation corresponds to higher PaCO2; higher alveolar ventilation corresponds to lower PaCO2. The difference is the CO2 concentration associated with eliminating that production—not a continuing imbalance between production and elimination. Case A’s minute-volume display alone cannot predict its measured PaCO2.

**Visual/interaction specification:** Use the ratio visual:

```text
                 CO2 production
PaCO2 ≈ K × ───────────────────────
              alveolar ventilation
```

Equivalent mathematical source: `P_{a\mathrm{CO}_2} \approx K\,\frac{\dot V_{\mathrm{CO}_2}}{\dot V_A}`.

Labels: `CO2 production relative to alveolar ventilation`; numerator `CO2 production`; denominator `Alveolar ventilation`; caption `Simplified steady-state relationship—not a patient calculation`; condition `Production held constant for this comparison`; and separate case label `Case A: PaCO2 40 mm Hg—measured arterial sample, not a model prediction`.

**Learner should now explain:** Total gas moved is not interchangeable with alveolar ventilation, and a current PaCO2 answers a different, directly measured question under stated conditions.

**Claim/support:** Wang et al., _Advances in Physiology Education_ 2020;44:145-152, DOI `10.1152/advan.00064.2019`, `Clinical Alveolar Equations` → `The alveolar ventilation equation`, Equations 9 and 10; the supplied audit identifies Equation 9 as the alveolar relationship and Equation 10 as its clinical arterial form. Existing `M02-C02` and `M02-C03` retain the measurement-applicability boundary.

**Limit:** No adequacy target, acid-base classification, metabolic-rate inference, ventilator-setting recommendation, or calculated/predicted Case A PaCO2 is proposed.

## 4. Why do oxygen support and breathing experience remain separate questions?

### Oxygen support

**Question answered:** Why is the same saturation not the whole oxygenation or delivery story?

**Proposed learner-facing copy:**

> SpO2 is a pulse-oximeter estimate of arterial hemoglobin oxygen saturation. Saturation describes the fraction of hemoglobin binding sites occupied by oxygen—not how much hemoglobin is present. The same saturation can therefore accompany different oxygen contents when hemoglobin concentration differs. Delivery to tissues also depends on blood flow. Interpret the displayed saturation alongside the oxygen support being delivered.

**Visual labels:** `SpO2—pulse-oximeter estimate of arterial saturation`; `FiO2—set oxygen-support context`; `Hemoglobin concentration and blood flow—additional context, not supplied`.

**Claim/support:** Collins et al., _Breathe_ 2015;11:194-201, DOI `10.1183/20734735.001415`, `Oxygen carriage in the blood`, `Oxygen delivery to the tissues`, and `Understanding oxygen saturation and partial pressure` (including the pulse-oximeter estimate distinction); PubMed PMID `26632351`. Existing `M02-C01` limits this to context, not oxygen-delivery calculation.

**Limit:** No oxygen-content calculation, perfusion assessment, severity label, modality selection, escalation, or treatment target.

### Breathing experience and effort-related observation

**Question answered:** Why do the patient's report and an observed sign still matter when gas-exchange values are displayed?

**Proposed learner-facing copy:**

> During assisted ventilation, the ventilator and the patient’s respiratory muscles both contribute to moving gas. A displayed volume does not reveal how much muscular effort the patient supplied. Gas-exchange measurements and the effort needed to obtain them are therefore different assessment questions.

> Breathing discomfort can arise when the brain’s drive to breathe and the feedback from the achieved breathing do not match. This is a general explanatory mechanism—not a diagnosis of what is happening in Case A.

> Case A’s report already tells us that breathing feels difficult to the patient. The accessory-muscle observation adds a bedside sign. What remains unresolved is the explanation for those findings and the amount of respiratory-muscle work—not whether the patient has reported discomfort.

**Visual/interaction specification:** Keep the patient report, observed sign, and unmeasured muscular work distinct. A general assistance/effort diagram must be separate from the Case A evidence panel. Do not use numerical shares for ventilator-versus-patient contribution, a drive gauge, a symptom severity score, or an arrow asserting the patient’s cause.

**Visual labels:** `patient report — breathing experience`; `visible inspiratory accessory-muscle activity — effort-related observation`; `respiratory-muscle work — not measured here`.

**Claim/support:** van Oosten et al., _Current Opinion in Critical Care_ 2025;31:12-20, DOI `10.1097/MCC.0000000000001229`, `PHYSIOLOGY OF BREATHING EFFORT`, especially the final paragraph before `MONITORING INSPIRATORY EFFORT` (PubMed PMID `39560150`); Demoule et al., ERS/ESICM statement, ERJ 2024;63:2300347, DOI `10.1183/13993003.00347-2023`, `Definition of dyspnoea` and the expected-versus-actual sensory-feedback/uncoupling discussion (co-published _Intensive Care Medicine_ DOI `10.1007/s00134-023-07246-x`, PubMed PMID `38388984`). Existing `M02-C04` and `M02-CR-001` set the patient-specific boundary.

**Limit:** No mechanism, diagnosis, quantified work, score, advanced monitoring claim, or treatment implication is assigned to Case A.

## 5. Exact proposed return-to-Teaching-Case-A explanation

> In the paired-breath model, equal total minute volume did not mean equal modeled alveolar ventilation. For Case A, the 8.0 L/min display cannot be partitioned in that way: the case does not supply the required dead-space input. The model’s 0.15 L must not be borrowed for this patient.
>
> The CO2 relationship explains why gas movement alone is not enough: arterial CO2 relates to production relative to alveolar ventilation under the model’s conditions. Case A instead provides a measured arterial PaCO2 of 40 mm Hg, matched to the current support and time. It does not provide the inputs needed to calculate that result.
>
> The pulse oximeter shows an estimated saturation of 95% while FiO2 is set at 0.50. That is oxygenation evidence in support context—not a measurement of oxygen content or tissue delivery. Meanwhile, the patient says, “I have to work for each breath right now,” and visible inspiratory accessory-muscle activity is present. Those findings already establish reported difficulty and an effort-related observation. The displayed numbers neither measure the patient’s respiratory-muscle work nor cancel the patient’s report.

Remove the prior optional provenance-sorting prompt. This packet proposes no replacement scored checkpoint, diagnosis question, treatment task, or prototype-flow change.

## 6. Brianna's bounded review questions

1. Does the steady-state explanation and ratio visual correctly distinguish the physiological relationship from a Case A calculation?
2. Do the revised partition labels agree with the anatomical/alveolar explanation and preserve the approved numeric model?
3. Does the saturation wording accurately distinguish SpO2, oxygen content, delivery, and the observed support context?
4. Do the general assisted-ventilation and dyspnoea passages explain useful physiology without assigning an unsupplied mechanism or measured effort to Case A?
5. Does the worked return teach the connections clearly while preserving the patient evidence and case/model separation?

## Evidence limitations

- Wang is a physiology-education article, not a clinical protocol or validation of this prototype.
- Collins supports saturation/content/delivery distinctions, not a Case A calculation or management target.
- The ERS/ESICM statement and effort-monitoring review support importance and measurement distinctions, not a mechanism for this fictional patient's report or observation.
- This revision directly retrieved PubMed publication identities/abstracts for Wang, Collins, Demoule, and van Oosten. The supplied correction audit contributed the specified article headings, equation numbers, and short verification anchors. Publisher/PMC/ERS full-text pages were not freshly read in full by this revision because direct opens were access-restricted or browser-verification limited. Repository source records retain prior exact locator review.
