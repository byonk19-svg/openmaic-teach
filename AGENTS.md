<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# OpenMAIC Teaching Workspace Instructions

## Purpose

This is a customized OpenMAIC workspace being developed into a clinically rigorous, question-led respiratory therapy learning system for a practicing adult acute/ICU respiratory therapist.

The priority is now the quality and reliability of real RT learning modules, not adding platform infrastructure for its own sake.

Unless the user's current task explicitly says otherwise, prefer the smallest change that solves a demonstrated problem.

# Task Execution Contract

## Do the requested task, not merely the first diagnostic step

When the user asks you to execute, test, audit, implement, diagnose, or verify something, continue working until one of these is true:

1. the requested objective is actually completed and verified;
2. a user decision is genuinely required before proceeding;
3. an external credential, permission, service, or resource that you cannot obtain is required;
4. continuing would violate a safety or permission boundary;
5. a reproducible technical blocker remains after reasonable safe diagnostic and fallback attempts.

Do NOT stop merely because:

* the first command failed;
* a command timed out;
* a shell command was rejected by a command-safety layer;
* Playwright failed once;
* a server was not initially running;
* stdout was empty;
* one expected UI selector was not found;
* one approach proved unsuitable;
* additional investigation is required;
* you have enough information to give the user a status update.

A failed attempt is a diagnostic result, not automatically a blocker.

Do not end a task with only a plan, status report, or description of what should be tried next when you still have safe, relevant actions available to perform yourself.

## Long-running operations

When you launch a command that is expected to take time:

* wait for it to complete;
* inspect its result;
* or explicitly terminate it if it is clearly stuck.

Do not abandon a running command merely because it is temporarily quiet.

A timeout is not enough to diagnose the underlying failure. Check whether the process is still alive, whether output files/logs were produced, and whether a larger bounded timeout or narrower command is appropriate.

# Definition of a Real Blocker

Before reporting that a task is blocked, collect enough evidence to explain the blocker precisely.

Whenever available, report:

* exact command or action attempted;
* working directory;
* exit code;
* stdout;
* stderr;
* browser/page error;
* relevant HTTP/network error;
* URL or application state reached;
* whether the failure reproduces;
* what narrower safe alternative was attempted.

Before declaring a command-level blocker, normally try:

1. the simplest direct form of the intended command;
2. inspecting `--help`, source, package scripts, or relevant documentation;
3. a narrower diagnostic command;
4. an existing project-supported alternative path, if one exists.

Do not call an OpenMAIC platform defect merely because Codex, PowerShell, Playwright, an approval layer, or a local process-control mechanism failed.

Separate:

* application defect;
* test/audit harness defect;
* environment/tooling problem;
* command-safety/permission problem;
* generated content problem.

If you truly cannot continue, say exactly which category the evidence supports.

# Command Safety

Never attempt to evade Codex sandbox, approval, or command-safety protections.

If a legitimate command is rejected:

* simplify it;
* split compound commands into individual commands;
* prefer direct executable invocation over unnecessary shell wrapping;
* avoid `cmd /c`, nested PowerShell, encoded commands, shell tricks, or indirection unless actually required;
* request normal approval when the environment requires approval.

A command-safety rejection is evidence about the attempted command form, not evidence that OpenMAIC is broken.

# Worktree and Data Safety

Treat the current worktree and local data as valuable user state.

Unless the user explicitly requests the specific operation, do NOT:

* run `git reset`;
* run `git clean`;
* discard local modifications;
* overwrite unrelated user changes;
* stash user work merely to obtain a clean tree;
* switch branches;
* delete branches or tags;
* rewrite existing commits;
* force-update refs;
* push to a remote;
* reset or reseed PostgreSQL;
* destroy or recreate Docker volumes;
* reset Docker;
* delete persisted learner/course data;
* regenerate an existing course merely because auditing it is difficult.

Always inspect `git status` before making changes.

Existing unrelated modifications belong to the user. Work around them rather than reverting them.

Do not push anything without explicit user approval.

Do not create a commit unless the current task explicitly asks for a commit/checkpoint or committing is clearly part of the user's requested workflow.

# Dependency and Runtime Safety

## Node

The intended OpenMAIC local runtime is Node 22.

A portable Node 22 installation has been used successfully on Windows:

`C:\Users\byonk\AppData\Local\OpenMAIC\toolchains\node-v22.23.2\node.exe`

The repo `.nvmrc` also specifies Node 22.

System Node versions may differ. Verify the executable actually being used when runtime behavior matters.

## Dependency state

Do NOT casually run:

`pnpm install`

This teaching workspace may intentionally have an installed `node_modules` state that differs from the tracked package manifest/lockfile.

