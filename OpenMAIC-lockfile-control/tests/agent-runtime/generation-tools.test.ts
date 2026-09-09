import { describe, expect, it, vi } from 'vitest';
import { Value } from 'typebox/value';
import type { AgentTool } from '@earendil-works/pi-agent-core';
import { validateToolArguments } from '@earendil-works/pi-ai';

import type { CourseDocument, CourseStore } from '@/lib/server/agent-runtime/course-tools';
import { buildDslCourseToolset } from '@/lib/server/agent-runtime/course-tools';
import {
  buildGenerationTools,
  collectUnresolvedMediaPlaceholders,
  filterKnownActions,
} from '@/lib/server/agent-runtime/generation-tools';
import type { Scene } from '@/lib/types/stage';
import type { SceneContinuityContract } from '@/lib/server/agent-runtime/scene-continuity';

const continuity: SceneContinuityContract = {
  scenarioId: 'flow-demand-case',
  sourceSceneOrder: 1,
  baseline: [
    { name: 'flow', value: 60, unit: 'L/min' },
    { name: 'VT', value: 450, unit: 'mL' },
  ],
  fixedVariables: ['VT', 'RR', 'PEEP', 'resistance'],
  assumptions: ['patient demand exceeds baseline flow'],
  expectedBaselineFindings: ['pressure scooping is present at baseline'],
};

const reasoningGate = {
  rubric: 'Require pattern, mechanism, and one specific intervention with an observable target.',
  passThreshold: 0.8,
};

function continuityHtml(overrides: Record<string, unknown> = {}) {
  const widgetConfig = {
    type: 'simulation',
    variables: [{ name: 'flow', label: 'Flow', min: 40, max: 90, default: 60, unit: 'L/min' }],
    presets: [{ name: 'Higher', variables: { flow: 70 } }],
    continuity: { ...continuity, changingVariables: ['flow'] },
    ...overrides,
  };
  return `<!DOCTYPE html><html><body><input data-var="flow" type="range"><script type="application/json" id="widget-config">${JSON.stringify(widgetConfig)}</script></body></html>`;
}

function slide(id: string, order: number, title = id): Scene {
  return {
    id,
    stageId: 'stage-test',
    order,
    title,
    type: 'slide',
    content: {
      type: 'slide',
      canvas: {
        id: `canvas-${id}`,
        viewportSize: 1000,
        viewportRatio: 0.5625,
        theme: {
          backgroundColor: '#fff',
          themeColors: ['#2463eb'],
          fontColor: '#111',
          fontName: 'Inter',
        },
        elements: [],
      },
    },
    actions: [],
  } as Scene;
}

function document(scenes: Scene[]): CourseDocument {
  return {
    stage: { id: 'stage-test', name: 'Test', createdAt: 1, updatedAt: 1 },
    scenes,
    outline: {
      outlines: scenes.map((scene) => ({
        id: scene.outlineId ?? scene.id,
        order: scene.order,
        title: scene.title,
        type: scene.type,
        description: `${scene.title} brief`,
        keyPoints: [],
      })),
      createdAt: 1,
      updatedAt: 1,
    },
  } as CourseDocument;
}

function state(initial: CourseDocument | null) {
  let doc = initial ? structuredClone(initial) : null;
  const store = {
    loadDocument: vi.fn(async () => doc),
    putScene: vi.fn(async (_stageId: string, scene: Scene) => {
      if (!doc) throw new Error('missing');
      const index = doc.scenes.findIndex((item) => item.id === scene.id);
      doc.scenes =
        index < 0
          ? [...doc.scenes, scene]
          : doc.scenes.map((item) => (item.id === scene.id ? scene : item));
    }),
    saveDocument: vi.fn(async (next: CourseDocument) => {
      doc = structuredClone(next);
    }),
  } as unknown as CourseStore;
  return { store, get: () => doc };
}

function find(tools: AgentTool<never, never>[], name: string) {
  const tool = tools.find((item) => item.name === name);
  if (!tool) throw new Error(`missing ${name}`);
  return tool;
}

function deps(store: CourseStore, extra: Record<string, unknown> = {}) {
  return {
    store,
    stageAccess: async () => ({ kind: 'owned' as const }),
    sessionId: 'session-a',
    onCheckpoint: vi.fn(),
    synthesizeTts: vi.fn(async () => ({
      available: true,
      changed: false,
      generated: 0,
      skipped: 0,
      failed: [],
    })),
    ...extra,
  };
}

async function runSimulationControlPreflight(baselineValue: string | number, controlDefault = 60) {
  const current = state(document([slide('source', 1)]));
  const aiCall = vi.fn(async () => {
    throw new Error('MOCK_DOWNSTREAM_AI_SEAM_REACHED');
  });
  const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
  const prepared = validateToolArguments(generate, {
    id: 'preflight-probe',
    name: 'generate_scene',
    arguments: {
      stageId: 'stage-test',
      order: 2,
      title: 'Linked simulation',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow' },
      simulationControls: [
        {
          name: 'flow',
          label: 'Set inspiratory flow',
          min: 30,
          max: 100,
          default: controlDefault,
          unit: 'L/min',
          step: 5,
        },
      ],
      brief: 'Vary flow in the linked scenario.',
      continuity: {
        ...continuity,
        baseline: [{ name: 'flow', value: baselineValue, unit: 'L/min' }],
      },
    },
  });
  try {
    const response = await generate.execute('preflight-probe', prepared as never);
    return { outcome: 'returned' as const, response, aiCall };
  } catch (error) {
    return { outcome: 'threw' as const, error, aiCall };
  }
}

