# Source record: M02-DS-001

> State: Generated draft design asset. These original synthetic facts are not clinical thresholds, patient data, or treatment recommendations.

## Identity

- Module ID: `adult-icu-rt-foundations-02`
- Objective ID: `M02-O1`, `M02-O2`, `M02-O3`
- Content version: M02 teaching contract draft 0.1, 2026-09-16
- Claim owner: clinician-content owner
- Last updated: 2026-09-16

## Clinically consequential claim

None. M02 uses authored values solely to make the stated reasoning distinctions inspectable. The cases must not convert FiO2 0.30/0.70, SpO2 94%, PaCO2 42 mm Hg, exhaled minute volume 10.0 L/min, or the 0.15 L teaching assumption into a target, severity category, diagnosis, or treatment rule.

## Evidence

- Source organization/authors: not applicable; original product-authored teaching cases and model.
- Exact supporting location: [M02 teaching contract](../../../../rt-foundations/M02_TEACHING_CONTRACT_DRAFT.md), worked comparison, Case B, and transfer sections.
- Arithmetic check: A `0.50 × 20 = 10.0`; B `0.25 × 40 = 10.0`; modeled A `(0.50 − 0.15) × 20 = 7.0`; modeled B `(0.25 − 0.15) × 40 = 4.0` L/min.

## Applicability and provenance

- The case values are authored and internally coherent only for the stated learning task.
- The 0.15 L non-gas-exchanging portion is held constant to isolate a mathematical relationship. Learners may infer that equal total gas moved can differ in **modeled** alveolar ventilation under that fixed assumption. They must not infer an adult normal value, patient estimate, measured physiological dead space, PaCO2, diagnosis, or treatment requirement.
- Case B card grouping communicates provenance and conditions only; it must not pre-sort evidence into physiology categories.
- Classification: FiO2 is set; SpO2 and neck-muscle recruitment are observed; PaCO2 is measured; minute-volume and model outputs are calculated/modeled; all values are synthetic authored inputs.

## Dependent assets

- Paired-breath visual and progressive reveal.
- Case B cards and independent prompt.
- C1/C2 transfer cards.
- Rubric/feedback that rejects threshold, diagnosis, and treatment overclaims.
- Rights: all visuals/cases are original product-authored assets.

## Review and revision

- Current state: qualified RT approval recorded for the exact reviewed synthetic-case/model design asset. It remains a generated teaching asset, not patient data, a clinical-ready lesson, or a treatment recommendation.
- Open issues: none from the completed qualified RT review.
- Review decision: Brianna Yonkin, qualified adult acute/ICU respiratory therapist in Texas, approved the exact reviewed document set on 2026-09-16; see [review decision](../M02-qualified-rt-review-decision.md). Clinical-ready status remains separate.
- Revision triggers: changed value, label, time/support condition, visual grouping, feedback/rubric implication, or added clinical claim.
