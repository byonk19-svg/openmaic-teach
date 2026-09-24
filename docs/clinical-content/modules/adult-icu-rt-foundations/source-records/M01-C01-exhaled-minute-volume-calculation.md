# Source record: M01-C01

> State: Source-mapped for the stated synthetic arithmetic only. It does not make a clinical adequacy claim.

## Identity

- Module ID: `adult-icu-rt-foundations-01`
- Objective IDs: `M01-O1`
- Content version: `stage-iNchX3Sscq1_`, learner-content SHA-256 `f24f537c7f0f31df3194a096a87d9b326334ee3cb527b16c22743196c265c394`
- Claim owner: clinician-content owner
- Last updated: 2026-09-16

## Clinically consequential claim

When rate and mean exhaled tidal volume describe the same declared interval, multiplying breaths/min by L/breath yields calculated exhaled L/min for that interval. In Case A, `28 × 0.40 = 11.2 L/min`; in B1/B2, `20 × 0.45 = 9.0 L/min`.

## Evidence

- Source organization/authors: product-authored synthetic case; independent dimensional derivation.
- Version/date: stage content hash above; M01 teaching contract v0.1, 2026-09-15.
- Exact supporting location: Case A Prediction 1 reveal; Case B calculation criterion; arithmetic is `breaths/min × L/breath = L/min`.
- Precise rationale: the units cancel to liters per minute; the case explicitly declares the inputs time-matched.
- External-source boundary: no device algorithm, measurement averaging method, physiologic adequacy threshold, or intervention claim is inferred from this derivation.

## Applicability and provenance

- Applies only to the fictional, declared interval inputs. The values are not real-patient measurements and do not represent a device display algorithm.
- Inputs are modeled educational facts, with units and the same 60-second window stated in the prompt.
- Limitation: calculated exhaled gas moved per minute is not alveolar ventilation, CO2 clearance, work of breathing, safety, or a treatment target.

## Dependent assets

- Scene 2 `Gas moved per minute` label and text equivalent.
- Case A Prediction 1 prompt/options/reveal.
- Case B B1/B2 calculation criterion, rubric, analysis, and feedback for use of set rate.
- Case C current-interval calculation prompt and analysis.

## Review and revision

- Current state/rationale: source-mapped calculation and synthetic assumptions; qualified RT approval recorded for the exact corrected candidate.
- Open issues: reviewer should confirm that “exhaled gas moved per minute” is the least misleading learner-facing label.
- Review decision: Brianna Yonkin, Texas RT license, approved the exact corrected candidate on 2026-09-16; see [review decision](../M01-qualified-rt-review-decision.md). Clinical-ready status remains separate.
- Revision triggers: changed interval, input provenance, unit, device-specific claim, or any new adequacy implication.
