import type { Scene } from '@/lib/types/stage';

export type RequiredStageOutline = { id: string; order: number };

export type StageGenerationState =
  | { status: 'invalid_outline'; reason: 'missing_required_outline' | 'malformed_required_outline' }
  | { status: 'incomplete' }
  | { status: 'complete' };

type GenerationDocument = {
  scenes: readonly Pick<Scene, 'outlineId' | 'order'>[];
  outline?: {
    outlines?: readonly RequiredStageOutline[];
    generationComplete?: boolean;
    producer?: 'client' | 'server-job';
    requirement?: string;
    generationIntent?: 'instructional' | 'zero-scene';
  };
};

function isServerOwnedInstructionalStage(document: GenerationDocument) {
  const outline = document.outline;
  return (
    outline?.generationIntent === 'instructional' ||
    (outline?.producer === 'server-job' && Boolean(outline.requirement?.trim()))
  );
}

function hasMalformedOutline(outlines: readonly RequiredStageOutline[]) {
  const ids = new Set<string>();
  const orders = new Set<number>();
  return outlines.some((outline) => {
    if (!outline.id || !Number.isInteger(outline.order) || outline.order < 1) return true;
    if (ids.has(outline.id) || orders.has(outline.order)) return true;
    ids.add(outline.id);
    orders.add(outline.order);
    return false;
  });
}

/**
 * The one persisted completion contract for server-owned instructional stages.
 * A non-empty, well-formed plan is required, and every plan entry must have a
 * scene bound by its stable outline id at the same order.
 */
export function inspectStageGeneration(document: GenerationDocument): StageGenerationState {
  const outline = document.outline;
  if (outline?.generationIntent === 'zero-scene') return { status: 'complete' };
  const required = outline?.outlines ?? [];
  if (isServerOwnedInstructionalStage(document) && required.length === 0) {
    return { status: 'invalid_outline', reason: 'missing_required_outline' };
  }
  if (required.length === 0) {
    return outline?.generationComplete === true ? { status: 'complete' } : { status: 'incomplete' };
  }
  if (required.length > 0 && hasMalformedOutline(required)) {
    return { status: 'invalid_outline', reason: 'malformed_required_outline' };
  }
  if (
    required.some(
      (entry) =>
        !document.scenes.some(
          (scene) => scene.outlineId === entry.id && scene.order === entry.order,
        ),
    )
  ) {
    return { status: 'incomplete' };
  }
  return { status: 'complete' };
}

export function isGenerationComplete(document: GenerationDocument) {
  return inspectStageGeneration(document).status === 'complete';
}
