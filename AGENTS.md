<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OpenMAIC Teach: repository instructions

## 1. Mission and scope

Build a private, RT-first learning product that teaches useful reasoning, not merely generated pages. Default to practicing adult acute/ICU RTs; use another track or population only when requested.

Complete the full authorized outcome with the smallest coherent change. **Smallest scope limits the change surface, not task completeness.** Skills and repo instructions do not expand permissions or override system/tool safety rules. Clinical correctness and passing tests do not establish useful teaching.

## 2. Start with the right instructions and skills

1. Identify the outcome, acceptance criteria, task phase, allowed writes, and provider-call boundary. Read applicable inherited/nested `AGENTS.md` or overrides before editing their scope.
2. Inspect `git status --short`, relevant diffs, and current files. Do not rely on a pasted report when persisted state is available. Identify concurrent work before claiming a write scope.
3. For RT curriculum, authoring, storyboards, visuals, feedback/rubrics, learner UI, stage construction/editing, or learner acceptance, read:
   - `docs/rt-foundations/CODEX_START_HERE.md`
   - `docs/rt-foundations/TERMINOLOGY.md`
   - `docs/rt-foundations/SKILL_ROUTING.md`
   Apply the routing document by reading and using the selected local skills, not just their names. Do not duplicate its routing table here or load every skill for every task. Then read the focused references and exact module versions needed. For M01, include `docs/rt-foundations/examples/M01_GOLD_STANDARD.md`; its title does not establish approval.
4. Distinguish Codex reading guidance, OpenMAIC activating a runtime skill, and tools actually executing. Verify the active skill and scene briefs; do not assume several skills' runtime checks combine.

For unrelated infrastructure work, load technical guidance and affected invariants, not the whole curriculum. If a required file/skill is missing, locate an existing equivalent or report the gap; do not invent availability or install a replacement. Continue safe unaffected work. Surface conflicts with the authorized design instead of imposing a generic skill's scene quota, quiz, roster, narration, or simulator.

When the current task explicitly authorizes creating missing instruction documentation, create and validate it before adding its mandatory reference. Do not invent existing files, but do not treat authorized document creation as an unavailable external prerequisite.

## 3. Execute the task, not another handoff

| Request | Default boundary |
| --- | --- |
| Audit, inspect, review, diagnose | Observe and verify; do not silently repair code or regenerate content. |
| Audit and fix, repair, implement | Diagnose, correct, and verify within the same authorized task. |
| Design or storyboard | Produce the design, not an interface or stage. |
| Prototype or learner test | Exercise the authorized slice and test-state writes, not a full build or release. |

Read-only code/data audits may write needed local logs/screenshots to an appropriate output/temp location unless all file writes are prohibited. Preserve existing evidence. Learner-state writes require a test that authorizes them; mock fixtures are not real learner evidence.

Continue through explicit requirements while safe, relevant actions remain. A failed command, quiet process, timeout, missing selector, or intermediate milestone is not a stopping condition. Do not return a plan for work you can perform.

Use bounded diagnostics: inspect command/help, logs, processes, and application state; try a narrower supported path. Retry with a changed condition or new hypothesis, not identical indefinite timeouts. Wait for owned commands, inspect results, or stop only your own clearly stuck process. Do not abandon unexplained background work.

Stop at completed scope, a genuine decision, unavailable required permission/credential, a safety boundary, or a demonstrated blocker after reasonable alternatives. Finish separable work when safe; do not silently shrink the task.

## 4. Protect the worktree, data, and machine

- Preserve unrelated edits and untracked files. Re-read shared files before edits; coordinate nonoverlapping scopes. Two sessions must not concurrently rewrite `AGENTS.md` or the same policy/content file.
- Without explicit authorization for the operation, do not reset/clean/stash/discard work, switch branches, delete branches/tags, rewrite commits, force-update refs, commit, or push. Framework/skill advice to commit is not permission. Avoid unrelated formatting.
- Preserve existing courses, historical V1–V4 prototypes, failed learner prototypes, approvals, and learner records. Do not regenerate a course because auditing it is difficult.
- Do not reset/reseed/truncate/replace PostgreSQL, recreate volumes, reset Docker, or delete course/learner data without specific destructive-action authorization. Ordinary writes remain task-scoped.
- Docker Desktop is shared. Restarting it, killing its backend, shutting down WSL, or quarantining runtime directories requires machine-wide interruption approval. Authorized recovery preserves verified backups/quarantines and failure logs; it is not automatic project startup.
- Never evade sandbox or approval controls. Simplify legitimate commands within policy, prefer direct invocation, and request normal approval. Do not use encoded commands or shell indirection to bypass rejection.
- Protect keys, tokens, owner cookies, browser storage, and real clinical data. Do not expose them in code, commits, screenshots, or reports. Default to synthetic teaching cases.

