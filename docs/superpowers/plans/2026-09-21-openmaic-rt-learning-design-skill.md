# OpenMAIC RT Learning Design Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable personal Codex skill for designing, building, and learner-testing adult acute/ICU RT lessons in OpenMAIC.

**Architecture:** A concise, model-invoked entrypoint directs agents to the repository's authoritative curriculum material and an end-to-end instructional-fidelity loop. A disclosed reference supplies source-linked learning-design guidance so individual lessons can use evidence appropriately without bloating the entrypoint.

**Tech Stack:** Markdown Agent Skills, bundled `skill-creator` initializer and validator.

---

### Task 1: Establish the baseline behavioral gap

**Files:**
- Create: no project file
- Test: an isolated baseline scenario using a delegated agent

- [ ] **Step 1: Run an unassisted pressure scenario**

Ask an agent to plan a rushed clinician-facing RT lesson that requests AI imagery and a final quiz, without loading the new skill.

- [ ] **Step 2: Record the observed gap**

Capture whether the unassisted plan treats generated imagery as clinical evidence, exposes an answer before independent application, or claims clinical readiness without a qualified-RT review boundary.

### Task 2: Create the personal skill and research reference

**Files:**
- Create: `C:\Users\byonk\.codex\skills\openmaic-rt-learning-design\SKILL.md`
- Create: `C:\Users\byonk\.codex\skills\openmaic-rt-learning-design\references\learning-design.md`

- [ ] **Step 1: Initialize the skill directory**

Run:

```powershell
python C:\Users\byonk\.codex\skills\.system\skill-creator\scripts\init_skill.py openmaic-rt-learning-design --path C:\Users\byonk\.codex\skills --resources references
```

Expected: a new skill folder containing `SKILL.md`, `agents/openai.yaml`, and `references/`.

- [ ] **Step 2: Write the model-invoked entrypoint**

Use this frontmatter:

```yaml
---
name: openmaic-rt-learning-design
description: Use when designing, building, refining, or learner-testing adult acute or ICU respiratory-therapy teaching in OpenMAIC, especially where instructional visuals, clinical reasoning, source review, or learner flow need to work together.
---
```

Write the instructional-fidelity production loop and route to `references/learning-design.md` only when selecting an instructional method or justifying a learning-design choice.

- [ ] **Step 3: Write the disclosed research reference**

List the source, bounded design implication, and limitation for retrieval/distributed practice, worked examples, mastery learning, and debriefing. Link only the verified primary or peer-reviewed sources selected during research.

### Task 3: Validate the skill's behavior and structure

**Files:**
- Modify: `C:\Users\byonk\.codex\skills\openmaic-rt-learning-design\SKILL.md` only if test evidence requires it
- Test: the same isolated pressure scenario, now with the skill loaded

- [ ] **Step 1: Run the structural validator**

Run:

```powershell
python C:\Users\byonk\.codex\skills\.system\skill-creator\scripts\quick_validate.py C:\Users\byonk\.codex\skills\openmaic-rt-learning-design
```

Expected: validation succeeds with no required-field or placeholder errors.

- [ ] **Step 2: Forward-test the loaded skill**

Use the baseline scenario with the completed skill. The answer must define a learner problem, source/review status, visual purpose, an independent attempt before feedback, and a browser-verification boundary. It must not claim clinical readiness without qualified-RT review.

- [ ] **Step 3: Correct only observed gaps**

If the forward test misses one required boundary, add a narrow, positive instruction to the single authoritative location, then repeat validation and the same scenario.

### Task 4: Preserve the approved design record

**Files:**
- Create: `docs/superpowers/specs/2026-09-21-openmaic-rt-learning-design-skill.md`
- Create: `docs/superpowers/plans/2026-09-21-openmaic-rt-learning-design-skill.md`

- [ ] **Step 1: Check scoped changes**

Run:

```powershell
git -C C:\Users\byonk\OneDrive\Documents\ChatGPT\Teach\OpenMAIC diff --check -- docs/superpowers/specs/2026-09-21-openmaic-rt-learning-design-skill.md docs/superpowers/plans/2026-09-21-openmaic-rt-learning-design-skill.md
git -C C:\Users\byonk\OneDrive\Documents\ChatGPT\Teach\OpenMAIC status --short -- docs/superpowers/specs docs/superpowers/plans
```

Expected: only the two scoped design documents are staged for this task.

- [ ] **Step 2: Commit the approved repository documents**

Run:

```powershell
git -C C:\Users\byonk\OneDrive\Documents\ChatGPT\Teach\OpenMAIC add -- docs/superpowers/specs/2026-09-21-openmaic-rt-learning-design-skill.md docs/superpowers/plans/2026-09-21-openmaic-rt-learning-design-skill.md
git -C C:\Users\byonk\OneDrive\Documents\ChatGPT\Teach\OpenMAIC commit -m "docs: define OpenMAIC RT learning design skill"
```

Expected: one commit contains only the approved design record and its implementation plan.
