import type { Scene } from '@/lib/types/stage';
import {
  generateAndPersistNextScene,
  type NextSceneStore,
  type StageDocument,
} from './stage-next-scene';
import { inspectStageGeneration } from './stage-generation-state';

export type StageContinuationResult =
  | { status: 'completed'; stageId: string; scenesPersisted: number }
  | {
      status: 'invalid_outline';
      stageId: string;
      reason: 'missing_required_outline' | 'malformed_required_outline';
      scenesPersisted: 0;
    }
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
      generate: (outline: { id: string; order: number }, document: StageDocument) => Promise<Scene>;
    }): Promise<StageContinuationResult> {
      const existing = running.get(input.stageId);
      if (existing) return existing;
      const run = (async (): Promise<StageContinuationResult> => {
        let scenesPersisted = 0;
        try {
          const initial = await input.store.loadDocument(input.stageId);
          if (!initial) throw new Error(`Stage ${input.stageId} was not found`);
          const state = inspectStageGeneration(initial);
          if (state.status === 'invalid_outline') {
            await input.store.saveDocument({
              ...initial,
              outline: { ...initial.outline, generationComplete: false },
            });
            return {
              status: 'invalid_outline',
              stageId: input.stageId,
              reason: state.reason,
              scenesPersisted: 0,
            };
          }
          for (;;) {
            const result = await generateAndPersistNextScene(input);
            if (result.status === 'complete') {
              const document = await input.store.loadDocument(input.stageId);
              if (!document) throw new Error(`Stage ${input.stageId} was not found`);
              const completion = inspectStageGeneration(document);
              if (completion.status === 'invalid_outline') {
                return {
                  status: 'invalid_outline',
                  stageId: input.stageId,
                  reason: completion.reason,
                  scenesPersisted: 0,
                };
              }
              await input.store.saveDocument({
                ...document,
                outline: {
                  ...document.outline,
                  generationComplete: completion.status === 'complete',
                },
              });
              return completion.status === 'complete'
                ? { status: 'completed', stageId: input.stageId, scenesPersisted }
                : {
                    status: 'failed',
                    stageId: input.stageId,
                    error: 'generation_incomplete',
                    scenesPersisted,
                  };
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