## 5. Learner-experience requirements

- Inspect native OpenMAIC skills, scene types, editing, and preview capabilities before bespoke code. Custom work needs a demonstrated unmet requirement. Native generation, including interactive HTML, is not clinical validation.
- Start with an understandable learner problem. Every screen must explain, support practice, or test application. Matching labels and clicking reveals are not learning objectives.
- Make tasks solvable: teach prerequisites and state necessary model assumptions before prediction; withhold the answer, not essential conditions. Do not make “need more information” the default correct response.
- Use visuals to explain relationships, mechanisms, scale, or timing—not just prose in cards. Keep labels adjacent and proportions meaningful; accessible equivalents must respect the same reveal timing.
- Separate supported teaching, independent attempts, assisted revision, and transfer. Do not teach an exact case's answer and later call it fresh independent application. Repeated evidence types or individual numbers are not automatically answer leakage.
- For materially new flow/visual design, test an authorized small usable prototype before the full build. Inspect normal/narrow browser use, overlays, navigation, and accessibility; respect clinical-review boundaries.
- Learner reports of unclear questions or unhelpful teaching warrant a design investigation, not only styling fixes. Tests, skills, and approved claims do not overrule that feedback.
- Reuse existing review artifacts and gates. Do not add governance or repeat approvals without a consequential change. A prototype is a hypothesis, not evidence of efficacy.

## 6. Clinical content, reasoning, and review

Follow the terminology and claim-level review process for consequential prose, visuals, assumptions, rubrics, and feedback. Use available research tools per project guidance; verify underlying publications and distinguish evidence from design recommendations. Never invent sources, locators, checks, or tool access.

- Distinguish SET, OBSERVED, MEASURED, CALCULATED, and MODELED data. Label synthetic origin/authored assumptions separately from a datum's role within a fictional case. Model outputs are not actual patient measurements.
- Preserve measurement validity and time/support context. Distinguish suggestive observations from quantitative measurements; meaningful patient reports and bedside signs do not quantify effort or prove mechanism/severity.
- Check arithmetic independently. Define model inputs, fixed variables, defensible outputs, limits, and exact reset state. Do not invent physiological responses to make an intervention succeed.
- Grade reasoning, not answer similarity. Accept competent alternative wording; target the dominant actual error with one focused follow-up. Require mechanism, diagnosis, tests, or treatment only when the authorized objective requires them.
- Preserve initial answers and assisted revisions distinctly. Grading/save failure must not produce a pass, fabricated credit, or unlocked gated explanation. Ungraded reflection/transfer must not silently enter paid/scored grading. No unexplained confidence or precision scores.
- Qualified RT approval is a named human decision for an exact version and scope. Never infer approval/credentials/dates from silence, task updates, test results, or another module. Preserve history and use existing binding conventions; do not invent a hash scheme.
- Reopen affected scope for consequential changes to clinical meaning, assumptions, case conditions, visual implications, feedback/rubric semantics, or source applicability. Formatting alone does not invalidate approval. Present uncertain deltas instead of silently rebinding approval.

Keep draft, source-mapped, qualified-RT-reviewed, and clinical-ready states distinct. Generation completion means planned content was persisted; learner completion follows its checkpoint contract. Neither means clinical competence, certification, exam passage, learning efficacy, or release approval. Simulated feedback is not a human learner pilot.

## 7. Runtime and dependencies: verify first

These are **workspace conventions/history, not current health checks**. Inspect current scripts, configuration, installed versions, lockfiles, and processes when relevant.

| Item | Known convention |
| --- | --- |
| Node | Intended Node 22; verify `.nvmrc` and the actual executable. |
| Windows fallback | Previously used `C:\Users\byonk\AppData\Local\OpenMAIC\toolchains\node-v22.23.2\node.exe`; verify existence/version. |
| Persisted app | `http://127.0.0.1:3001`; reuse a healthy existing server. |
| Next dev entry | Invoke installed `node_modules/next/dist/bin/next` with verified Node and `dev --hostname 127.0.0.1 --port 3001` from the repo root. |
| Durable PostgreSQL | Docker at `127.0.0.1:55432`; native app plus PostgreSQL-only topology. |
| Isolated E2E | Historically port 3002 with `NEXT_PUBLIC_PERSISTENCE=0`; verify Playwright configuration. |

