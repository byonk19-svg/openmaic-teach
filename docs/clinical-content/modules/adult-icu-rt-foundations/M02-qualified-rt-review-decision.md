# Qualified RT review: M02 approved teaching-design candidate

> Review state: **Qualified RT approval recorded for the exact reviewed source-mapped teaching design.** This is not a clinical-ready label.

## Content under review

- Module ID and title: `adult-icu-rt-foundations-02` — M02, *Oxygenation, ventilation, and respiratory demand*.
- Reviewed document set: [M02 teaching contract](../../../rt-foundations/M02_TEACHING_CONTRACT_DRAFT.md), draft 0.1, 2026-09-16; [M02 claim/source map](M02-claim-source-map.md); [M02 qualified-RT review packet](M02-qualified-rt-review-packet.md); source records `M02-CR-001`, `M02-C01` through `M02-C04`, and `M02-DS-001`.
- Fingerprint/manifest: no stage exists, and the repository's deterministic clinical-review manifest is stage-bound and Module-01-specific. No pre-authoring fingerprint mechanism applies; this approval binds to the exact document set above.
- Included assets: three-pathway physiological model; paired-breath teaching comparison; output-versus-burden bridge; Case B source/card/rubric boundaries; same-SpO2/different-FiO2 transfer; visual claim audit; original product-authored visual specifications.
- Intended scope: practicing adult acute/ICU RT reasoning foundation; not patient-specific direction, a treatment protocol, modality algorithm, stage implementation, or competency certification.

## Reviewer qualification

- Reviewer name: Brianna Yonkin.
- Respiratory-therapy credential and jurisdiction: qualified adult acute/ICU respiratory therapist; Texas (reviewer-provided).
- Relevant experience/role: practicing adult acute/ICU respiratory therapist.
- Conflicts or limitations: none disclosed.
- Specialist reviewer: none requested for the reviewed M02 scope.

## Review checklist

- [x] All 12 questions in the M02 qualified-RT review packet were reviewed and approved.
- [x] The central global-reassurance shortcut is appropriate for the intended learner.
- [x] The three-pathway model, including oxygen-pathway depth and boundaries, is physiologically appropriate for M02.
- [x] The 0.15 L non-gas-exchanging teaching assumption and paired-breath modeled comparison remain bounded as teaching-only, not patient measurement or clinical rule.
- [x] PaCO2 framing remains measurement- and context-bound, without a universal adequacy conclusion or M03 acid-base expansion.
- [x] SpO2/FiO2 support context remains non-threshold, non-modality, and non-escalation teaching.
- [x] Patient-reported breathing difficulty and visible inspiratory neck-muscle recruitment remain meaningful qualitative evidence, not effort/work measurements, mechanism, diagnosis, severity, or treatment requirement.
- [x] Case B is fair and answerable from visible evidence; it does not require a diagnosis, treatment plan, hidden fact, or specialized monitor.
- [x] The same-SpO2/different-FiO2 transfer remains within M02 and does not steal M04 support-selection/trajectory content.
- [x] Visual clinical relationships and stated exclusions/module boundaries are approved.
- [x] No additional clinically important bedside nuance requires correction before learner-facing authoring.

## Decision

- Decision date: 2026-09-16.
- Disposition: **Approve the exact reviewed source-mapped teaching-design candidate.**
- Approved scope: central reasoning shortcut; three-pathway model; oxygen-pathway depth/boundaries; teaching-only non-gas-exchanging assumption; paired-breath modeled comparison; PaCO2 and SpO2/FiO2 framing; Case B facts/boundaries; breathing-experience and effort-related-observation distinction; transfer; visual clinical relationships; feedback-policy boundaries; and stated exclusions.
- Approved for clinical-ready label: **no** — learner-visible final copy, implementation, stage behavior, semantic-grader runtime behavior, accessibility implementation, visual-rendering fidelity, release readiness, and clinical competence remain separately unapproved.
- Required revisions: **None.**
- Reopened review scope: **None.**
- Reviewer attestation: Brianna Yonkin approved all 12 review questions without required clinical wording or design changes.
- Next required review: before clinical-ready/release consideration, and again after any consequential change to a clinical/physiological/visual relationship, teaching assumption, case condition, rubric/feedback boundary, source applicability, transfer interpretation, or learner-facing content that changes approved meaning.

