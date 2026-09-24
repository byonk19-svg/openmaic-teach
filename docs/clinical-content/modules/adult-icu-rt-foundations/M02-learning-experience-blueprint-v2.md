# M02 learner-experience blueprint v2

**Status:** no-code instructional-design storyboard, revised after qualified-RT feedback. It does not replace the approved M02 teaching contract, source records, qualified-RT review decision, or existing prototype. It authorizes neither stage creation nor generation.

**Purpose:** redesign the learner experience for M02 — *Oxygenation, ventilation, and respiratory demand* — before any visual prototype or implementation work. The prior learner-facing draft and bespoke implementation remain historical evidence of a technically careful prototype that did not meet the learner-experience bar.

**Limited visual-prototype authorization:** Brianna approved Teaching Case A and the bounded prototype scope on 2026-09-18: Case A’s synthetic facts; Case B’s protected independent first response; the common-scale paired-breath visual; the assumption-first ungraded prediction and 3/6 -> 7/4 explanation; and ungraded local transfer. This does not approve final learner content, a full-module rebuild, live grading, release, or clinical-ready status.

**Clinical authority retained:** [M02 teaching contract](../../../rt-foundations/M02_TEACHING_CONTRACT_DRAFT.md), [claim/source map](M02-claim-source-map.md), [qualified-RT review packet](M02-qualified-rt-review-packet.md), [qualified-RT review decision](M02-qualified-rt-review-decision.md), and the linked M02 source records.

**Design method:** Understanding by Design is primary. `rt-clinical-reasoning` governs case realism, provenance, prediction-before-explanation, controlled simulation boundaries, and review limits. `deep-interactive` is used once, where seeing the minute-volume relationship materially improves understanding; it does not dictate the whole scene mix. The local `zone-of-proximal-development` skill is absent, so the storyboard explicitly uses independent attempt -> targeted support -> fresh independent transfer/check.

## 1. Enduring understanding

1. A respiratory datum supports a bounded conclusion only when its question, current support, time, provenance, and limits are clear; reassuring-looking signals must not be collapsed into a globally reassuring respiratory state.
2. Oxygenation context, CO2 evidence, gas moved per minute, and patient breathing evidence can all matter in one snapshot without being interchangeable or proving a cause, severity, or treatment need.

## 2. Essential question

> At this bedside, what can I say with confidence, what would I refuse to conclude yet, and what would help resolve the remaining concern?

This is intentionally bedside language. The formal three-question model is a later support, not the opening task.

## 3. Performance evidence sequence

### Supported learning evidence — Teaching Case A

Teaching Case A gives the learner a supported bedside tension, a plain-language map, and a cautious return from the paired-breath model. It is instructional preparation, never independent performance evidence.

### Primary independent performance evidence — fresh Case B

On its **first assembled learner-visible exposure**, the approved synthetic Case B snapshot requires a concise bedside interpretation that:

- states what SpO2 means only in its stated FiO2 context;
- treats current, time/support-matched PaCO2 as direct evidence of that value without calling global ventilation adequate;
- states that exhaled minute volume is gas moved per minute, not evidence of modeled/alveolar ventilation without an assumption;
- includes the patient's breathing experience and effort-related observation without converting either into measured work, mechanism, diagnosis, or treatment;
- names one unresolved question and one purpose-linked next assessment/evidence source.

Success is an integrated supported conclusion, not pathway-name recall, arithmetic, clicking every reveal, or an intervention recommendation. The initial Case B response is followed only by targeted feedback; any revision is documented as assisted learning.

### Fresh transfer evidence — C1/C2

The approved same-SpO2/different-FiO2 comparison follows Case B as an **ungraded, zero-provider independent response** with a local approved reveal. It is transfer evidence, not a second semantic checkpoint.

## 4. Proposed Teaching Case A

> **PROPOSED — REQUIRES QUALIFIED-RT REVIEW BEFORE PROTOTYPING.** Teaching Case A is an authored synthetic instructional case. It is deliberately distinct from approved Case B and introduces no new clinical relationship, threshold, target, diagnosis, mechanism, severity claim, or treatment implication.