describe('generation and deck tools', () => {
  it('reports active-skill diagnostics against the persisted stage after generation', async () => {
    const current = state(document([]));
    const onCheckpoint = vi.fn();
    let calls = 0;
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          onCheckpoint,
          getActiveSkill: () => ({
            id: 'workshop-style',
            name: 'workshop-style',
            description: 'Workshop',
            content: '# Workshop',
            filePath: '/skills/workshop-style/SKILL.md',
            constraints: { sceneCount: { min: 2 } },
            source: 'builtin',
          }),
          aiCall: vi.fn(async () => {
            calls += 1;
            return calls === 1
              ? JSON.stringify([{ id: 'q1', type: 'short_answer', question: 'Try it?' }])
              : JSON.stringify([{ type: 'text', content: 'Narration' }]);
          }),
        }),
      ),
      'generate_scene',
    );
    const response = await generate.execute('call', {
      stageId: 'stage-test',
      order: 1,
      title: 'Practice',
      type: 'quiz',
      brief: 'Try the idea',
    } as never);
    expect((response.content[0] as { text?: string } | undefined)?.text).toContain(
      'SKILL CONSTRAINT CHECK',
    );
    expect(response.details).toMatchObject({
      skill: 'workshop-style',
      skillViolations: ['1 scenes, the skill requires at least 2'],
    });
    expect(onCheckpoint).toHaveBeenCalledWith(
      expect.objectContaining({ skill: 'workshop-style', skillViolations: expect.any(Array) }),
    );
  });

  it('keeps an earlier page after a later page generation crashes', async () => {
    const current = state(document([]));
    let contentCalls = 0;
    const aiCall = vi.fn(async () => {
      contentCalls += 1;
      if (contentCalls === 1)
        return JSON.stringify([{ id: 'q1', type: 'short_answer', question: 'First?' }]);
      if (contentCalls === 2) return JSON.stringify([{ type: 'text', content: 'First narration' }]);
      throw new Error('mid-generation failure');
    });
    const tools = buildGenerationTools(deps(current.store, { aiCall }));
    const generate = find(tools, 'generate_scene');
    await generate.execute('first', {
      stageId: 'stage-test',
      order: 1,
      title: 'First',
      type: 'quiz',
      brief: 'First brief',
    } as never);
    await expect(
      generate.execute('second', {
        stageId: 'stage-test',
        order: 2,
        title: 'Second',
        type: 'quiz',
        brief: 'Second brief',
      } as never),
    ).rejects.toThrow('mid-generation failure');
    expect(current.get()?.scenes.map(({ order, title }) => ({ order, title }))).toEqual([
      { order: 1, title: 'First' },
    ]);
  });

  it('refuses destructive PBL type changes and unresolved generation media', async () => {
    const pbl = slide('project', 1, 'Project') as Scene;
    pbl.type = 'pbl';
    pbl.content = { type: 'pbl', projectV2: { id: 'project' } } as never;
    const current = state(document([pbl]));
    const generate = find(buildGenerationTools(deps(current.store)), 'generate_scene');
    const typeChange = await generate.execute('type-change', {
      stageId: 'stage-test',
      order: 1,
      title: 'Replacement',
      type: 'slide',
      brief: 'Replace the project',
    } as never);
    expect(typeChange).toMatchObject({ isError: true, details: { blocked: 'pbl-type-change' } });
    const badMedia = await generate.execute('bad-media', {
      stageId: 'stage-test',
      order: 2,
      title: 'Media',
      type: 'slide',
      brief: 'Use media',
      media: [{ src: 'image:pending', description: 'Pending image' }],
    } as never);
    expect(badMedia).toMatchObject({ isError: true, details: { error: 'media-placeholder-src' } });
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('passes widgetType and widgetOutline through to interactive generation', async () => {
    const current = state(document([]));
    const prompts: string[] = [];
    let calls = 0;
    const aiCall = vi.fn(async (_system: string, user: string) => {
      calls += 1;
      prompts.push(user);
      return calls === 1
        ? '<!DOCTYPE html><html><body><div id="water-cycle"></div></body></html>'
        : '[]';
    });
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    const response = await generate.execute('call', {
      stageId: 'stage-test',
      order: 1,
      title: 'Water Cycle',
      type: 'interactive',
      brief: 'Show how the water cycle works',
      widgetType: 'diagram',
      widgetOutline: { concept: 'Water cycle', diagramType: 'mindmap' },
    } as never);
    expect(response).not.toMatchObject({ isError: true });
    const scene = current.get()?.scenes[0];
    expect(scene).toMatchObject({ type: 'interactive' });
    expect(scene?.content).toMatchObject({ widgetType: 'diagram' });
    expect(prompts[0]).toContain('mindmap');
  });

  it('falls back to a simulation widget when interactive generation omits widgetType', async () => {
    const current = state(document([]));
    let calls = 0;
    const aiCall = vi.fn(async () => {
      calls += 1;
      return calls === 1
        ? '<!DOCTYPE html><html><body><div id="energy-slider"></div></body></html>'
        : '[]';
    });
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    const response = await generate.execute('call', {
      stageId: 'stage-test',
      order: 1,
      title: 'Energy',
      type: 'interactive',
      brief: 'Explore energy transfer',
    } as never);
    expect(response).not.toMatchObject({ isError: true });
    expect(current.get()?.scenes[0]?.content).toMatchObject({ widgetType: 'simulation' });
  });

  it('rejects widgetType on non-interactive pages without writing anything', async () => {
    const current = state(document([]));
    const generate = find(buildGenerationTools(deps(current.store)), 'generate_scene');
    const response = await generate.execute('call', {
      stageId: 'stage-test',
      order: 1,
      title: 'Slide',
      type: 'slide',
      brief: 'A plain slide',
      widgetType: 'diagram',
    } as never);
    expect(response).toMatchObject({
      isError: true,
      details: { error: 'widget-requires-interactive' },
    });
    expect(current.get()?.scenes).toHaveLength(0);
  });

  it('rejects malformed widgetOutline values without writing anything', async () => {
    const current = state(document([]));
    const generate = find(buildGenerationTools(deps(current.store)), 'generate_scene');
    const base = {
      stageId: 'stage-test',
      order: 1,
      title: 'Slide',
      brief: 'A plain slide',
    };
    const nullOutline = await generate.execute('null-outline', {
      ...base,
      type: 'interactive',
      widgetType: 'diagram',
      widgetOutline: null,
    } as never);
    expect(nullOutline).toMatchObject({
      isError: true,
      details: { error: 'invalid-widget-outline' },
    });
    const stringOutline = await generate.execute('string-outline', {
      ...base,
      type: 'interactive',
      widgetOutline: 'mindmap',
    } as never);
    expect(stringOutline).toMatchObject({
      isError: true,
      details: { error: 'invalid-widget-outline' },
    });
    const wrongType = await generate.execute('wrong-type', {
      ...base,
      type: 'slide',
      widgetOutline: null,
    } as never);
    expect(wrongType).toMatchObject({
      isError: true,
      details: { error: 'widget-requires-interactive' },
    });
    expect(current.get()?.scenes).toHaveLength(0);
  });

  it('mirrors the generator defaults when only one widget field is provided', async () => {
    const current = state(document([]));
    const prompts: string[] = [];
    let calls = 0;
    const aiCall = vi.fn(async (_system: string, user: string) => {
      calls += 1;
      prompts.push(user);
      return calls % 2 === 1
        ? '<!DOCTYPE html><html><body><div id="widget"></div></body></html>'
        : '[]';
    });
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    // Bare widgetType: the handler must supply widgetOutline { concept: title },
    // otherwise generateWidgetContent returns null.
    const typeOnly = await generate.execute('type-only', {
      stageId: 'stage-test',
      order: 1,
      title: 'Gravity Playground',
      type: 'interactive',
      brief: 'Play with gravity',
      widgetType: 'simulation',
    } as never);
    expect(typeOnly).not.toMatchObject({ isError: true });
    expect(current.get()?.scenes[0]?.content).toMatchObject({ widgetType: 'simulation' });
    expect(prompts[0]).toContain('Gravity Playground');
    // Bare widgetOutline: widgetType defaults to simulation and keeps the outline.
    const outlineOnly = await generate.execute('outline-only', {
      stageId: 'stage-test',
      order: 2,
      title: 'Entropy',
      type: 'interactive',
      brief: 'Explore entropy',
      widgetOutline: { concept: 'Entropy of mixing' },
    } as never);
    expect(outlineOnly).not.toMatchObject({ isError: true });
    expect(current.get()?.scenes[1]?.content).toMatchObject({ widgetType: 'simulation' });
    expect(prompts[2]).toContain('Entropy of mixing');
  });

  it('validates widget params through the tool schema', () => {
    const generate = find(buildGenerationTools(deps(state(document([])).store)), 'generate_scene');
    const base = {
      stageId: 'stage-test',
      order: 1,
      title: 'Title',
      type: 'interactive',
      brief: 'Brief',
    };
    expect(Value.Check(generate.parameters, { ...base, widgetType: 'diagram' })).toBe(true);
    // procedural-skill stays gated behind task-engine mode: the tool schema
    // must keep rejecting it until a vocational signal reaches this layer.
    expect(Value.Check(generate.parameters, { ...base, widgetType: 'procedural-skill' })).toBe(
      false,
    );
    expect(Value.Check(generate.parameters, { ...base, widgetType: 'hologram' })).toBe(false);
    expect(
      Value.Check(generate.parameters, {
        ...base,
        widgetType: 'simulation',
        continuity,
      }),
    ).toBe(true);
    expect(
      Value.Check(generate.parameters, {
        ...base,
        widgetType: 'simulation',
        continuity: { ...continuity, baseline: [] },
      }),
    ).toBe(false);
    expect(
      (generate.parameters as unknown as { properties?: Record<string, unknown> }).properties,
    ).toHaveProperty('simulationControls');
    expect(
      (generate.parameters as unknown as { properties?: Record<string, unknown> }).properties,
    ).toHaveProperty('quizConfig');
    expect(
      (generate.parameters as unknown as { properties?: Record<string, unknown> }).properties,
    ).toHaveProperty('reasoningGate');
  });

  it('attaches a requested reasoning gate to a generated short answer that omits host metadata', async () => {
    const current = state(document([]));
    const prompts: string[] = [];
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async (_system: string, user: string) => {
            prompts.push(user);
            return JSON.stringify([
              {
                id: 'q1',
                type: 'short_answer',
                question: 'Interpret the waveform.',
                analysis: 'Reference analysis.',
                points: 20,
              },
            ]);
          }),
          generateActions: vi.fn(async () => []),
        }),
      ),
      'generate_scene',
    );

    const response = await generate.execute('gated-quiz', {
      stageId: 'stage-test',
      order: 1,
      title: 'Interpret the observations',
      type: 'quiz',
      brief: 'One clinical reasoning checkpoint.',
      quizConfig: { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] },
      reasoningGate,
    } as never);

    expect(response).not.toMatchObject({ isError: true });
    expect(prompts[0]).toContain('Question Count: 1');
    expect(prompts[0]).toContain('Authoritative Reasoning Gate');
    expect(current.get()?.scenes[0]?.content).toMatchObject({
      type: 'quiz',
      questions: [{ type: 'short_answer', reasoningGate }],
    });
    const reloaded = await current.store.loadDocument('stage-test');
    expect(reloaded?.scenes[0]?.content).toMatchObject({
      type: 'quiz',
      questions: [{ reasoningGate }],
    });
  });

  it('persists the canonical requested gate when the model emits an exact matching gate', async () => {
    const current = state(document([]));
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () =>
            JSON.stringify([
              {
                id: 'q1',
                type: 'short_answer',
                question: 'Interpret the waveform.',
                analysis: 'Reference analysis.',
                reasoningGate: { ...reasoningGate },
              },
            ]),
          ),
          generateActions: vi.fn(async () => []),
        }),
      ),
      'generate_scene',
    );

    const response = await generate.execute('matching-gated-quiz', {
      stageId: 'stage-test',
      order: 1,
      title: 'Interpret the observations',
      type: 'quiz',
      brief: 'One clinical reasoning checkpoint.',
      quizConfig: { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] },
      reasoningGate,
    } as never);

    expect(response).not.toMatchObject({ isError: true });
    const reloaded = await current.store.loadDocument('stage-test');
    const question = (reloaded?.scenes[0]?.content as { questions: Array<Record<string, unknown>> })
      .questions[0];
    expect(question.reasoningGate).toEqual(reasoningGate);
    expect(question.reasoningGate).not.toBe(reasoningGate);
  });

  it('keeps an ungated quiz model-authored and does not add host gate metadata', async () => {
    const current = state(document([]));
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () =>
            JSON.stringify([
              {
                id: 'legacy-q1',
                type: 'single',
                question: 'Choose the best answer.',
                options: ['A', 'B'],
                correctAnswer: 'A',
              },
            ]),
          ),
          generateActions: vi.fn(async () => []),
        }),
      ),
      'generate_scene',
    );

    const response = await generate.execute('legacy-quiz', {
      stageId: 'stage-test',
      order: 1,
      title: 'Legacy practice',
      type: 'quiz',
      brief: 'An ordinary quiz without a reasoning gate.',
    } as never);

    expect(response).not.toMatchObject({ isError: true });
    const reloaded = await current.store.loadDocument('stage-test');
    const question = (reloaded?.scenes[0]?.content as { questions: Array<Record<string, unknown>> })
      .questions[0];
    expect(question.type).toBe('single');
    expect(question.reasoningGate).toBeUndefined();
  });

  it.each([
    [
      'three generated questions',
      [
        { id: 'q1', type: 'single', question: 'First?' },
        { id: 'q2', type: 'single', question: 'Second?' },
        { id: 'q3', type: 'short_answer', question: 'Third?', reasoningGate },
      ],
      'exactly one question',
    ],
    [
      'mismatched generated threshold',
      [
        {
          id: 'q1',
          type: 'short_answer',
          question: 'Interpret?',
          analysis: 'Reference analysis.',
          reasoningGate: { ...reasoningGate, passThreshold: 0.7 },
        },
      ],
      'passThreshold',
    ],
    [
      'mismatched generated rubric',
      [
        {
          id: 'q1',
          type: 'short_answer',
          question: 'Interpret?',
          analysis: 'Reference analysis.',
          reasoningGate: { ...reasoningGate, rubric: 'Different rubric.' },
        },
      ],
      'rubric does not match',
    ],
    [
      'extra generated gate field',
      [
        {
          id: 'q1',
          type: 'short_answer',
          question: 'Interpret?',
          analysis: 'Reference analysis.',
          reasoningGate: { ...reasoningGate, gatedAnalysis: 'extra' },
        },
      ],
      'reasoningGate is invalid',
    ],
    [
      'wrong generated question type',
      [{ id: 'q1', type: 'single', question: 'Interpret?', analysis: 'Reference analysis.' }],
      'short_answer',
    ],
    [
      'blank generated analysis',
      [{ id: 'q1', type: 'short_answer', question: 'Interpret?', analysis: '   ' }],
      'non-empty analysis',
    ],
  ])(
    'rejects gated quiz output with %s before actions or persistence',
    async (_label, questions, expected) => {
      const current = state(document([]));
      const generateActions = vi.fn(async () => []);
      const generate = find(
        buildGenerationTools(
          deps(current.store, {
            aiCall: vi.fn(async () => JSON.stringify(questions)),
            generateActions,
          }),
        ),
        'generate_scene',
      );

      const response = await generate.execute('bad-gated-quiz', {
        stageId: 'stage-test',
        order: 1,
        title: 'Interpret the observations',
        type: 'quiz',
        brief: 'One clinical reasoning checkpoint.',
        quizConfig: { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] },
        reasoningGate,
      } as never);

      expect(response).toMatchObject({
        isError: true,
        details: { error: 'reasoning-gate-revise' },
      });
      expect((response.details as { violations: string[] }).violations.join(' ')).toContain(
        expected,
      );
      expect(generateActions).not.toHaveBeenCalled();
      expect(current.get()?.scenes).toHaveLength(0);
    },
  );

  it('rejects an incompatible reasoning-gate quiz configuration before model invocation', async () => {
    const current = state(document([]));
    const aiCall = vi.fn();
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    const response = await generate.execute('bad-gate-config', {
      stageId: 'stage-test',
      order: 1,
      title: 'Interpret',
      type: 'quiz',
      brief: 'Checkpoint.',
      quizConfig: { questionCount: 3, difficulty: 'medium', questionTypes: ['single', 'text'] },
      reasoningGate,
    } as never);

    expect(response).toMatchObject({
      isError: true,
      details: { error: 'reasoning-gate-quiz-config-conflict' },
    });
    expect(aiCall).not.toHaveBeenCalled();
  });

  it('passes typed simulation controls from generate_scene into the simulation prompt', async () => {
    const current = state(document([]));
    const prompts: string[] = [];
    let calls = 0;
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async (_system: string, user: string) => {
            calls += 1;
            prompts.push(user);
            return calls === 1
              ? '<!DOCTYPE html><html><body><script type="application/json" id="widget-config">{"type":"simulation","variables":[{"name":"flow","label":"Set inspiratory flow","min":30,"max":100,"default":60,"unit":"L/min","step":5}]}</script></body></html>'
              : '[]';
          }),
        }),
      ),
      'generate_scene',
    );

    const response = await generate.execute('typed-controls', {
      stageId: 'stage-test',
      order: 1,
      title: 'Flow control',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow' },
      simulationControls: [
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
      brief: 'Test one variable.',
    } as never);

    expect(response).not.toMatchObject({ isError: true });
    expect(prompts[0]).toContain('Authoritative Control Specification');
    expect(prompts[0]).toContain('"default": 60');
    expect(prompts[0]).toContain('"step": 5');
  });

  it('rejects a typed control that conflicts with continuity before model invocation', async () => {
    const current = state(document([slide('source', 1)]));
    const aiCall = vi.fn(async () => continuityHtml());
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');

    const response = await generate.execute('conflicting-control', {
      stageId: 'stage-test',
      order: 2,
      title: 'Linked simulation',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow' },
      simulationControls: [
        {
          name: 'flow',
          label: 'Set inspiratory flow',
          min: 30,
          max: 100,
          default: 50,
          unit: 'L/min',
          step: 5,
        },
      ],
      brief: 'Vary flow in the linked scenario.',
      continuity,
    } as never);

    expect(response).toMatchObject({
      isError: true,
      details: {
        error: 'simulation-control-continuity-conflict',
        violations: [expect.stringContaining('flow default 50')],
      },
    });
    expect(aiCall).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('preserves equal numeric control and continuity defaults through runner validation', () => {
    const generate = find(buildGenerationTools(deps(state(document([])).store)), 'generate_scene');
    const args = validateToolArguments(generate, {
      id: 'validated-live-shape',
      name: 'generate_scene',
      arguments: {
        stageId: 'stage-test',
        order: 2,
        title: 'Linked simulation',
        type: 'interactive',
        widgetType: 'simulation',
        widgetOutline: { concept: 'Flow' },
        simulationControls: [
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
        brief: 'Vary flow in the linked scenario.',
        continuity,
      },
    });

    expect(args.simulationControls[0].default).toBe(60);
    expect(args.continuity.baseline[0].value).toBe(60);
  });

  it.each([60, '60', ' 60 ', '60.0'])(
    'accepts strict decimal-equivalent continuity baseline %j for numeric control 60',
    async (baselineValue) => {
      const probe = await runSimulationControlPreflight(baselineValue);
      expect(probe.outcome).toBe('threw');
      expect(probe.error).toMatchObject({ message: 'MOCK_DOWNSTREAM_AI_SEAM_REACHED' });
      expect(probe.aiCall).toHaveBeenCalledOnce();
    },
  );

  it.each(['60 L/min', 'sixty', '', '   ', 'Infinity', 'NaN', '0x3c'])(
    'rejects non-decimal continuity baseline %j for numeric control 60',
    async (baselineValue) => {
      const probe = await runSimulationControlPreflight(baselineValue);
      expect(probe.outcome).toBe('returned');
      expect(probe.response).toMatchObject({ isError: true });
      expect(probe.aiCall).not.toHaveBeenCalled();
    },
  );

  it('rejects genuinely different numeric control and continuity defaults', async () => {
    const probe = await runSimulationControlPreflight(60, 55);
    expect(probe.outcome).toBe('returned');
    expect(probe.response).toMatchObject({
      isError: true,
      details: { error: 'simulation-control-continuity-conflict' },
    });
    expect(probe.aiCall).not.toHaveBeenCalled();
  });

  it('rejects typed simulation controls on non-simulation generation before model invocation', async () => {
    const current = state(document([]));
    const aiCall = vi.fn();
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    const control = {
      name: 'flow',
      label: 'Flow',
      min: 30,
      max: 100,
      default: 60,
    };

    for (const params of [
      {
        stageId: 'stage-test',
        order: 1,
        title: 'Slide',
        type: 'slide',
        brief: 'Not interactive.',
        simulationControls: [control],
      },
      {
        stageId: 'stage-test',
        order: 1,
        title: 'Diagram',
        type: 'interactive',
        widgetType: 'diagram',
        brief: 'Not a simulation.',
        simulationControls: [control],
      },
    ]) {
      const response = await generate.execute('wrong-widget-kind', params as never);
      expect(response).toMatchObject({
        isError: true,
        details: { error: 'simulation-controls-require-simulation' },
      });
    }
    expect(aiCall).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(0);
  });

  it('rejects invalid typed simulation control bounds before model invocation', async () => {
    const current = state(document([]));
    const aiCall = vi.fn();
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');

    const response = await generate.execute('invalid-control', {
      stageId: 'stage-test',
      order: 1,
      title: 'Simulation',
      type: 'interactive',
      widgetType: 'simulation',
      brief: 'Invalid control.',
      simulationControls: [
        { name: 'flow', label: 'Flow', min: 100, max: 30, default: 60, step: 0 },
      ],
    } as never);

    expect(response).toMatchObject({
      isError: true,
      details: {
        error: 'invalid-simulation-controls',
        violations: expect.arrayContaining([
          expect.stringContaining('min must be less than max'),
          expect.stringContaining('step must be greater than zero'),
        ]),
      },
    });
    expect(aiCall).not.toHaveBeenCalled();
  });

  it('leaves ordinary generate_scene prompts and persistence unchanged', async () => {
    const current = state(document([]));
    const prompts: string[] = [];
    const evaluator = vi.fn();
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async (_system: string, user: string) => {
            prompts.push(user);
            return continuityHtml();
          }),
          generateActions: vi.fn(async () => []),
          evaluateContinuity: evaluator,
        }),
      ),
      'generate_scene',
    );
    const response = await generate.execute('ordinary', {
      stageId: 'stage-test',
      order: 1,
      title: 'Ordinary',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Ordinary', keyVariables: ['flow'] },
      brief: 'No continuity contract.',
    } as never);
    expect(response).not.toMatchObject({ isError: true });
    expect(prompts[0]).not.toContain('AUTHORITATIVE SCENARIO CONTINUITY CONTRACT');
    expect(evaluator).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('passes authoritative continuity into generation and persists only after both gates pass', async () => {
    const current = state(document([slide('source', 1)]));
    const prompts: string[] = [];
    const evaluator = vi.fn(async () => ({ decision: 'pass' as const, violations: [] }));
    const generateActions = vi.fn(async () => []);
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async (_system: string, user: string) => {
            prompts.push(user);
            return continuityHtml();
          }),
          generateActions,
          evaluateContinuity: evaluator,
        }),
      ),
      'generate_scene',
    );
    const response = await generate.execute('consistent', {
      stageId: 'stage-test',
      order: 2,
      title: 'Linked simulation',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
      simulationControls: [
        {
          name: 'flow',
          label: 'Set inspiratory flow',
          min: 40,
          max: 90,
          default: 60,
          unit: 'L/min',
          step: 5,
        },
      ],
      brief: 'Vary flow in the linked scenario.',
      continuity,
    } as never);
    expect(response).not.toMatchObject({ isError: true });
    expect(prompts[0]).toContain('AUTHORITATIVE SCENARIO CONTINUITY CONTRACT');
    expect(prompts[0]).toContain('pressure scooping is present at baseline');
    expect(prompts[0]).toContain('Authoritative Control Specification');
    expect(prompts[0]).toContain('"default": 60');
    expect(evaluator).toHaveBeenCalledWith(
      expect.objectContaining({
        contract: continuity,
        sceneBrief: 'Vary flow in the linked scenario.',
      }),
      expect.any(Function),
      expect.anything(),
    );
    expect(generateActions).toHaveBeenCalledOnce();
    expect(current.get()?.scenes).toHaveLength(2);
  });

  it('rejects generated widget config that disagrees with a typed control default', async () => {
    const current = state(document([slide('source', 1)]));
    const evaluator = vi.fn();
    const generateActions = vi.fn(async () => []);
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () =>
            continuityHtml({
              variables: [
                {
                  name: 'flow',
                  label: 'Set inspiratory flow',
                  min: 40,
                  max: 90,
                  default: 50,
                  unit: 'L/min',
                },
              ],
            }),
          ),
          generateActions,
          evaluateContinuity: evaluator,
        }),
      ),
      'generate_scene',
    );

    const response = await generate.execute('wrong-generated-default', {
      stageId: 'stage-test',
      order: 2,
      title: 'Linked simulation',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow' },
      simulationControls: [
        {
          name: 'flow',
          label: 'Set inspiratory flow',
          min: 40,
          max: 90,
          default: 60,
          unit: 'L/min',
          step: 5,
        },
      ],
      brief: 'Vary flow in the linked scenario.',
      continuity,
    } as never);

    expect(response).toMatchObject({
      isError: true,
      details: {
        error: 'continuity-deterministic-revise',
        violations: [expect.stringContaining('control flow default')],
      },
    });
    expect(evaluator).not.toHaveBeenCalled();
    expect(generateActions).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('rejects continuity when the declared source page is not persisted', async () => {
    const current = state(document([]));
    const aiCall = vi.fn(async () => continuityHtml());
    const generate = find(buildGenerationTools(deps(current.store, { aiCall })), 'generate_scene');
    const response = await generate.execute('missing-source', {
      stageId: 'stage-test',
      order: 2,
      title: 'Linked',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
      brief: 'Linked simulation.',
      continuity,
    } as never);
    expect(response).toMatchObject({
      isError: true,
      details: { error: 'continuity-source-missing' },
    });
    expect(aiCall).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(0);
  });

  it.each([
    ['missing metadata', continuityHtml({ continuity: undefined }), 'widget-config.continuity'],
    [
      'baseline mismatch',
      continuityHtml({
        continuity: {
          ...continuity,
          baseline: [{ name: 'flow', value: 50, unit: 'L/min' }],
          changingVariables: ['flow'],
        },
      }),
      'baseline flow',
    ],
    [
      'fixed variable control',
      continuityHtml({
        variables: [
          { name: 'flow', label: 'Flow', min: 40, max: 90, default: 60, unit: 'L/min' },
          { name: 'VT', label: 'VT', min: 300, max: 600, default: 450, unit: 'mL' },
        ],
        continuity: { ...continuity, changingVariables: ['flow', 'VT'] },
      }),
      'fixed variable VT is adjustable',
    ],
  ])(
    'fails deterministic continuity for %s before actions or persistence',
    async (_label, html, expected) => {
      const current = state(document([slide('source', 1)]));
      const evaluator = vi.fn();
      const generateActions = vi.fn(async () => []);
      const generate = find(
        buildGenerationTools(
          deps(current.store, {
            aiCall: vi.fn(async () => html),
            generateActions,
            evaluateContinuity: evaluator,
          }),
        ),
        'generate_scene',
      );
      const response = await generate.execute('bad', {
        stageId: 'stage-test',
        order: 2,
        title: 'Bad',
        type: 'interactive',
        widgetType: 'simulation',
        widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
        brief: 'Bad linked simulation.',
        continuity,
      } as never);
      expect(response).toMatchObject({
        isError: true,
        details: { error: 'continuity-deterministic-revise' },
      });
      expect((response.details as { violations: string[] }).violations.join('\n')).toContain(
        expected,
      );
      expect(evaluator).not.toHaveBeenCalled();
      expect(generateActions).not.toHaveBeenCalled();
      expect(current.get()?.scenes).toHaveLength(1);
    },
  );

  it('returns semantic revise details without persistence', async () => {
    const current = state(document([slide('source', 1)]));
    const generateActions = vi.fn(async () => []);
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () => continuityHtml()),
          generateActions,
          evaluateContinuity: vi.fn(async () => ({
            decision: 'revise' as const,
            violations: ['At baseline, the expected pressure scoop is absent.'],
          })),
        }),
      ),
      'generate_scene',
    );
    const response = await generate.execute('revise', {
      stageId: 'stage-test',
      order: 2,
      title: 'Contradiction',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
      brief: 'Contradictory linked simulation.',
      continuity,
    } as never);
    expect(response).toMatchObject({
      isError: true,
      details: {
        error: 'continuity-semantic-revise',
        violations: ['At baseline, the expected pressure scoop is absent.'],
      },
    });
    expect(generateActions).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('does not persist when the call is aborted during semantic evaluation', async () => {
    const current = state(document([slide('source', 1)]));
    const controller = new AbortController();
    const generateActions = vi.fn(async () => []);
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () => continuityHtml()),
          generateActions,
          evaluateContinuity: vi.fn(async () => {
            controller.abort();
            return { decision: 'pass' as const, violations: [] };
          }),
        }),
      ),
      'generate_scene',
    );
    await expect(
      generate.execute(
        'aborted',
        {
          stageId: 'stage-test',
          order: 2,
          title: 'Aborted',
          type: 'interactive',
          widgetType: 'simulation',
          widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
          brief: 'Linked simulation.',
          continuity,
        } as never,
        controller.signal,
      ),
    ).rejects.toThrow('aborted');
    expect(generateActions).not.toHaveBeenCalled();
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it.each([
    [
      'malformed',
      vi.fn(async () => {
        throw new Error('Invalid continuity evaluation result');
      }),
    ],
    [
      'provider error',
      vi.fn(async () => {
        throw new Error('provider unavailable');
      }),
    ],
  ])('fails closed when the semantic evaluator has a %s result', async (_label, evaluator) => {
    const current = state(document([slide('source', 1)]));
    const generate = find(
      buildGenerationTools(
        deps(current.store, {
          aiCall: vi.fn(async () => continuityHtml()),
          generateActions: vi.fn(async () => []),
          evaluateContinuity: evaluator,
        }),
      ),
      'generate_scene',
    );
    const response = await generate.execute('error', {
      stageId: 'stage-test',
      order: 2,
      title: 'Error',
      type: 'interactive',
      widgetType: 'simulation',
      widgetOutline: { concept: 'Flow', keyVariables: ['flow'] },
      brief: 'Linked simulation.',
      continuity,
    } as never);
    expect(response).toMatchObject({
      isError: true,
      details: { error: 'continuity-semantic-error' },
    });
    expect(current.get()?.scenes).toHaveLength(1);
  });

  it('detects slide media placeholders without returning page bodies', () => {
    const scene = slide('media', 1);
    (scene.content as Extract<Scene['content'], { type: 'slide' }>).canvas.elements = [
      { id: 'image-1', type: 'image', src: 'image:pending' },
      { id: 'video-1', type: 'video', src: '', mediaRef: 'video:pending' },
    ] as never;
    expect(collectUnresolvedMediaPlaceholders(scene)).toEqual([
      { elementId: 'image-1', type: 'image', placeholder: 'image:pending' },
      { elementId: 'video-1', type: 'video', placeholder: 'video:pending' },
    ]);
  });

  it('makes duplicate_scene idempotent for a replayed call id', async () => {
    const current = state(document([slide('source', 1)]));
    const duplicate = find(buildGenerationTools(deps(current.store)), 'duplicate_scene');
    const params = { stageId: 'stage-test', templateSceneId: 'source', targetOrder: 2 };
    await duplicate.execute('same-call', params as never);
    const replay = await duplicate.execute('same-call', params as never);
    expect(current.get()?.scenes).toHaveLength(2);
    expect(replay.details).toMatchObject({ replay: true });
  });

  it('renumbers scenes and outline entries together for reorder and delete', async () => {
    const a = slide('a', 1, 'A');
    a.outlineId = 'oa';
    const b = slide('b', 2, 'B');
    b.outlineId = 'ob';
    const c = slide('c', 3, 'C');
    c.outlineId = 'oc';
    const current = state(document([a, b, c]));
    const edit = find(buildDslCourseToolset(deps(current.store)), 'edit_deck');
    await edit.execute('reorder', {
      stageId: 'stage-test',
      op: 'reorder',
      orderedIds: ['c', 'a', 'b'],
    } as never);
    await edit.execute('delete', { stageId: 'stage-test', op: 'delete', sceneId: 'a' } as never);
    expect(current.get()?.scenes.map((scene) => [scene.id, scene.order])).toEqual([
      ['c', 1],
      ['b', 2],
    ]);
    expect(
      (current.get()?.outline as { outlines: Array<{ id: string; order: number }> }).outlines.map(
        (entry) => [entry.id, entry.order],
      ),
    ).toEqual([
      ['oc', 1],
      ['ob', 2],
    ]);
  });

  it('drops action types unknown to the shared DSL', () => {
    expect(
      filterKnownActions([
        { id: 'speech', type: 'speech', text: 'Known' },
        { id: 'future', type: 'future_action' } as never,
      ]),
    ).toEqual([{ id: 'speech', type: 'speech', text: 'Known' }]);
  });

  it('marks every new document writer sequential', () => {
    const tools = buildDslCourseToolset(deps(state(document([slide('a', 1)])).store));
    for (const name of [
      'generate_scene',
      'generate_actions',
      'duplicate_scene',
      'generate_tts',
      'edit_deck',
    ]) {
      expect(find(tools, name)).toMatchObject({ executionMode: 'sequential' });
    }
    for (const name of ['list_scenes', 'read_stage', 'grep_stage']) {
      expect(find(tools, name)).not.toHaveProperty('executionMode');
    }
  });

  it('fails closed through an owner-bound store for every new write tool', async () => {
    const foreign = state(null);
    const tools = buildDslCourseToolset(deps(foreign.store));
    const calls: Array<[string, Record<string, unknown>]> = [
      ['generate_scene', { stageId: 'foreign', order: 1, title: 'X', type: 'slide', brief: 'X' }],
      ['generate_actions', { stageId: 'foreign', order: 1 }],
      ['duplicate_scene', { stageId: 'foreign', templateOrder: 1, targetOrder: 2 }],
      ['generate_tts', { stageId: 'foreign', order: 1 }],
      ['edit_deck', { stageId: 'foreign', op: 'delete', order: 1 }],
    ];
    for (const [name, params] of calls) {
      const response = await find(tools, name).execute(`call-${name}`, params as never);
      expect(response).toMatchObject({ isError: true });
    }
    expect(foreign.get()).toBeNull();
  });
});