## Review findings recorded for this decision

| Review topic | Disposition | Recorded finding |
|---|---|---|
| Three-pathway physiology | Approve | The model keeps oxygenation, effective CO2, and breathing-demand/effort-related evidence distinct without requiring exhaustive physiology. |
| Paired-breath model | Approve | The 0.15 L value remains a fixed teaching-only assumption; the modeled 7 versus 4 L/min comparison must not imply patient measurement, PaCO2, diagnosis, severity, or treatment. |
| Case B | Approve | The visible snapshot is fair; PaCO2, SpO2/FiO2, minute volume, patient report, and neck-muscle observation require bounded integration without hidden requirements. |
| Breathing experience/observation | Approve | “Breathing feels hard right now” and visible neck-muscle recruitment are meaningful qualitative evidence, not a quantitative effort/work measurement, mechanism, diagnosis, severity, or required treatment. |
| Transfer and boundaries | Approve | Same SpO2 under differing FiO2 teaches support context without a threshold, severity label, modality recommendation, or M04 trajectory decision. |
| Visual relationships | Approve | The original visual specifications may proceed to learner-facing authoring only if their labels, model boundaries, text equivalents, and reveal behavior remain faithful to the reviewed contract. |

## Bounded oxygenation-addition decision — 2026-09-22

> Review state: **Qualified RT approval recorded for the exact oxygenation addition identified below.** This addendum preserves the 2026-09-16 decision and does not approve the surrounding historical authoring file, a complete M02 module, clinical-ready status, release, or educational effectiveness.

### Exact reviewed target

- Artifact: [M02 learner-facing authoring draft](M02-learner-facing-authoring-draft.md).
- Section: `Proposed addition after Function 2 — From oxygen support to delivery context`, ending immediately before `Function 3`.
- Reviewed-content section SHA-256 before status-only recording edits: `ce36af1a8d4c9f4b7235ee5cd71ebc860d60108c1c136237d95b7c09a5124df7`.
- Section SHA-256 after status-only recording edits: `60411b1cdc5a9a03e5b979f13c79823279a7b6791b27534922c2459b43a8403f`.
- Status-only edits record this decision; the learner explanation, visual relationships, Case A facts, fresh comparison conditions, expected reasoning, feedback, and source support are substantively unchanged from the reviewed section.

### Reviewer and decision

- Reviewer: Brianna Yonkin, qualified adult acute/ICU respiratory therapist in Texas.
- Decision date: 2026-09-22.
- Disposition: **Approve the exact bounded oxygenation addition for implementation in the existing standalone `/m02-prototype`.**
- Approved scope: connected inspired-oxygen pathway; qualitative regional low-/high-V/Q contrast; distinction among arterial saturation, hemoglobin-dependent oxygen content, cardiac output, and systemic oxygen delivery; unchanged Teaching Case A application; held-variable hemoglobin comparison; expected reasoning; and local feedback.
- Implementation boundary: use only the newly approved oxygenation section as the addition. Preserve the existing breath/CO2 teaching and later reviewed interactions. Do not restore the surrounding draft's generic pathway matching, missing-assumption prediction, superseded partition labels, or detached output-versus-burden lesson.
- Interaction boundary: local and ungraded; no semantic grader, keyword evaluation, score, provider call, or pass requirement.
- Visual boundary: editable, deterministic diagram elements; pulmonary perfusion remains distinct from systemic cardiac output; V/Q arrows remain qualitative; unavailable Case A nodes say `not supplied in this case`; essential meaning does not depend on a raster image.
- Approved for clinical-ready label: **no**. Rendered fidelity, learner usefulness, accessibility behavior, full-module completeness, and release remain separate.
- Re-review trigger: any substantive change to the approved pathway relationship, regional V/Q meaning, comparison variables, Case A facts, feedback meaning, source applicability, or treatment/threshold boundary.

## Bounded demand/effort and CO2-application decision — 2026-09-22

> Review state: **Qualified RT approval recorded for the exact consolidated addition identified below, including the two reviewed clarifications.** This addendum preserves the 2026-09-16 and oxygenation decisions. It does not approve the surrounding historical authoring file, a complete M02 module, clinical-ready status, release, or educational effectiveness.

