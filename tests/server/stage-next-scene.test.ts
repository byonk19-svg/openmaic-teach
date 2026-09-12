import { describe, expect, it, vi } from 'vitest';
import { generateAndPersistNextScene } from '@/lib/server/stage-next-scene';

const outline = (id: string, order: number) => ({
  id,
  order,
  title: `Scene ${order}`,
  description: 'Test scene',
  keyPoints: [],
  type: 'slide' as const,
});

describe('generateAndPersistNextScene', () => {
  it('persists one missing scene without creating another stage', async () => {
    const document = {
      stage: { id: 'stage-1', name: 'Course', createdAt: 1, updatedAt: 1 },
      scenes: [],
      outline: {
        outlines: [outline('one', 1)],
        generationComplete: false,
        createdAt: 1,
        updatedAt: 1,
      },
    } as any;
    const saveDocument = vi.fn().mockResolvedValue(undefined);
    const generate = vi.fn().mockResolvedValue({
      id: 'scene-1',
      stageId: 'stage-1',
      outlineId: 'one',
      order: 1,
      title: 'Scene 1',
      type: 'slide',
      content: {
        type: 'slide',
        canvas: { id: 'canvas', viewportSize: 1000, viewportRatio: 0.5625, elements: [] },
      },
      actions: [],
    });

    const result = await generateAndPersistNextScene({
      stageId: 'stage-1',
      store: { loadDocument: vi.fn().mockResolvedValue(document), saveDocument },
      generate,
    });

    expect(result).toMatchObject({ status: 'persisted', outlineId: 'one', sceneId: 'scene-1' });
    expect(generate).toHaveBeenCalledOnce();
    expect(saveDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        stage: document.stage,
        scenes: [expect.objectContaining({ id: 'scene-1', outlineId: 'one' })],
      }),
    );
    expect(saveDocument.mock.calls[0][0].outline.generationComplete).toBe(false);
  });

  it('does not regenerate an outline already persisted', async () => {
    const existing = {
      id: 'scene-1',
      stageId: 'stage-1',
      outlineId: 'one',
      order: 1,
      title: 'Scene 1',
      type: 'slide',
      content: { type: 'slide' },
      actions: [],
    };
    const generate = vi.fn();
    const result = await generateAndPersistNextScene({
      stageId: 'stage-1',
      store: {
        loadDocument: vi
          .fn()
          .mockResolvedValue({
            stage: { id: 'stage-1' },
            scenes: [existing],
            outline: { outlines: [outline('one', 1)], generationComplete: false },
          }),
        saveDocument: vi.fn(),
      },
      generate,
    });
    expect(result).toEqual({ status: 'complete' });
    expect(generate).not.toHaveBeenCalled();
  });

  it('leaves completed scenes intact when generation fails', async () => {
    const existing = {
      id: 'scene-1',
      stageId: 'stage-1',
      outlineId: 'one',
      order: 1,
      title: 'Scene 1',
      type: 'slide',
      content: { type: 'slide' },
      actions: [],
    };
    const saveDocument = vi.fn();
    await expect(
      generateAndPersistNextScene({
        stageId: 'stage-1',
        store: {
          loadDocument: vi
            .fn()
            .mockResolvedValue({
              stage: { id: 'stage-1' },
              scenes: [existing],
              outline: {
                outlines: [outline('one', 1), outline('two', 2)],
                generationComplete: false,
              },
            }),
          saveDocument,
        },
        generate: vi.fn().mockRejectedValue(new Error('provider failed')),
      }),
    ).rejects.toThrow('provider failed');
    expect(saveDocument).not.toHaveBeenCalled();
  });

  it('rejects a generated scene whose type does not match its persisted outline', async () => {
    const document = {
      stage: { id: 'stage-1' },
      scenes: [],
      outline: { outlines: [{ ...outline('interactive', 1), type: 'interactive' }], generationComplete: false },
    } as any;
    const saveDocument = vi.fn();

    await expect(
      generateAndPersistNextScene({
        stageId: 'stage-1',
        store: { loadDocument: vi.fn().mockResolvedValue(document), saveDocument },
        generate: vi.fn().mockResolvedValue({
          id: 'scene-1',
          stageId: 'stage-1',
          outlineId: 'interactive',
          order: 1,
          title: 'Static substitute',
          type: 'slide',
          content: { type: 'slide' },
          actions: [],
        }),
      }),
    ).rejects.toThrow('Generated scene does not match requested outline interactive');

    expect(saveDocument).not.toHaveBeenCalled();
  });
});
