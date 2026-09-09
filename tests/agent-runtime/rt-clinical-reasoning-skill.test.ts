import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  availableSkillsPromptBlock,
  checkOutlineAgainstSkill,
  checkScenesAgainstSkill,
  findSkill,
  type OutlineConstraints,
} from '@/lib/server/agent-runtime/skills';

const root = join(process.cwd(), 'skills/agent-runtime/rt-clinical-reasoning');
const constraints = (): OutlineConstraints =>
  JSON.parse(readFileSync(join(root, 'outline-constraints.json'), 'utf8'));
const checkpoint = { order: 1, type: 'quiz', title: 'Interpret the observations' };
const simulation = {
  order: 2,
  type: 'interactive',
  title: 'Test your prediction',
  widgetType: 'simulation',
  widgetOutline: {
    concept: 'Compare with baseline',
    keyVariables: ['Respiratory rate (breaths/min)'],
  },
};

describe('built-in RT clinical reasoning skill', () => {
  it('is discovered with English metadata and its native constraints', async () => {
    const skill = await findSkill('rt-clinical-reasoning');
    expect(skill).toMatchObject({
      id: 'rt-clinical-reasoning',
      name: 'rt-clinical-reasoning',
      title: 'RT Clinical Reasoning',
      source: 'builtin',
    });
    expect(skill!.constraints).toEqual(constraints());
    expect(skill!.filePath.replaceAll('\\', '/')).toContain(
      '/skills/agent-runtime/rt-clinical-reasoning/SKILL.md',
    );
    expect(availableSkillsPromptBlock([skill!])).toContain('<name>rt-clinical-reasoning</name>');
  });

  it('uses only existing constraint fields, without a course-length cap', () => {
    const supported: (keyof OutlineConstraints)[] = [
      'allowedTypes',
      'firstSceneType',
      'typeMix',
      'requiredWidgetTypes',
      'allowedWidgetTypes',
      'requiredWidgetOutlineFields',
      'noConsecutiveSameWidgetType',
    ];
    for (const field of Object.keys(constraints())) expect(supported).toContain(field);
  });

  it('accepts a quiz-only checkpoint, an optional experiment, and repeated checkpoint cycles', () => {
    expect(checkOutlineAgainstSkill([checkpoint], constraints())).toEqual([]);
    expect(checkOutlineAgainstSkill([checkpoint, simulation], constraints())).toEqual([]);
    expect(
      checkOutlineAgainstSkill(
        [checkpoint, simulation, { ...checkpoint, order: 3 }, { ...simulation, order: 4 }],
        constraints(),
      ),
    ).toEqual([]);
  });

  it('rejects a simulation-only plan and adjacent simulations', () => {
    expect(checkOutlineAgainstSkill([simulation], constraints()).join(' ')).toContain('quiz');
    expect(
      checkOutlineAgainstSkill(
        [checkpoint, simulation, { ...simulation, order: 3 }],
        constraints(),
      ).join(' '),
    ).toContain('consecutive');
  });

  it('rejects games, PBL, and missing simulation metadata', () => {
    expect(
      checkOutlineAgainstSkill(
        [
          checkpoint,
          { ...simulation, widgetType: 'game' },
          { order: 3, type: 'pbl', title: 'Case' },
        ],
        constraints(),
      ).join(' '),
    ).toContain('not allowed');
    const violations = checkOutlineAgainstSkill(
      [checkpoint, { ...simulation, widgetOutline: { concept: '', keyVariables: [] } }],
      constraints(),
    ).join(' ');
    expect(violations).toContain('widgetOutline.concept');
    expect(violations).toContain('widgetOutline.keyVariables');
  });

  it('checks persisted scenes without demanding plan-only widget fields', () => {
    expect(
      checkScenesAgainstSkill(
        [
          checkpoint,
          {
            order: 2,
            type: 'interactive',
            title: simulation.title,
            content: { widgetConfig: { type: 'simulation' } },
          },
        ],
        constraints(),
      ),
    ).toEqual([]);
  });

  it('provides a single native short-answer example with a question-level gate', async () => {
    const skill = await findSkill('rt-clinical-reasoning');
    const example = skill!.content.match(/```json\s*([\s\S]*?)```/);
    expect(example).not.toBeNull();
    const content = JSON.parse(example![1]);
    expect(content.type).toBe('quiz');
    expect(content.questions).toHaveLength(1);
    expect(content.questions[0]).toMatchObject({
      type: 'short_answer',
      reasoningGate: { rubric: expect.any(String), passThreshold: 0.8 },
    });
    expect(Object.keys(content.questions[0].reasoningGate).sort()).toEqual([
      'passThreshold',
      'rubric',
    ]);
    expect(content.questions[0].reasoningGate.rubric.trim().length).toBeGreaterThan(0);
    expect(content.questions[0].options).toBeUndefined();
    expect(skill!.content).toContain('`quizConfig`');
    expect(skill!.content).toContain('`reasoningGate`');
    expect(skill!.content).toContain('reasoning-gate-revise');
  });

  it('provides a machine-readable continuity contract for linked simulations only', async () => {
    const skill = await findSkill('rt-clinical-reasoning');
    const jsonBlocks = [...skill!.content.matchAll(/```json\s*([\s\S]*?)```/g)].map((match) =>
      JSON.parse(match[1]),
    );
    const linked = jsonBlocks.find((value) => value?.continuity?.scenarioId);
    expect(linked).toMatchObject({
      type: 'interactive',
      widgetType: 'simulation',
      continuity: {
        scenarioId: expect.any(String),
        sourceSceneOrder: 1,
        baseline: expect.arrayContaining([{ name: 'flow', value: 60, unit: 'L/min' }]),
        fixedVariables: expect.arrayContaining(['VT', 'RR', 'PEEP']),
        assumptions: expect.arrayContaining([expect.any(String)]),
        expectedBaselineFindings: expect.arrayContaining([expect.any(String)]),
      },
    });
    expect(linked.continuity.assumptions.join(' ')).toContain('exceeds');
    expect(linked.continuity.expectedBaselineFindings.join(' ')).toContain('baseline');
  });

  it('requires a new scenario id for intentional state changes and no contract for unrelated cases', async () => {
    const skill = await findSkill('rt-clinical-reasoning');
    expect(skill!.content).toContain('same patient and clinical state');
    expect(skill!.content).toContain('new `scenarioId`');
    expect(skill!.content).toContain('Do not attach a continuity contract to unrelated cases');
    expect(skill!.content).toContain('continuity violation');
  });
});
