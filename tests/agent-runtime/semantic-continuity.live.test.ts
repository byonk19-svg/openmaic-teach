import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { createGenerationAiCallFactory } from '@/lib/server/agent-runtime/generation-ai-call';
import {
  evaluateSceneContinuity,
  type SceneContinuityContract,
} from '@/lib/server/agent-runtime/scene-continuity';

for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/u)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const separator = trimmed.indexOf('=');
  if (separator < 1) continue;
  const name = trimmed.slice(0, separator).trim();
  const value = trimmed.slice(separator + 1).trim();
  if (process.env[name] === undefined) process.env[name] = value;
}

const liveIt = process.env.RUN_LIVE_SEMANTIC_EVAL === '1' ? it : it.skip;

const contract: SceneContinuityContract = {
  scenarioId: 'v4-flow-demand-case',
  sourceSceneOrder: 1,
  baseline: [
    { name: 'flow', value: 60, unit: 'L/min' },
    { name: 'VT', value: 450, unit: 'mL' },
    { name: 'RR', value: 20, unit: '/min' },
    { name: 'PEEP', value: 8, unit: 'cm H2O' },
  ],
  fixedVariables: [
    'VT',
    'RR',
    'PEEP',
    'compliance',
    'resistance',
    'respiratory drive',
    'sedation',
    'comfort',
  ],
  assumptions: ['patient inspiratory flow demand exceeds 60 L/min at baseline'],
  expectedBaselineFindings: [
    'inspiratory pressure scooping remains present at the 60 L/min baseline',
  ],
};

const widgetConfig = {
  type: 'simulation',
  variables: [
    {
      name: 'flow',
      label: 'Set inspiratory flow',
      min: 30,
      max: 100,
      default: 60,
      unit: 'L/min',
      step: 5,
    },
  ],
  continuity: { ...contract, changingVariables: ['flow'] },
};

function input(html: string) {
  return {
    contract,
    widgetConfig,
    html,
    sceneBrief:
      'The scene type is interactive and widgetType is simulation. Preserve pressure scooping at baseline and change only flow.',
    sceneType: 'interactive' as const,
    widgetType: 'simulation' as const,
  };
}

describe('live semantic continuity evaluator', () => {
  liveIt(
    'passes a consistent fixture and revises a qualitative contradiction',
    async () => {
      const aiCall = createGenerationAiCallFactory()('scene-content:interactive');
      const consistentInput = input(`<!DOCTYPE html><html><body>
        <p>At flow 60 L/min, inspiratory pressure scooping remains present because modeled patient demand is 80 L/min.</p>
        <p>Increasing flow reduces only the modeled flow-demand mismatch. VT, RR, PEEP, compliance, resistance, respiratory drive, sedation, and comfort remain fixed.</p>
      </body></html>`);
      const contradictoryInput = input(`<!DOCTYPE html><html><body>
        <p>At flow 60 L/min there is no inspiratory pressure scooping because modeled patient demand equals 60 L/min.</p>
        <p>The model assumes patient inspiratory demand does not exceed baseline flow.</p>
      </body></html>`);

      const consistent = await evaluateSceneContinuity(consistentInput, aiCall);
      const contradictory = await evaluateSceneContinuity(contradictoryInput, aiCall);

      console.log(
        JSON.stringify(
          {
            consistent: { input: consistentInput, output: consistent },
            contradictory: { input: contradictoryInput, output: contradictory },
          },
          null,
          2,
        ),
      );
      expect(consistent).toEqual({ decision: 'pass', violations: [] });
      expect(contradictory.decision).toBe('revise');
      expect(contradictory.violations.length).toBeGreaterThan(0);
    },
    180_000,
  );
});
