import { describe, expect, it, vi } from 'vitest';
import type { AICallFn } from '@openmaic/generation';
import {
  PBLGenerationError,
  extractWidgetConfig,
  generateSceneActions,
  generateSceneContent,
} from '@openmaic/generation';
import {
  pblOutline,
  quizOutline,
  slideOutline,
  validPBLResponse,
  widgetOutline,
} from './scene-fixtures.js';

describe('scene generation primitives', () => {
  it('generates slide content through the injected AI call', async () => {
    const aiCall: AICallFn = vi.fn(async () =>
      JSON.stringify({
        elements: [
          {
            type: 'text',
            left: 80,
            top: 60,
            width: 840,
            height: 100,
            content: 'Dependency injection',
          },
        ],
        background: { type: 'solid', color: '#ffffff' },
      }),
    );

    const content = await generateSceneContent(slideOutline(), aiCall);
    expect(content).toMatchObject({
      elements: [expect.objectContaining({ type: 'text', content: 'Dependency injection' })],
      background: { type: 'solid', color: '#ffffff' },
    });
    expect(aiCall).toHaveBeenCalledTimes(1);
  });

  it('generates quiz content through the json-output-rules prompt path', async () => {
    let system = '';
    const aiCall: AICallFn = async (systemPrompt) => {
      system = systemPrompt;
      return JSON.stringify([
        {
          type: 'single',
          question: 'Who owns model routing?',
          options: ['The caller', 'The package'],
          correctAnswer: 'A',
        },
      ]);
    };

    const content = await generateSceneContent(quizOutline(), aiCall);
    expect(system).toContain('Output Format Requirements (Must Follow Strictly)');
    expect(content).toMatchObject({
      questions: [
        expect.objectContaining({
          type: 'single',
          options: [
            { value: 'A', label: 'The caller' },
            { value: 'B', label: 'The package' },
          ],
          answer: ['A'],
        }),
      ],
    });
  });

  it('passes an authoritative reasoning gate into a single-short-answer quiz prompt', async () => {
    let userPrompt = '';
    const outline = quizOutline();
    outline.quizConfig = { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] };
    outline.reasoningGate = {
      rubric: 'Require pattern, mechanism, and one specific intervention with a target.',
      passThreshold: 0.8,
    };

    await generateSceneContent(outline, async (_system, user) => {
      userPrompt = user;
      return JSON.stringify([
        {
          id: 'q1',
          type: 'short_answer',
          question: 'Interpret the waveform.',
          analysis: 'Reference analysis.',
          points: 20,
        },
      ]);
    });

    expect(userPrompt).toContain('Question Count: 1');
    expect(userPrompt).toContain('Question Types: text');
    expect(userPrompt).toContain('Authoritative Reasoning Gate');
    expect(userPrompt).toContain(JSON.stringify(outline.reasoningGate, null, 2));
    expect(userPrompt).toContain('exactly one `short_answer` question');
    expect(userPrompt).toContain('Do not add other questions, options, an answer key, or a `reasoningGate` field');
  });

  it('runs one widget kind end-to-end through config extraction and actions', async () => {
    let calls = 0;
    const aiCall: AICallFn = async () => {
      calls += 1;
      if (calls === 1) {
        return '<!DOCTYPE html><html><head></head><body><input id="energy" type="range"><script type="application/json" id="widget-config">{"variables":["energy"]}</script></body></html>';
      }
      return JSON.stringify([
        { type: 'action', name: 'widget_highlight', params: { target: '#energy' } },
        { type: 'action', name: 'widget_setState', params: { state: { energy: 75 } } },
      ]);
    };

    const outline = widgetOutline();
    const content = await generateSceneContent(outline, aiCall);
    expect(content).toMatchObject({
      widgetType: 'simulation',
      widgetConfig: { type: 'simulation', variables: ['energy'] },
    });
    if (!content || !('html' in content)) throw new Error('expected interactive content');
    expect(extractWidgetConfig(content.html, 'simulation')).toEqual({
      type: 'simulation',
      variables: ['energy'],
    });
    const actions = await generateSceneActions(outline, content, aiCall);
    expect(actions.map((action) => action.type)).toEqual(['widget_highlight', 'widget_setState']);
  });

  it('passes typed simulation controls to the model as authoritative JSON', async () => {
    let userPrompt = '';
    const outline = widgetOutline();
    outline.widgetOutline = {
      ...outline.widgetOutline,
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
    };

    await generateSceneContent(outline, async (_system, user) => {
      userPrompt = user;
      return '<!DOCTYPE html><html><body><script type="application/json" id="widget-config">{"type":"simulation","variables":[]}</script></body></html>';
    });

    expect(userPrompt).toContain('Authoritative Control Specification');
    expect(userPrompt).toContain(
      JSON.stringify(
        [
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
        null,
        2,
      ),
    );
    expect(userPrompt).toContain('numeric defaults exactly');
    expect(userPrompt).toContain('actual initial and reset state');
  });

  it('keeps the legacy name-only simulation prompt when typed controls are absent', async () => {
    let userPrompt = '';
    await generateSceneContent(widgetOutline(), async (_system, user) => {
      userPrompt = user;
      return '<!DOCTYPE html><html><body><script type="application/json" id="widget-config">{"type":"simulation","variables":[]}</script></body></html>';
    });

    expect(userPrompt).toContain('## Variables to Expose\n\nenergy');
    expect(userPrompt).not.toContain('Authoritative Control Specification');
  });

  it('generates PBL content with the re-seated single-call planner', async () => {
    const content = await generateSceneContent(pblOutline(), async () => validPBLResponse(), {
      targetLanguage: 'en-US',
      languageDirective: 'Reply in English.',
    });
    expect(content).toMatchObject({
      projectV2: {
        title: 'CSV Data Analyzer project',
        status: 'active',
        uiPhase: 'hero',
      },
    });
  });

  it('fails loudly when PBL single-call planning fails and no fallback exists', async () => {
    await expect(
      generateSceneContent(pblOutline(), async () => {
        throw new Error('model unavailable');
      }),
    ).rejects.toBeInstanceOf(PBLGenerationError);
  });

  it('invokes the injected PBL loop fallback after a single-call failure', async () => {
    const fallback = vi.fn(async () => ({
      uiPhase: 'hero' as const,
      title: 'Recovered project',
      description: 'Recovered by the host loop planner.',
      tags: [],
      language: 'en-US',
      proficiency: 'beginner' as const,
      status: 'active' as const,
      roles: [],
      milestones: [],
      submissions: [],
      evaluations: [],
      threads: [],
      engagementEvents: [],
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    }));

    const content = await generateSceneContent(pblOutline(), async () => '{}', {
      pblLoopFallback: fallback,
    });
    expect(fallback).toHaveBeenCalledTimes(1);
    expect(content).toMatchObject({ projectV2: { title: 'Recovered project' } });
  });

  it('skips the PBL loop fallback after a single-call abort', async () => {
    const fallback = vi.fn();

    await expect(
      generateSceneContent(
        pblOutline(),
        async () => {
          throw new DOMException('The operation was aborted.', 'AbortError');
        },
        { pblLoopFallback: fallback },
      ),
    ).rejects.toMatchObject({
      name: 'PBLGenerationError',
      message: expect.stringContaining('after all planner attempts'),
      cause: expect.objectContaining({ name: 'AbortError' }),
    });
    expect(fallback).not.toHaveBeenCalled();
  });

  it('skips the PBL loop fallback after an error-shaped single-call abort', async () => {
    const fallback = vi.fn();

    await expect(
      generateSceneContent(
        pblOutline(),
        async () => {
          throw Object.assign(new Error('Aborted'), { name: 'AbortError' });
        },
        { pblLoopFallback: fallback },
      ),
    ).rejects.toMatchObject({
      name: 'PBLGenerationError',
      message: expect.stringContaining('after all planner attempts'),
      cause: expect.objectContaining({ name: 'AbortError', message: 'Aborted' }),
    });
    expect(fallback).not.toHaveBeenCalled();
  });

  it('skips the PBL loop fallback after a status-bearing provider failure', async () => {
    const fallback = vi.fn();

    await expect(
      generateSceneContent(
        pblOutline(),
        async () => {
          throw Object.assign(new Error('rate limited'), { status: 429 });
        },
        { pblLoopFallback: fallback },
      ),
    ).rejects.toMatchObject({
      name: 'PBLGenerationError',
      message: expect.stringContaining('after all planner attempts'),
      statusCode: 429,
      cause: expect.objectContaining({ message: 'rate limited', status: 429 }),
    });
    expect(fallback).not.toHaveBeenCalled();
  });
});
