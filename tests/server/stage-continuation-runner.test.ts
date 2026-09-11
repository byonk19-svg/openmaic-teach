import { describe, expect, it, vi } from 'vitest';
import { createStageContinuationRunner } from '@/lib/server/stage-continuation-runner';

const outline = (id: string, order: number) => ({
  id,
  order,
  title: id,
  description: '',
  keyPoints: [],
  type: 'slide' as const,
});
const scene = (stageId: string, id: string, order: number) =>
  ({
    id: `scene-${id}`,
    stageId,
    outlineId: id,
    order,
    title: id,
    type: 'slide',
    content: { type: 'slide' },
    actions: [],
  }) as any;
function store(stageId = 'stage-1') {
  const doc: any = {
    stage: { id: stageId },
    scenes: [],
    outline: { outlines: [outline('one', 1), outline('two', 2)], generationComplete: false },
  };
  return {
    doc,
    loadDocument: vi.fn().mockImplementation(async () => structuredClone(doc)),
    saveDocument: vi
      .fn()
      .mockImplementation(async (next) => Object.assign(doc, structuredClone(next))),
  };
}

describe('stage continuation runner', () => {
  it('persists each missing scene then marks only a complete stage complete', async () => {
    const s = store();
    const generate = vi.fn(async (o: any) => scene('stage-1', o.id, o.order));
    const runner = createStageContinuationRunner();
    await expect(
      runner.startOrResume({ stageId: 'stage-1', store: s, generate }),
    ).resolves.toMatchObject({ status: 'completed', scenesPersisted: 2 });
    expect(generate).toHaveBeenCalledTimes(2);
    expect(s.doc.outline.generationComplete).toBe(true);
  });
  it('shares one in-flight run for concurrent callers', async () => {
    const s = store();
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const generate = vi.fn(async (o: any) => {
      await gate;
      return scene('stage-1', o.id, o.order);
    });
    const runner = createStageContinuationRunner();
    const a = runner.startOrResume({ stageId: 'stage-1', store: s, generate });
    const b = runner.startOrResume({ stageId: 'stage-1', store: s, generate });
    release();
    await Promise.all([a, b]);
    expect(generate).toHaveBeenCalledTimes(2);
  });
  it('leaves progress resumable after a failure', async () => {
    const s = store();
    const generate = vi
      .fn()
      .mockResolvedValueOnce(scene('stage-1', 'one', 1))
      .mockRejectedValueOnce(new Error('failed'));
    const runner = createStageContinuationRunner();
    await expect(
      runner.startOrResume({ stageId: 'stage-1', store: s, generate }),
    ).resolves.toMatchObject({ status: 'failed', outlineId: 'two' });
    expect(s.doc.scenes).toHaveLength(1);
    expect(s.doc.outline.generationComplete).toBe(false);
  });
});
