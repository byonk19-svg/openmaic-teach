import type { AppDocumentOutline } from '@/lib/document-store/persistence-types';
import type { QuizQuestion, Scene, Stage } from '@/lib/types/stage';

export interface M02StageDocument {
  stage: Stage;
  scenes: Scene[];
  outline: AppDocumentOutline;
}

const M02_TITLE = 'M02 — Oxygenation, ventilation, and respiratory demand';

function slide(
  stageId: string,
  id: string,
  order: number,
  title: string,
  html: string,
  now: number,
): Scene {
  return {
    id,
    stageId,
    order,
    title,
    type: 'slide',
    actions: [],
    createdAt: now,
    updatedAt: now,
    outlineId: `outline-${id}`,
    content: {
      type: 'slide',
      canvas: {
        id: `canvas-${id}`,
        viewportSize: 1280,
        viewportRatio: 0.5625,
        theme: {
          fontName: 'Inter',
          fontColor: '#0f172a',
          backgroundColor: '#f8fafc',
          themeColors: ['#0f766e', '#2563eb'],
        },
        elements: [
          {
            id: `${id}-text`,
            type: 'text',
            top: 48,
            left: 64,
            width: 1152,
            height: 600,
            rotate: 0,
            defaultColor: '#0f172a',
            defaultFontName: 'Inter',
            content: html,
          },
        ],
      },
    },
  } as Scene;
}

function quiz(
  stageId: string,
  id: string,
  order: number,
  title: string,
  question: QuizQuestion,
  now: number,
): Scene {
  return {
    id,
    stageId,
    order,
    title,
    type: 'quiz',
    actions: [],
    createdAt: now,
    updatedAt: now,
    outlineId: `outline-${id}`,
    content: { type: 'quiz', questions: [question] },
  } as Scene;
}

