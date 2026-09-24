# M01 bounded live semantic-grader validation

> **Status:** four authorized live calls completed once each on 2026-09-16. No retries were made. This validation found one feedback-quality defect; it does not change the approved learner-content hash.

## Target

- Stage: `stage-iNchX3Sscq1_`
- Approved learner-content hash: `f24f537c7f0f31df3194a096a87d9b326334ee3cb527b16c22743196c265c394`
- Gate: Case B (`m01-case-b-q`) with the persisted approved rubric.
- Provider use: exactly four live `/api/quiz-grade` reasoning-gate calls, executed once each in parallel. No retry or preferred-result sampling occurred.

## Results

### A. Competent concise response

**Submitted response**

> Both B1 and B2 calculate to 9.0 L/min (20 × 0.45 L). That result alone does not establish adequate CO2 clearance. B1 does not supply a breathing assessment. B2 supplies a report that breathing feels hard and visible inspiratory neck-muscle recruitment, so there is a breathing concern to assess; these do not establish its cause or quantify effort. For CO2, I would review relevant current CO2/gas information with its time and support context. For breathing, I would assess the breathing pattern and clarify the patient’s reported difficulty.

| Expected | Actual | Score | First feedback | Verdict |
|---|---|---:|---|---|
| Pass | Pass | 1.00 | Correct calculation, bounded CO2 interpretation, B1/B2 distinction, no cause/quantified-effort overclaim, and relevant next evidence all acknowledged. | Pass |

**Exact first feedback:** “The answer correctly calculates 9.0 L/min for both snapshots, gives a bounded interpretation that minute volume alone does not establish CO2 clearance, distinguishes the lack of breathing assessment in B1 from the reported/observed breathing concern in B2, avoids overclaiming cause or quantified effort, and identifies relevant next evidence sources for both CO2/gas context and focused breathing assessment.”

### B. Central overclaim

**Submitted response**

> Both are 9.0 L/min, so both patients have adequate ventilation and acceptable effort.

| Expected | Actual | Score | First feedback | Verdict |
|---|---|---:|---|---|
| Revise | Revise | 0.25 | Acknowledges correct 9.0 L/min calculation, identifies the unsupported B2 effort conclusion, and asks one follow-up about the patient report and neck-muscle observation. It does not reveal the canonical answer. | Pass |

**Exact first feedback:** “Your exhaled minute volume calculation is correct for both snapshots: 9.0 L/min. However, your interpretation of B2 does not account for the supplied breathing experience/effort observations and instead labels effort acceptable.”

**Exact follow-up:** “How should B2’s breathing experience/effort be interpreted using the patient’s report and observed neck-muscle recruitment?”

### C. Competent alternative wording

**Submitted response**

> Twenty breaths per minute times 450 mL per breath is 9 L/min in each snapshot. Those figures describe exhaled volume over that minute, not whether PaCO2 is appropriate. In B1 there is no patient experience or observed effort supplied. In B2, the patient’s message and neck-muscle use create a real symptom and bedside concern that needs characterization, not a diagnosis. I would compare available contemporaneous CO2/gas information with the support conditions, and observe the breathing pattern while asking more about the difficult breathing.

| Expected | Actual | Score | First feedback | Verdict |
|---|---|---:|---|---|
| Pass | Pass | 0.95 | Recognizes equivalent correct arithmetic, bounded CO2 interpretation, B1/B2 distinction, non-diagnostic B2 language, and relevant next evidence. | Pass |

**Exact first feedback:** “The response correctly calculates 9 L/min for both snapshots, keeps the CO2 interpretation appropriately bounded, distinguishes B1 from B2 using the reported dyspnea and neck-muscle recruitment without overclaiming cause or quantified effort, and identifies relevant next evidence sources for both CO2 context and breathing assessment.”

### D. Blanket uncertainty

**Submitted response**

> Need more information.

| Expected | Actual | Score | First feedback | Verdict |
|---|---|---:|---|---|
| Revise with one focused question about an unresolved issue and its evidence | Revise | 0.05 | Feedback correctly avoids a pass and gives one follow-up, but targets missing arithmetic rather than the approved fixture’s requested unresolved-question/evidence reasoning. | **Fail** |

**Exact first feedback:** “Your answer recognizes that additional information is needed, but it does not include the required exhaled minute-volume calculation for the snapshots.”

**Exact follow-up:** “Using the reliably counted total rate and mean exhaled tidal volume, what is the exhaled minute volume for B1 and B2 with units?”

## Interpretation

- The grader correctly rejects the central overclaim, accepts competent alternative wording, and does not reveal the complete Case B solution during revision feedback.
- The blanket-uncertainty response exposes a mismatch between the approved fixture/feedback contract and live grader prioritization. The approved contract expects a focused unresolved-question/evidence prompt; the live grader instead asks for calculation first.
- Repairing that prioritization may change learner-facing feedback behavior. Under the approved-hash policy, do not alter the grader prompt, rubric, or feedback behavior without determining whether the repair is consequential and, if it is, issuing a new learner-content hash and qualified-RT review decision.
