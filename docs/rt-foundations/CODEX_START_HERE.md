# Codex: Start Here

**Version:** 0.1 · 2026-09-15
**Purpose:** turn the docs into working direction without replacing existing repository instructions or expanding the task.

## 1. Read the target, then inspect the actual repository

For RT curriculum/content work, read [README.md](README.md), [NORTH_STAR.md](NORTH_STAR.md), the relevant entry in [CURRICULUM_INTENT.md](CURRICULUM_INTENT.md), [AUTHORING_STANDARD.md](AUTHORING_STANDARD.md), [CLINICAL_CONTENT_POLICY.md](CLINICAL_CONTENT_POLICY.md), and [QUALITY_BAR.md](QUALITY_BAR.md). Read the [M01 exemplar](examples/M01_GOLD_STANDARD.md) for the current foundational pilot. Use the [template](templates/MODULE_SPEC.md) for authoring.

Before editing, inspect applicable repository instructions and relevant current artifacts. Use their exact IDs and paths. Do not infer current software state from an old handoff or a course title. These docs specify a teaching target; they do not certify what is already implemented.

## 2. Short AGENTS.md addition

> **Adoption status (2026-09-23):** The repository-root `AGENTS.md` has since been
> reconciled through an explicitly authorized instruction task and is the current
> project-owned authority. The compact block below is retained as historical
> bootstrap guidance for a repository that has not adopted the RT instructions;
> it must not be used to replace, truncate, or mask the current root file. Future
> reconciliation keeps the maintained detail in `docs/rt-foundations/` and the
> single task-based `SKILL_ROUTING.md` requirement in the root instructions.

During an explicitly authorized docs integration task, merge the following short section into the appropriate existing repository-level instruction file. Do not replace it, create an override that masks it, or duplicate an equivalent section. The paths below assume this pack is installed at the recommended location.

```markdown
## Adult ICU RT learning product

For RT curriculum, clinical content, lesson-generation, and learner-feedback work,
read `docs/rt-foundations/README.md` and the relevant linked specifications before
editing. `NORTH_STAR.md` owns product intent; `CURRICULUM_INTENT.md` owns module
scope; `AUTHORING_STANDARD.md` owns the teaching contract; and
`CLINICAL_CONTENT_POLICY.md` owns source/review requirements. Use
`QUALITY_BAR.md` for acceptance. For the first foundational pilot, compare the
actual content with `examples/M01_GOLD_STANDARD.md`.

Build evidence-based reasoning experiences, not narrated chapters or answer-key
quizzes. Teach simply, show a worked example, require a fresh independent attempt,
give targeted feedback, and revisit the skill. Preserve meaningful uncertainty
without rewarding blanket uncertainty or hidden-keyword answers.

M01–M10 are curriculum positions, not existing course IDs. Inspect before mapping;
do not rename, overwrite, regenerate, or rebind existing artifacts implicitly.
Generated clinical content remains draft until applicable source mapping and
qualified RT review establish the exact version's clinical-ready status.

Use existing components and repair the smallest authorized surface. These docs do
not authorize paid generation, feature activation, clinical approval, publication,
database changes, or unrelated platform work. Complete the current authorized task
and its relevant verification; do not stop at another outline when implementation
or full authoring was requested. Report specific blockers and continue safe,
unaffected authorized work.
```

OpenAI documents AGENTS.md as a mechanism for project instructions with directory-dependent scope. Keep the addition short and link to the maintained documents rather than pasting the entire pack into it. Inspect existing scope and overrides when verifying adoption. Official reference: https://learn.chatgpt.com/docs/agent-configuration/agents-md (accessed 2026-09-15).

The proposed section is guidance, not a substitute for actual approval, access control, or runtime enforcement. No repository instruction file has been changed by the creation of this pack.

## 3. Copy/paste prompt: integrate these docs only