| Datum | Proposed synthetic fact | Instructional purpose | Existing claim IDs | New clinical claim? |
|---|---|---|---|---|
| Current support | FiO2 0.50 | Makes support context visible without reproducing Case B’s FiO2 0.70 | `M02-C01`, `M02-DS-001` | No; a new authored value requires review for fairness/presentation only |
| Oxygenation observation | SpO2 95%, reliable signal | Invites a superficially reassuring first impression while preserving context | `M02-C01`, `M02-DS-001` | No |
| Gas moved per minute | Exhaled minute volume 8.0 L/min over the stated current 60-second interval | Creates the same total-output limit without reusing 10.0 L/min | `M02-C02`, `M02-DS-001` | No |
| Current gas evidence | PaCO2 40 mm Hg from a current arterial sample matched to current support/time | Lets supported teaching distinguish direct current CO2 evidence from minute volume | `M02-C03`, `M02-DS-001` | No |
| Patient report | “I have to work for each breath right now.” | Keeps breathing experience visible without reusing Case B’s exact quote | `M02-C04`, `M02-DS-001` | No; altered authored wording requires review |
| Effort-related observation | Visible inspiratory accessory-muscle activity | Keeps a qualitative bedside observation present without claiming measured effort | `M02-C04`, `M02-DS-001` | No; altered authored observation requires review |
| Explicitly unavailable | Dead-space estimate, diagnosis, waveform, quantified respiratory-muscle effort, PaO2, hemoglobin, perfusion assessment | Prevents invented assumptions and keeps the task bounded | `M02-C01`–`M02-C04`, `M02-DS-001` | No |

Case A uses the same evidence *types* as M02’s approved reasoning frame. Its facts are synthetic teaching inputs only; none is a normal value, target, patient measurement, rule, or recommendation. Qualified-RT review must determine whether this distinct configuration is plausible, fair, and sufficiently nonoverlapping with Case B.

### Case B independence invariant

**Before the independent Case B scene, no learner-visible teaching scene may contain the exact Case B assembled evidence configuration or a supported worked interpretation of that configuration.** Seeing the same evidence types is expected. Seeing Case B’s exact assembled facts and their answer is not.

## 5. Revised learner journey

| # | Learner moment | Scene type | What learner sees | What learner does | Visual/interaction | Learning payoff | Independent or supported |
|---:|---|---|---|---|---|---|---|
| 1 | Teaching Case A bedside tension | `slide` | Compact, unsorted proposed Teaching Case A snapshot | Pauses to answer privately: “What looks reassuring, and what would I refuse to conclude yet?” | One patient snapshot, organized by provenance and current conditions rather than physiology categories | Makes the global-reassurance shortcut visible before terminology | Supported learning, ungraded |
| 2 | Give Case A a usable map | `slide` | The same Teaching Case A with three plain-language bedside questions adjacent to the specific facts that can inform them | Compares the initial instinct with each question and its limit | Patient-centered annotation: oxygenation on current support; current CO2 evidence; breathing burden/patient experience | Learner sees why the data cannot become one adequacy verdict | Supported |
| 3 | Assumption-first mechanism prediction | `quiz` | Pattern A/B, equal 10.0 L/min total gas, and the stated 0.15 L non-gas-exchanging portion per breath | Chooses which pattern yields more modeled alveolar ventilation and optionally records why | Local, ungraded single-selection prediction with an optional reasoning note; no provider or semantic grading | Makes the directional physiology problem solvable before the visual explanation | Supported practice, ungraded |
| 4 | See the mechanism, not an equation | `interactive` | The two approved breathing patterns on a common reference volume scale | Inspects the 3-versus-6 L/min excluded-volume consequence and resulting 7-versus-4 modeled output | Constrained paired-breath comparison; see Section 6 | Shows why equal total minute ventilation can yield different modeled exchange-reaching ventilation under one stated assumption | Supported local reveal after prediction |
| 5 | Return to Teaching Case A | `slide` | Case A returns. The model’s conclusion is shown beside its current PaCO2 and minute-volume evidence, with support/patient evidence still visible | States what minute volume does **not** add to current PaCO2 evidence and what remains meaningful about the patient | A compact “what this datum can carry / cannot carry” visual; no matching game | Prevents the model from becoming a detached equation lesson | Supported bridge |
| 6 | New exposure: make the integrated bedside call | `quiz` | **First assembled exposure** to full, unsorted approved Case B with provenance labels and unavailable facts | Gives the three-part supported conclusion and one purpose-linked next assessment | Native one-question short-answer reasoning checkpoint with the existing reasoning-gate pattern | Demonstrates integration without global reassurance or blanket uncertainty | Independent retrieval; assisted revision only after targeted feedback |
| 7 | C1/C2 fresh transfer | `quiz` | C1 and C2: same reliable SpO2 of 94%, FiO2 0.30 versus 0.70; CO2/breathing-burden evidence deliberately controlled outside the comparison | Explains what stayed the same, what changed the oxygenation interpretation, and what cannot be concluded | Side-by-side support-context comparison; **local approved reveal only** | Tests whether the learner carries support context into a changed bedside snapshot | Fresh independent, ungraded, zero-provider transfer |

