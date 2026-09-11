import { describe, expect, it } from 'vitest';
import {
  ACTIVE_SCENE_TEXT_SELECTOR,
  classifyScene,
  isTerminalProgressLabel,
  parseCourseAuditArgs,
  renderCourseAuditMarkdown,
} from '@/scripts/course-audit';

describe('course audit runner helpers', () => {
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
});