```text
Integrate the supplied RT Foundations documentation pack as repository guidance.
This is a docs-only task, not authorization to generate or change clinical lessons.

Read the applicable repository instructions and inspect existing docs first.
Merge the pack into docs/rt-foundations/ without blindly overwriting existing work.
Add the concise, nonduplicative instruction pointer from CODEX_START_HERE.md to
our existing appropriate AGENTS.md, preserving all other instructions.

Reconcile the older module brief with this maintained baseline. Preserve historical
content where needed and point it to the new baseline rather than maintaining
conflicting rules. In particular, the first M01 independent case must use valid,
time-matched inputs; timing mismatch belongs in later transfer.

Do not change application code, existing course content or IDs, source-review
bindings, environment flags, services, databases, dependencies, publication state,
or generation settings. Do not run paid generation. Do not commit or push.

Validate the relative links and check for contradictory instructions. Report the
files changed, any unresolved conflict requiring my decision, and a concise summary
of the exact M01 teaching target. Finish the docs integration and verification;
do not turn this into a proposal for a new platform.
```

## 4. Copy/paste prompt: author the complete M01 pilot draft next

Use this only when the owner is ready to authorize the next content-authoring task.

```text
Use docs/rt-foundations/ as the design baseline. Author a complete M01 pilot draft,
not another outline. First inspect existing module artifacts and source records so
you reuse relevant work without overwriting or rebinding a different course.

Produce the learner-visible teaching copy, simple visual specification and text
alternative, worked case, fresh independent case, explicit answer criteria,
accepted alternatives, targeted feedback fixtures, transfer item, and claim/source
map. Use the existing authoring formats where possible.

The central overclaim is that correct calculated minute ventilation establishes
adequate CO2 clearance and acceptable breathing effort. The main inputs must be
valid. The independent case must require use of additional evidence, not just
repeat “insufficient information.” Do not introduce a hidden leak or timestamp
mismatch to explain the main overclaim.

Verify the calculations and case continuity. Check the draft against QUALITY_BAR.md.
Source-map the actual clinical claims from primary sources and flag unresolved
claims precisely. Leave reviewer fields unassigned and clinical status as draft.
Do not label it clinical-ready or invent a completed qualified RT review.

This task authorizes content/document authoring, not application or database changes,
paid generation, course mutation, feature activation, publication, commit, or push.
Complete the full draft and its available checks. Report specific blockers without
abandoning unaffected authorized work or rebuilding infrastructure.
```

An implementation task can follow with its own authorized scope. Do not infer that a source-mapped draft, owner enthusiasm, or a successful render permits clinical-ready release.

## 5. Work loop for later authorized implementation

**Inspect → map to the objective → identify the smallest relevant change → implement the authorized change → verify the actual experience → report evidence.**

Classify a problem before fixing it:

| Problem | First place to repair |
|---|---|
| Unclear explanation, overbroad rubric, weak independent case. | Content and authoring specification. |
| Generation fails to follow a sound specification. | The relevant generation prompt or adapter, when authorized. |
| Content requires behavior an existing component cannot support. | Reproduce the specific component limitation; make only the authorized bounded fix. |
| Source gap or clinical disagreement. | Source record and qualified-review process, not the grading threshold. |
| Render, persistence, or gate defect. | Reproduce with the actual artifact; preserve unrelated data and behavior. |

Do not end an implementation request merely with a plan when safe, authorized implementation and verification remain possible. Equally, do not expand a content task into an implementation request that was never made.

## 6. Protected state and explicit non-goals

Preserve existing lessons and development baselines, reasoning-gate behavior, continuity mechanisms, and browser-test structure unless the current task authorizes a demonstrated bounded repair. Do not reset/reseed databases or Docker, casually change toolchains, update dependencies, or alter unrelated files.

If the clinical-review flags `OPENMAIC_ENABLE_CLINICAL_REVIEW` and `NEXT_PUBLIC_ENABLE_CLINICAL_REVIEW` are present, leave their values and server-authoritative behavior unchanged. Do not create reviewer identities, auto-approve a lesson, change owner/scope bindings, or alter public/private state to make a test pass.

There is no authorization here for a scheduler, analytics system, new learner-event schema, generic course-publication redesign, or additional platform governance layer. Use existing capabilities and describe missing capabilities honestly.

## 7. What to report

Use the completion-report fields in QUALITY_BAR.md. Lead with the actual result and the teaching change. Separate a content audit, technical tests, source mapping, and clinical review. Name what was not exercised.

Do not claim the entire curriculum is implemented because documents exist, that all references were verified because URLs resolve, or that the module teaches safely because its software checks pass.