In particular, a previously verified local runtime used installed Next.js 16.3.3 while the tracked package baseline declared Next.js 16.1.2.

Before changing dependencies:

1. establish that the task actually requires a dependency change;
2. inspect the current installed versions;
3. inspect `package.json` and lockfile state;
4. explain why changing dependency state is necessary.

Do not "fix" a version mismatch simply because one exists.

Never update dependencies as incidental troubleshooting.

## Native application

The normal persisted native teaching application is expected at:

`http://127.0.0.1:3001`

Reuse an already-running healthy server rather than starting duplicates.

A previously proven direct development-server invocation used portable Node 22 with the installed Next binary:

`node_modules\next\dist\bin\next dev --hostname 127.0.0.1 --port 3001`

Verify current runtime state before starting a server.

## PostgreSQL

The persisted teaching database runs locally in Docker at:

`127.0.0.1:55432`

Treat it as durable acceptance data.

Do not reset, recreate, reseed, truncate, or replace it unless the user explicitly requests that exact destructive action.

# Playwright and Learner Audit Rules

There are TWO importantly different browser-testing paths.

## 1. Persisted learner-browser harness

For real saved courses and learner acceptance auditing, use the repo-native learner harness:

`pnpm browser:learner -- --stage <stageId>`

Implementation:

`scripts/learner-browser.ts`

Inspect:

`pnpm browser:learner -- --help`

before inventing unsupported flags.

The harness supports existing options including:

* `--stage`
* `--base-url`
* `--learner-key`
* `--headed`
* `--screenshot-dir`
* `--timeout-ms`
* `--require-draft`
* `--submit-restored`

Its normal persisted application target is port 3001.

It already owns a Chromium browser and already captures useful console, page, network, screenshot, and learner-state diagnostics.

Use this existing surface before creating another browser harness.

## 2. Generic Playwright E2E suite

`pnpm test:e2e`

is NOT a substitute for auditing a real persisted course.

The normal Playwright configuration:

* uses port 3002 when it launches its own local server;
* sets `NEXT_PUBLIC_PERSISTENCE=0`;
* intentionally isolates E2E fixtures from the developer's live PostgreSQL acceptance data.

The deterministic reasoning-gate E2E also seeds its own synthetic browser-local course.

Therefore:

DO NOT run the generic E2E suite, fail to find a real persisted stage, and conclude that the real stage is missing or broken.

Use generic E2E for deterministic application regression testing.

Use the learner browser/native persisted runtime for real-course acceptance auditing.

If the existing learner harness is insufficient for a particular multi-scene inspection:

1. inspect the current browser harness and existing Playwright page objects/tests;
2. determine whether an existing safe browser-control path can perform the action;
3. distinguish a harness limitation from an application defect;
4. do not redesign browser infrastructure during a clinical audit unless a separate implementation task explicitly asks for that work.

# Audit Mode vs Implementation Mode

Determine what kind of task the user requested before changing files.

## Audit / review / diagnosis tasks

If the user asks to audit, inspect, review, test, or diagnose:

* default to observation and verification;
* do not silently turn the audit into an implementation task;
* do not modify application code just because you found a defect;
* do not regenerate course content during an audit unless explicitly instructed;
* record exact evidence;
* classify the finding;
* finish the requested audit if possible.

Normal learner-attempt/review persistence caused by explicitly requested learner testing is allowed when the audit requires it.

If a defect is found during an audit, report the smallest likely layer responsible and continue the remaining audit when safe and meaningful.

## Implementation tasks

If the user asks to fix or implement something:

* investigate enough to identify the actual failing layer;
* implement the smallest coherent fix;
* avoid unrelated cleanup;
* avoid opportunistic refactors;
* verify the behavior after changing it.

Do not stop after identifying the bug if the user's request was to fix it.

# Smallest-Layer Rule

When a real RT module exposes a problem, classify it before building anything.

Prefer the smallest applicable layer:

1. course/content problem;
2. prompt/generation problem;
3. existing feature implementation bug;
4. actual platform limitation requiring new architecture.

Do not jump directly to layer 4.

The project already contains substantial reasoning-gate, clinical-continuity, simulation-control, and learner-browser infrastructure.

Treat those systems as established unless concrete evidence from a real module demonstrates a defect.

Do not rebuild successful infrastructure simply to make an individual course easier to debug.

# Protected Historical Work

Historical prototype courses V1, V2, V3, and V4 are reference artifacts.

Do not modify or regenerate them unless the user explicitly requests modification of one of those prototypes.

Their failures and successes are evidence used to evaluate newer architecture.

# Generation and API-Credit Discipline

Real model generation can consume paid API usage.

Do not repeatedly regenerate a scene/course as a troubleshooting technique.

Use bounded generation attempts.

Before regenerating:

