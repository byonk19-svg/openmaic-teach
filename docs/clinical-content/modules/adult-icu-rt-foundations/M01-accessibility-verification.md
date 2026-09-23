# M01 accessibility verification

> **Disposition:** Accessibility repairs implemented; live verification and final human sign-off remain pending. This audit covers approved candidate hash `1a174fe337897741727c926022d64c89fb7726f0b0575464e4d720c79ecbe054` and does not change learner-facing clinical content.

## Automated checks performed

- Chromium/Playwright learner traversal and keyboard activation checks.
- In-app-browser accessibility-tree inspection for Scene 1, Scene 2, Case A, and Case B.
- Case B accessible-name verification.
- Reduced-motion media-query check and narrow 640px viewport overflow proxy.
- Repository dependency inspection: `@axe-core/playwright`, `axe-core`, and Lighthouse are not installed. No temporary dependency was added.
- Browser zoom shortcut experiment: Playwright-managed Chromium did not expose a verifiable browser zoom state. The in-app browser received zoom shortcuts, but its accessible tree did not expose a percentage. This is not treated as an actual 200% zoom pass.

## Pass/fail table

| Area | Observation | Result |
|---|---|---|
| Approved hash | Current persisted learner-content hash remained `1a174f…e054` during audit. | Pass |
| Page headings | Each learner page exposes its scene title as a heading. | Pass |
| Scene 2 text alternative | The full three-question model is exposed in text order; it is not visual-only. | Pass with semantic limitation |
| Scene 2 structure | The three branches are one undifferentiated text node, not separately headed/grouped items. | Important defect |
| Case A controls | Start Quiz, answer-choice buttons, Submit Answers, and navigation expose meaningful names. | Pass for names |
| Case A keyboard Enter activation | A focused answer-choice button enables submission with Enter. | Pass |
| Case A keyboard Space activation | A focused answer-choice button did not enable submission with Space. | **Blocker** |
| Case B textarea | Accessible name is present: `Your answer for: …`. | Pass, but verbose |
| Case B speech/transcription control | Accessibility tree exposes an unnamed button adjacent to the text entry. | **Blocker** |
| Case B B1/B2 order | Tree reads B1 facts, then B2 facts, then the three tasks. | Pass for order |
| Case B B1/B2 semantics | B1/B2 and the three tasks are one long text node rather than semantic headings/list structure. | Important defect |
| Case B targeted feedback/revision live state | Static component has `role=status` and `aria-live=polite`; live revision state was not resubmitted because the four authorized provider calls were already consumed. | Partially verified |
| Case C order | Page heading precedes historical evidence, current interval, then questions. | Pass from persisted content/tree model |
| Landmarks | Learner surface accessibility tree exposes containers only; no semantic `main`/`nav` landmarks or skip link were found. | Important defect |
| Keyboard navigation | Next scene is keyboard reachable and Enter advances. Case B textarea is reachable. No trap observed in exercised path. | Partial pass |
| Target size | Next-scene target measured 24×24 CSS px. | Pass at AA minimum |
| Reduced motion | `prefers-reduced-motion: reduce` is honored by the browser; no required instructional content depended on animation in exercised states. | Pass, automated scope |
| 640px proxy | No horizontal document overflow at a 640px viewport proxy. | Pass, proxy only |
| Literal 200% browser zoom | Could not be verified through a browser-reported zoom percentage. | Unverified human check |
| Contrast | No installed automated contrast scanner; no complete computed contrast audit was available without adding a dependency. | Unverified human/tooling check |

## Automated screen-reader proxy — not human screen-reader validation

### Scene 2 expected reading sequence

1. Scene heading: **Three questions, different evidence**.
2. Patient + respiratory support.
3. Calculated exhaled minute volume / gas moved per minute.
4. CO2 clearance evidence.
5. Breathing effort/experience evidence.
6. The statement that evidence for one question does not automatically answer the others.

The sequence is readable, but branches lack independent semantic headings.

### Case B initial gate expected reading sequence

1. Scene heading: **Interpret a new snapshot**.
2. Reasoning-checkpoint guidance.
3. Case question and B1 facts.
4. B2 facts, including patient report and neck-muscle observation.
5. The three response tasks.
6. Text entry labelled `Your answer for: …`.
7. Speech/transcription button (currently unnamed — defect).
8. Submit Answers and scene navigation controls.

### Case B feedback/revision expected sequence

1. Scene heading and reasoning guidance.
2. Live status feedback, then exactly one follow-up question.
3. Preserved textbox value and Submit Answers.

The live status role is source-inspected but not re-exercised with a provider call in this audit.

### Case C expected reading sequence

1. Scene heading: **Transfer: measurement applicability after support changes**.
2. Historical gas evidence.
3. Current interval evidence.
4. Questions about retained historical value, current limitation, and timing/support context.

## Artifacts

- [Case B accessible-control capture](../../../../output/playwright/m01-release-final/case-b-accessible.png)
- [Case C transfer capture](../../../../output/playwright/m01-release-final/case-c-transfer.png)
- Earlier corrected screenshots and release captures remain under `output/playwright/`.

## Required accessibility repairs

1. Give the Case B speech/transcription button a meaningful accessible name.
2. Restore native-button Space activation for answer-choice controls.
3. Add semantic landmarks and a skip mechanism to the learner surface.
4. Expose Scene 2 branches and Case B B1/B2/tasks as structured semantic regions/headings/list items without changing their clinical meaning.

These are markup/interaction implementation changes, not intended changes to learner evidence, case facts, calculations, rubric semantics, or feedback policy. Their review binding should be treated as a nonclinical accessibility delta unless implementation changes visible clinical meaning.

## Repair implementation note

The reported defects have been addressed in the renderer/shell layer: the speech button now receives an action-oriented accessible name, choice buttons handle Space without custom Enter duplication, the classroom shell supplies a skip link and main region, Scene 2 has a semantic text alternative, and Case B prompt content is rendered as snapshot sections plus an ordered task list. Focused unit tests passed; the approved clinical-content hash remained unchanged. A full live re-audit is still required before clearing the findings.

## Smallest remaining human checklist after repair

1. With NVDA or Narrator, read Scene 2, Case B initial state, Case B revise state, and Case C; confirm the order above and meaningful button names.
2. Use the actual browser zoom UI at 200% on Case A reveal and Case B revise; confirm no clipping, overlap, lost control, or required two-dimensional scrolling.
3. Use a contrast checker or browser accessibility tool on essential text, controls, focus rings, and revise/pass feedback states.
