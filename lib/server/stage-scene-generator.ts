import { callLLM } from '@/lib/ai/llm';
import { buildSceneFromOutline } from '@/lib/server/scene-generation';
import { resolveModel } from '@/lib/server/resolve-model';
import type { Scene } from '@/lib/types/stage';
import type { StageDocument } from './stage-next-scene';

type Outline = { id: string; order: number; type?: string };
type SceneGeneratorDeps = {
  resolveModel: typeof resolveModel;
  callLLM: typeof callLLM;
  build: typeof buildSceneFromOutline;
};

/**
 * Resolves the server-owned generation configuration before a detached run is
 * scheduled. This deliberately does not invoke a model provider.
 */
export async function validateStageSceneGenerationContext(
  document: StageDocument,
  deps: Pick<SceneGeneratorDeps, 'resolveModel'> = { resolveModel },
) {
  const pendingTypes = new Set(
    (document.outline?.outlines ?? [])
      .filter((outline) => !document.scenes.some((scene) => scene.outlineId === outline.id))
      .map((outline) => outline.type ?? 'slide'),
  );
  await Promise.all(
    [...pendingTypes].map((type) => deps.resolveModel({ stage: `scene-content:${type}` as never })),
  );
}

/** Server-only adapter for the existing content → actions → canonical assembly path. */
export function createStageSceneGenerator(overrides: Partial<SceneGeneratorDeps> = {}) {
  const deps: SceneGeneratorDeps = {
    resolveModel,
    callLLM,
    build: buildSceneFromOutline,
    ...overrides,
  };
  return async (outline: Outline, document: StageDocument): Promise<Scene> => {
    const resolved = await deps.resolveModel({
      stage: `scene-content:${outline.type ?? 'slide'}` as never,
    });
    const aiCall = async (system: string, prompt: string) => {
      const result = await deps.callLLM(
        {
          model: resolved.model,
          system,
          prompt,
          maxOutputTokens: resolved.modelInfo?.outputWindow,
          maxRetries: 0,
        },
        'scene-content',
        undefined,
        resolved.thinkingConfig,
      );
      return result.text;
    };
    const scene = await deps.build(
      outline as never,
      aiCall,
      document.stage.id,
      undefined,
      undefined,
      resolved.model,
      false,
      {
        pageIndex: outline.order - 1,
        totalPages: document.outline?.outlines?.length ?? 1,
        allTitles: [],
        previousSpeeches: [],
      },
    );
    if (!scene) throw new Error(`Failed to generate scene for outline ${outline.id}`);
    return scene;
  };
}
