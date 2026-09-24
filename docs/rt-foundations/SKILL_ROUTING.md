# Skill routing for OpenMAIC Teach

## Scope and authority

Apply this routing to RT curriculum, instructional design, learner-facing content,
visuals, interactions, feedback/rubrics, stage construction/editing, and learner
acceptance. For unrelated infrastructure work, use the relevant technical
instructions and affected invariants; do not load the curriculum skill stack.

Follow [repository instructions](../../AGENTS.md),
[RT Foundations entry guidance](CODEX_START_HERE.md),
[terminology](TERMINOLOGY.md), and the task's exact content/review authority.
This document selects existing guidance. It grants no permission to install,
spend, generate, mutate stages/data, publish, commit, or approve clinical content.

The starting inventory comes from the supplied local OpenMAIC capability audit.
Verify current availability before use. An audit's inventory is not proof that a
skill remains installed, a runtime is enabled, or a tool executed in this session.

## Selection and use

1. Identify the task phase, intended outcome, allowed writes, and provider budget.
2. Select the smallest relevant set from the table below. A multi-phase task may
   need different skills as it progresses; do not load every skill up front.
3. Read each selected skill's actual `SKILL.md` and only the references needed for
   the work. Briefly name the phase and selected skills in the existing task plan
   or opening update, then execute. No separate routing report is required.
4. Apply the instructions to the work product. Naming a skill, passing a builder
   test, or copying its terminology does not demonstrate that its workflow ran.
5. If a required skill is missing, inspect the local registry for a documented
   equivalent. Report a genuine capability gap, do not invent availability, and
   continue safe independent work. Do not install a replacement without permission.

Native skill names in the table resolve from the repository root as
`skills/agent-runtime/<skill-name>/SKILL.md`; verify those files. Discover
Codex/plugin skills through the available local registry and read their returned
locations. Do not add machine-specific plugin installation paths to this document.

## Task-to-skill routing

| Task phase | Required relevant guidance | Conditional assistance and boundary |
| --- | --- | --- |
| RT lesson design or storyboard | `understanding-by-design` and `rt-clinical-reasoning` | Define the learner's problem, learning payoff, evidence of application, and supported versus independent work before choosing pages. `workshop-style` may guide a useful concept-to-practice sequence; it is not mandatory. |
| Physiology/mechanism interaction design | `rt-clinical-reasoning`; `deep-interactive` when the objective benefits from exploration or manipulation | Specify the actual learner action, model assumptions, fixed variables, outputs, reveal timing, and reset. Do not turn every lesson into a simulator or impose a whole-module interactive percentage. |
| Native slide composition or repair | `slide-craft` and the relevant `slide-dsl` reference | Apply native canvas geometry only to native canvas content, not automatically to every React screen or responsive interactive page. Use previews when authorized. |
| Authorized new native stage | `stage-design`, applicable `stage-dsl`, and the selected teaching guidance | Read the existing plan and creation workflow first. Roster, narration, media, generation, and persistence operations remain bounded by the task's authorization. |
| Existing persisted stage editing | `pro-editing`, with the clinical/visual guidance for the affected elements | Inspect and patch the existing stage. A new-stage skill is not authority to regenerate or replace a persisted course. |
| New learner flow or visual prototype | The relevant instructional guidance above; available product-design guidance | The audit identified `product-design:audit` and `impeccable`; verify their actual local contracts. Use them for appropriate flow critique or visual refinement. Figma guidance is optional when a design artifact helps, not an obligatory extra phase. |
| Learner-interface implementation | Relevant scene, clinical, and visual guidance for the affected behavior | Inspect existing native primitives before bespoke code. Use installed framework/version guidance. Explain a concrete capability gap when custom implementation is needed. |
| Rendered learner acceptance | Available `playwright`, `visual-verdict`, and `accessibility` guidance, plus repository browser rules | Distinguish component tests, visual inspection, owner-session access, provider isolation, and human accessibility checks. A manual route or screenshot instruction is not a completed browser pass. |
| Multi-module curriculum planning | `curriculum-planner` and `rt-clinical-reasoning` | Use `spiral-curriculum` when deliberate revisiting and progression serve the curriculum. Use `understanding-by-design` for series outcomes; do not apply series construction to a single-module repair. |
| New or changed clinical assertions | Existing claim/source and qualified-RT review process; applicable `fact-check` guidance | `deep-research` is conditional on a real evidence gap. Use available project research tools and verify underlying publications. Neither a research plugin nor a skill grants clinical approval. |

