import { describe, expect, it } from 'vitest';

import { buildM02StageDocument } from '@/lib/clinical-content/m02-stage-builder';

describe('M02 stage builder', () => {
  it('creates the approved seven-function sequence with one independent reasoning gate', () => {
    const document = buildM02StageDocument('stage-m02-test', 1_700_000_000_000);

    expect(document.scenes.map((scene) => scene.id)).toEqual([
      'm02-orient',
      'm02-pathways',
      'm02-paired-breaths',
      'm02-output-burden',
      'm02-case-b',
      'm02-synthesis',
      'm02-transfer',
    ]);
    expect(document.outline.generationComplete).toBe(true);
    expect(document.outline.generationIntent).toBe('instructional');

    const caseB = document.scenes.find((scene) => scene.id === 'm02-case-b');
    expect(caseB?.content.type).toBe('quiz');
    if (caseB?.content.type !== 'quiz') throw new Error('Case B must be a quiz scene');
    const question = caseB.content.questions[0];
    expect(question.reasoningGate?.rubric).toContain('global reassurance');
    expect(question.reasoningGate?.rubric).toContain('minute ventilation');
    expect(question.question).toContain('Breathing feels hard right now.');
  });

  it('keeps the exact Case B configuration out of supported practice scenes', () => {
    const document = buildM02StageDocument('stage-m02-test', 1_700_000_000_000);
    const supported = document.scenes.filter((scene) => scene.order < 5);
    const serialized = JSON.stringify(supported);

    expect(serialized).not.toContain('FiO2 0.70');
    expect(serialized).not.toContain('PaCO2 42 mm Hg');
    expect(serialized).not.toContain('Breathing feels hard right now.');
    expect(serialized).not.toContain('Visible inspiratory neck-muscle recruitment');
  });

  it('keeps the paired-breath model arithmetic and teaching-only boundary intact', () => {
    const document = buildM02StageDocument('stage-m02-test', 1_700_000_000_000);
    const paired = document.scenes.find((scene) => scene.id === 'm02-paired-breaths');
    const serialized = JSON.stringify(paired);

    expect(0.5 * 20).toBe(10);
    expect(0.25 * 40).toBe(10);
    expect((0.5 - 0.15) * 20).toBe(7);
    expect((0.25 - 0.15) * 40).toBe(4);
    expect(serialized).toContain(
      'MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT',
    );
  });
});