`pbl` is intentionally absent: M02 needs concise bedside interpretation, not a project workspace. The two `quiz` scenes are meaningful reasoning points, not reading-comprehension checks. The only `interactive` scene earns its place by making a hidden relationship visible and inspectable.

## 6. Scene detail and visual requirements

### 1. Teaching Case A bedside tension

**What the learner sees.** Four compact, provenance-first regions from the proposed synthetic Teaching Case A: FiO2 0.50; reliable SpO2 95%; exhaled minute volume 8.0 L/min over the stated current 60-second interval; current PaCO2 40 mm Hg; “I have to work for each breath right now”; and visible inspiratory accessory-muscle activity. “Not supplied” remains visible but quiet.

**Learner action.** Before any explanation, the learner considers: “What looks reassuring here, and what would I refuse to conclude yet?” There is no submission, score, reveal button, or required terminology.

**Tension exposed.** A reliable displayed saturation, current PaCO2, and visible minute volume can invite global reassurance while support context and patient breathing difficulty remain consequential.

**Support withheld / then provided.** No categories, synthesis, diagnosis, or next-step answer appears here. The next scene supplies only a usable organizing frame.

**Visual job.** Let the patient and current conditions be cognitively primary. Spatial grouping encodes provenance and time/support alignment, not an answer key. It must not visually imply that the four regions are equivalent measurements or that a “good” number outweighs the patient.

**Why it earns its place.** It supplies the real bedside reason for learning the distinctions before teaching their names.

### 2. Give Case A a usable map

**What the learner sees.** The same Teaching Case A snapshot persists while short adjacent labels identify the three bedside questions:

- What do I know about oxygenation, and on what support?
- What do I actually know about CO2 elimination right now?
- What is the patient experiencing, and what burden evidence do I have?

The approved formal pathway terms may appear as smaller secondary labels. Each fact receives one concise limit beside it; for example, minute volume is total gas moved, and visible inspiratory accessory-muscle activity is an effort-related observation rather than measured work.

**Learner action.** Compare the initial impression with the question each datum can help answer. This is a guided reframe, not a matching exercise.

**Visual job.** Draw light connectors from facts to questions without merging them into an adequacy score. Use proximity, lines, labels, and a text equivalent rather than color alone. The visual must not teach that the three questions are mutually exclusive diagnoses or a required assessment algorithm.

**Why it earns its place.** It provides the minimum shared language needed for later reasoning without asking the learner to memorize a taxonomy.

### 3. Assumption-first mechanism prediction

**What the learner sees.** The approved Pattern A and Pattern B rate/volume pair and the fact that both move 10.0 L/min. Before any prediction, the learner also sees the model condition: **For this comparison only, assume that 0.15 L of each breath does not participate in gas exchange.** The resulting modeled portions and 7.0/4.0 L/min outputs remain hidden.

**Learner action.** A brief, ungraded prediction: **Under that assumption, which pattern provides more modeled alveolar ventilation over one minute—and why?** The learner selects Pattern A or Pattern B and may record a short reasoning note. The response is supported practice, not independent evidence.

**Misconception exposed.** “Equal total minute ventilation means the same modeled alveolar ventilation.”

**Support after action.** Local approved feedback gives the mechanism without grading the learner’s wording: the same 0.15 L portion is counted 20 times in Pattern A (3 L/min) and 40 times in Pattern B (6 L/min), leaving 7 L/min versus 4 L/min under the stated model. These are arithmetic consequences of fictional inputs, not patient measurements or predicted clinical outcomes.

**Why it earns its place.** It asks a solvable directional physiology question rather than rewarding the answer “an assumption is missing.” It is deliberately not a semantic reasoning gate: Case B is M02’s only semantic-grading checkpoint. The following interactive page is a bounded model visualization, not a patient-specific clinical simulation.

### 4. Deep-interactive concept: same total minute ventilation, different modeled portion

**Starting state.** Pattern A is RR 20/min and VT 0.50 L; Pattern B is RR 40/min and VT 0.25 L. Both visibly equal 10.0 L/min total gas moved. No modeled output is initially displayed.

