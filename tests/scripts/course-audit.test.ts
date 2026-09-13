import { describe, expect, it, vi } from 'vitest';
import {
  ACTIVE_SCENE_TEXT_SELECTOR,
  classifyScene,
  inspectReasoningGate,
  isTerminalProgressLabel,
  openSidebar,
  parseCourseAuditArgs,
  renderCourseAuditMarkdown,
  waitForReasoningGateReady,
} from '@/scripts/course-audit';

describe('course audit runner helpers', () => {
  it('opens the operable sidebar toggle even when its visibility probe is false', async () => {
    const click = vi.fn().mockResolvedValue(undefined);
    const press = vi.fn().mockResolvedValue(undefined);
    const waitFor = vi.fn().mockResolvedValue(undefined);
    const toggleWaitFor = vi.fn().mockResolvedValue(undefined);
    const firstScene = {
      isVisible: vi.fn().mockResolvedValue(false),
      waitFor,
    };
    const toggle = {
      isVisible: vi.fn().mockResolvedValue(false),
      waitFor: toggleWaitFor,
      click,
    };
    const page = {
      locator: vi.fn(() => ({ first: () => firstScene })),
      getByRole: vi.fn(() => toggle),
      keyboard: { press },
    };

    await openSidebar(page as never, 30_000);

    expect(click).toHaveBeenCalledWith({ timeout: 5_000 });
    expect(press).not.toHaveBeenCalled();
    expect(toggleWaitFor).toHaveBeenCalledWith({ state: 'attached', timeout: 30_000 });
    expect(waitFor).toHaveBeenCalledWith({ state: 'visible', timeout: 5_000 });
  });

  it('extracts learner text only from the active scene surface', () => {
    expect(ACTIVE_SCENE_TEXT_SELECTOR).toBe('[data-testid="active-scene-content"]');
  });
  it('uses a deterministic, stage-scoped audit identity and output directory', () => {
    expect(parseCourseAuditArgs(['--stage', 'stage-1'])).toMatchObject({
      stageId: 'stage-1',
      baseURL: 'http://127.0.0.1:3001',
      learnerKey: 'audit:stage-1',
      outputDir: 'output/playwright/course-audits/stage-1',
    });
  });

  it('rejects a missing stage and invalid timeout', () => {
    expect(() => parseCourseAuditArgs([])).toThrow(/--stage/);
    expect(() => parseCourseAuditArgs(['--stage', 'stage-1', '--timeout-ms', '999'])).toThrow(
      /timeout/i,
    );
  });

  it('does not count an explicit Course complete item as instructional', () => {
    expect(isTerminalProgressLabel('Course complete')).toBe(true);
    expect(isTerminalProgressLabel('  COURSE COMPLETE  ')).toBe(true);
    expect(isTerminalProgressLabel('Synthesize the Bedside Plan')).toBe(false);
  });

  it('classifies gate and iframe scenes without treating unknown iframe content as passing', () => {
    expect(classifyScene({ hasReasoningGate: true, iframeCount: 0 })).toBe('reasoning-gate');
    expect(classifyScene({ hasReasoningGate: false, iframeCount: 0 })).toBe('static');
    expect(classifyScene({ hasReasoningGate: false, iframeCount: 1, hasRangeControl: true })).toBe(
      'interactive-simulation',
    );
    expect(classifyScene({ hasReasoningGate: false, iframeCount: 1, hasRangeControl: false })).toBe(
      'unknown-interactive',
    );
  });

  it('renders a report with unverified checks visible', () => {
    const markdown = renderCourseAuditMarkdown({
      stageId: 'stage-1',
      startedAt: '2026-09-09T00:00:00.000Z',
      completedAt: '2026-09-09T00:00:01.000Z',
      discovery: { visibleSceneItems: 6, terminalProgressPositionDetected: true },
      scenes: [
        {
          order: 1,
          title: 'Simulation',
          type: 'unknown-interactive',
          checks: [{ name: 'iframe control', status: 'UNVERIFIED', detail: 'No range control' }],
          diagnostics: [],
          screenshot: 'screenshots/scene-01.png',
        },
      ],
      diagnostics: [],
    });
    expect(markdown).toContain('UNVERIFIED');
    expect(markdown).toContain('Simulation');
    expect(markdown).toContain('Browser/runtime QA only');
    expect(markdown).toContain('Terminal Course complete position: detected and excluded');
  });

  it('waits for the activated gate and delayed short-answer control before passing', async () => {
    const calls: string[] = [];
    const ready = await waitForReasoningGateReady(
      {
        waitForActiveQuiz: async (timeoutMs) => {
          calls.push(`active:${timeoutMs}`);
        },
        waitForAnswerVisible: async (timeoutMs) => {
          calls.push(`visible:${timeoutMs}`);
        },
        waitForAnswerActionable: async (timeoutMs) => {
          calls.push(`actionable:${timeoutMs}`);
        },
      },
      30_000,
    );

    expect(ready).toMatchObject({ ready: true });
    expect(calls).toEqual(['active:10000', 'visible:10000', 'actionable:10000']);
  });

  it('passes an already-ready short-answer control without an arbitrary delay', async () => {
    const calls: string[] = [];
    const ready = await waitForReasoningGateReady(
      {
        waitForActiveQuiz: async () => {
          calls.push('active');
        },
        waitForAnswerVisible: async () => {
          calls.push('visible');
        },
        waitForAnswerActionable: async () => {
          calls.push('actionable');
        },
      },
      30_000,
    );

    expect(ready.ready).toBe(true);
    expect(calls).toEqual(['active', 'visible', 'actionable']);
  });

  it('fails only after the bounded readiness wait with useful diagnostics', async () => {
    const calls: string[] = [];
    const ready = await waitForReasoningGateReady(
      {
        waitForActiveQuiz: async () => {
          calls.push('active');
        },
        waitForAnswerVisible: async () => {
          calls.push('visible');
          throw new Error('Timeout 10000ms exceeded while waiting for textarea');
        },
        waitForAnswerActionable: async () => {
          calls.push('actionable');
        },
      },
      30_000,
    );

    expect(ready).toMatchObject({ ready: false });
    expect(ready.detail).toContain('within 10000ms');
    expect(ready.detail).toContain('textarea');
    expect(calls).toEqual(['active', 'visible']);
  });

  it('keeps the explanation locked and does not submit or grade while checking a ready gate', async () => {
    const calls: string[] = [];
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const start = {
      isVisible: async () => true,
      click: async () => calls.push('start'),
    };
    const activeQuiz = { waitFor: async () => calls.push('active') };
    const answer = {
      waitFor: async () => calls.push('visible'),
      isEditable: async () => {
        calls.push('actionable');
        return true;
      },
    };
    const hidden = { isVisible: async () => false };
    const page = {
      getByRole: (_role: string, options: { name: string }) =>
        options.name === 'Start Quiz' ? start : activeQuiz,
      getByPlaceholder: () => answer,
      getByText: () => hidden,
    };
    const checks: Array<{ name: string; status: string; detail: string }> = [];

    await inspectReasoningGate(page as never, checks as never, 30_000);

    expect(calls).toEqual(['start', 'active', 'visible', 'actionable']);
    expect(checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'learner answer control', status: 'PASS' }),
        expect.objectContaining({ name: 'explanation gate', status: 'PASS' }),
      ]),
    );
    expect(fetch).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
