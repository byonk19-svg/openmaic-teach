# Curriculum Intent and Concept Ownership

**Version:** 0.2 · 2026-09-22
**Type:** adopted curriculum intent and concept-ownership direction; not clinical approval, implemented learner content, treatment guidance, or a claim of educational effectiveness.
**Revision:** reconciles version 0.1 with the product north star, curriculum audit, and subsequent reviewed M02 design decisions.

## How to use this document

This document defines **what understanding a module should develop and why it matters**. It is not learner-facing copy, a screenplay, a page template, a grading rubric, or a list of conclusions every case must reach. Module numbers identify curriculum positions, not application object IDs.

Preserve the learning purpose, essential subject matter, and clinical boundaries. Adapt the teaching method, case, wording, visual form, pacing, and lesson segmentation to the learner and task. The illustrative questions and teaching options below are examples, not text to copy verbatim or fixed implementation requirements.

Current version-specific clinical contracts and review decisions govern already-authored claims, cases, models, and rubrics. This document does not silently override them, erase prior approval, or authorize rebuilding M01/M02. Consult the current `AGENTS.md`, `SKILL_ROUTING.md`, terminology, and clinical-content policy for execution and review requirements; do not duplicate those systems here.

### Learning standard

- **Teach the explanation, not only its limit.** Build the relevant physiological or device relationship, demonstrate its bedside use, and then state the necessary qualifications. When evidence supports a useful conclusion, say it directly. Uncertainty is calibrated to the case, not a compulsory ending.
- **Use misconceptions as diagnostic possibilities, not scripts.** Do not assume the learner holds the listed misconception, engineer every case to refute it, or invent a missing variable to prevent a confident answer. Include ordinary valid applications as well as important exceptions where they serve learning.
- **Keep lessons interruptible, not artificially thin.** A module may contain several short lessons. A few primary performance goals may require several supporting explanations and examples. No fixed duration, screen count, or quota of interactions applies.
- **Teach before demanding unfamiliar reasoning.** A brief pre-question may activate existing knowledge. Provide needed concepts and assumptions before a scored or unsupported task that depends on them. A prediction, example, direct explanation, comparison, or teach-back is a tool, not a required ritual on every screen.
- **Adapt support to the concept, not the job title alone.** Practicing RTs can need a clear refresher in one area and little guidance in another. Make useful explanations available; reduce redundant assistance when the learner can already perform the task. Do not invent automatic adaptivity the product lacks.
- **Make visuals explanatory.** Choose a representation that exposes a relationship: space, time, magnitude, flow, structure, or contrast. Adjacent labels and units should carry meaning. Static diagrams, animation, and text are all acceptable when they do the job; clicking and animation are not themselves learning outcomes.
- **Distinguish practice, retrieval, and transfer.** Worked examples and feedback are teaching. A later unassisted attempt on a previously taught problem can be retrieval practice, but it is not an unseen-case transfer test. Fresh application changes a meaningful condition without adding untaught requirements. Shared terminology, methods, and individual numbers are allowed; preserve any existing case-specific no-pre-exposure rule.
- **Assess the understanding promised.** Let the learner explain, interpret, calculate, compare, or prioritize when that action serves the objective. Do not require the same multi-part uncertainty response, semantic grader, or next-assessment question in every exercise. A competent answer need not list every caveat. Later retrieval is valuable; repeated rereading is not an equivalent substitute.

These are product-design recommendations informed by learning research [E1–E7], not a scientifically validated fixed sequence. They do not change the requirements for source traceability, clinically accurate content, or qualified review.

## Sequence and prerequisite emphasis