**Chosen controls: a constrained comparison, not an open clinical simulator.**

- The primary view remains side by side on a common scale, so the learner can compare breath size and breath count directly.
- A keyboard-operable two-option pattern selector focuses one pattern at a time and synchronizes a one-minute breath-train view with its representative breath. Selecting a pattern changes the inspection focus, not patient physiology.
- RR, VT, and the 0.15 L non-gas-exchanging portion are **not** free sliders. RR/VT are the approved paired inputs; the 0.15 L value is a conspicuous, fixed authored teaching assumption. Free controls would imply patient estimation, normalize the value, or create unnecessary unreviewed states.
- Reset returns to the exact initial side-by-side view: both patterns, equal total minute ventilation, no partition/output revealed, and no prior selection announced as correct.

**Prediction sequence.** Scene 3 first establishes equal 10.0 L/min total gas and the stated 0.15 L teaching assumption, then collects the local ungraded directional prediction. Scene 4 opens with the assumption visible, exposes the equal absolute 0.15 L partition in each breath, then makes the counted one-minute consequence visible: 3 L/min excluded in Pattern A versus 6 L/min in Pattern B. It then reveals the corresponding 7.0 versus 4.0 L/min modeled comparison.

**Visualization.** Each representative breath sits on a **common reference volume scale**, not an equal-width bar. Pattern A’s 0.50 L total breath is the 100% reference width; Pattern B’s 0.25 L total breath is 50% of that width. The 0.15 L stated non-gas-exchanging portion has the same absolute visual width in both; the modeled remainders visibly represent 0.35 L for A and 0.10 L for B. Beneath each, a schematic breath train encodes 20 versus 40 repetitions per minute. The fixed portion therefore occupies more of the smaller breath while total minute volume matches. Text labels, boundaries, units, and arithmetic remain adjacent. Equal-width total breath bars are prohibited.

**Feedback.** “Under this stated comparison only, the same 0.15 L portion is counted 20 times in Pattern A and 40 times in Pattern B. That leaves 7.0 L/min versus 4.0 L/min modeled alveolar ventilation.” Feedback does not infer actual patient dead space, PaCO2, severity, work of breathing, diagnosis, or treatment.

**Accessible equivalent.** A complete table/text description gives both RR/VT pairs, the fixed 0.15 L teaching assumption, the per-breath modeled portions, 20/40 repetitions, 3/6 L/min modeled non-gas-exchanging portions, total 10.0 L/min, and modeled 7.0/4.0 L/min results. Native radio controls have visible labels, focus indication, Enter/Space operation, announced selection/state changes, and no drag-only action. The information is available without color, animation, or visual calculation.

**Why it earns its place.** This is the sole mechanism for which dynamic inspection is more educational than concise prose. It remains a teaching comparison, not a patient-specific model.

### 5. Return to Teaching Case A

**What the learner sees.** Teaching Case A returns unchanged. A narrow bridge separates “gas moved per minute” from “current measured arterial CO2” while retaining FiO2/SpO2 and patient evidence in peripheral view.

**Learner action.** Briefly state what 8.0 L/min does not establish here, then identify what the current PaCO2 does establish. This is a supported verbal bridge, not a graded second quiz.

**Visual job.** Put the modeled comparison’s conclusion next to—not over—Teaching Case A evidence. Spatial separation prevents the learner from treating the modeled A/B output as a hidden estimate of this patient’s dead space or PaCO2, while preserving fresh Case B independence.

**Why it earns its place.** It prevents a common failure of physiology instruction: learning a clean model and immediately overapplying it to a patient whose needed assumption is absent, without pre-teaching the independent case.

### 6. Make the integrated bedside call

**What the learner sees.** This is the **first assembled learner-visible exposure** to the full approved Case B snapshot, unchanged and unsorted by physiological category. Provenance labels are visible; unavailable facts remain explicit. No pathway labels, supported interpretation, diagnosis, treatment, waveform, dead-space estimate, PaO2, hemoglobin, perfusion assessment, or quantified effort appears before initial submission.

**Learner action.** The existing three-part performance prompt is retained in intent: explain what each data form addresses, give the strongest integrated supported conclusion, and name one unresolved question with one purpose-linked next assessment/evidence source.

**Support withheld.** No pathway labels, model answer, intervention choice, or full explanation appears before submission.

