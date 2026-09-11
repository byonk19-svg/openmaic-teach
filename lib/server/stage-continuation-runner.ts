import type { Scene } from '@/lib/types/stage';
import { generateAndPersistNextScene, type NextSceneStore } from './stage-next-scene';

export type StageContinuationResult =
  | { status: 'completed'; stageId: string; scenesPersisted: number }
  | {
      status: 'failed';
      stageId: string;
      outlineId?: string;
      error: string;
      scenesPersisted: number;
    };

export function createStageContinuationRunner() {
  const running = new Map<string, Promise<StageContinuationResult>>();
  return {
    isRunning(stageId: string) {
      return running.has(stageId);
    },
    startOrResume(input: {
      stageId: string;
      store: NextSceneStore;
      generate: (outline: { id: string; order: number }, document: any) => Promise<Scene>;
    }): Promise<StageContinuationResult> {
      const existing = running.get(input.stageId);
      if (existing) return existing;
      const run = (async (): Promise<StageContinuationResult> => {
        let scenesPersisted = 0;
        try {
          for (;;) {
            const result = await generateAndPersistNextScene(input);
            if (result.status === 'complete') {
              const document = await input.store.loadDocument(input.stageId);
              if (!document) throw new Error(`Stage ${input.stageId} was not found`);
              await input.store.saveDocument({
                ...document,
                outline: { ...document.outline, generationComplete: true },
              });
              return { status: 'completed', stageId: input.stageId, scenesPersisted };
            }
            scenesPersisted += 1;
          }
        } catch (error) {
          const document = await input.store.loadDocument(input.stageId);
          const outlines = document?.outline?.outlines ?? [];
          const missing = outlines.find(
            (outline) => !document?.scenes.some((scene) => scene.outlineId === outline.id),
          );
          return {
            status: 'failed',
            stageId: input.stageId,
            ...(missing ? { outlineId: missing.id } : {}),
            error: error instanceof Error ? error.message : String(error),
            scenesPersisted,
          };
        } finally {
          running.delete(input.stageId);
        }
      })();
      running.set(input.stageId, run);
      return run;
    },
  };
}