| Module | Positive learning purpose | Prerequisite emphasis |
|---|---|---|
| M01 | Build a trustworthy, useful bedside interpretation from a small snapshot. | Basic RT vocabulary; explain unfamiliar units and inputs. |
| M02 | Connect gas exchange, gas movement, support, and breathing experience through physiology. | M01 evidence discipline. |
| M03 | Explain acid-base processes and use blood gases to assess them in context. | M02 CO2 foundations. |
| M04 | Explain what noninvasive support provides and evaluate its delivery and trajectory. | Relevant M02–M03 foundations; introduce necessary pressure/flow terms locally. |
| M05 | Explain breath delivery and interpret respiratory mechanics. | M01–M02 and foundational support vocabulary. |
| M06 | Use waveforms to reason about patient–ventilator interaction. | M05 breath phases and mechanics. |
| M07 | Explain and assess the connected airway–circuit–device pathway. | Earlier support concepts; urgent safety recognition begins earlier. |
| M08 | Explain lung-protection and cardiopulmonary tradeoffs. | M02 and M05; relevant M06 interpretation. |
| M09 | Connect consequential ICU context to the respiratory assessment. | Earlier physiology and assessment concepts. |
| M10 | Integrate respiratory recovery, airway readiness, and transition planning. | Earlier modules, with focused refreshers rather than repeat lectures. |

## M01 — What do we actually know?

**Learning promise:** Help the learner assemble a small bedside snapshot, perform a valid calculation, and communicate what that evidence establishes. This is the introduction to evidence discipline, not the template for every later module.

**Essential understanding:** Distinguish prescribed support from what occurred; relate rate and volume to a valid interval; separate a calculation from the additional physiological questions it cannot answer by itself. Patient-reported experience and time/support applicability are meaningful parts of the assessment.

**Evidence of learning:** The learner selects the appropriate inputs, explains the result, incorporates supplied bedside evidence, and identifies relevant additional information when an unresolved question actually requires it. Neither automatic reassurance nor blanket uncertainty is sufficient.

**Teaching option, not a script:** A worked snapshot followed by a changed bedside observation can establish the distinction; a time/support mismatch can provide later transfer. Preserve the current M01 reviewed exemplar and its case values rather than generating replacements from this synopsis.

**Common difficulty to watch for:** Turning one trustworthy result into a complete adequacy judgment.

**Boundary and handoff:** No full acid-base course, quantitative effort assessment, or setting-selection task here. M02 explains the physiology behind the distinction. Sources: AARC patient-ventilator assessment, foundational physiology, effort research, and relevant official symptom-assessment statements.

## M02 — Oxygenation, ventilation, and respiratory demand

**Learning promise:** Rebuild the physiological explanation behind the respiratory snapshot. The learner should understand why oxygenation, CO2, total gas movement, and breathing experience are related but not interchangeable—not merely recite that they are different.

**Essential understanding:** Explain total versus gas-exchanging ventilation, anatomical/alveolar dead-space concepts at introductory depth, and per-breath/per-minute accounting under explicit assumptions. Explain CO2 production relative to alveolar ventilation and the conditions of the simplified PaCO2 relationship. Connect inspired oxygen, ventilation/perfusion, arterial saturation, hemoglobin/content, and circulation at a qualitative level. Distinguish respiratory demand, assistance, effort-related observations, and patient-reported experience without treating them as one measured quantity.

**Evidence of learning:** The learner explains a model result and uses that explanation to interpret a different snapshot. They use measured CO2, oxygen-support context, and patient evidence positively, without inventing missing patient inputs or a global status from one result.

**Teaching option, not a script:** A supported bedside case, a proportional breath comparison, and a return to the case can connect mechanism to interpretation. Oxygen transport and breathing experience also need actual explanation. These learning outcomes are not six mandatory screens, six questions, or six blocks of text; choose a coherent teaching sequence that preserves their meaning. The current reviewed M02 model holds the same fixed 0.15-L teaching assumption constant while comparing different rate and tidal-volume patterns; its exact values and exposure rules belong to the module contract. Do not revert to the older synopsis's different-dead-space-assumptions example. The current limited prototype exercises only the Teaching Case A → paired-breath comparison → Teaching Case A segment. It is not the complete M02 module, and deferred teaching must not be marked delivered.

**Common difficulty to watch for:** Confusing a displayed output with the physiological process or effort behind it.

**Boundary and handoff:** No patient-specific dead-space/PaCO2 calculator, oxygen-delivery prescription, full acid-base derivation, or unvalidated physiological response simulator. Qualitative relationships may be taught without claiming they explain this patient's cause. M03 develops acid-base; M05 mechanics; M08 heart–lung tradeoffs. Sources: precise physiology sources plus relevant AARC/ATS/ERS assessment guidance. The existing M02 depth packet governs its reviewed additions, not this high-level list alone.