**Support after action.** The native reasoning-gate feedback acknowledges accurate evidence and asks exactly one focused question about the dominant missing/overclaimed component. Passing unlocks the canonical explanation; a revised response is explicitly assisted learning, not independent mastery.

**Why it earns its place.** This is the module’s performance evidence: an ICU RT reasons from a realistic snapshot rather than sorting abstractions.

### 7. C1/C2 fresh transfer

**What the learner sees.** C1 and C2 retain the approved same reliable SpO2 (94%) and change only FiO2 (0.30 versus 0.70). The display deliberately names CO2 and breathing-burden evidence as controlled/outside the comparison.

**Learner action.** Independently state what stayed the same, what changes the oxygenation interpretation, and what cannot be concluded. The response is ungraded transfer evidence.

**Visual job.** Two cards share the same saturation display but surround it with visibly different support context. Equal visual prominence prevents the support value from becoming a decorative footnote. The post-response explanation reveals only the supported comparison.

**Transfer behavior.** The eventual scene may use `quiz` only as a persistence/input primitive. Its instructional contract is: learner response -> local approved reveal -> no semantic grader -> no provider call -> no points -> no percentage -> no pass/fail -> no correct/incorrect banner. It must not fall through to generic short-answer AI grading.

**Why it earns its place.** It checks whether support context transfers to a fresh, constrained bedside comparison without pulling M03 acid-base or M04 support-selection decisions into M02.

## 7. What was removed from prototype v1

- Generic evidence-matching as a stand-alone task. It asked for classification before the learner had a bedside reason to care.
- A detached three-card taxonomy lesson. The three questions survive, but as annotations of Teaching Case A after tension is felt.
- The stand-alone output-versus-burden slide. Patient report and effort-related observation now matter inside the anchor case and final performance task.
- Repeated pathway labeling and “continue/reveal” controls that do not require a prediction, comparison, or interpretation.
- A separate synthesis scene that restates earlier prose. Its function moves into the post-model bridge and the gated Case B performance.
- Card-heavy layouts with unused space as the primary visual treatment. Later visual work must use space to show relationships, not to decorate statements.

## 8. Clinical/source traceability

| Learner moment | Existing claim/source IDs | Preserved boundary |
|---|---|---|
| Proposed Teaching Case A hook, map, and bridge | `M02-C01`, `M02-C02`, `M02-C03`, `M02-C04`, `M02-CR-001`, `M02-DS-001` | Proposed synthetic facts are not targets, thresholds, patient measures, or treatment guidance; their fairness/plausibility requires qualified-RT review |
| Assumption-first prediction and paired-breath interaction | `M02-C02`, `M02-DS-001` | Fixed 0.15 L authored assumption; local ungraded practice; no patient dead-space estimate, PaCO2 prediction, severity, or treatment inference |
| Fresh Case B integrated checkpoint | `M02-C01`, `M02-C02`, `M02-C03`, `M02-C04`, `M02-CR-001`, `M02-DS-001` | First assembled learner-visible exposure; no pre-answer interpretation, diagnosis, threshold, treatment, quantified work, or global adequacy conclusion |
| Same-SpO2/different-FiO2 transfer | `M02-C01`, `M02-CR-001`, `M02-DS-001` | No severity, oxygen-delivery, modality, escalation, or CO2/burden inference; ungraded local reveal only |

**Clinical gap assessment:** no new clinical relationship, source applicability claim, formula, threshold, intervention, or approved-case value is introduced. Teaching Case A adds proposed synthetic values, a new authored patient statement, and a new authored effort-related observation; they require qualified-RT review before prototyping. Because the storyboard also changes reviewed visual/interaction and feedback presentation, it is not approved until that bounded review is complete.

## 9. Clinician-experience assessment

| Scene | Would this be worth an ICU RT’s time? | Risk to watch in later prototype |
|---|---|---|
| Teaching Case A hook | Yes if the proposed synthetic snapshot is clinically plausible: it starts with a recognizable tension, not a school taxonomy | Confirm Case A’s facts are fair and distinct enough not to disclose Case B’s answer pattern |
| Case A bedside map | Yes: it gives concise language for a problem already felt | Avoid reintroducing labels as a matching drill or preserving Case B facts by analogy |
| Assumption-first prediction | Yes, if the stated model condition makes the directional question solvable before output is revealed | Do not turn it into arithmetic busywork, semantic grading, or a high-friction gate |
| Paired-breath interaction | Yes: the visual exposes a relationship prose hides | Do not pretend it models this patient or add decorative controls |
| Return to Teaching Case A | Yes: it protects against overapplying the model | Keep it brief; it must not become a second lecture or expose the Case B configuration |
| Fresh Case B checkpoint | Yes: Case B should now feel like a new, bounded bedside problem | Preserve the Case B independence invariant and prohibit diagnosis/treatment passwords |
| Transfer | Yes: it asks whether the support context changes interpretation | Keep it ungraded and local; do not fall back to generic AI scoring or expand to support-selection advice |

