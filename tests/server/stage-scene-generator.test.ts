import { describe, expect, it, vi } from 'vitest';
import {
  createStageSceneGenerator,
  validateStageSceneGenerationContext,
} from '@/lib/server/stage-scene-generator';

describe('stage scene generator', () => {
  it('validates every pending outline type without invoking a provider', async () => {
    const resolveModel = vi.fn().mockResolvedValue({ model: { id: 'm' } });
    await validateStageSceneGenerationContext(
      {
        stage: { id: 'stage' },
        scenes: [{ outlineId: 'complete' } as any],
        outline: {
          outlines: [
            { id: 'complete', order: 1, type: 'slide' },
            { id: 'quiz', order: 2, type: 'quiz' },
            { id: 'interactive', order: 3, type: 'interactive' },
          ],
        },
      },
      { resolveModel },
    );
    expect(resolveModel).toHaveBeenCalledTimes(2);
    expect(resolveModel).toHaveBeenCalledWith({ stage: 'scene-content:quiz' });
    expect(resolveModel).toHaveBeenCalledWith({ stage: 'scene-content:interactive' });
  });

  it('passes the resolved server model context and requested outline to the shared builder', async () => {
    const build = vi
      .fn()
      .mockResolvedValue({ id: 'scene', stageId: 'stage', outlineId: 'o1', order: 2 });
    const generator = createStageSceneGenerator({
      resolveModel: vi
        .fn()
        .mockResolvedValue({
          model: { id: 'm' },
          modelInfo: { outputWindow: 99 },
          thinkingConfig: { effort: 'low' },
        }),
      callLLM: vi.fn().mockResolvedValue({ text: 'ok' }),
      build,
    });
    const result = await generator(
      { id: 'o1', order: 2, type: 'interactive' } as any,
      { stage: { id: 'stage', name: 'Course' }, scenes: [], outline: { outlines: [] } } as any,
    );
    expect(result).toMatchObject({ stageId: 'stage', outlineId: 'o1', order: 2 });
    expect(build).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'o1' }),
      expect.any(Function),
      'stage',
      undefined,
      undefined,
      { id: 'm' },
      false,
      expect.objectContaining({ pageIndex: 1 }),
    );
  });
});
