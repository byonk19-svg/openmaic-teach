import { describe, expect, it } from 'vitest';
import { inspectStageGeneration } from '@/lib/server/stage-generation-state';

const outlines = Array.from({ length: 6 }, (_, index) => ({
  id: `p${index + 1}`,
  order: index + 1,
}));

function generatedDocument(scenes: Array<{ outlineId: string; order: number }>) {
  return {
    scenes,
    outline: {
      outlines,
      producer: 'server-job' as const,
      requirement: 'Six-scene generated course',
      generationIntent: 'instructional' as const,
      generationComplete: false,
    },
  };
}

describe('persisted stage generation contract', () => {
  it('never treats an empty instructional outline as complete', () => {
    expect(
      inspectStageGeneration({
        scenes: [],
        outline: {
          outlines: [],
          producer: 'server-job',
          requirement: 'Generated course',
          generationComplete: true,
        },
      }),
    ).toEqual({ status: 'invalid_outline', reason: 'missing_required_outline' });
  });

  it('keeps a six-entry plan incomplete after only two matching scenes', () => {
    expect(
      inspectStageGeneration(
        generatedDocument(
          outlines.slice(0, 2).map(({ id: outlineId, order }) => ({ outlineId, order })),
        ),
      ),
    ).toEqual({ status: 'incomplete' });
  });

  it('keeps a course incomplete when its middle outline is missing', () => {
    expect(
      inspectStageGeneration(
        generatedDocument(
          outlines
            .filter((outline) => outline.order !== 3)
            .map(({ id: outlineId, order }) => ({ outlineId, order })),
        ),
      ),
    ).toEqual({ status: 'incomplete' });
  });

  it('recognizes a valid completed six-outline fixture by stable identity and order', () => {
    expect(
      inspectStageGeneration(
        generatedDocument(outlines.map(({ id: outlineId, order }) => ({ outlineId, order }))),
      ),
    ).toEqual({ status: 'complete' });
  });
});
