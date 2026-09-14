import { beforeEach, describe, expect, test, vi } from 'vitest';

const streamLLMMock = vi.hoisted(() => vi.fn());
const resolveModelFromRequestMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/ai/llm', () => ({ streamLLM: streamLLMMock }));
vi.mock('@/lib/server/resolve-model', () => ({
  resolveModelFromRequest: resolveModelFromRequestMock,
}));

function parseSseEvents(text: string) {
  return text
    .split('\n')
    .filter((line) => line.startsWith('data: '))
    .map((line) => JSON.parse(line.slice(6)));
}

async function readStreamBody(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let text = '';

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }

  return text;
}

describe('scene-outlines-stream route reasoning-gate validation', () => {
  beforeEach(() => {
    vi.resetModules();
    streamLLMMock.mockReset();
    resolveModelFromRequestMock.mockReset();
    resolveModelFromRequestMock.mockResolvedValue({
      model: { provider: 'test.chat', modelId: 'test-model' },
      modelInfo: { outputWindow: 4096, capabilities: {} },
      modelString: 'test:test-model',
      thinkingConfig: undefined,
    });
  });

  test('rejects malformed structured gate metadata before emitting an outline', async () => {
    const malformedOutline = {
      id: 'scene_1',
      type: 'quiz',
      title: 'Intrinsic PEEP validation',
      description: 'Assess whether a static intrinsic PEEP measurement is valid.',
      keyPoints: ['Check patient effort', 'Check plateau stability'],
      order: 1,
      quizConfig: { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] },
      reasoningGate: {
        type: 'typed',
        prompt: 'Explain whether the measurement is valid.',
        passThreshold: 0.8,
        requiredReasoningElements: ['active effort invalidates the result'],
      },
    };
    streamLLMMock.mockImplementation(() => ({
      textStream: (async function* () {
        yield JSON.stringify({
          languageDirective: 'Teach in English.',
          courseTitle: 'Intrinsic PEEP',
          outlines: [malformedOutline],
        });
      })(),
    }));

    const { POST } = await import('@/app/api/generate/scene-outlines-stream/route');
    const response = await POST({
      json: async () => ({
        requirements: { requirement: 'Create a structured reasoning gate.' },
        pdfText: '',
        pdfImages: [],
        imageMapping: {},
        researchContext: '',
      }),
      headers: { get: () => null },
    } as unknown as Parameters<typeof POST>[0]);

    const events = parseSseEvents(await readStreamBody(response));
    expect(events.find((event) => event.type === 'outline')).toBeUndefined();
    expect(events.find((event) => event.type === 'done')).toBeUndefined();
    expect(events.find((event) => event.type === 'error')).toMatchObject({
      error: expect.stringContaining('reasoningGate must be exactly'),
    });
  }, 20_000);

  test('does not complete a partial outline set after a later malformed gate', async () => {
    streamLLMMock.mockImplementation(() => ({
      textStream: (async function* () {
        yield JSON.stringify({
          languageDirective: 'Teach in English.',
          courseTitle: 'Intrinsic PEEP',
          outlines: [
            {
              id: 'scene_1',
              type: 'slide',
              title: 'Measurement prerequisites',
              description: 'Establish valid hold conditions.',
              keyPoints: ['Passive exhalation', 'Stable pressure'],
              order: 1,
            },
            {
              id: 'scene_2',
              type: 'quiz',
              title: 'Intrinsic PEEP validation',
              description: 'Assess whether a static measurement is valid.',
              keyPoints: ['Check patient effort', 'Check plateau stability'],
              order: 2,
              quizConfig: { questionCount: 1, difficulty: 'hard', questionTypes: ['text'] },
              reasoningGate: {
                type: 'typed',
                prompt: 'Explain whether the measurement is valid.',
                passThreshold: 0.8,
                requiredReasoningElements: ['active effort invalidates the result'],
              },
            },
          ],
        });
      })(),
    }));

    const { POST } = await import('@/app/api/generate/scene-outlines-stream/route');
    const response = await POST({
      json: async () => ({
        requirements: { requirement: 'Create a structured reasoning gate.' },
        pdfText: '',
        pdfImages: [],
        imageMapping: {},
        researchContext: '',
      }),
      headers: { get: () => null },
    } as unknown as Parameters<typeof POST>[0]);

    const events = parseSseEvents(await readStreamBody(response));
    expect(events.find((event) => event.type === 'outline')).toMatchObject({
      data: { id: 'scene_1' },
    });
    expect(events.find((event) => event.type === 'done')).toBeUndefined();
    expect(events.find((event) => event.type === 'error')).toMatchObject({
      error: expect.stringContaining('reasoningGate must be exactly'),
    });
  }, 20_000);
});