`feynman-learning` is optional for a purposeful teach-back. `vocational` and
`lecture-style` are not default choices for conceptual ICU reasoning; select them
only when their actual task and instructional format fit the user's request.

## Codex guidance versus application runtime

Keep these three states distinct:

- **Read by Codex:** skill instructions were inspected and applied as guidance.
- **Activated in OpenMAIC:** the application selected a skill for its runtime.
- **Executed:** the relevant application/tool operation ran and returned evidence.

The local audit reported structural checks for one selected active runtime skill,
not an automatic union of every skill referenced. Verify current behavior when
using the runtime. Identify the primary active skill and carry applicable
supporting requirements into the actual scene brief or other supported inputs.
Do not claim that reading several Markdown files activates all of them.

`zone-of-proximal-development` was absent in the local audit. Check current
availability rather than assuming it was added. When the design calls for an
independent attempt, targeted support, and a fresh independent application, put
that sequence explicitly in the authorized storyboard without claiming a missing
skill ran. Do not create or install another skill merely to supply its name.

## Conflicts and scope

Task authorization and approved clinical/review boundaries constrain how skills
are applied. Surface any conflict before a consequential action. Do not silently
change clinical meaning or enforce a generic skill's fixed scene count,
interactive ratio, compulsory quiz, narration, roster, or simulator when it
conflicts with the authorized design. Do not claim an incompatible runtime
validation passed; choose a suitable supported workflow or report the limitation.

In particular:

- Reading a generation skill does not authorize provider calls. Zero-provider work
  stays zero-provider; report when a requested next operation needs authorization.
- Native interactive generation is not a medically validated simulator. Verify
  the actual model, behavior, accessibility, and clinical implications.
- Ungraded local practice must not silently enter scored or provider-backed grading.
- Preserve review history and exact version/scope. Newly authored content is not
  automatically approved because it derives from an approved design.
- Reuse existing safeguards and records. Do not invent another framework or reopen
  unaffected clinical approvals to demonstrate that skills were used.

## Learner-experience acceptance

Use the existing product and clinical standards; do not duplicate their full
policies here. At minimum, applicable work must demonstrate:

- An understandable learner problem and an observable learning payoff. Necessary
  teaching conditions precede a prediction; the answer, not essential information,
  is withheld. A taxonomy or a click sequence is not itself a learning objective.
- Visuals that explain a relationship, with meaningful scale, adjacent labels,
  readable normal/narrow layouts, and equivalent accessible information. Decorative
  cards, controls, or animation do not satisfy the visual requirement.
- A clear distinction between supported teaching, independent learner responses,
  assisted revision, and transfer. Repeated evidence types or individual numbers
  are not automatically leaks; a worked answer to the exact assessment case is.
- For materially new flow or visual design, an authorized small usable prototype
  receives human feedback before a full learner-facing rebuild. Respect any
  prerequisite clinical review and the user's current scope.
- Verification of actual rendered behavior before visual acceptance is claimed.
  Tests and skill selection do not establish that a lesson teaches well, and do
  not override a learner's report that it is confusing or unhelpful.

## Reporting

Use the ordinary task report: what was applied, what was produced or changed,
which checks ran, and what remains unverified. Mention a missing skill or runtime
conflict when consequential. Do not create a per-task skill-compliance artifact.