1. inspect the persisted generated source;
2. determine whether the problem is actually content/generation related;
3. determine whether a smaller content correction or prompt fix is appropriate;
4. preserve useful failed examples when they provide diagnostic evidence.

When the user says not to regenerate, that instruction is absolute for the task.

# Clinical RT Learning Requirements

The intended learner is a practicing adult acute/ICU respiratory therapist.

Do not simplify content into basic RT-school instruction unless explicitly requested.

Preferred topics include:

* mechanical ventilation;
* ventilator waveforms;
* patient-ventilator dyssynchrony;
* tracheostomy management;
* ABGs;
* NIV;
* measurement validity;
* selected NICU/Babylog VN800 topics when specifically requested.

## Question-led learning

The learner should normally interpret or decide before seeing the explanation.

For gated reasoning:

* ask one clear question;
* do not leak the answer before submission;
* vague answers should receive targeted follow-up rather than the full explanation;
* incomplete but promising answers should be asked for the missing reasoning component;
* clinically competent alternate wording should pass when it satisfies the rubric.

Do not make grading depend on exact phrase matching to generated analysis.

## Data provenance

Clearly distinguish:

* SET: clinician-configured values;
* OBSERVED: directly observed bedside findings;
* MEASURED: instrument/maneuver-derived measurements;
* CALCULATED: values derived mathematically from known data;
* MODELED: simulation outputs.

Do not blur these categories.

Do not label simulated output as measured patient data.

## Simulation causality

Causal teaching simulations must isolate the intended variable.

If the learner changes one control:

* fixed variables must remain fixed;
* downstream changes must be physiologically defensible;
* effects must not be invented simply to make the intervention look successful;
* baseline state should reproduce the source-scene abnormality;
* reset should return the exact defined baseline.

Independently check simple clinical math such as:

* inspiratory time;
* cycle time;
* expiratory time;
* I:E ratio;
* minute ventilation when enough data exist.

## Measurement validity

Measurement validity is part of the clinical reasoning, not a footnote.

Do not accept a numerical measurement merely because the maneuver produced a number.

For example, intrinsic PEEP derived from an expiratory hold requires valid measurement conditions. Active respiratory effort, unstable pressure, leak, or other invalidating conditions must be handled explicitly.

Differentiate:

* evidence suggesting a physiologic problem;

from:

* a valid numerical measurement of that problem.

## Synthetic scores

Do not invent unexplained percentages, confidence scores, or precision merely to make educational output appear quantitative.

Use quantitative values only when they have defined clinical, rubric, measurement, or model meaning.

# Verification After Code Changes

Use the smallest useful verification first, then expand based on blast radius.

Available project commands include:

* `pnpm lint`
* `npx tsc --noEmit`
* `pnpm test`
* `pnpm test:e2e`
* `pnpm build`

Prefer focused tests for the code changed before running broad suites.

For cross-cutting application changes, run appropriate broader verification before declaring completion.

Do not run a repository-wide write-format operation merely as a reflex when it would create unrelated changes.

Do not claim a change works merely because it compiles.

Verify the requested behavior when a practical behavioral check exists.

If a check cannot be run, state exactly which check was not run and why.

# Final Response / Definition of Done

Do not say the task is complete unless the requested outcome has actually been achieved or a genuine blocker has been established.

For implementation tasks, the final report should normally include:

* what changed;
* why;
* relevant files;
* verification actually run;
* result of those checks;
* any remaining limitation.

For audit tasks, include:

* what was inspected;
* exact observed behavior;
* evidence for findings;
* what was and was not tested;
* whether anything was mutated;
* final requested verdict only if enough evidence exists.

For a blocked task, include:

* precise blocker;
* exact last successful point;
* exact failing action;
* relevant diagnostics;
* alternatives already attempted;
* why no safe actionable path remains;
* what remains unverified.

Avoid vague completion statements such as:

* "should work";
* "appears fixed";
* "probably";
* "you can try...";
* "the rest can be done later"

when direct verification is available.

Never claim:

* a file was saved when it was not;
* a database mutation succeeded without a successful response;
* a test passed if it was not run;
* a commit exists if it was not created;
* a push occurred if it did not occur.

# User Interaction

The user expects Codex to perform local repo work, not merely provide instructions for commands Codex itself can safely execute.

Do not tell the user to run a local command solely because the first Codex attempt failed.

Run safe diagnostics and supported commands yourself when tools and permissions allow it.

Ask the user only when:

* an actual choice matters;
* credentials or approval must come from them;
* a destructive action needs explicit authorization;
* required information is unavailable and cannot be inferred safely.

For a complex task, keep working through intermediate problems rather than treating each intermediate failure as a new user handoff.

The goal is reliable completion with evidence, not maximum activity and not maximum code change.