export function buildM02StageDocument(stageId: string, now = Date.now()): M02StageDocument {
  const scenes: Scene[] = [
    slide(
      stageId,
      'm02-orient',
      1,
      'One snapshot. Different questions.',
      '<p><span style="font-size:40px"><b>One snapshot. Different questions.</b></span></p><p><span style="font-size:30px">A saturation, a minute-volume display, and a patient who says breathing feels hard may all be true at the same time.</span></p><p><span style="font-size:32px"><b>Which question does each piece of evidence actually help answer?</b></span></p><p><span style="font-size:26px">After you continue: Each helps answer a different question.</span></p>',
      now,
    ),
    slide(
      stageId,
      'm02-pathways',
      2,
      'Put each signal with the question it can answer',
      '<p><span style="font-size:38px"><b>PATIENT + CURRENT SUPPORT + TIME CONTEXT</b></span></p><p><span style="font-size:28px"><b>OXYGEN PATHWAY</b><br/>Inspired O2/support → lung transfer → arterial oxygenation → hemoglobin/content/perfusion as downstream context</span></p><p><span style="font-size:28px"><b>EFFECTIVE CO2 PATHWAY</b><br/>Total gas moved → non-gas-exchanging portion → modeled alveolar portion → CO2 evidence in context</span></p><p><span style="font-size:28px"><b>BREATHING DEMAND / EFFORT-RELATED EVIDENCE</b><br/>Drive, load, support; patient breathing experience; effort-related observation; measured muscle effort is a different datum</span></p><p><span style="font-size:26px"><b>Related questions. Different evidence.</b></span></p>',
      now,
    ),
    slide(
      stageId,
      'm02-paired-breaths',
      3,
      'Same total gas moved, different modeled portion',
      '<p><span style="font-size:36px"><b>Pattern A</b> RR 20/min · VT 0.50 L &nbsp;&nbsp;&nbsp; <b>Pattern B</b> RR 40/min · VT 0.25 L</span></p><p><span style="font-size:30px"><b>Both: total gas moved = 10.0 L/min</b></span></p><p><span style="font-size:28px"><b>0.15 L/breath non-gas-exchanging portion for this teaching comparison only</b></span></p><p><span style="font-size:30px">A: 0.15 L stated portion + 0.35 L modeled exchange-reaching portion × 20/min = <b>7.0 L/min</b></span></p><p><span style="font-size:30px">B: 0.15 L stated portion + 0.10 L modeled exchange-reaching portion × 40/min = <b>4.0 L/min</b></span></p><p><span style="font-size:25px"><b>MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT</b></span></p><p><span style="font-size:24px">Equal total gas moved per minute does not guarantee equal modeled gas reaching exchange units.</span></p>',
      now,
    ),
    slide(
      stageId,
      'm02-output-burden',
      4,
      'Useful output does not answer every patient question',
      '<p><span style="font-size:38px"><b>Useful output does not answer every patient question.</b></span></p><p><span style="font-size:30px"><b>OBSERVED / DISPLAYED OUTPUT</b>: exhaled minute volume</span></p><p><span style="font-size:30px"><b>PATIENT REPORT</b>: breathing experience</span></p><p><span style="font-size:30px"><b>EFFORT-RELATED OBSERVATION</b>: visible bedside sign</span></p><p><span style="font-size:28px">What does the patient/bedside evidence add that the minute-volume display does not?</span></p><p><span style="font-size:25px">It adds meaningful evidence about breathing experience and an effort-related observation. Neither is a measurement of respiratory-muscle effort or work of breathing.</span></p>',
      now,
    ),
    quiz(
      stageId,
      'm02-case-b',
      5,
      'Current bedside snapshot',
      {
        id: 'm02-case-b-q',
        type: 'short_answer',
        points: 1,
        question:
          'Respond in three concise parts.\n\nCURRENT SUPPORT\nFiO2 0.70\n\nMONITOR / RESPIRATORY DISPLAY\nSpO2 94%, reliable signal\nExhaled minute volume 10.0 L/min over the stated current interval\n\nCURRENT GAS EVIDENCE\nPaCO2 42 mm Hg from a current arterial sample matched to the current support/time snapshot\n\nPATIENT / BEDSIDE\nPatient says: “Breathing feels hard right now.”\nVisible inspiratory neck-muscle recruitment is present.\n\nNot supplied: dead-space estimate; diagnosis; waveform; quantified respiratory-muscle effort; PaO2; hemoglobin; perfusion assessment.\n\n1. Name the question each evidence source addresses.\n2. Integrate the strongest supported interpretation without using one as proof of the others.\n3. Choose one unresolved question and one purpose-linked assessment/evidence source that would clarify it.',
        analysis:
          'SpO2 is oxygenation evidence in FiO2 context; current PaCO2 is current arterial CO2 evidence, not global adequacy; minute volume is total gas moved, not an alveolar estimate without a dead-space assumption; report and neck recruitment are meaningful qualitative evidence, not measured work or mechanism.',
        reasoningGate: {
          passThreshold: 0.8,
          rubric:
            'Evaluate reasoning, not answer similarity. Require bounded integration of SpO2 in FiO2 context; matched PaCO2 without global-adequacy claim; minute ventilation limit without invented dead space; patient report and neck recruitment as qualitative evidence without quantified effort/mechanism; and one purpose-linked next evidence path. Do not require diagnosis, treatment, modality, ABG order, oxygen-content calculation, or specialized monitor. Feedback priority: (1) global reassurance / cross-domain overclaim; (2) minute ventilation = adequate CO2 elimination shortcut; (3) ignores patient/breathing-burden evidence; (4) blanket uncertainty; (5) construct collapse; (6) otherwise competent missing bounded component. Ask exactly one focused follow-up.',
        },
      },
      now,
    ),
    slide(
      stageId,
      'm02-synthesis',
      6,
      'Use each signal for its question',
      '<p><span style="font-size:38px"><b>Use each signal for its question.</b></span></p><p><span style="font-size:30px">SpO2 belongs with FiO2 context. Current PaCO2 is current arterial CO2 evidence, not a global adequacy label. Minute volume is total gas moved, not an alveolar estimate without an assumption.</span></p><p><span style="font-size:30px">The patient report and neck-muscle recruitment add a different concern without becoming a measured work value.</span></p>',
      now,
    ),
    quiz(
      stageId,
      'm02-transfer',
      7,
      'Same displayed saturation. Different support context.',
      {
        id: 'm02-transfer-q',
        type: 'short_answer',
        points: 1,
        question:
          'C1: SpO2 94%, reliable signal; FiO2 0.30.\nC2: SpO2 94%, reliable signal; FiO2 0.70.\n\nCO2 and breathing-burden evidence are controlled/outside this comparison. Compare C1 and C2 in three short statements: what stayed the same, what changes the oxygenation interpretation, and what still cannot be concluded from these cards?',
        analysis:
          'Both show the same reliable SpO2. C2 shows the same displayed SpO2 while receiving higher FiO2. The cards do not establish severity, oxygen delivery, cause, modality, escalation, or what CO2/breathing-burden evidence would show.',
      },
      now,
    ),
  ];
  return {
    stage: {
      id: stageId,
      name: M02_TITLE,
      description: 'Private, manually authored M02 teaching-design draft.',
      createdAt: now,
      updatedAt: now,
    },
    scenes,
    outline: {
      outlines: scenes.map((scene) => ({
        id: scene.outlineId!,
        order: scene.order,
        title: scene.title,
        type: scene.type,
        description: '',
        keyPoints: [],
      })),
      requirement: M02_TITLE,
      generationIntent: 'instructional',
      generationComplete: true,
      producer: 'server-job',
      createdAt: now,
      updatedAt: now,
    },
  };
}