## M03 — ABGs and acid-base without shortcuts

**Learning promise:** Help the learner explain an acid-base process and the respiratory contribution, rather than match a blood gas to a memorized label.

**Essential understanding:** Connect pH, PaCO2, and bicarbonate; distinguish a measured state from the processes producing it; explain primary changes, expected compensation, and acute/chronic context. Teach how a reviewed compensation relationship is used before asking the learner to apply it. Include mixed-process reasoning and bounded metabolic-acidosis/alkalosis comparisons. Distinguish calculated gas bicarbonate from other laboratory measures and preserve sampling/time/support context.

**Evidence of learning:** The learner justifies a process interpretation, uses a relevant expected relationship correctly, and notices when a result or context calls for reconsideration. A near-normal pH neither automatically ends nor automatically invalidates the analysis. Required formulas/reference ranges can be supplied when the objective is application rather than recall.

**Teaching option, not a script:** Develop a clear example, then compare samples with a meaningfully changed respiratory or metabolic component. Use a formula, diagram, and case only where each adds something different.

**Common difficulty to watch for:** Naming a category without explaining the interacting processes.

**Boundary and handoff:** No automatic ventilator response, bicarbonate/dialysis/electrolyte prescription, or comprehensive renal curriculum. M09 applies the relevant systemic context. Sources: AARC blood-gas guidance and separately verified acid-base, compensation, chronicity, and alkalosis physiology.

## M04 — Oxygen, HFNC, CPAP, and NIV: purpose and trajectory

**Learning promise:** Explain what the support can provide, what influences its delivery, and how to assess whether the intended respiratory objective is being met over time.

**Essential understanding:** Differentiate oxygen concentration, delivered flow, distending pressure, and inspiratory assistance; connect those properties to the modalities being compared. Explain patient/interface/delivery factors, tolerance, and limits. Relate response assessment to the purpose of support and the supplied clinical context rather than one universal device ladder.

**Evidence of learning:** The learner explains the relevant capability, interprets delivery and patient response together, and identifies a specific reassessment or escalation concern when warranted. They can recognize useful improvement as well as incomplete response, mixed response, or deterioration.

**Teaching option, not a script:** A capability illustration followed by a patient timeline can work. Choose hypoxemic and hypercapnic examples for a deliberate contrast rather than forcing identical starting values or the same ending.

**Common difficulty to watch for:** Equating interface tolerance or an improved saturation with complete success.

**Boundary and handoff:** Reviewed educational discussion of modality rationale, limitations, and escalation belongs here; universal starting settings, mandatory sequential trials, and single-score intubation rules do not. Never delay urgent recognition for a puzzle. Detailed postextubation application belongs in M10. Sources: current population-specific AARC oxygen and ATS/ERS noninvasive-support guidance; device documentation when behavior is device-specific.

## M05 — How an invasive breath is delivered

**Learning promise:** Make the breath understandable: what the ventilator controls, what the patient contributes, and why pressure, flow, volume, and expiratory behavior change under stated conditions.

**Essential understanding:** Teach trigger, inspiratory control, cycling, and expiration before relying on a mode label; contrast pressure- and volume-controlled behavior under stated assumptions. Explain resistance and elastic behavior using a simple respiratory-system model; connect peak/plateau pressure, PEEP, and relevant pressure/volume/flow relationships. Introduce expiratory time and time constants at foundational depth. Explain why holds, effort, leaks, and comparable conditions affect mechanics interpretation.

**Evidence of learning:** The learner explains a delivered breath and a valid mechanics comparison, including a supported quantitative result when appropriate. They also recognize when the conditions do not support that calculation. Do not make every measurement deliberately invalid.

**Teaching option, not a script:** Use separate short lessons for breath delivery and mechanics if needed. A clearly labeled single breath and valid pressure comparison can precede an altered-flow, effort, or leak case.

**Common difficulty to watch for:** Treating mode labels or pressure differences as self-explanatory.

