import { NextResponse } from 'next/server';
import { isAgentRuntimeConfigured } from '@/lib/config/feature-flags';
import { courseAuditRuns, summarizeCourseAuditReport } from '@/lib/server/course-audit-runs';
import { resolveStageAccess } from '@/lib/server/stage-access';

export const runtime = 'nodejs';
type Params = { params: Promise<{ stageId: string }> };

async function withReadableStage(params: Params, work: (stageId: string) => Promise<Response>) {
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  const { stageId } = await params.params;
  if (!(await resolveStageAccess(stageId))) return new Response('Not found', { status: 404 });
  return work(stageId);
}

export async function POST(_req: Request, params: Params) {
  return withReadableStage(params, async (stageId) => {
    void courseAuditRuns.start('workbench', stageId);
    return NextResponse.json({ status: 'running' }, { status: 202 });
  });
}

export async function GET(_req: Request, params: Params) {
  return withReadableStage(params, async (stageId) => {
    const run = courseAuditRuns.get('workbench', stageId);
    return NextResponse.json(
      run?.status === 'completed'
        ? { ...run, summary: summarizeCourseAuditReport(run.report) }
        : (run ?? { status: 'idle' }),
    );
  });
}
