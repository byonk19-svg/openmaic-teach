import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const componentSource = readFileSync(
  resolve(process.cwd(), 'components/prototypes/m02-learning-experience-prototype.tsx'),
  'utf8',
);
describe('M02 limited prototype presentation', () => {
  it('opens with the patient and a concrete physiology invitation', () => {
    expect(componentSource).toContain('“{teachingCaseA.patient.quote}”');
    expect(componentSource).toContain(
      'How can these numbers coexist with a patient who says every breath feels difficult?',
    );
    expect(componentSource).toContain('Follow oxygen from support to the blood');
    expect(componentSource).toContain('Connect one breath to one minute and then to CO2');
    expect(componentSource).toContain('Explain why a displayed breath does not measure effort');
    expect(componentSource).not.toContain('Take a clinical pause before the lesson names');
    expect(componentSource).not.toContain(
      'The patient report and bedside observation remain visible evidence',
    );
  });

  it('uses the revised teaching sequence without a separate question-map stop', () => {
    expect(componentSource).toContain(
      "type Step = 'notice' | 'oxygen' | 'model' | 'co2' | 'effort' | 'return'",
    );
    expect(componentSource).not.toContain("{ id: 'map'");
    expect(componentSource).toContain("{ id: 'co2', label: 'Explain CO2' }");
    expect(componentSource).toContain('grid grid-cols-2 gap-2 sm:grid-cols-3');
    expect(componentSource).toContain("aria-current={active ? 'step' : undefined}");
    expect(componentSource).not.toContain('overflow-x-auto');
  });

  it('builds the oxygen picture before the pathway summary', () => {
    const exchange = componentSource.indexOf('<OxygenExchangeDiagram />');
    const carriers = componentSource.indexOf('Same saturation, different carrier amount');
    const summary = componentSource.indexOf('Complete oxygen pathway summary');

    expect(exchange).toBeGreaterThan(-1);
    expect(carriers).toBeGreaterThan(exchange);
    expect(summary).toBeGreaterThan(carriers);
    expect(componentSource).toContain('Air path');
    expect(componentSource).toContain('Blood path');
    expect(componentSource).toContain('Gas-exchange surface');
    expect(componentSource).toContain('Relatively low V/Q');
    expect(componentSource).toContain('Relatively high V/Q');
    expect(componentSource).not.toMatch(/V\/Q\s*=\s*\d/);
    expect(componentSource).toContain("type OxygenPhase = 'exchange' | 'carriage'");
    expect(componentSource).toContain('Continue to oxygen carriage');
    expect(componentSource).toContain('Air and blood meet regionally');
  });

  it('preserves the reviewed FiO2 provenance wording', () => {
    expect(componentSource).toContain(
      'FiO2 identifies the set oxygen concentration of the inspired gas',
    );
    expect(componentSource).toContain(
      'Ventilation carries that oxygen-containing gas toward the alveoli',
    );
    expect(componentSource).not.toContain('oxygen concentration in the gas being delivered');
  });

  it('uses dependence connectors instead of arithmetic plus signs in the oxygen summary', () => {
    expect(componentSource).toContain('depends on');
    expect(componentSource).toContain('Arterial saturation');
    expect(componentSource).toContain('Hemoglobin concentration');
    expect(componentSource).toContain('Oxygen content');
    expect(componentSource).toContain('Cardiac output');
    expect(componentSource).not.toContain("branchInputs.join(' + ')");
    expect(componentSource).not.toMatch(/Oxygen content\s*\+\s*Cardiac output/);
  });

  it('explains the hemoglobin symbols beside the held-variable comparison', () => {
    expect(componentSource).toContain('same arterial saturation, PaO2, and cardiac output');
    expect(componentSource).toContain('They differ in hemoglobin amount');
    expect(componentSource).toContain('Each outlined cluster is one schematic hemoglobin carrier');
    expect(componentSource).toContain(
      'Three of four binding-site dots are occupied in both samples',
    );
    expect(componentSource).toContain('m02-oxygen-comparison');
    expect(componentSource).toContain('Compare with the explanation');
    expect(componentSource).toContain('No score or grader');
  });

  it('keeps local-response conclusions behind their feedback reveals', () => {
    const oxygenStart = componentSource.indexOf('function OxygenationTeaching');
    const oxygenReveal = componentSource.indexOf('{revealed && (', oxygenStart);
    const oxygenBeforeReveal = componentSource.slice(oxygenStart, oxygenReveal);
    const assistanceStart = componentSource.indexOf(
      'aria-labelledby="assistance-application-heading"',
    );
    const assistanceReveal = componentSource.indexOf('{assistanceRevealed && (', assistanceStart);
    const assistanceBeforeReveal = componentSource.slice(assistanceStart, assistanceReveal);

    expect(oxygenBeforeReveal).not.toContain('Snapshot B has a lower hemoglobin concentration');
    expect(oxygenBeforeReveal).not.toContain('fewer hemoglobin carriers available to carry oxygen');
    expect(assistanceBeforeReveal).not.toContain(
      'Model B receives less actual delivered inspiratory assistance',
    );
    expect(assistanceBeforeReveal).not.toContain('Less actual delivered ventilator assistance');
  });

  it('connects one breath, repetition, and one minute without mixing local quantities', () => {
    expect(componentSource).toContain('One breath · L');
    expect(componentSource).toContain('Repeat across one minute');
    expect(componentSource).toContain('One minute · L/min');
    expect(componentSource).toContain('0.15 L × 20 breaths = 3 L/min');
    expect(componentSource).toContain('0.15 L × 40 breaths = 6 L/min');
    expect(componentSource).toContain('0.35 L modeled gas-exchanging portion');
    expect(componentSource).toContain('0.10 L modeled gas-exchanging portion');
    expect(componentSource).not.toContain('is 100% of Pattern A’s common reference width');
    expect(componentSource).not.toContain('10.0 L/min total gas moved');
  });

  it('keeps the paired-breath comparison side by side at the narrow response viewport', () => {
    const modelStart = componentSource.indexOf('function PairedBreathModel');
    const predictionStart = componentSource.indexOf('name="m02-prediction"', modelStart);
    const modelBeforePrediction = componentSource.slice(modelStart, predictionStart);

    expect(modelBeforePrediction).toContain('grid grid-cols-2 gap-3 md:gap-8');
    expect(modelBeforePrediction).toContain('flex flex-col gap-1 sm:flex-row');
  });

  it('explains the CO2 physiology before asking for directionality', () => {
    const explanation = componentSource.indexOf('CO2 is produced at a rate');
    const application = componentSource.indexOf('Model Y has lower modeled alveolar ventilation');

    expect(explanation).toBeGreaterThan(-1);
    expect(application).toBeGreaterThan(explanation);
    expect(componentSource).toMatch(
      /We assume steady state and negligible inspired CO2\. Under those assumptions, CO2\s+elimination equals production\./,
    );
    expect(componentSource).toContain('K keeps the units and gas-reference conditions consistent');
    expect(componentSource).toContain('same production with less alveolar ventilation');
    expect(componentSource).not.toContain('smaller alveolar-ventilation denominator');
    expect(componentSource).toContain('name="m02-co2-application"');
  });

  it('shows production and CO2 removal converging on the PaCO2 relationship', () => {
    const production = componentSource.indexOf('CO2 production rate');
    const removal = componentSource.indexOf('Alveolar ventilation rate');
    const relationship = componentSource.indexOf(
      'Steady-state PaCO2 reflects the relationship between these rates',
    );

    expect(production).toBeGreaterThan(-1);
    expect(removal).toBeGreaterThan(production);
    expect(relationship).toBeGreaterThan(removal);
    expect(componentSource).toContain('data-testid="co2-rate-relationship"');
    expect(componentSource).not.toContain('Production adds CO2 to the body');
    expect(componentSource).not.toContain('Alveolar ventilation / CO2 removal rate');
    expect(componentSource).toContain('Moves alveolar gas through the lungs');
    expect(componentSource).toMatch(
      /Alveolar ventilation carries CO2-containing gas out of the lungs\.\s+At steady state, CO2\s+elimination equals CO2 production\./,
    );
  });

  it('uses a traceable effort mechanism and one useful local application', () => {
    expect(componentSource).toContain('Respiratory command');
    expect(componentSource).toContain('Expected sensory consequences');
    expect(componentSource).toContain('Patient respiratory muscles');
    expect(componentSource).toContain('Mechanical load');
    expect(componentSource).toContain('Muscle capacity');
    expect(componentSource).toContain('Actual delivered ventilator assistance');
    expect(componentSource).toContain('Achieved breathing');
    expect(componentSource).toContain('Actual sensory feedback returns toward the brain');
    expect(componentSource).toContain('Expected ↔ actual comparison');
    expect(componentSource).toContain('same modeled volume-and-flow pattern over time');
    expect(componentSource).toContain('Model B → more required muscular contribution');
    expect(componentSource).toContain('name="m02-assistance-comparison"');
    expect(componentSource).toContain('can contribute to breathing discomfort');
    expect(componentSource).not.toContain('name="m02-experience-comparison"');
    expect(componentSource).not.toContain('Expected and actual do not match');
    expect(componentSource).toContain("type EffortPhase = 'drive' | 'contributors' | 'feedback'");
    expect(componentSource).toContain('Continue to muscles and assistance');
    expect(componentSource).toContain('Continue to sensory feedback');
    expect(componentSource).toMatch(
      /Patient muscle effort and actual delivered ventilator assistance contribute to achieved\s+breathing/,
    );
    expect(componentSource).not.toContain(
      'Patient muscle effort + actual delivered ventilator assistance',
    );
  });

  it('hides the required-muscle-contribution answer until after the assistance response', () => {
    const sectionStart = componentSource.indexOf(
      'aria-labelledby="assistance-application-heading"',
    );
    const revealStart = componentSource.indexOf('{assistanceRevealed && (', sectionStart);
    const sectionEnd = componentSource.indexOf('</section>', revealStart);
    const beforeReveal = componentSource.slice(sectionStart, revealStart);
    const afterReveal = componentSource.slice(revealStart, sectionEnd);

    expect(sectionStart).toBeGreaterThan(-1);
    expect(revealStart).toBeGreaterThan(sectionStart);
    expect(beforeReveal).not.toContain('Less respiratory-muscle contribution required');
    expect(beforeReveal).not.toContain('More respiratory-muscle contribution required');
    expect(afterReveal).toContain('Model A → less required muscular contribution');
    expect(afterReveal).toContain('Model B → more required muscular contribution');
  });

  it('returns to Case A with supported conclusions before specific limits', () => {
    expect(componentSource).toContain(
      'These findings can coexist because they answer different physiological questions.',
    );
    expect(componentSource).toContain('The measured PaCO2 describes current arterial CO2');
    expect(componentSource).toContain('The SpO2 is an estimated arterial saturation on FiO2 0.50');
    expect(componentSource).toContain('The patient’s report establishes real breathing difficulty');
    expect(componentSource).toContain('What remains unresolved is specific');
    expect(componentSource).toMatch(/model’s\s+0\.15 L assumption cannot be borrowed/);
  });

  it('preserves focus management, local ungraded controls, and provider isolation', () => {
    expect(componentSource).toContain('useEffect');
    expect(componentSource).toMatch(
      /document\s*\.querySelector<HTMLElement>\('\[data-prototype-step-heading\]'\)/,
    );
    expect(componentSource).toContain("window.scrollTo({ top: 0, left: 0, behavior: 'auto' })");
    expect(componentSource).toContain('role="status" aria-live="polite"');
    expect(componentSource).toContain('Local practice only. No score or grader.');
    expect(componentSource).not.toMatch(/fetch\(|\/api\/quiz-grade|semantic grader/i);
    expect(componentSource).not.toContain('Case B');
  });
});