This journey should feel more useful because every scene either raises an authentic bedside tension, makes one hidden relationship inspectable, helps the learner apply that relationship cautiously, or tests independent transfer. No scene exists merely to prove that a label was read.

## 10. Future visual-prototype acceptance criteria

Apply `slide-craft`, the relevant `slide-dsl` rendering rules, accessibility guidance, and later browser QA before implementation acceptance:

- one visual idea per scene; visible hierarchy and adjacent explanatory labels;
- no dense prose in cards, generic ICU imagery, decorative dashboards, color-only meaning, or large dead zones;
- text equivalent preserves the visual relationship without revealing an independent answer too early;
- before Scene 6, a content-level check confirms that no learner-visible scene contains the assembled Case B fact set or a worked interpretation of it;
- paired breaths use a common reference volume scale: A is 0.50 L at 100% width, B is 0.25 L at 50% width, and the common 0.15 L portion has equal absolute width in both;
- Scene 3 states the fixed 0.15 L teaching assumption before its directional prediction and uses only local ungraded feedback; it must not call a provider, semantic grader, or generic short-answer AI grading route;
- body contrast meets at least 4.5:1; controls/graphics meet at least 3:1; keyboard focus is visible;
- no drag-only action; all selections operate with keyboard and announce state changes;
- all learner-facing labels, units, tooltips, feedback, and reset states remain English;
- Scene 7 uses a local approved reveal with no provider, semantic grader, points, percentage, pass/fail, or correct/incorrect result;
- the slide implementation later respects the 1000 × 562.5 canvas, 50px margins, correct renderer-owned fields, and preview/playback checks;
- a clinician pilot confirms the experience is useful before release. Completion remains neither clinical certification nor proof of bedside competence.

## 11. Qualified-RT prototype authorization

Approved for the limited visual prototype on 2026-09-18:

1. Teaching Case A’s proposed FiO2 0.50, reliable SpO2 95%, 8.0 L/min minute volume, current matched PaCO2 40 mm Hg, authored patient statement, and effort-related observation for plausibility, fairness, and nonoverlap with Case B.
2. Confirmation that Teaching Case A uses existing approved relationships without adding a clinical claim or implying a target, threshold, diagnosis, mechanism, severity, or treatment.
3. Confirmation that the Case B independence invariant preserves a genuinely fresh integrated-response task.
4. The paired-breath common-reference-scale clarification, including the 2:1 total-width relationship and fixed 0.15 L absolute-width partition.
5. Scene 3’s assumption-first, ungraded local-prediction wording and reveal timing, including the 3-versus-6 L/min excluded-volume explanation.
6. Scene 7’s ungraded, zero-provider local-reveal presentation.

Do **not** reopen M02’s approved core physiological claims, Case B values, 0.15 L teaching assumption, C1/C2 values, or source applicability unless prototype evidence finds an unexpected implication.

## 12. Decision on existing implementation

**Recommendation: Discard current learner-facing implementation and rebuild from the approved storyboard.**

Do not delete it now. Preserve it as the failed usability prototype.

**Do not reuse:** the M02-specific React slide renderer, direct hard-coded slide interception, generic matching/reveal flow, stand-alone output/burden exposition, or its imposed seven-scene sequence.

**Reuse later:** native stage/document persistence; native `quiz` rendering; current reasoning-gate and targeted-feedback infrastructure for Scene 6; local response/reveal persistence for Scenes 3 and 7; source records and qualified-review process; classroom/browser QA infrastructure. The future construction must follow `stage-design` only after storyboard approval, using native scene types and visual preview rather than adding another bespoke page family by default.

## 13. Recommended next human gate

**Brianna reviews the limited visual prototype at normal learner viewport before any broader implementation.**

The acceptance question is: **“I understand something more clearly after using this, and the interaction was worth my time.”** This is not approval for Case B implementation, transfer implementation, a full module, live grading, or release. It should not reopen the already approved M02 core claims unless the prototype reveals an unexpected implication.
