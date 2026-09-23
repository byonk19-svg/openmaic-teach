# Quality Bar and Acceptance Audit

**Version:** 0.1 · 2026-09-15
**Use:** judge the actual lesson, not the plausibility of its implementation report.

## The standard

> A learner should make a more defensible interpretation on a new case because the module taught a useful distinction—not because the interface hinted at the answer or the grader accepted a generic phrase.

No weighted quality percentage is needed. A serious clinical or evidence defect cannot be averaged away by good styling or passing software tests.

## Four separate outcomes

| Outcome | What establishes it | What it does not establish |
|---|---|---|
| **Instructional-design complete** | A coherent visual, worked example, fresh independent task, targeted feedback, and meaningful transfer. | Clinical approval or working application behavior. |
| **Implemented and technically verified** | Relevant checks actually run on the identified artifact/version, including learner-facing behavior where possible. | Teaching effectiveness or clinical correctness. |
| **Source-mapped** | Each consequential claim and dependent asset has applicable, inspectable support and recorded limitations. | Qualified RT approval. |
| **Clinical-ready for stated educational use** | The exact version has completed the human review and release checks in the clinical policy. | Bedside competence, endorsement, certification, or treatment authority. |

Report these separately. A module can meet one and not the others.

## A. Teaching acceptance

- [ ] The intended reasoning change is specific and matches the curriculum entry.
- [ ] Two or three primary objectives have visible teaching, a worked use, and independent assessment.
- [ ] The visual explains a relationship; it is not merely attractive.
- [ ] The worked example provides real instruction rather than a series of unexplained gates.
- [ ] The independent case changes relevant evidence, not just names or numbers.
- [ ] The learner must use evidence that is present as well as identify evidence that is missing.
- [ ] Adequate plain-language and alternative answers pass without a hidden keyword checklist.
- [ ] Partial answers receive specific, manageable feedback.
- [ ] Assistance and explanation exposure are not represented as independent retrieval.
- [ ] The final recap states the useful distinction, not just the answer or a disclaimer.

## B. Evidence and case acceptance

- [ ] Every consequential value has a defined source, unit, interval, and relevant conditions.
- [ ] Unknown, not supplied, observed absent, measured, calculated, modeled, and patient reported are not conflated.
- [ ] Arithmetic, dimensional consistency, rounding, and case continuity have been checked.
- [ ] The grader cannot use hidden clinical facts.
- [ ] The rubric rejects the targeted unsupported conclusion even when arithmetic is correct.
- [ ] The rubric also rejects unsupported opposite conclusions and blanket uncertainty that ignores new evidence.
- [ ] A simpler model does not pretend to predict an individualized clinical outcome.
- [ ] Sources support the exact claim, not merely the topic or a nearby recommendation.

## C. Presentation and interaction acceptance

- [ ] The learner can see the case facts while answering.
- [ ] Main text, headings, graphics, alt text, narration, and hints do not reveal the independent answer prematurely.
- [ ] There is no unexplained “normal,” “safe,” or “adequate” visual status attached to a number.
- [ ] Text alternatives preserve all necessary evidence and do not expose hidden explanations.
- [ ] Keyboard use, readability, units, and status messaging are checked in the actual supported interface.
- [ ] An evaluation failure is not scored as learner failure or silently converted to a pass.
- [ ] Existing authorized gate and persistence behavior is preserved; unsupported behavior is reported honestly.

## D. Safety and governance acceptance

- [ ] No urgent threat is hidden behind an educational guessing game.
- [ ] No patient-specific orders, independent specialty competence, or exam/credit promises have been added.
- [ ] Clinical status matches actual evidence and human review; draft content is labeled as such.
- [ ] Required source, reviewer, approval, and revision fields are real or clearly unassigned.
- [ ] A changed case, rubric, model, or source applicability does not inherit stale approval.
- [ ] No unauthorized course mutation, review binding, flag change, migration, reset, paid generation, or publication occurred.
- [ ] No identifying real-patient information or unlicensed source assets were introduced.

## M01 minimum test set

Apply the exact case-specific expectations in the exemplar. These tests can begin as a reviewed text table; they are not a request for a new testing service.

| Test | Expected behavior |
|---|---|
| Correct arithmetic plus “therefore both are adequate.” | Revise the inference; do not grant a global pass. |
| Wrong arithmetic but sound limits. | Target arithmetic and retain recognition of sound reasoning. |
| “Not enough information” only. | Ask for a specific supported conclusion and unresolved question. |
| “Unknown means the patient is failing.” | Ask what evidence establishes that adverse conclusion. |
| A correct, concise alternative in ordinary wording. | Pass when all explicit criteria are met. |
| Independent case includes a breathing-discomfort report; answer ignores it. | Ask the learner to use the newly supplied report. |
| A patient report is treated as quantified muscle work or proof of a particular mechanism. | Limit the interpretation; do not dismiss the report itself. |
| “Need an ABG” is used as a password. | Require its relationship to the unresolved question, not the phrase. |
| An otherwise correct answer adds a contradictory, unsupported intervention. | Address the consequential contradiction. |
| Answer unavailable because evaluation failed. | Preserve the attempt, report the issue, and do not claim assessment success. |

## Bounded learner audit

Read the current artifact, its sources, and applicable repo instructions first. Walk through one full supported learning path. Exercise the documented representative answers. Inspect the independent case before answering and after revision/reveal. Check that changed facts and assistance exposure remain visible and consistent where the application supports them.

Capture evidence relevant to the task: exact case version, screenshots or accessible-text captures, responses, feedback, and test outputs. Do not claim a browser, persistence, accessibility, or live-grader check was run unless it actually was. A static content audit can still be useful; label it accurately.

Do not consume paid generation or live evaluation repeatedly just to obtain a favorable result. Reproduce a concrete failure, identify its layer, and repair the smallest authorized surface. This is an evaluation workflow, not a license to redesign the platform.

## Severity and disposition

| Finding | Meaning | Required disposition |
|---|---|---|
| **Blocker** | Clinically misleading content, unsupported critical inference accepted, wrong calculations, hidden required facts, unsafe delay, false approval, or unauthorized consequential change. | Do not release the affected clinical content. Fix and re-review dependencies. |
| **Important** | Poor teaching arc, meaningful alternative rejected, vague feedback, transfer failure, or a usability issue obstructing the task. | Repair before calling the pilot instructional-design complete. |
| **Polish** | Wording or layout improvement that does not alter meaning or task access. | Complete within authorized scope; do not use polish to expand scope. |

Permitted final audit descriptions include **design complete; clinical review pending**, **needs content revision**, **technical verification incomplete**, or **specific platform defect reproduced**. Reserve clinical-ready for its defined human-reviewed state.

## Completion report template

```text
Artifact and version:
Authorized scope:
Files/content changed:
Primary learning objective demonstrated:
Instructional-design result:
Technical checks actually run:
Source-mapping result and remaining gaps:
Qualified clinical-review status:
Open blockers / important findings:
Unchanged protected state:
Next bounded action, only if needed:
```

The report should point to evidence. “Tests passed” alone does not answer whether the lesson teaches well.
