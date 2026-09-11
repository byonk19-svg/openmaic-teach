// @vitest-environment jsdom

import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { BrowserQaControl } from '@/components/workbench/BrowserQaControl';

let root: Root | null = null;
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

async function mount(response: Record<string, unknown>): Promise<HTMLDivElement> {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, json: async () => response })),
  );
  const host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  await act(async () => root?.render(createElement(BrowserQaControl, { stageId: 'stage-1' })));
  await act(async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 0));
  });
  return host;
}

afterEach(async () => {
  if (root) await act(async () => root?.unmount());
  root = null;
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('BrowserQaControl generation readiness', () => {
  it('disables learner QA and explains that generation is incomplete', async () => {
    const host = await mount({ status: 'idle', qaReady: false });

    const button = host.querySelector<HTMLButtonElement>(
      '[data-testid="workbench-run-learner-qa"]',
    );
    expect(button?.disabled).toBe(true);
    expect(host.textContent).toContain('Generation must finish before learner QA can run.');
  });

  it('keeps learner QA available once persisted generation is complete', async () => {
    const host = await mount({ status: 'idle', qaReady: true });

    const button = host.querySelector<HTMLButtonElement>(
      '[data-testid="workbench-run-learner-qa"]',
    );
    expect(button?.disabled).toBe(false);
  });
});
