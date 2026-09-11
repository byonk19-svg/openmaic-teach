import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => {
  const running = new Map<string, Promise<unknown>>();
  const startOrResume = vi.fn((input: { stageId: string }) => {
    const existing = running.get(input.stageId);
    if (existing) return existing;
    const run = new Promise<void>(() => {});
    running.set(input.stageId, run);
    return run;
  });
  return {
    docs: new Map<string, unknown>(),
    saveDocument: vi.fn(),
    running,
    startOrResume,
    validateGenerationContext: vi.fn().mockResolvedValue(undefined),
    generate: vi.fn(),
  };
});

vi.mock('@/lib/server/agent-runtime/with-owner', () => ({
  withRequestOwnerId: async (
    _request: Request,
    handler: (ownerId: string, headers: Headers) => Promise<Response>,
  ) => handler('owner-1', new Headers()),
}));
vi.mock('@/lib/server/agent-runtime/owner-scoped-documents', () => ({
  getOwnerScopedDocumentStore: async () => ({
    loadDocument: async (stageId: string) => mocks.docs.get(stageId) ?? null,
    saveDocument: mocks.saveDocument,
  }),
}));
vi.mock('@/lib/server/stage-continuation-runner', () => ({
  createStageContinuationRunner: () => ({
    isRunning: (stageId: string) => mocks.running.has(stageId),
    startOrResume: mocks.startOrResume,
  }),
}));
vi.mock('@/lib/server/stage-scene-generator', () => ({
  createStageSceneGenerator: () => mocks.generate,
  validateStageSceneGenerationContext: mocks.validateGenerationContext,
}));

import { POST } from '@/app/api/stages/[id]/continue-generation/route';

const API_KEY = 'sk-route-test-secret';

function document(stageId: string, generationComplete = false) {
  const outlines = [{ id: 'outline-1', order: 1 }];
  return {
    stage: { id: stageId, name: 'Course' },
    scenes: generationComplete
      ? [{ id: 'scene-1', stageId, outlineId: 'outline-1', order: 1 }]
      : [],
    outline: {
      outlines,
      generationComplete,
      metadata: { apiKey: API_KEY },
    },
  };
}

function request(stageId: string) {
  return POST(
    new NextRequest(`http://localhost/api/stages/${stageId}/continue-generation`, {
      method: 'POST',
    }),
    {
      params: Promise.resolve({ id: stageId }),
    },
  );
}

beforeEach(() => {
  mocks.docs.clear();
  mocks.running.clear();
  mocks.saveDocument.mockReset();
  mocks.startOrResume.mockClear();
  mocks.startOrResume.mockImplementation((input: { stageId: string }) => {
    const existing = mocks.running.get(input.stageId);
    if (existing) return existing;
    const run = new Promise<void>(() => {});
    mocks.running.set(input.stageId, run);
    return run;
  });
  mocks.validateGenerationContext.mockReset();
  mocks.validateGenerationContext.mockResolvedValue(undefined);
  mocks.generate.mockReset();
});

