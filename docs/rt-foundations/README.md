# Adult ICU RT Foundations — Direction and Guardrails

**Proposed baseline:** v0.1 · 2026-09-15
**Audience:** product owner, Codex, content authors, and qualified clinical reviewers
**Clinical status:** all example lessons and rubrics in this pack are generated drafts, not clinical-ready content.

> Help a practicing adult ICU respiratory therapist make the strongest conclusion the evidence supports, without going beyond it and without retreating into blanket uncertainty.

## Start here

This pack turns the owner's product intent into a concrete teaching target. It is not a proposal for another platform, a new database, or an autonomous clinical decision-support system.

| Question | Read | This document owns |
|---|---|---|
| What are we building, and what should it feel like? | [NORTH_STAR.md](NORTH_STAR.md) | Product purpose, learner experience, tradeoffs, and current milestone. |
| What distinct change should each module produce? | [CURRICULUM_INTENT.md](CURRICULUM_INTENT.md) | Ten-module sequence, objectives, concept ownership, and boundaries. |
| How should a lesson teach? | [AUTHORING_STANDARD.md](AUTHORING_STANDARD.md) | Visuals, worked examples, independent retrieval, feedback, and evidence handling. |
| What does an excellent first module actually look like? | [examples/M01_GOLD_STANDARD.md](examples/M01_GOLD_STANDARD.md) | A fully written instructional exemplar, case facts, answer criteria, and feedback fixtures. |
| What may be called clinical-ready? | [CLINICAL_CONTENT_POLICY.md](CLINICAL_CONTENT_POLICY.md) | Claims, sources, human review, release status, and revision triggers. |
| How do we decide whether the work meets the target? | [QUALITY_BAR.md](QUALITY_BAR.md) | Observable acceptance criteria and a bounded audit. |
| What should an author submit? | [templates/MODULE_SPEC.md](templates/MODULE_SPEC.md) | A reusable authoring template, not a new application schema. |
| How should Codex use these files? | [CODEX_START_HERE.md](CODEX_START_HERE.md) | Integration prompt, short AGENTS.md addition, and an authorized work loop. |

## Quick reading path

Read the north star, then the worked-example and independent-case sections of the M01 exemplar, then the quality bar. That establishes the destination before the operational rules.

For module work, also read the relevant curriculum entry, authoring standard, and clinical policy. Do not load every historical handoff into every prompt or repeatedly ask the owner to restate these settled goals.

## Installation and scope

The archive contains a `docs/rt-foundations/` directory. Merge it into the repository at that location after checking for existing files. Do not blindly overwrite a same-named directory or existing `AGENTS.md`.

The recommended short AGENTS.md addition is inside `CODEX_START_HERE.md`; there is deliberately no replacement root AGENTS.md in this pack. Preserve existing repository safety and operating instructions. This pack was prepared from the discussion and supplied brief, not from an inspection of the current repository or a runtime test.

Within this pack, the clinical policy and authoring standard establish common constraints; the north star supplies product intent; the curriculum assigns scope; the M01 exemplar supplies its specific teaching target. Templates must not invent additional requirements. If two requirements conflict, identify the conflict and continue unaffected authorized work rather than silently choosing the less restrictive one.

The current user task and applicable repository instructions determine what Codex may change. A future module objective is not authorization to implement it now. These documents do not authorize paid generation, clinical approval, publishing, feature activation, database changes, or course rebinding.

## Relationship to the earlier module brief

This pack consolidates `adult-icu-rt-foundations-codex-module-brief.md` and the subsequent M01 refinements. It is intended to become the maintained design baseline once the owner adopts it. Do not maintain competing copies of the same rules. Preserve an older document as historical, or add a pointer to this pack during an authorized docs integration pass.

The important correction is deliberate: **M01's first independent case still uses valid, time-matched inputs.** It tests a valid calculation followed by an unsupported clinical conclusion. Timestamp mismatch is a later transfer exercise, not the explanation for why the main calculation was insufficient.

M01–M10 are curriculum positions, not existing course IDs. A previous waveform/dyssynchrony/auto-PEEP artifact may fit M06, but its actual identity, scope, and review binding must be inspected before any mapping. Do not rename or overwrite it because something in software is already called “Module 01.”

## One target for the next milestone

Produce one coherent M01 teaching-quality pilot using the existing presentation and interaction capabilities. Its exact clinical version still requires qualified review before clinical-ready use. Do not generate all ten modules or build adjacent systems to make the pilot look complete.

The target is demonstrated by learner-visible content, a fresh independent exercise, answer-specific feedback, and an honest audit—not by the number of screens, documents, tests, or approvals represented in the interface.

## Change discipline

For a consequential design change, update the owning document and dependent examples in the same authorized change. Add a short rationale in the change report; do not create another policy document for every decision. Reopen clinical review when the change affects clinical meaning, case facts, grading, source applicability, or model behavior.
