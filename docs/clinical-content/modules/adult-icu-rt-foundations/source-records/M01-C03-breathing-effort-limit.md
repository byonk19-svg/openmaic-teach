# Source record: M01-C03

> State: Source-mapped for the limited statement that minute volume does not quantify patient effort or establish acceptable effort. It does not define an effort target or prescribe a monitor.

## Identity

- Module ID: `adult-icu-rt-foundations-01`
- Objective IDs: `M01-O2`, `M01-O3`
- Content version: `stage-iNchX3Sscq1_`, learner-content SHA-256 `f24f537c7f0f31df3194a096a87d9b326334ee3cb527b16c22743196c265c394`
- Claim owner: clinician-content owner
- Last updated: 2026-09-16

## Clinically consequential claim

The calculated exhaled minute volume does not quantify a patient’s inspiratory effort or by itself establish that breathing effort is acceptable. A focused bedside breathing assessment and patient report, when available, address a different question.

## Evidence

- van Oosten JP, Akoumianaki E, Jonkman AH. *Monitoring respiratory muscles effort during mechanical ventilation.* Current Opinion in Critical Care. 2025;31(1):12-20. DOI: [10.1097/MCC.0000000000001229](https://doi.org/10.1097/MCC.0000000000001229). Epub 2024-11-14; issue 2025-02; accessed 2026-09-16.
  - Exact locations: **Physiology of breathing effort** states that tidal volume in assisted ventilation depends on ventilator assistance and patient effort, so ventilator waveforms alone do not inform actual effort; **Table 1** lists clinical signs such as accessory-muscle use as noninvasive screening without a cutoff.
  - Permitted paraphrase: volume-based information does not itself quantify effort; clinical signs can screen for concern but are not an effort measurement.
- Goodfellow LT, Miller AG, Varekojis SM, et al. *AARC Clinical Practice Guideline: Patient-Ventilator Assessment.* Respiratory Care. 2024;69(8):1042-1054. DOI: [10.4187/respcare.12007](https://doi.org/10.4187/respcare.12007). AARC PDF version dated 2024-08; accessed 2026-09-16.
  - Exact locations: PDF p.1043, Introduction/definition and Figure 1; direct-bedside-assessment recommendation summarized in abstract/recommendation 7-8.
  - Permitted paraphrase: patient-ventilator assessment is comprehensive and direct bedside assessment remains relevant where resources allow.

## Applicability and provenance

- Sources concern mechanically ventilated adults/critical care and assessment methods, not an acceptable universal effort range.
- The module does not require Pes, P0.1, electromyography, ultrasound, or a specialized monitor. It must not convert accessory-muscle use into quantified work or a diagnosed mechanism.
- “Acceptable” remains contextual and reviewer-judged; it is intentionally not a numerical target.
- Classification: calculation is modeled; breathing assessment can include observed and patient-reported evidence; a true effort value is not supplied.

## Dependent assets

- Scene 2 breathing-effort/experience branch.
- Case A refined overclaim and reveal.
- Case B B1/B2 interpretation, rubric, analysis, and feedback against cause/quantified-effort overclaim.
- `TERMINOLOGY.md`: Breathing experience; Effort-related observation; Gas moved per minute.

## Review and revision

- Current state/rationale: source-backed bounded distinction; no quantitative effort claim; qualified RT approval is recorded for the exact corrected candidate.
- Open issues: RT reviewer must assess whether “acceptable breathing effort” reads as an intended limited conclusion rather than a target or treatment trigger.
- Review decision: Brianna Yonkin, Texas RT license, approved the exact corrected candidate on 2026-09-16; see [review decision](../M01-qualified-rt-review-decision.md). Clinical-ready status remains separate.
- Revision triggers: added effort cutoff, monitor, treatment implication, device claim, or wording that treats a visible sign as measured work.
