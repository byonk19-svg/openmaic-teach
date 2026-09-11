import { runCourseAudit, type CourseAuditReport } from '@/scripts/course-audit';

export type CourseAuditRun =
  | { status: 'running'; startedAt: string }
  | { status: 'completed'; startedAt: string; completedAt: string; report: CourseAuditReport }
  | { status: 'failed'; startedAt: string; completedAt: string; error: string };

export interface CourseAuditSummary {
  scenesDiscovered: number;
  scenesReached: number;
  PASS: number;
  FAIL: number;
  WARNING: number;
  UNVERIFIED: number;
}

export function summarizeCourseAuditReport(report: CourseAuditReport): CourseAuditSummary {
  const summary: CourseAuditSummary = {
    scenesDiscovered: report.discovery.visibleSceneItems,
    scenesReached: report.scenes.length,
    PASS: 0,
    FAIL: 0,
    WARNING: 0,
    UNVERIFIED: 0,
  };
  for (const scene of report.scenes) for (const check of scene.checks) summary[check.status] += 1;
  return summary;
}

export function createCourseAuditRunRegistry(
  run = (stageId: string) =>
    runCourseAudit({
      baseURL: process.env.OPENMAIC_BROWSER_AUDIT_BASE_URL ?? 'http://127.0.0.1:3001',
      stageId,
      learnerKey: `audit:${stageId}`,
      outputDir: `output/playwright/course-audits/${stageId}`,
      timeoutMs: 30_000,
      headless: true,
    }),
) {
  const runs = new Map<string, CourseAuditRun>();
  const key = (ownerId: string, stageId: string) => `${ownerId}:${stageId}`;
  return {
    async start(ownerId: string, stageId: string): Promise<CourseAuditRun> {
      const id = key(ownerId, stageId);
      const existing = runs.get(id);
      if (existing?.status === 'running') return existing;
      const startedAt = new Date().toISOString();
      runs.set(id, { status: 'running', startedAt });
      try {
        const report = await run(stageId);
        const completed: CourseAuditRun = {
          status: 'completed',
          startedAt,
          completedAt: new Date().toISOString(),
          report,
        };
        runs.set(id, completed);
        return completed;
      } catch (error) {
        const failed: CourseAuditRun = {
          status: 'failed',
          startedAt,
          completedAt: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
        };
        runs.set(id, failed);
        return failed;
      }
    },
    get(ownerId: string, stageId: string): CourseAuditRun | undefined {
      return runs.get(key(ownerId, stageId));
    },
  };
}

export const courseAuditRuns = createCourseAuditRunRegistry();
