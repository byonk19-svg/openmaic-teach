# Module 01 learning experience specification

> State: Approved planning artifact. It authorizes local design and implementation work only; it does not make any instructional claim clinical-ready or authorize a paid provider attempt.

## Problem

Practicing adult acute/ICU RTs need a repeatable way to distinguish patient observations, programmed support, device-derived values, calculations, models, and consequential uncertainty before inferring a respiratory conclusion. Existing reasoning-gate infrastructure can assess written reasoning, but it does not itself establish that a module's instructional claims, visuals, or feedback are source-traceable and clinically reviewed.

## Solution

Build one private, persisted clinician-refreshing learning experience: **Module 01 — What do we actually know? Patient, support, and respiratory evidence**. It uses original visuals and a synthetic case to teach provenance-aware reasoning, then asks one hard typed reasoning-checkpoint response. Its educational assets are governed by versioned claim-level source records and an exact-version qualified RT review.

The first release remains a generated draft until every consequential claim and dependent asset is source-mapped and a named credentialed RT with relevant adult acute/ICU experience approves the exact version. Local hospital policy controls bedside practice.

## User stories

1. As a practicing adult acute/ICU RT, I can distinguish observed, set, measured, calculated, and modeled information in a synthetic respiratory case before making an inference.
2. As a learner, I can identify a consequential missing datum or validity condition instead of treating a display value as complete evidence.
3. As a learner, I receive targeted feedback on the one missing component of my reasoning before the explanation is unlocked.
4. As a content author, I can trace every consequential statement and dependent asset to a source record with source location, applicability, limitation, and revision trigger.
5. As a qualified RT reviewer, I can assess the exact module version, its source records, original assets, rubric, and feedback before a clinical-ready label is applied.
6. As a product owner, I can distinguish generation completion from learner completion and audit a real persisted stage with the existing learner-browser harness.

## Settled decisions

- Audience: practicing adult acute/ICU RTs with baseline ventilator and ABG literacy.
- Evidence baseline: current U.S. adult-ICU guidance; record material international differences; local policy governs practice.
- Assets: original product-authored visuals only unless reuse permission is documented.
- Scope: RT-centered, with RT-relevant ICU context only when it changes respiratory assessment, support, airway safety, escalation, or communication.
- Review: clinical-ready requires named qualified RT approval of a specific content version; specialist review is added for cross-specialty claims.
- Provider discipline: any paid generation attempt is explicitly bounded and separately authorized. No retries are implicit.

## Existing seams

Use the established reasoning-gate and persistence path; do not create a new learner-completion, database, or grading architecture.

- `app/api/generate/scene-outlines-stream/route.ts` validates authoritative reasoning-gate outline metadata before completion.
- `lib/quiz/reasoning-gate.ts` and `app/api/quiz-grade/route.ts` validate the rubric/threshold and return targeted revision feedback.
- `lib/server/reasoning-gated-quiz.ts` finalizes a gated quiz from existing outline/content generation.
- `lib/classroom/learner-completion.ts` owns learner completion, distinct from generation completion.
- `scripts/course-audit.ts` and `pnpm browser:learner -- --stage <stageId>` are the real persisted learner-audit route.

The governance artifacts in `docs/clinical-content/` are the source-of-truth content workflow. No production source code change is assumed merely to author the first module.

## Acceptance criteria

- [ ] Every consequential Module 01 claim and dependent asset has a source record with an exact source location, applicability, limitation, provenance, and revision trigger.
- [ ] Module 01 uses only original visuals or assets with recorded permission.
- [ ] The synthetic case labels source, timing, support conditions, and uncertainty; it contains no patient-specific recommendation.
- [ ] The reasoning checkpoint requires evidence classification and a consequential uncertainty, not an intervention choice.
- [ ] Existing reasoning-gate validation and learner-completion behavior remain intact.
- [ ] A real persisted-stage audit is run only after authorized generation and confirms generation completion separately from learner completion.
- [ ] A named qualified RT review decision exists before any clinical-ready label.

## Verification plan

Before any persisted course is generated, review source-record completeness and use focused existing tests around reasoning-gate metadata, quiz grading, attempt persistence, learner completion, and the learner audit helper.

After an explicitly authorized, bounded provider attempt creates a real local stage, use the persisted learner-browser harness rather than isolated E2E fixtures. Record stage ID, generation-completion evidence, reasoning-gate persistence, learner response behavior, and post-reload state. Do not open an incomplete classroom merely for inspection.

## Out of scope

- A full ten-module release.
- New grading, persistence, database, or content-management architecture.
- Clinical protocols, patient-specific advice, procedure credentialing, or claims of learner competence.
- Public upstream changes, GitHub issue publication, deployment, commit, or push.