describe('POST /api/stages/[stageId]/continue-generation', () => {
  it('starts an authorized incomplete stage exactly once', async () => {
    mocks.docs.set('stage-1', document('stage-1'));

    const response = await request('stage-1');

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ status: 'started' });
    expect(mocks.startOrResume).toHaveBeenCalledOnce();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('reports an already-running stage without duplicate provider work', async () => {
    mocks.docs.set('stage-1', document('stage-1'));
    mocks.running.set('stage-1', Promise.resolve());

    const response = await request('stage-1');

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ status: 'already_running' });
    expect(mocks.startOrResume).toHaveBeenCalledOnce();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('does not start a stage that is already complete', async () => {
    mocks.docs.set('stage-1', document('stage-1', true));

    const response = await request('stage-1');

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'already_complete' });
    expect(mocks.startOrResume).not.toHaveBeenCalled();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('rejects a server-owned stage with no required outline before model validation or runner work', async () => {
    mocks.docs.set('stage-1', {
      stage: { id: 'stage-1', name: 'Course' },
      scenes: [],
      outline: {
        outlines: [],
        producer: 'server-job',
        requirement: 'Generated course',
        generationComplete: true,
      },
    });

    const response = await request('stage-1');

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({ error: 'generation_outline_invalid' });
    expect(mocks.validateGenerationContext).not.toHaveBeenCalled();
    expect(mocks.startOrResume).not.toHaveBeenCalled();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('hides unavailable or unauthorized stages and starts no work', async () => {
    const response = await request('missing-stage');

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'not_found' });
    expect(mocks.startOrResume).not.toHaveBeenCalled();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('rejects missing provider or model context before continuation begins', async () => {
    mocks.docs.set('stage-1', document('stage-1'));
    mocks.validateGenerationContext.mockRejectedValue(new Error(`No model for ${API_KEY}`));

    const response = await request('stage-1');

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual({ error: 'generation_unavailable' });
    expect(mocks.startOrResume).not.toHaveBeenCalled();
    expect(mocks.generate).not.toHaveBeenCalled();
  });

  it('returns before a pending continuation and leaves it running', async () => {
    mocks.docs.set('stage-1', document('stage-1'));
    let resolveRun!: () => void;
    const run = new Promise<void>((resolve) => {
      resolveRun = resolve;
    });
    mocks.startOrResume.mockImplementationOnce((input: { stageId: string }) => {
      mocks.running.set(input.stageId, run);
      return run;
    });

    const response = await request('stage-1');

    expect(response.status).toBe(202);
    expect(mocks.running.get('stage-1')).toBe(run);
    resolveRun();
    await run;
  });

  it('contains a later runner rejection without exposing credentials or mutating the document', async () => {
    mocks.docs.set('stage-1', document('stage-1'));
    let rejectRun!: (error: Error) => void;
    const run = new Promise<void>((_resolve, reject) => {
      rejectRun = reject;
    });
    mocks.startOrResume.mockReturnValueOnce(run);
    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown) => unhandled.push(reason);
    process.on('unhandledRejection', onUnhandled);

    const response = await request('stage-1');
    const body = await response.text();
    rejectRun(new Error(`provider failed with ${API_KEY}`));
    await new Promise((resolve) => setTimeout(resolve, 0));
    process.off('unhandledRejection', onUnhandled);

    expect(response.status).toBe(202);
    expect(body).not.toContain(API_KEY);
    expect(unhandled).toEqual([]);
    expect(JSON.stringify(mocks.docs.get('stage-1'))).toContain(API_KEY);
    expect(mocks.saveDocument).not.toHaveBeenCalled();
  });

  it('starts different stages independently', async () => {
    mocks.docs.set('stage-1', document('stage-1'));
    mocks.docs.set('stage-2', document('stage-2'));

    const [first, second] = await Promise.all([request('stage-1'), request('stage-2')]);

    expect(first.status).toBe(202);
    expect(second.status).toBe(202);
    expect(mocks.startOrResume).toHaveBeenCalledTimes(2);
    expect(mocks.startOrResume.mock.calls.map(([input]) => input.stageId).sort()).toEqual([
      'stage-1',
      'stage-2',
    ]);
  });

  it('coalesces simultaneous starts at the runner boundary', async () => {
    mocks.docs.set('stage-1', document('stage-1'));

    const [first, second] = await Promise.all([request('stage-1'), request('stage-1')]);

    expect([first.status, second.status]).toEqual([202, 202]);
    await expect(first.json()).resolves.toEqual({ status: 'started' });
    await expect(second.json()).resolves.toEqual({ status: 'already_running' });
    expect(mocks.startOrResume).toHaveBeenCalledTimes(2);
    expect(mocks.running).toHaveLength(1);
    expect(mocks.generate).not.toHaveBeenCalled();
  });
});
