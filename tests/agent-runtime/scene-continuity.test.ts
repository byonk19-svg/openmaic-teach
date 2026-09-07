import { describe, expect, it, vi } from 'vitest';

import {
  buildContinuityPromptBlock,
  evaluateSceneContinuity,
  parseContinuityEvaluationResult,
  parseSceneContinuityContract,
  validateGeneratedContinuity,
  type SceneContinuityContract,
} from '@/lib/server/agent-runtime/scene-continuity';

const contract: SceneContinuityContract = {
  scenarioId: 'flow-demand-case',
  sourceSceneOrder: 1,
  baseline: [
    { name: 'flow', value: 60, unit: 'L/min' },
    { name: 'VT', value: 450, unit: 'mL' },
    { name: 'mode', value: 'VC-AC' },
  ],
  fixedVariables: ['VT', 'RR', 'PEEP', 'resistance'],
  assumptions: ['patient inspiratory demand exceeds 60 L/min'],
  expectedBaselineFindings: ['inspiratory pressure scooping remains present at baseline'],
};

function config(overrides: Record<string, unknown> = {}) {
  return {
    type: 'simulation',
    variables: [{ name: 'flow', label: 'Flow', min: 40, max: 90, default: 60, unit: 'L/min' }],
    presets: [{ name: 'Higher flow', variables: { flow: 70 } }],
    continuity: {
      scenarioId: contract.scenarioId,
      sourceSceneOrder: contract.sourceSceneOrder,
      baseline: structuredClone(contract.baseline),
      fixedVariables: [...contract.fixedVariables],
      assumptions: [...contract.assumptions],
      expectedBaselineFindings: [...contract.expectedBaselineFindings],
      changingVariables: ['flow'],
    },
    ...overrides,
  };
}

describe('scene continuity contract', () => {
  it('accepts a bounded generic scalar contract', () => {
    expect(parseSceneContinuityContract(contract)).toEqual(contract);
  });

  it.each([
    { ...contract, scenarioId: '' },
    { ...contract, sourceSceneOrder: 0 },
    { ...contract, baseline: [] },
    { ...contract, baseline: [{ name: 'flow', value: { bad: true } }] },
    {
      ...contract,
      baseline: [
        { name: 'flow', value: 60 },
        { name: 'FLOW', value: 70 },
      ],
    },
    { ...contract, fixedVariables: ['VT', ' vt '] },
    { ...contract, assumptions: [''] },
    { ...contract, expectedBaselineFindings: [] },
    { ...contract, extra: true },
  ])('rejects malformed or ambiguous contract %j', (value) => {
    expect(() => parseSceneContinuityContract(value)).toThrow();
  });

  it('builds a distinct authoritative generation block with an exact JSON contract', () => {
    const block = buildContinuityPromptBlock(contract);
    expect(block).toContain('AUTHORITATIVE SCENARIO CONTINUITY CONTRACT');
    expect(block).toContain(JSON.stringify(contract, null, 2));
    expect(block).toContain('widget-config.continuity');
    expect(block).toContain('changingVariables');
    expect(block).toContain('may not be silently redefined');
  });
});

describe('deterministic generated-continuity validation', () => {
  it('passes matching metadata, controls, and presets', () => {
    expect(validateGeneratedContinuity(contract, config())).toEqual([]);
  });

  it('fails when continuity metadata is missing', () => {
    const value = config();
    delete (value as { continuity?: unknown }).continuity;
    expect(validateGeneratedContinuity(contract, value)).toContain(
      'widget-config.continuity is required',
    );
  });

  it('rejects continuity metadata embedded in a non-simulation widget config', () => {
    expect(validateGeneratedContinuity(contract, config({ type: 'game' }))).toContain(
      'widget-config.type must be simulation for continuity-controlled generation',
    );
  });

  it('fails a baseline echo or adjustable-control default mismatch', () => {
    const manifestMismatch = config({
      continuity: {
        ...config().continuity,
        baseline: [{ name: 'flow', value: 50, unit: 'L/min' }],
      },
    });
    expect(validateGeneratedContinuity(contract, manifestMismatch).join('\n')).toContain(
      'baseline flow',
    );
    const controlMismatch = config({
      variables: [{ name: 'flow', label: 'Flow', min: 40, max: 90, default: 50, unit: 'L/min' }],
    });
    expect(validateGeneratedContinuity(contract, controlMismatch).join('\n')).toContain(
      'control flow default 50 L/min does not match the declared baseline 60 L/min',
    );
  });

  it('fails missing assumptions and expected baseline findings', () => {
    const continuity = {
      ...config().continuity,
      assumptions: [],
      expectedBaselineFindings: [],
    };
    const violations = validateGeneratedContinuity(contract, config({ continuity })).join('\n');
    expect(violations).toContain('assumption');
    expect(violations).toContain('expected baseline finding');
  });

  it('rejects a fixed variable exposed as a control or preset change', () => {
    const controls = config({
      variables: [
        { name: 'flow', label: 'Flow', min: 40, max: 90, default: 60, unit: 'L/min' },
        { name: 'VT', label: 'Tidal volume', min: 300, max: 600, default: 450, unit: 'mL' },
      ],
      continuity: { ...config().continuity, changingVariables: ['flow', 'VT'] },
    });
    expect(validateGeneratedContinuity(contract, controls).join('\n')).toContain(
      'fixed variable VT is adjustable',
    );
    const preset = config({ presets: [{ name: 'Bundle', variables: { flow: 70, PEEP: 8 } }] });
    expect(validateGeneratedContinuity(contract, preset).join('\n')).toContain(
      'fixed variable PEEP is changed by preset Bundle',
    );
  });

  it('rejects an adjustable control without a same-named declared baseline fact', () => {
    const value = config({
      variables: [
        {
          name: 'setFlow',
          label: 'Flow',
          min: 40,
          max: 90,
          default: 60,
          unit: 'L/min',
        },
      ],
      continuity: { ...config().continuity, changingVariables: ['setFlow'] },
    });
    expect(validateGeneratedContinuity(contract, value).join('\n')).toContain(
      'control setFlow has no declared baseline fact',
    );
  });
});

