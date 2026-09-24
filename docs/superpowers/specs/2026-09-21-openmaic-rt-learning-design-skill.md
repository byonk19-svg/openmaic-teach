# OpenMAIC RT Learning Design Skill

## Goal

Create a reusable Codex skill that helps build useful, adult acute/ICU respiratory-therapy learning experiences in OpenMAIC: from a bounded bedside-reasoning objective through implementation and learner-viewport verification. A future licensure-preparation product remains outside this skill's default scope.

## Chosen shape

Create one model-invoked skill named `openmaic-rt-learning-design` in the personal Codex skills directory. It owns the end-to-end production loop rather than splitting ordinary lesson work across several user-invoked skills. The leading principle is **instructional fidelity**: each visual, interaction, and reveal must make a named learning-relevant relationship, mechanism, scale, timing, or decision clearer.

## Authoritative sources

The OpenMAIC repository remains authoritative for each lesson. The skill begins by reading `docs/rt-foundations/CODEX_START_HERE.md`, `TERMINOLOGY.md`, and `SKILL_ROUTING.md`, then only the current module teaching contract, claim/source map, qualified-RT review record, and relevant learner or visual evidence. It applies their required local skills and rules rather than restating them.

A compact supporting reference records the reusable learning-design rationale and source links: retrieval/distributed practice, worked examples, focused feedback/debriefing, deliberate practice, and mastery learning. These are decision guides, not a claim that every lesson requires every method or that they establish clinical competence.

## Production loop

1. Frame a single learner problem and bedside-reasoning objective.
2. Establish claim/review status and choose a learning arc: visual explanation, worked reasoning, independent learner attempt, focused feedback, then fresh transfer when suitable.
3. Build a storyboard that preserves learner independence and states what each visual or interaction teaches.
4. Select the asset type:
   - generate contextual or original illustrative imagery only when it supports the objective;
   - author exact clinical diagrams, waveforms, measurements, labels, scale, and timing as data/code-native artifacts;
   - route clinically consequential assets through claim-level sourcing and qualified-RT review before labeling them clinical-ready.
5. Implement using native OpenMAIC capabilities unless an unmet requirement is demonstrated.
6. Test the real learner experience in normal and narrow viewports: sequence/reveal timing, interaction, keyboard operation, accessible equivalent, and the practical educational contribution of the visual.
7. Report separately what is drafted, built, browser-tested, and qualified-RT-reviewed.

## Guardrails

- Generated or automated work never establishes clinical approval, learner competence, certification, or release readiness.
- The skill preserves clinical source, review, provider-call, and learner-state boundaries already defined by OpenMAIC.
- It does not disclose an independent case's answer before the learner attempts it.
- Every claimed verification must be backed by an inspected artifact, executed check, or actual browser observation.

## Validation

Validate the skill's structure with the bundled quick validator. Forward-test it against a small, synthetic OpenMAIC lesson request in a temporary workspace only if that can be done without provider calls or persistent-data mutation.
