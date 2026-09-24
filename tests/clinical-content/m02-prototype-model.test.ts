import { describe, expect, it } from 'vitest';

import { pairedBreathModel, teachingCaseA } from '@/lib/clinical-content/m02-prototype-model';

describe('M02 limited visual prototype model', () => {
  it('keeps Teaching Case A distinct from approved Case B while preserving provenance', () => {
    expect(teachingCaseA.support).toEqual({ label: 'FiO2', value: '0.50', provenance: 'SET' });
    expect(teachingCaseA.oxygenation).toEqual({
      label: 'SpO2',
      value: '95%',
      provenance: 'OBSERVED DISPLAY',
    });
    expect(teachingCaseA.patient.quote).toBe('I have to work for each breath right now.');
    expect(teachingCaseA.patient.observation).toBe('Visible inspiratory accessory-muscle activity');
  });

  it('makes the assumption-first paired-breath explanation mathematically inspectable', () => {
    expect(pairedBreathModel.assumptionLitersPerBreath).toBe(0.15);
    expect(pairedBreathModel.patternA).toMatchObject({
      tidalVolumeLiters: 0.5,
      respiratoryRate: 20,
      totalMinuteVentilation: 10,
      excludedLitersPerMinute: 3,
      modeledAlveolarVentilation: 7,
    });
    expect(pairedBreathModel.patternB).toMatchObject({
      tidalVolumeLiters: 0.25,
      respiratoryRate: 40,
      totalMinuteVentilation: 10,
      excludedLitersPerMinute: 6,
      modeledAlveolarVentilation: 4,
    });
  });
});