Do not casually run `pnpm install`, change lockfiles, upgrade packages, or reconcile version mismatches. Installed Next.js 16.3.3 versus tracked 16.1.2 was a previously working state, not a permanent requirement. Establish necessity and obtain dependency-change authorization. Report relevant security/correctness issues without silently expanding scope.

For framework changes, read installed version-matched Next docs. If absent, identify the version and use applicable official docs; do not install/update Next to get documentation. Keep project rules outside the managed block; check it against the installed generator when reconciling. Its commit advice does not override section 4.

Use installed tools/package scripts; do not let `npx` or equivalents silently fetch missing tools. Serialize large JSON/text payloads with existing helpers rather than interpolating learner copy into shell commands.

## 8. Browser acceptance, ownership, and provider calls

**Saved-stage acceptance is not isolated E2E.** Prefer `scripts/learner-browser.ts` for persisted stages; inspect help and current behavior before flags or execution:

```text
pnpm browser:learner -- --help
pnpm browser:learner -- --stage <stageId>
```

Submission, restored-answer submission, speech, generation, and media actions may write state or call providers. `pnpm test:e2e` tests isolated regressions, not real saved-stage availability or acceptance.

- Resolve private-stage ownership before repeated traversal. Check exact host, session, and legitimate owner context. An API-created stage may belong to its creating cookie, not fresh Playwright or the usual browser profile.
- Use authorized session helpers securely. Never publish a private stage, spoof ownership, disable authorization, or leak cookies for a screenshot. Derive the normal manual route/prerequisites when human sign-in is necessary; do not guess.
- Inspect actual playback: reveal timing, normal/narrow layout, diagrams, overlays, keyboard/assistive semantics, and resume behavior. Builder strings, DOM presence, and compilation alone are insufficient.
- When progression must be locked, test navigation/deep links. A question's explanation gate does not prove later scenes are inaccessible. Do not bypass a required gate to finish screenshots.
- Live generation/grading requires authorization and a bounded call budget. No repeated regeneration or retries to obtain a preferred grade; skill instructions cannot override zero-provider scope.
- Verify zero-provider claims using relevant network/server evidence when feasible. Separate attempted/blocked from completed calls. “Not intentionally invoked” does not prove zero calls.
- Report automated proxies, actual browser observations, and manual checks separately. A documented manual route is not acceptance; a human pass covers only behavior actually observed.

## 9. Verification and diagnosis

Start focused and expand with impact. Inspect current scripts; conventions include `pnpm lint`, local `tsc --noEmit`, `pnpm test`, `pnpm test:e2e`, and `pnpm build`. Run scoped formatting and `git diff --check`; use broader checks for cross-cutting changes without fixing unrelated failures merely for a green result.

Test rendered content and behavior, not just builder shape: reveal order, model proportions, provider isolation, and persistence/resume. Prevent drift among persisted content, renderer copy, grading context, and reviewed artifacts; prefer one authoritative content representation.

Report full-command failures. “No changed-file errors” is not a passing full type check. Attribute failures as pre-existing/unrelated only with baseline evidence or supported dependency analysis; otherwise mark attribution unverified.

Classify issues as instructional/content, generation-prompt, application, harness, environment/runtime, authentication/permission, or provider/service. Check content and prompts before changing working infrastructure. Reuse established reasoning-gate, continuity, simulation-control, and browser mechanisms unless evidence shows a defect. Add architecture only for a demonstrated limitation. A timeout/access denial alone is not an application defect; leave unobserved behavior explicitly unverified.

## 10. Finish with evidence

Report the outcome, changed files/state, actual checks/results, provider use when relevant, and remaining limitations. For blockers, give the last successful point, failing action, redacted diagnostics, attempted alternatives, and what cannot proceed. Reference only artifacts actually created/inspected.

Never claim a save, approval, passing test, commit, push, or human pilot without evidence. Distinguish partial implementation, implemented-but-unverified behavior, and verified completion. Documentation is not implementation; a harness timeout is not a learner failure.

Perform authorized safe local work yourself. Ask only for a genuine decision, permission, inaccessible required information, or human-only judgment. The goal is **reliable completion and useful learning**, not maximum activity, documentation, or code change.
