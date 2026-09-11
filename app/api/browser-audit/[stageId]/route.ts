import { NextResponse } from 'next/server';
import { isAgentRuntimeConfigured } from '@/lib/config/feature-flags';
import { courseAuditRuns, summarizeCourseAuditReport } from '@/lib/server/course-audit-runs';
import { isGenerationComplete } from '@/lib/server/stage-generation-state';
import { resolveStageAccess } from '@/lib/server/stage-access';
import { withRequestOwnerId } from '@/lib/server/agent-runtime/with-owner';
import { getOwnerScopedDocumentStore } from '@/lib/server/agent-runtime/owner-scoped-documents';

export const runtime = 'nodejs';
type Params = { params: Promise<{ stageId: string }> };

async function withReadableStage(
  req: Request,
  params: Params,
  work: (input: {
    stageId: string;
    generationComplete: boolean;
    headers: Headers;
  }) => Promise<Response>,
) {
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  const { stageId } = await params.params;
  if (!(await resolveStageAccess(stageId))) return new Response('Not found', { status: 404 });
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const store = await getOwnerScopedDocumentStore(ownerId);
    const document = await store.loadDocument(stageId);
    if (!document) return NextResponse.json({ error: 'not_found' }, { status: 404, headers });
    const generationDocument = document as {
      scenes: Array<{ outlineId?: string; order: number }>;
      outline?: {
        outlines?: Array<{ id: string; order: number }>;
        generationComplete?: boolean;
        producer?: 'client' | 'server-job';
        requirement?: string;
        generationIntent?: 'instructional' | 'zero-scene';
      };
    };
    return work({
      stageId,
      generationComplete: isGenerationComplete(generationDocument),
      headers,
    });
  });
}

export async function POST(req: Request, params: Params) {
  return withReadableStage(req, params, async ({ stageId, generationComplete, headers }) => {
    if (!generationComplete)
      return NextResponse.json({ error: 'generation_incomplete' }, { status: 409, headers });
    void courseAuditRuns.start('workbench', stageId);
    return NextResponse.json({ status: 'running' }, { status: 202, headers });
  });
}

export async function GET(req: Request, params: Params) {
  return withReadableStage(req, params, async ({ stageId, generationComplete, headers }) => {
    if (!generationComplete)
      return NextResponse.json({ status: 'idle', qaReady: false }, { status: 200, headers });
    const run = courseAuditRuns.get('workbench', stageId);
    return NextResponse.json(
      run?.status === 'completed'
        ? { ...run, qaReady: true, summary: summarizeCourseAuditReport(run.report) }
        : { ...(run ?? { status: 'idle' }), qaReady: true },
      { headers },
    );
  });
}
