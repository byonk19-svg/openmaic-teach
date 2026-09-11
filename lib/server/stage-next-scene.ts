import type { Scene } from '@/lib/types/stage';

export type StageDocument = {
  stage: { id: string };
  scenes: Scene[];
  outline?: {
    outlines?: Array<{ id: string; order: number; type?: string }>;
    generationComplete?: boolean;
  };
};

export interface NextSceneStore {
  loadDocument(stageId: string): Promise<StageDocument | null>;
  saveDocument(document: StageDocument): Promise<void>;
}

export type NextSceneResult =
  | { status: 'persisted'; outlineId: string; sceneId: string; order: number }
  | { status: 'complete' };

/**
 * Generates one missing outline for an existing document and commits it before
 * returning. The caller owns provider/model selection; this seam owns only the
 * durable, idempotent stage mutation needed by a later server job runner.
 */
export async function generateAndPersistNextScene(input: {
  stageId: string;
  store: NextSceneStore;
  generate: (outline: { id: string; order: number }, document: StageDocument) => Promise<Scene>;
}): Promise<NextSceneResult> {
  const document = await input.store.loadDocument(input.stageId);
  if (!document) throw new Error(`Stage ${input.stageId} was not found`);
  const outlines = document.outline?.outlines ?? [];
  const next = [...outlines]
    .sort((a, b) => a.order - b.order)
    .find((outline) => !document.scenes.some((scene) => scene.outlineId === outline.id));
  if (!next) return { status: 'complete' };

  const scene = await input.generate(next, document);
  if (
    scene.stageId !== input.stageId ||
    scene.outlineId !== next.id ||
    scene.order !== next.order
  ) {
    throw new Error(`Generated scene does not match requested outline ${next.id}`);
  }

  // Re-read immediately before the write: concurrent callers may have won the
  // same outline while this provider call was in flight.
  const current = await input.store.loadDocument(input.stageId);
  if (!current) throw new Error(`Stage ${input.stageId} disappeared during generation`);
  if (current.scenes.some((item) => item.outlineId === next.id)) return { status: 'complete' };
  await input.store.saveDocument({
    ...current,
    scenes: [...current.scenes, scene].sort((a, b) => a.order - b.order),
    outline: { ...current.outline, generationComplete: false },
  });
  return { status: 'persisted', outlineId: next.id, sceneId: scene.id, order: scene.order };
}
