'use client';

import { useState } from 'react';

import { pairedBreathModel, teachingCaseA } from '@/lib/clinical-content/m02-prototype-model';

type Step = 'notice' | 'map' | 'model' | 'return';
type Prediction = 'Pattern A' | 'Pattern B' | null;

const steps: ReadonlyArray<{ id: Step; label: string }> = [
  { id: 'notice', label: 'Notice' },
  { id: 'map', label: 'Separate the questions' },
  { id: 'model', label: 'Test the model' },
  { id: 'return', label: 'Return to the bedside' },
];

const caseFacts = [
  teachingCaseA.support,
  teachingCaseA.oxygenation,
  teachingCaseA.minuteVolume,
  teachingCaseA.co2,
] as const;

export function M02LearningExperiencePrototype() {
  const [step, setStep] = useState<Step>('notice');
  const [prediction, setPrediction] = useState<Prediction>(null);

  const reset = () => {
    setStep('notice');
    setPrediction(null);
  };

  return (
    <main className="min-h-dvh bg-[#f4f6f3] text-slate-950">
      <div className="mx-auto grid min-h-dvh max-w-7xl grid-rows-[auto_1fr] px-5 py-5 md:px-10 md:py-8">
        <header className="flex items-start justify-between gap-8 border-b border-slate-300/70 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
              M02 · limited visual prototype
            </p>
            <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Keep the questions separate.
            </h1>
          </div>
          <p className="hidden max-w-52 pt-1 text-right text-sm leading-5 text-slate-600 md:block">
            Teaching Case A only. No grading, no provider, no patient-specific conclusion.
          </p>
        </header>

        <section className="grid gap-8 py-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:py-12">
          <nav
            aria-label="Prototype progress"
            className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-3"
          >
            {steps.map((item, index) => {
              const active = step === item.id;
              return (
                <div
                  key={item.id}
                  className={`min-w-max border-l-2 py-1 pl-3 text-sm transition-colors ${
                    active
                      ? 'border-teal-700 font-semibold text-slate-950'
                      : 'border-slate-300 text-slate-500'
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-slate-400">0{index + 1}</span>
                  {item.label}
                </div>
              );
            })}
          </nav>

          <div className="min-w-0">
            {step === 'notice' && <Notice onContinue={() => setStep('map')} />}
            {step === 'map' && <MapCaseA onContinue={() => setStep('model')} />}
            {step === 'model' && (
              <PairedBreathModel
                prediction={prediction}
                onPredict={setPrediction}
                onContinue={() => setStep('return')}
              />
            )}
            {step === 'return' && <ReturnToCaseA onRestart={reset} />}
          </div>
        </section>
      </div>
    </main>
  );
}

function Notice({ onContinue }: { readonly onContinue: () => void }) {
  return (
    <section aria-labelledby="case-a-heading" className="max-w-5xl">
      <p className="text-sm font-semibold text-teal-800">Teaching Case A · current snapshot</p>
      <h2
        id="case-a-heading"
        className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl"
      >
        What looks reassuring here—and what would you refuse to conclude yet?
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Take a clinical pause before the lesson names any categories. There is nothing to submit or
        score here.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2">
        {caseFacts.map((fact) => (
          <article key={fact.label} className="bg-[#fbfcfa] p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {fact.provenance}
            </p>
            <p className="mt-5 text-base font-medium text-slate-700">{fact.label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
              {fact.value}
            </p>
          </article>
        ))}
        <article className="bg-[#fbfcfa] p-6 md:col-span-2 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Patient / bedside
          </p>
          <blockquote className="mt-4 max-w-3xl text-2xl font-medium leading-9 text-slate-900">
            “{teachingCaseA.patient.quote}”
          </blockquote>
          <p className="mt-4 text-base text-slate-600">{teachingCaseA.patient.observation}</p>
        </article>
      </div>

      <PrototypeButton className="mt-8" onClick={onContinue}>
        Show the questions these facts can help answer
      </PrototypeButton>
    </section>
  );
}

function MapCaseA({ onContinue }: { readonly onContinue: () => void }) {
  const questions = [
    {
      title: 'What do I know about oxygenation—and on what support?',
      evidence:
        'SpO2 is a pulse-oximeter estimate of arterial saturation, interpreted alongside FiO2 0.50.',
      limit:
        'Saturation is not hemoglobin amount; oxygen content and delivery also depend on hemoglobin and blood flow.',
    },
    {
      title: 'What do I actually know about CO2 right now?',
      evidence:
        'PaCO2 40 mm Hg is current measured arterial evidence, not predicted from the 8.0 L/min display.',
      limit:
        'At simplified steady state, PaCO2 relates to CO2 production relative to alveolar ventilation, not total gas moved alone.',
    },
    {
      title: 'What is the patient experiencing, and what burden evidence do I have?',
      evidence:
        'During assisted ventilation, patient muscles and ventilator assistance can both move gas; displayed volume cannot reveal the patient contribution.',
      limit:
        'The report and observed sign matter, but do not quantify work or establish Case A’s mechanism.',
    },
  ];

  return (
    <section aria-labelledby="case-a-map-heading" className="max-w-6xl">
      <p className="text-sm font-semibold text-teal-800">Use the same snapshot differently</p>
      <h2
        id="case-a-map-heading"
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Each datum can carry a real conclusion. None carries all of them.
      </h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {questions.map((question, index) => (
          <article key={question.title} className="border-t-2 border-teal-700 pt-5">
            <p className="font-mono text-xs text-teal-800">0{index + 1}</p>
            <h3 className="mt-3 text-xl font-semibold leading-7">{question.title}</h3>
            <p className="mt-5 text-base leading-7 text-slate-700">{question.evidence}</p>
            <p className="mt-5 border-l border-slate-300 pl-4 text-sm leading-6 text-slate-500">
              {question.limit}
            </p>
          </article>
        ))}
      </div>
      <PrototypeButton className="mt-10" onClick={onContinue}>
        Test one hidden part of the minute-volume question
      </PrototypeButton>
    </section>
  );
}

function PairedBreathModel({
  prediction,
  onPredict,
  onContinue,
}: {
  readonly prediction: Prediction;
  readonly onPredict: (prediction: Prediction) => void;
  readonly onContinue: () => void;
}) {
  const revealed = prediction !== null;
  const patterns = [pairedBreathModel.patternA, pairedBreathModel.patternB] as const;

  return (
    <section aria-labelledby="paired-breath-heading" className="max-w-6xl">
      <p className="text-sm font-semibold text-teal-800">A teaching model, not patient data</p>
      <h2
        id="paired-breath-heading"
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Same total gas moved. Different modeled remainder.
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        For this comparison only, assume that{' '}
        <strong>0.15 L of each breath does not participate in gas exchange.</strong>
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {patterns.map((pattern) => {
          const widthPercent =
            (pattern.tidalVolumeLiters / pairedBreathModel.patternA.tidalVolumeLiters) * 100;
          const excludedPercent =
            (pairedBreathModel.assumptionLitersPerBreath / pattern.tidalVolumeLiters) * 100;
          return (
            <article key={pattern.name} className="border-t-2 border-slate-950 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold">{pattern.name}</h3>
                <p className="font-mono text-sm text-slate-500">
                  {pattern.respiratoryRate}/min × {pattern.tidalVolumeLiters.toFixed(2)} L
                </p>
              </div>
              <p className="mt-4 text-lg font-medium">
                {pattern.totalMinuteVentilation.toFixed(1)} L/min total gas moved
              </p>
              <div
                className="mt-8 h-20 border-b border-slate-300"
                aria-label={`${pattern.name} representative breath`}
              >
                <div className="flex h-full" style={{ width: `${widthPercent}%` }}>
                  <div
                    className="flex items-end border border-r-0 border-teal-800 bg-teal-100 px-2 pb-2 text-xs font-semibold text-teal-950"
                    style={{ width: `${excludedPercent}%` }}
                  >
                    0.15 L assumed non-gas-exchanging portion
                  </div>
                  <div className="flex flex-1 items-end border border-slate-950 bg-slate-950 px-2 pb-2 text-xs font-semibold text-white">
                    Modeled gas-exchanging portion
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Common reference scale: {pattern.tidalVolumeLiters.toFixed(2)} L is{' '}
                {widthPercent.toFixed(0)}% of Pattern A’s width.
              </p>
            </article>
          );
        })}
      </div>

      <fieldset className="mt-10 border-y border-slate-300 py-7">
        <legend className="max-w-3xl text-xl font-semibold leading-7">
          Under that assumption, which pattern provides more modeled alveolar ventilation over one
          minute—and why?
        </legend>
        <p className="mt-3 text-sm text-slate-600">
          This is supported practice. It is ungraded and stays on this page.
        </p>
        <div
          className="mt-5 flex flex-wrap gap-3"
          role="radiogroup"
          aria-label="Modeled alveolar ventilation prediction"
        >
          {patterns.map((pattern) => (
            <label
              key={pattern.name}
              className={`min-h-11 border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 ${
                prediction === pattern.name
                  ? 'border-teal-800 bg-teal-800 text-white'
                  : 'border-slate-400 bg-transparent text-slate-900 hover:border-slate-950'
              }`}
            >
              <input
                type="radio"
                name="m02-prediction"
                className="sr-only"
                checked={prediction === pattern.name}
                onChange={() => onPredict(pattern.name)}
              />
              {pattern.name}
            </label>
          ))}
        </div>
      </fieldset>

      {revealed && (
        <div className="mt-8 border-l-2 border-teal-800 bg-teal-50 px-6 py-5" role="status">
          <p className="text-lg font-semibold">
            {prediction === 'Pattern A'
              ? 'You selected Pattern A. '
              : 'You selected Pattern B. Compare the remaining volume and repetition. '}
            Pattern A provides more modeled alveolar ventilation in this teaching model.
          </p>
          <p className="mt-4 border-t border-teal-800/20 pt-4">
            One minute: Pattern A is 10 L/min total = 3 L/min assumed non-gas-exchanging + 7 L/min
            modeled alveolar ventilation. Pattern B is 10 L/min total = 6 L/min assumed
            non-gas-exchanging + 4 L/min modeled alveolar ventilation.
          </p>
          <p className="mt-4">
            <strong>CO2 production relative to alveolar ventilation:</strong> PaCO2 ≈ K × CO2
            production / alveolar ventilation. Simplified steady-state relationship, not a patient
            calculation. Case A’s PaCO2 is measured, not predicted.
          </p>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            The same 0.15 L portion is counted 20 times in Pattern A (
            {pairedBreathModel.patternA.excludedLitersPerMinute} L/min) and 40 times in Pattern B (
            {pairedBreathModel.patternB.excludedLitersPerMinute} L/min). That leaves{' '}
            {pairedBreathModel.patternA.modeledAlveolarVentilation} L/min versus{' '}
            {pairedBreathModel.patternB.modeledAlveolarVentilation} L/min modeled alveolar
            ventilation.
          </p>
        </div>
      )}

      <PrototypeButton className="mt-8" disabled={!revealed} onClick={onContinue}>
        Return to Teaching Case A
      </PrototypeButton>
    </section>
  );
}

function ReturnToCaseA({ onRestart }: { readonly onRestart: () => void }) {
  return (
    <section aria-labelledby="return-case-a-heading" className="max-w-5xl">
      <p className="text-sm font-semibold text-teal-800">Back to Teaching Case A</p>
      <h2
        id="return-case-a-heading"
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl"
      >
        The minute-volume display helps—but it does not settle every question.
      </h2>
      <div className="mt-10 grid gap-8 border-y border-slate-300 py-8 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Gas moved
          </p>
          <p className="mt-3 text-lg font-semibold">
            The 8.0 L/min display cannot use the model’s 0.15 L assumption.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            Case A lacks the dead-space input needed to partition it.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Current CO2 evidence
          </p>
          <p className="mt-3 text-lg font-semibold">
            PaCO2 40 mm Hg is measured, matched to current support and time.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            The model explains why total gas movement alone cannot calculate that result.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Patient / support context
          </p>
          <p className="mt-3 text-lg font-semibold">
            SpO2 95% on FiO2 0.50 is oxygenation evidence, not oxygen content or delivery.
          </p>
          <p className="mt-3 leading-7 text-slate-600">
            The patient report establishes discomfort; the observed sign adds evidence, while cause
            and muscular work remain unresolved.
          </p>
        </div>
      </div>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-700">
        The prototype’s question is simple: did the paired-breath visual make the minute-volume
        limit clearer than prose alone?
      </p>
      <PrototypeButton className="mt-8" onClick={onRestart}>
        Restart the teaching segment
      </PrototypeButton>
    </section>
  );
}

function PrototypeButton({
  children,
  className = '',
  disabled = false,
  onClick,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-11 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 ${className}`}
    >
      {children}
    </button>
  );
}
