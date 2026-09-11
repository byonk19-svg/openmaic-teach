import { describe, expect, it, vi } from 'vitest';
import type { CourseAuditReport } from '@/scripts/course-audit';
import {
  createCourseAuditRunRegistry,
  summarizeCourseAuditReport,
} from '@/lib/server/course-audit-runs';

const report: CourseAuditReport = {
  stageId: 'stage-1',
  startedAt: 'a',
  completedAt: 'b',
  discovery: { visibleSceneItems: 2, terminalProgressPositionDetected: true },
  diagnostics: [],
  scenes: [
    {
      order: 1,
      title: 'One',
      type: 'static',
      screenshot: 'screenshots/scene-01.png',
      diagnostics: [],
      checks: [{ name: 'render', status: 'PASS', detail: 'ok' }],
    },
    {
      order: 2,
      title: 'Two',
      type: 'reasoning-gate',
      screenshot: 'screenshots/scene-02.png',
      diagnostics: [],
      checks: [{ name: 'gate', status: 'WARNING', detail: 'reviewed' }],
    },
  ],
};

describe('course audit run registry', () => {
  it('summarizes existing runner reports without interpreting clinical content', () => {
    expect(summarizeCourseAuditReport(report)).toEqual({
      scenesDiscovered: 2,
      scenesReached: 2,
      PASS: 1,
      FAIL: 0,
      WARNING: 1,
      UNVERIFIED: 0,
    });
  });

  it('runs one isolated audit per owner-stage and exposes the completed report', async () => {
    const run = vi.fn().mockResolvedValue(report);
    const registry = createCourseAuditRunRegistry(run);
    await Promise.all([registry.start('owner', 'stage-1'), registry.start('owner', 'stage-1')]);
    expect(run).toHaveBeenCalledOnce();
    expect(registry.get('owner', 'stage-1')).toMatchObject({ status: 'completed', report });
  });
});
