export const teachingCaseA = {
  support: { label: 'FiO2', value: '0.50', provenance: 'SET' },
  oxygenation: { label: 'SpO2', value: '95%', provenance: 'OBSERVED DISPLAY' },
  minuteVolume: {
    label: 'Exhaled minute volume',
    value: '8.0 L/min',
    provenance: 'CALCULATED FOR THE STATED CURRENT 60-SECOND INTERVAL',
  },
  co2: {
    label: 'PaCO2',
    value: '40 mm Hg',
    provenance: 'MEASURED ARTERIAL SAMPLE MATCHED TO CURRENT SUPPORT/TIME',
  },
  patient: {
    quote: 'I have to work for each breath right now.',
    observation: 'Visible inspiratory accessory-muscle activity',
  },
} as const;

const assumptionLitersPerBreath = 0.15;

function makePattern(
  name: 'Pattern A' | 'Pattern B',
  tidalVolumeLiters: number,
  respiratoryRate: number,
) {
  const totalMinuteVentilation = tidalVolumeLiters * respiratoryRate;
  const excludedLitersPerMinute = assumptionLitersPerBreath * respiratoryRate;

  return {
    name,
    tidalVolumeLiters,
    respiratoryRate,
    totalMinuteVentilation,
    excludedLitersPerMinute,
    modeledAlveolarVentilation: totalMinuteVentilation - excludedLitersPerMinute,
  } as const;
}

export const pairedBreathModel = {
  assumptionLitersPerBreath,
  patternA: makePattern('Pattern A', 0.5, 20),
  patternB: makePattern('Pattern B', 0.25, 40),
} as const;