**Boundary and handoff:** No proprietary-mode encyclopedia, assumed manufacturer equivalence, or advanced optimization course. M06 applies these mechanics to interaction; M08 to protection. Sources: AARC assessment, reviewed mechanics derivations, and version-specific manufacturer instructions for actual device claims.

## M06 — Waveforms and patient-ventilator interaction

**Learning promise:** Help the learner read a trace as behavior over time and use it to reason about the relationship between patient effort and ventilator breath delivery.

**Essential understanding:** Establish the expected pressure/flow/volume pattern under explicit conditions. Then teach a manageable starter set covering triggering, inspiratory delivery, cycling, and expiration, with actual explanations of the selected mismatches. Connect incomplete expiration and relevant hold conditions to the assessment question. A real, modeled, or illustrative effort trace must be identified correctly.

**Evidence of learning:** The learner describes and explains a meaningful finding, supports the leading interpretation, and proposes a useful discriminator only when alternatives remain material. An otherwise sound answer need not enumerate a differential diagnosis or invent ambiguity. Numerical conclusions require valid measurement conditions.

**Teaching option, not a script:** Align traces and annotate the causal relationship. Compare an expected pattern with one changed condition, then vary a relevant context. Select the starter mechanisms during lesson planning; neither a comprehensive waveform atlas nor one ambiguous trace constitutes the curriculum.

**Common difficulty to watch for:** Recognizing a shape without understanding the mechanism or evidence conditions.

**Boundary and handoff:** Reviewed fictional discussion of reassessment and response rationale is allowed; reflex sedation, universal setting-change recipes, and unsupported patient-response simulations are not. Preserve historical waveform artifacts. Sources: primary interaction/measurement studies, applicable official assessment guidance, and device documentation.

## M07 — Airway, circuit, humidification, and delivery safety

**Learning promise:** Explain how the connected support pathway can alter the bedside picture and how assessment differs between an urgent threat and routine delivery/secretion care.

**Essential understanding:** Trace gas/power, device, circuit, artificial airway, and patient continuity. Teach the relevant airway anatomy, securement/position considerations, and transport/movement context. Explain the rationale behind humidification, secretion assessment, suction indications and reassessment, with brief aerosol-delivery content where it serves the objective.

**Evidence of learning:** The learner prioritizes an urgent safety concern when present and gives specific, justified assessment and communication. In routine care, they explain why a check or action is relevant and what would be reassessed. This is not a generic troubleshooting checklist.

**Teaching option, not a script:** Separate an urgent continuity problem from a routine humidification/secretion comparison. Include a reference pathway with correct expected function so the problem can be understood. Do not assume every change is either lung disease or a circuit fault.

**Common difficulty to watch for:** Defaulting to one familiar explanation or routine suctioning before assessing the relevant problem.

**Boundary and handoff:** The sequence does not confer procedural credentialing or substitute for local emergency protocols. This is a curriculum limit, not a claim that qualified RTs cannot perform procedures within their actual scope. Tracheostomy and total-laryngectomy anatomy remain distinct. Urgent recognition appears earlier whenever needed. Sources: AARC airway/suction/humidification/tracheostomy guidance, official airway-emergency resources, and device instructions.

## M08 — Lung protection, ARDS, positioning, and heart-lung tradeoffs

**Learning promise:** Explain why a support strategy can change gas exchange, mechanical exposure, and circulation differently, then use that understanding to assess the overall response.

**Essential understanding:** Teach heterogeneous injury and the rationale for lung protection; connect predicted-body-weight context, delivered volume, and valid mechanics to the relevant reviewed framework. Explain the mechanisms behind selected PEEP, positioning/proning, and cardiopulmonary tradeoffs. State which definition, population, recommendation strength, and uncertainty apply when a guideline claim is taught.

**Evidence of learning:** The learner explains a support response using the relevant respiratory and circulatory findings. They can recognize benefit, harm, mixed findings, or insufficient evidence as the case warrants—not presume that every oxygenation improvement hides deterioration.

**Teaching option, not a script:** Use distinct short lessons for protection, positioning, and circulation if needed. A model may isolate a mechanism; a case can then integrate several supplied outcomes. Do not fabricate an adverse effect just to prove that tradeoffs exist.

**Common difficulty to watch for:** Letting a single favorable outcome replace the overall assessment.

