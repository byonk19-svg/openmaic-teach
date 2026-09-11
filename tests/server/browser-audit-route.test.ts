import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  runtimeConfigured: true,
  access: { stageId: 'stage-1' } as { stageId: string } | null,
  document: { outline: { generationComplete: false } } as Record<string, unknown> | null,
  loadDocument: vi.fn(),
  start: vi.fn(),
  get: vi.fn(),
}));

vi.mock('@/lib/config/feature-flags', () => ({
  isAgentRuntimeConfigured: () => mocks.runtimeConfigured,
}));
vi.mock('@/lib/server/stage-access', () => ({
  resolveStageAccess: async () => mocks.access,
}));
vi.mock('@/lib/server/agent-runtime/with-owner', () => ({
  withRequestOwnerId: async (
    _request: Request,
    handler: (ownerId: string, headers: Headers) => Promise<Response>,
  ) => handler('owner-1', new Headers()),
}));
vi.mock('@/lib/server/agent-runtime/owner-scoped-documents', () => ({
  getOwnerScopedDocumentStore: async () => ({ loadDocument: mocks.loadDocument }),
}));
vi.mock('@/lib/server/course-audit-runs', () => ({
  courseAuditRuns: { start: mocks.start, get: mocks.get },
  summarizeCourseAuditReport: vi.fn(),
}));

import { GET, POST } from '@/app/api/browser-audit/[stageId]/route';

const params = (stageId = 'stage-1') => ({ params: Promise.resolve({ stageId }) });
const request = (method: 'GET' | 'POST') =>
  new Request('http://localhost/api/browser-audit/stage-1', { method });

beforeEach(() => {
  mocks.runtimeConfigured = true;
  mocks.access = { stageId: 'stage-1' };
  mocks.document = { outline: { generationComplete: false } };
  mocks.loadDocument.mockReset();
  mocks.loadDocument.mockImplementation(async () => mocks.document);
  mocks.start.mockReset();
  mocks.get.mockReset();
});

describe('browser audit generation gate', () => {
  it('reports incomplete persisted generation as unavailable and starts no runner', async () => {
    const response = await POST(request('POST'), params());

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({ error: 'generation_incomplete' });
    expect(mocks.start).not.toHaveBeenCalled();
  });

  it('keeps a completed stage QA-ready and starts the existing runner', async () => {
    mocks.document = { outline: { generationComplete: true } };

    const response = await POST(request('POST'), params());

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ status: 'running' });
    expect(mocks.start).toHaveBeenCalledWith('workbench', 'stage-1');
  });

  it('uses the persisted outline rather than accessible metadata or learner progress', async () => {
    mocks.document = {
      outline: { generationComplete: false },
      scenes: [{ id: 'scene-1' }],
      progress: { complete: true },
    };
    mocks.get.mockReturnValue({ status: 'completed', report: { scenes: [] } });

    const response = await GET(request('GET'), params());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'idle', qaReady: false });
    expect(mocks.get).not.toHaveBeenCalled();
  });

  it('preserves unavailable-stage behavior', async () => {
    mocks.access = null;

    const response = await POST(request('POST'), params());

    expect(response.status).toBe(404);
    expect(mocks.start).not.toHaveBeenCalled();
  });
});
