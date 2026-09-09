import { readFileSync } from 'node:fs';
import type { AgentTool } from '@earendil-works/pi-agent-core';
import type { AICallFn } from '@openmaic/generation';

import type { Scene } from '@/lib/types/stage';
import type { CourseDocument, CourseStore } from '@/lib/server/agent-runtime/course-tools';
import { buildGenerationTools } from '@/lib/server/agent-runtime/generation-tools';
import { createGenerationAiCallFactory } from '@/lib/server/agent-runtime/generation-ai-call';
import type { SceneContinuityContract } from '@/lib/server/agent-runtime/scene-continuity';

for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/u)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const separator = trimmed.indexOf('=');
  if (separator < 1) continue;
  const name = trimmed.slice(0, separator).trim();
  const value = trimmed.slice(separator + 1).trim();
  if (process.env[name] === undefined) process.env[name] = value;
}

const continuity: SceneContinuityContract = {
  scenarioId: 'v4-flow-demand-case',
  sourceSceneOrder: 1,
  baseline: [
    { name: 'flow', value: 60, unit: 'L/min' },
    { name: 'VT', value: 450, unit: 'mL' },
    { name: 'RR', value: 20, unit: '/min' },
    { name: 'PEEP', value: 8, unit: 'cm H2O' },
  ],
  fixedVariables: ['VT', 'RR', 'PEEP', 'compliance', 'resistance', 'respiratory drive'],
  assumptions: ['patient inspiratory flow demand exceeds 60 L/min at baseline'],
  expectedBaselineFindings: [
    'inspiratory pressure scooping remains present at the 60 L/min baseline',
  ],
};

function widgetHtml(consistent: boolean): string {
  const model = consistent
    ? `const patientDemandLMin = 80;
const flowSlider = document.querySelector('#flow-slider');
function renderFinding() {
  const setFlowLMin = Number(flowSlider.value);
  const pressureScoop = Math.max(0, patientDemandLMin - setFlowLMin);
  document.querySelector('#finding').textContent = pressureScoop > 0
    ? 'Inspiratory pressure scooping is present; modeled mismatch ' + pressureScoop + ' L/min.'
    : 'No inspiratory pressure scooping at this set flow.';
}
flowSlider.addEventListener('input', renderFinding);
renderFinding();`
    : `const patientDemandLMin = 60;
const flowSlider = document.querySelector('#flow-slider');
function renderFinding() {
  const setFlowLMin = Number(flowSlider.value);
  const pressureScoop = Math.max(0, patientDemandLMin - setFlowLMin);
  document.querySelector('#finding').textContent = pressureScoop > 0
    ? 'Inspiratory pressure scooping is present.'
    : 'No inspiratory pressure scooping at the 60 L/min baseline.';
}
flowSlider.addEventListener('input', renderFinding);
renderFinding();`;
  const config = {
    type: 'simulation',
    concept: 'Linked flow-demand experiment',
    description: 'Change set inspiratory flow only.',
    variables: [
      { name: 'flow', label: 'Set inspiratory flow', min: 40, max: 90, default: 60, unit: 'L/min' },
    ],
    presets: [{ name: 'Higher set flow', variables: { flow: 75 } }],
    continuity: { ...continuity, changingVariables: ['flow'] },
  };
  return `<!DOCTYPE html><html><body>
<h1>Linked flow experiment</h1>
<p id="finding"></p>
<input id="flow-slider" data-var="flow" type="range" min="40" max="90" value="60">
<script type="application/json" id="widget-config">${JSON.stringify(config)}</script>
<script>${model}</script>
</body></html>`;
}

function sourceScene(): Scene {
  return {
    id: 'scene-p1',
    stageId: 'stage-v4',
    order: 1,
    title: 'Interpret the established baseline',
    type: 'quiz',
    content: {
      type: 'quiz',
      questions: [
        {
          id: 'source-reasoning',
          type: 'short_answer',
          question:
            'At VC flow 60 L/min, identify the inspiratory pressure scoop and explain why patient demand exceeds delivered flow.',
        },
      ],
    },
    actions: [],
  } as Scene;
}

function harness() {
  let document: CourseDocument = {
    stage: { id: 'stage-v4', name: 'Continuity V4 fixture', createdAt: 1, updatedAt: 1 },
    scenes: [sourceScene()],
  };
  const store = {
    loadDocument: async () => structuredClone(document),
    putScene: async (_stageId: string, scene: Scene) => {
      document = {
        ...document,
        scenes: [...document.scenes.filter((item) => item.id !== scene.id), scene].sort(
          (left, right) => left.order - right.order,
        ),
      };
    },
    saveDocument: async (next: CourseDocument) => {
      document = structuredClone(next);
    },
  } as unknown as CourseStore;
  return { store, read: () => structuredClone(document) };
}

async function run(label: string, html: string) {
  const current = harness();
  const liveEvaluator = createGenerationAiCallFactory()('scene-content:interactive');
  const aiCall: AICallFn = (system, user) =>
    system.includes('generation-time consistency checker')
      ? liveEvaluator(system, user)
      : Promise.resolve(html);
  const tool = buildGenerationTools({
    store: current.store,
    stageAccess: async () => ({ kind: 'owned' }),
    sessionId: `manual-${label}`,
    onCheckpoint: () => {},
    aiCall,
    generateActions: async () => [],
  }).find((candidate) => candidate.name === 'generate_scene') as AgentTool<never, never>;
  const response = await tool.execute(`call-${label}`, {
    stageId: 'stage-v4',
    order: 2,
    title: 'Test one ventilator variable',
    type: 'interactive',
    widgetType: 'simulation',
    widgetOutline: { concept: 'Set inspiratory flow', keyVariables: ['flow (L/min)'] },
    brief:
      'Use the same patient. At baseline 60 L/min, preserve inspiratory pressure scooping, then let the learner adjust only set inspiratory flow.',
    continuity,
  } as never);
  const details = response.details as { error?: string; violations?: string[] };
  return {
    label,
    isError: response.isError === true,
    error: details.error ?? null,
    violations: details.violations ?? [],
    persistedSceneOrders: current.read().scenes.map((scene) => scene.order),
  };
}

export async function runContinuityGateV4() {
  const contradictory = await run('contradictory', widgetHtml(false));
  const consistent = await run('consistent', widgetHtml(true));
  return { contradictory, consistent };
}