**Boundary and handoff:** No universal PEEP/driving-pressure rule, routine-paralysis instruction, rescue algorithm, or independent ECMO selection/operation. General mechanism teaching does not establish a patient-specific mechanism. Sources: current ATS/ESICM guidance, retained applicable landmark recommendations, official circulation guidance, and primary physiology.

## M09 — ICU factors that change respiratory reasoning

**Learning promise:** Show how selected whole-patient processes change the respiratory assessment, so an RT can recognize a consequential contributor and coordinate a focused response rather than reach automatically for a ventilator explanation.

**Essential understanding:** Organize the existing scope into short connected clusters: pain/analgesia/sedation, delirium, sleep and interaction; infection/perfusion, fluid/renal context and acid-base; weakness, metabolic demand, nutrition and participation in recovery. Include a reviewed neuromuscular-blockade safety primer. For each chosen example, teach the specific respiratory connection; name other topics as recognition-only rather than pretending a list is instruction.

**Evidence of learning:** The learner explains why a supplied contextual factor matters, distinguishes plausibility from demonstrated causation, and communicates the specific question or safety concern and reassessment need. They can also recognize when the available findings do not support the proposed systemic explanation.

**Teaching option, not a script:** Use a few contrasting case clusters with mechanism explanations, not one dense survey. The same respiratory display can be revisited with changed systemic information when this reveals a genuine difference in reasoning.

**Common difficulty to watch for:** Attributing every respiratory change to support settings, or assuming temporal association establishes causation.

**Boundary and handoff:** No independent shock, antimicrobial, dialysis, nutrition, sedative/paralytic-dosing, or neurocritical-care curriculum. Recognition still needs enough explanation to be useful. Sources: current PADIS/ICU Liberation, sepsis, hemodynamic, infection-prevention and nutrition guidance, plus specific physiology. Exact teaching selections need source review before use.

## M10 — Liberation and integrated bedside reasoning

**Learning promise:** Explain respiratory recovery and the distinct assessments involved in moving away from support, integrating physiology, airway considerations, patient goals, and coordinated transition planning.

**Essential understanding:** Teach the purpose and interpretation of readiness assessment and breathing trials, then relate them to airway, secretion, participation, and subsequent-support questions. Connect load/capacity and recovery to earlier lessons. Explain what information belongs in the transition handoff and what reassessment is needed.

**Evidence of learning:** The learner synthesizes the supplied evidence and produces a concise, goal-aware handoff. The case may support readiness, a specific remaining concern, or further assessment. Do not force every successful trial to conceal an airway problem merely to rebut a shortcut.

**Teaching option, not a script:** Begin with a clearly explained transition pathway and use a fresh integrated case. Select prior concepts because the case requires them, not to test every module at once. Later retrieval can revisit the transition without claiming broad clinical competence from one response.

**Common difficulty to watch for:** Treating one trial or index as the entire transition decision.

**Boundary and handoff:** No autonomous extubation authorization, complete decannulation protocol, independent prognostication, or withdrawal-of-support procedure. Reviewed discussion of indications, rationale, uncertainty, and team coordination is appropriate. Sources: current AARC SBT, ATS/CHEST liberation/postextubation, multidisciplinary tracheostomy, and SCCM family-centered/end-of-life communication guidance.

## Concept ownership and later retrieval

M01 owns evidence discipline; M02 foundational gas exchange and effort; M03 acid-base; M04 noninvasive-support purpose and trajectory; M05 breath delivery and mechanics; M06 interaction/waveforms; M07 support-pathway safety; M08 protection and heart–lung tradeoffs; M09 contextual contributors; M10 liberation synthesis.

Ownership means **where a concept receives its main explanation**, not a ban on a needed introduction, refresher, or application elsewhere. Emergency recognition, respectful communication, patient goals, measurement validity, and reassessment recur whenever relevant. Use later cases to retrieve earlier understanding rather than repeat the same lecture or universal warning.

Across the sequence, maintain a useful mix of obstructive physiology, cardiogenic edema, hypoxemic injury, neuromuscular weakness, chest-wall effects, and systemic demand. This is a case-mix intention, not a quota or six additional treatment courses. Advanced procedures/monitoring, neonatal/pediatric and other specialty populations remain separate curricula.

