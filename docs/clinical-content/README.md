# Clinician content standard

This directory holds private, versioned clinician-track content artifacts. It is a governance surface, not a collection of clinical protocols or a representation of learner competence.

## Scope

The clinician track is a refresher for practicing adult acute/ICU respiratory therapists who already have baseline ventilator and ABG literacy. Its near-term purpose is to improve bedside reasoning: identify what is known, distinguish it from what is inferred, state uncertainty, and recognize when reassessment, communication, or escalation is required.

The track is RT-centered. It may include RT-relevant ICU context only where another domain materially changes respiratory assessment, support, airway safety, escalation, or communication. It does not establish independent competence in another specialty, prescribe treatment, replace local policy, or certify clinical competence.

## Evidence baseline

Follow [ADR 0004](../adr/0004-us-clinician-content-evidence-baseline.md): current U.S. adult-ICU guidance is the default evidence baseline. Record material international differences in the relevant source record. Local hospital policy controls bedside practice.

Do not call content evidence-based merely because a module has a bibliography. Every clinically consequential claim must have its own source record before it may enter qualified RT review.

Clinically consequential includes wording or implications in an explanation, visual, worked example, learner question, distractor, answer key, targeted feedback, calculation, threshold, contraindication, or spaced-practice variant.

## Content states

| State | Required condition | Return to generated draft when |
| --- | --- | --- |
| Generated draft | Educational intent, scope, synthetic-case assumptions, and non-clinical-ready label are present. | A claim is unsupported, a source is invented, cases conflict internally, or scope becomes unsafe. |
| Source-mapped | Every consequential claim has an applicable source record with an exact location, limitations, provenance, and dependent-asset list. | The source is incomplete, outdated, inapplicable, contradicted, or cannot support the claim's level of detail. |
| Under qualified RT review | A named credentialed RT with relevant adult acute/ICU experience is reviewing the exact content version. Specialist review is added when a claim crosses another specialty. | Review identifies unsafe shortcuts, missing measurement conditions, unjustified certainty, device/local-policy mismatch, or unresolved disagreement. |
| Clinical-ready | The version has named qualified-RT approval, all dependent assets have cleared review, accessibility and rights checks are complete, and review/revision dates are recorded. | A source or device changes, a safety concern arises, a learner interpretation is misleading, or required review expires. |

`Clinical-ready` means internally approved for the stated educational use only. It does not mean clinical validation, society endorsement, procedural authorization, or demonstrated learner competence.

## Authoring rules

- Start every case from the patient and respiratory evidence, not a ventilator-screen interpretation alone.
- Label relevant information as observed, set, measured, calculated, or modeled. A label must include time, source, support conditions, and uncertainty when they matter to the interpretation.
- Use the learning arc: simple original visual explanation, worked example, learner interpretation or decision, targeted feedback, then spaced transfer.
- Make synthetic cases unmistakably synthetic. A simulated pause before feedback must never imply delaying urgent real-world assessment or escalation.
- Use original product-authored visuals. Do not copy, redraw, or reuse guideline, manufacturer, or proprietary figures unless permission is recorded in the dependent source record.
- Keep device-specific claims out of clinician-ready content until the model, software version, manufacturer instructions, and local applicability are source-mapped and reviewed.

## Required records

Create one source record per consequential claim from [the source-record template](templates/source-record.md). Create one review decision per reviewed content version from [the qualified-RT review template](templates/qualified-rt-review.md).

Each revision must reopen every dependent asset listed in the source record. A prose edit alone is insufficient when the claim also appears in a visual, example, exercise, answer key, feedback path, or spaced-practice item.

## Release boundary

The first release target is one complete generated-draft reasoning module with its source-record and review workflow ready for use. The remaining clinician modules are a roadmap, not approved instructional content. See [the Adult ICU RT Foundations roadmap](roadmaps/adult-icu-rt-foundations.md) and [Module 01 brief](modules/adult-icu-rt-foundations/01-evidence-and-respiratory-reasoning.md).