### Exact reviewed target

- Artifact: [M02 learner-facing authoring draft](M02-learner-facing-authoring-draft.md).
- Section: `Proposed consolidated addition after Function 4 — demand, effort, breathing experience, and CO2 application`, ending immediately before `Function 5`.
- Reviewed-content section SHA-256 after the two substantive clarifications and before status-only recording edits: `2355aa05e8441963a8b4248daaed26dca33433f96bd02ab5831236ea45f1e18a`.
- Section SHA-256 after status-only recording edits: `f182fc33d15a403e949f83ff1954fd349b9739567c8dd7f7f200c22bda5b0c16`.
- Status-only edits record this decision; the approved explanation, visual relationships, model conditions, applications, feedback, Case B alignment decision, and source support are substantively unchanged from the reviewed section.

### Reviewer and decision

- Reviewer: Brianna Yonkin, qualified adult acute/ICU respiratory therapist in Texas.
- Decision date: 2026-09-22.
- Disposition: **Approve the exact bounded demand/effort and CO2-application addition for implementation in the existing standalone `/m02-prototype`.**
- Approved scope: the relationships among respiratory demand, neural drive, mechanical load, muscle capacity, patient respiratory-muscle effort, ventilator assistance, achieved breathing, sensory feedback, and patient-reported breathing experience; the local assistance and experience applications; the local steady-state CO2-directionality application; and the no-change decision for Case B and its rubric.
- Assistance-model clarification: compare the same modeled volume-and-flow pattern over time under the same resistance, elasticity, end-expiratory, timing, starting, and muscle-capacity conditions. `Less assistance` means less actual delivered inspiratory contribution. The conclusion is the greater muscular contribution required to maintain the modeled breath, not guaranteed patient compensation, measured drive, symptom prediction, or a setting recommendation.
- Feedback-visual clarification: show the respiratory command's expected sensory consequences, the muscular/mechanical response, actual sensory feedback returning toward the brain, and the expected-versus-actual comparison. The diagram must not become a one-way causal chain, the only explanation of dyspnoea, or a diagnosis of Teaching Case A.
- Implementation boundary: preserve the working oxygenation, paired-breath, CO2, and Teaching Case A teaching. Integrate the approved addition without restoring superseded historical interactions or building Case B, transfer, or a full module.
- Interaction boundary: local and ungraded; feedback may respond only to explicit choices. No unrestricted free-text grading, keyword evaluation, score, provider call, semantic grader, or pass requirement.
- Assessment boundary: Case B, its first assembled exposure, prompt, rubric, and feedback priorities remain unchanged. The candidate post-response mechanism prompt remains deferred and unimplemented.
- Approved for clinical-ready label: **no**. Rendered fidelity, learner usefulness, accessibility behavior, full-module completeness, and release remain separate.
- Re-review trigger: any substantive change to the approved physiological relationships, model conditions, expected reasoning, feedback meaning, Case A facts, Case B boundary, source applicability, or treatment/setting boundary.

## Standalone-prototype implementation disposition — 2026-09-23

> This records the owner's later learner-experience decision after review of the
> targeted-correction desktop and narrow renders. It is implementation authority
> for the bounded standalone prototype, not a new clinical-ready, release, or
> efficacy decision, and it does not alter the approved physiology or case/model
> values above.

- Preserve the current assumption-first paired-breath flow and its current
  learner-paced reveal organization. Do not restore the earlier draft's
  missing-assumption answer path.
- Keep the tautological breathing-experience choice removed. In this prototype,
  breathing experience is taught through the progressively disclosed feedback
  model and the worked return to Teaching Case A; the historical candidate choice
  is not a required interaction.
- Preserve the segmented oxygen and effort explanations and the current connected
  Teaching Case A synthesis. The historical authoring draft remains useful source
  and design history, but it is not a requirement to reproduce every candidate
  node or interaction in the bounded prototype.
- Case B, C1/C2 transfer, persisted-stage construction, and semantic grading remain
  outside the standalone-prototype implementation. Their reviewed source material
  is preserved for separately authorized future module work.

The implementation was reviewed as a coherent learner experience after the
targeted correction pass. Future audits of `/m02-prototype` should compare against
this disposition plus the approved clinical relationships, rather than treating
superseded candidate interactions as missing defects.
