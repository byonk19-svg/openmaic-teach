import { NextResponse, type NextRequest } from 'next/server';
import { withRequestOwnerId } from '@/lib/server/agent-runtime/with-owner';
import { getOwnerScopedDocumentStore } from '@/lib/server/agent-runtime/owner-scoped-documents';
import { createStageContinuationRunner } from '@/lib/server/stage-continuation-runner';
import { resolveModel, resolveModelFromRequest } from '@/lib/server/resolve-model';
import {
  createStageSceneGenerator,
  validateStageSceneGenerationContext,
} from '@/lib/server/stage-scene-generator';
import type { NextSceneStore, StageDocument } from '@/lib/server/stage-next-scene';
import { inspectStageGeneration } from '@/lib/server/stage-generation-state';

export const runtime = 'nodejs';
const runner = createStageContinuationRunner();

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withRequestOwnerId(req, async (ownerId, headers) => {
    const { id: stageId } = await params;
    const store = await getOwnerScopedDocumentStore(ownerId);
    const document = await store.loadDocument(stageId);
    if (!document) return NextResponse.json({ error: 'not_found' }, { status: 404, headers });
    const stageDocument = document as unknown as StageDocument;
    const generation = inspectStageGeneration(stageDocument);
    if (generation.status === 'invalid_outline')
      return NextResponse.json({ error: 'generation_outline_invalid' }, { status: 409, headers });
    if (generation.status === 'complete')
      return NextResponse.json({ status: 'already_complete' }, { status: 200, headers });
    const body = await req.json().catch(() => undefined);
    const resolveContinuationModel: typeof resolveModel = (params) =>
      resolveModelFromRequest(req, body, params.stage);
    if (!runner.isRunning(stageId)) {
      try {
        await validateStageSceneGenerationContext(stageDocument, {
          resolveModel: resolveContinuationModel,
        });
      } catch {
        return NextResponse.json({ error: 'generation_unavailable' }, { status: 422, headers });
      }
    }
    const alreadyRunning = runner.isRunning(stageId);
    const generate = createStageSceneGenerator({ resolveModel: resolveContinuationModel });
    void runner
      .startOrResume({ stageId, store: store as unknown as NextSceneStore, generate })
      .catch(() => undefined);
    return NextResponse.json(
      { status: alreadyRunning ? 'already_running' : 'started' },
      { status: 202, headers },
    );
  });
}
