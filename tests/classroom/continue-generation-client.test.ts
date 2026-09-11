import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getCurrentModelConfig: vi.fn(() => ({
    modelString: 'openai:gpt-test',
    apiKey: 'ephemeral-key',
    baseUrl: 'https://provider.example',
    providerType: 'openai',
    thinkingConfig: { effort: 'low' },
  })),
}));

vi.mock('@/lib/utils/model-config', () => ({ getCurrentModelConfig: mocks.getCurrentModelConfig }));

import { requestStageContinuation } from '@/lib/classroom/continue-generation-client';

describe('server continuation client', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sends the authorized ephemeral model context without persisting it', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ status: 'started' }), { status: 202 }));
    vi.stubGlobal('fetch', fetchMock);

    await requestStageContinuation('stage one');

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/stages/stage%20one/continue-generation',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-model': 'openai:gpt-test',
          'x-api-key': 'ephemeral-key',
        }),
      }),
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      thinkingConfig: { effort: 'low' },
    });
  });

  it('surfaces a rejected continuation request without provider details', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 422 })));
    await expect(requestStageContinuation('stage-1')).rejects.toThrow('HTTP 422');
  });
});