describe('semantic continuity evaluation', () => {
  it('strictly parses pass and revise decisions', () => {
    expect(parseContinuityEvaluationResult({ decision: 'pass', violations: [] })).toEqual({
      decision: 'pass',
      violations: [],
    });
    expect(
      parseContinuityEvaluationResult({
        decision: 'revise',
        violations: ['Baseline finding absent.'],
      }),
    ).toEqual({ decision: 'revise', violations: ['Baseline finding absent.'] });
  });

  it.each([
    null,
    { decision: 'unknown', violations: [] },
    { decision: 'pass', violations: ['contradiction'] },
    { decision: 'revise', violations: [] },
    { decision: 'pass', violations: [], extra: true },
  ])('rejects malformed or ambiguous result %j', (value) => {
    expect(() => parseContinuityEvaluationResult(value)).toThrow();
  });

  it('passes bounded complete content to an untrusted-content evaluator', async () => {
    const aiCall = vi.fn(async () => JSON.stringify({ decision: 'pass', violations: [] }));
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html><body>Baseline scoop remains present.</body></html>',
          sceneBrief: 'Vary flow only.',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        aiCall,
      ),
    ).resolves.toEqual({ decision: 'pass', violations: [] });
    expect(aiCall.mock.calls[0]![0]).toContain('untrusted generated content');
    expect(aiCall.mock.calls[0]![0]).toContain('does not validate clinical truth');
    expect(aiCall.mock.calls[0]![1]).toContain('Baseline scoop remains present.');
  });

  it('separates the interactive scene container from its simulation widget in semantic scope', async () => {
    const aiCall = vi.fn(async () => JSON.stringify({ decision: 'pass', violations: [] }));
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html><body>Baseline scoop remains present.</body></html>',
          sceneBrief: 'Use type interactive with widgetType simulation.',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        aiCall,
      ),
    ).resolves.toEqual({ decision: 'pass', violations: [] });

    const [systemPrompt, userPrompt] = aiCall.mock.calls[0]!;
    expect(systemPrompt).toContain(
      'sceneType = "interactive", widgetType = "simulation", and widgetConfig.type = "simulation"',
    );
    expect(systemPrompt).toContain('valid and MUST NOT be reported as a contradiction');
    expect(systemPrompt).toContain('Deterministic validation exclusively owns');
    expect(systemPrompt).toContain('qualitative scenario and model continuity');
    expect(systemPrompt).toContain('Do NOT report structural violations');
    expect(JSON.parse(userPrompt)).toMatchObject({
      openMaicStructure: {
        sceneType: 'interactive',
        widgetType: 'simulation',
        widgetConfigType: 'simulation',
      },
    });
  });

  it.each([
    ['baseline finding', 'The generated baseline removes the required pressure scoop.'],
    [
      'model assumption',
      'The generated model assumes demand equals flow, contradicting the contract.',
    ],
  ])('returns revise for a genuine qualitative %s contradiction', async (_label, violation) => {
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html><body>Generated qualitative model.</body></html>',
          sceneBrief: 'Preserve the established patient state.',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        async () => JSON.stringify({ decision: 'revise', violations: [violation] }),
      ),
    ).resolves.toEqual({ decision: 'revise', violations: [violation] });
  });

  it('fails closed on malformed output, errors, timeout, or oversized HTML', async () => {
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html></html>',
          sceneBrief: 'Brief',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        async () => 'not-json',
      ),
    ).rejects.toThrow();
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html></html>',
          sceneBrief: 'Brief',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        async () => '{"decision":"revise","decision":"pass","violations":[]}',
      ),
    ).rejects.toThrow('Duplicate continuity evaluation key');
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html></html>',
          sceneBrief: 'Brief',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        async () => {
          throw new Error('provider unavailable');
        },
      ),
    ).rejects.toThrow('provider unavailable');
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: '<html></html>',
          sceneBrief: 'Brief',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        () => new Promise(() => {}),
        { timeoutMs: 5 },
      ),
    ).rejects.toThrow('timed out');
    const aiCall = vi.fn(async () => JSON.stringify({ decision: 'pass', violations: [] }));
    await expect(
      evaluateSceneContinuity(
        {
          contract,
          widgetConfig: config(),
          html: 'x'.repeat(120_001),
          sceneBrief: 'Brief',
          sceneType: 'interactive',
          widgetType: 'simulation',
        },
        aiCall,
      ),
    ).rejects.toThrow('too large');
    expect(aiCall).not.toHaveBeenCalled();
  });
});