## Authoring handoff: sufficient direction without a script

Before expanding a module, identify the explanation it promises, how it will become understandable, and the task that will show the learner can use it. Record this in the existing module artifact, not a new paperwork layer. A lesson may be direct, case-first, comparison-led, or model-led; it need not copy this document's heading, question, or example.

A useful check is: **Could a learner succeed by repeatedly saying only “more information is needed,” without learning this module's physiology or device behavior?** If so, the teaching or assessment is under-specified. Conversely, do not manufacture uncertainty when the supplied evidence supports a stronger conclusion.

Keep source traceability and qualified RT review for consequential assertions, diagrams, cases, and feedback. A source family below a module is a research starting point, not evidence closure. Teach established general mechanisms while distinguishing them from an unsupported explanation of an individual case. Source-supported reference ranges, equations, and conditional intervention rationale can serve the learning goals; they are not prohibited merely because unsupported universal rules would be unsafe. Reviewed discussion of interventions can serve later objectives; this is not patient-specific advice, a treatment protocol, exam preparation, or procedural/specialty certification.

Changes to examples, wording, and layout are not automatically curriculum changes; changes to case facts, model assumptions, clinical meaning, or assessment interpretation require the applicable review. Do not treat this high-level intent as authorization to modify an approved artifact. Do not turn ordinary authoring choices into repeated owner handoffs when the current task already authorizes them.

## Evidence basis for these design recommendations

The evidence informs choices; it does not validate this exact ten-module program, mandate a scene sequence, or prove effectiveness for practicing ICU RTs. Study populations and tasks vary. Primary educational experiments are retained despite age because they directly address the design questions; recent syntheses provide broader context.

- **[E1]** Biggs J. *Enhancing teaching through constructive alignment.* Higher Education. 1996;32:347–364. [DOI](https://doi.org/10.1007/BF00138871). Conceptual framework linking intended performance, teaching activity, and assessment; not an RT trial.
- **[E2]** Goldszmidt M, Minda JP, Devantier SL, Skye AL, Woods NN. *Expanding the basic science debate: the role of physics knowledge in interpreting clinical findings.* Advances in Health Sciences Education. 2012;17:547–555; online 2011. [DOI](https://doi.org/10.1007/s10459-011-9331-2). Primary respiratory-education experiment connecting explanation with interpretation.
- **[E3]** Tetzlaff L, Simonsmeier B, Peters T, Brod G. *A cornerstone of adaptivity – A meta-analysis of the expertise reversal effect.* Learning and Instruction. 2025;98:102142. [DOI](https://doi.org/10.1016/j.learninstruc.2025.102142). Evidence for adjusting assistance to relevant prior knowledge, not withholding explanations based on professional title.
- **[E4]** Noetel M, et al. *Multimedia Design for Learning: An Overview of Reviews With Meta-Meta-Analysis.* Review of Educational Research. 2022;92:413–454; online 2021. [DOI](https://doi.org/10.3102/00346543211052329). Evidence about the design of representations, not an interaction quota.
- **[E5]** Chamberland M, et al. *Self-explanation in learning clinical reasoning: the added value of examples and prompts.* Medical Education. 2015;49:193–202. [DOI](https://doi.org/10.1111/medu.12623). Read alongside E6 rather than treating prompts as uniformly beneficial.
- **[E6]** Klein M, Otto B, Fischer MR, Stark R. *Fostering medical students' clinical reasoning by learning from errors in clinical case vignettes: effects and conditions of additional prompting procedures to foster self-explanations.* Advances in Health Sciences Education. 2019;24:331–351. [DOI](https://doi.org/10.1007/s10459-018-09870-5). Boundary evidence against adding questions merely to create activity.
- **[E7]** Larsen DP, Butler AC, Roediger HL III. *Repeated testing improves long-term retention relative to repeated study: a randomised controlled trial.* Medical Education. 2009;43:1174–1181. [DOI](https://doi.org/10.1111/j.1365-2923.2009.03518.x). Supports retrieval with feedback across time, not mandatory AI grading or an exact practice schedule.
