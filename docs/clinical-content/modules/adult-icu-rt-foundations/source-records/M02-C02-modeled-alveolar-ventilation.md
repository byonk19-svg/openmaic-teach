# Source record: M02-C02

> State: Source-mapped for a bounded teaching comparison of total and modeled alveolar ventilation. It is not a patient dead-space estimate, PaCO2 prediction, or clinical target.

## Identity

- Module ID: `adult-icu-rt-foundations-02`
- Objective ID: `M02-O1`, `M02-O2`
- Content version: M02 teaching contract draft 0.1, 2026-09-16
- Claim owner: clinician-content owner
- Last updated: 2026-09-16

## Clinically consequential claim

Total minute ventilation is total gas moved per minute and is not automatically alveolar/effective ventilation. For M02's fictional comparison only, `(VT − stated non-gas-exchanging-volume assumption) × RR` models alveolar ventilation. Holding the same 0.15 L per-breath authored assumption constant makes equal total minute ventilation (10.0 L/min) yield 7.0 versus 4.0 L/min modeled values; it does not establish a patient's PaCO2, diagnosis, severity, or treatment need.

## Evidence

- Wang MC, Corbridge TC, McCrimmon DR, Walter JM. *Teaching an intuitive derivation of the clinical alveolar equations: mass balance as a fundamental physiological principle.* Physiology education article. *Advances in Physiology Education.* 2020;44(2):145-152. DOI: [10.1152/advan.00064.2019](https://doi.org/10.1152/advan.00064.2019). Accessed 2026-09-16; no correction identified in this pass.
  - Exact location: section headed **Alveolar ventilation**, Equation 1: `V̇A = RR × VT × (1 − VD/VT)`, algebraically equivalent to `(VT − VD) × RR`.
  - Permitted paraphrase: total minute volume and alveolar ventilation differ when a non-gas-exchanging portion is present.
- Hinkson CR, Benson MS, Stephens LM, Deem S. *The Effects of Apparatus Dead Space on PaCO2 in Patients Receiving Lung-Protective Ventilation.* Prospective adult ICU physiology study. *Respiratory Care.* 2006;51(10):1140-1144. DOI: [10.4187/respcare.06511140](https://doi.org/10.4187/respcare.06511140). Accessed 2026-09-16.
  - Exact location: abstract Methods/Results; in seven stable adult ARDS/ALI patients, circuit configuration changed apparatus dead space while VT, rate, PEEP, and FiO2 were held constant; VD/VT and PaCO2 changed.
  - Permitted paraphrase: dead-space conditions can matter to CO2 interpretation even when common ventilator variables are held constant.

## Applicability and provenance

- Wang supports foundational physiology, not an adult-ICU protocol. Hinkson is a small, older adult ARDS/ALI study of apparatus dead space, not a universal physiological-dead-space rule.
- The 0.15 L value is an **authored teaching-model assumption**: it holds the non-gas-exchanging portion constant so the learner can compare the consequence of differing VT/RR patterns. It is not measured, normal, target, patient-specific, or a recommendation.
- Arithmetic independently checked: A `(0.50 − 0.15) × 20 = 7.0 L/min`; B `(0.25 − 0.15) × 40 = 4.0 L/min`; both total `VT × RR = 10.0 L/min`.
- Classification: VT/RR and 0.15 L are modeled/authored inputs; 7.0 and 4.0 are calculated model outputs.

## Dependent assets

- Paired-breath visual partitions, labels, progressive reveal, and text equivalent.
- Worked comparison prompt and explanation.
- Case B/feedback limit that total minute ventilation does not substitute for effective-ventilation evidence.
- Rights: original product-authored visual; no source figure or table reuse.

## Review and revision

- Current state: qualified RT approval recorded for the exact reviewed teaching-design candidate; **MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT** must remain prominent.
- Open issues: none from the completed qualified RT review.
- Review decision: Brianna Yonkin, qualified adult acute/ICU respiratory therapist in Texas, approved the exact reviewed document set on 2026-09-16; see [review decision](../M02-qualified-rt-review-decision.md). Clinical-ready status remains separate.
- Revision triggers: changed model assumption/equation, any PaCO2/diagnosis/treatment inference, a normal value claim, or source update/correction.
