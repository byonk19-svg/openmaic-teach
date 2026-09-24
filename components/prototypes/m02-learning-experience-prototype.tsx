'use client';

import { useEffect, useState } from 'react';

import { pairedBreathModel, teachingCaseA } from '@/lib/clinical-content/m02-prototype-model';

type Step = 'notice' | 'oxygen' | 'model' | 'co2' | 'effort' | 'return';
type Prediction = 'Pattern A' | 'Pattern B' | null;
type OxygenChoice = 'Snapshot A' | 'Snapshot B' | 'Same oxygen content' | null;
type Co2Choice = 'Model X' | 'Model Y' | 'Same modeled PaCO2' | null;
type AssistanceChoice = 'Model A' | 'Model B' | 'Same muscle contribution' | null;
type OxygenPhase = 'exchange' | 'carriage';
type EffortPhase = 'drive' | 'contributors' | 'feedback';

const steps: ReadonlyArray<{ id: Step; label: string }> = [
  { id: 'notice', label: 'Meet the patient' },
  { id: 'oxygen', label: 'Follow oxygen' },
  { id: 'model', label: 'Breath to minute' },
  { id: 'co2', label: 'Explain CO2' },
  { id: 'effort', label: 'Explain effort' },
  { id: 'return', label: 'Return to the patient' },
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document
      .querySelector<HTMLElement>('[data-prototype-step-heading]')
      ?.focus({ preventScroll: true });
  }, [step]);

  const reset = () => {
    setStep('notice');
    setPrediction(null);
  };

  return (
    <main className="min-h-dvh bg-[#f4f6f3] text-slate-950">
      <div className="mx-auto grid min-h-dvh max-w-7xl grid-rows-[auto_1fr] px-5 py-5 md:px-10 md:py-8">
        <header className="flex flex-col items-start justify-between gap-2 border-b border-slate-300/70 pb-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
            M02 · Teaching Case A
          </p>
          <p className="max-w-72 text-left text-xs leading-5 text-slate-500 sm:text-right">
            Synthetic teaching case · ungraded practice
          </p>
        </header>

        <section className="grid gap-8 py-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:py-12">
          <nav aria-label="Prototype progress">
            <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-3">
              {steps.map((item, index) => {
                const active = step === item.id;
                return (
                  <li
                    key={item.id}
                    aria-current={active ? 'step' : undefined}
                    className={`min-w-0 border-b-2 pb-2 text-sm leading-5 transition-colors ${
                      active
                        ? 'border-teal-700 font-semibold text-slate-950'
                        : 'border-slate-300 text-slate-500'
                    }`}
                  >
                    <span className="mr-2 font-mono text-xs text-slate-400">0{index + 1}</span>
                    {item.label}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="min-w-0">
            {step === 'notice' && <Notice onContinue={() => setStep('oxygen')} />}
            {step === 'oxygen' && <OxygenationTeaching onContinue={() => setStep('model')} />}
            {step === 'model' && (
              <PairedBreathModel
                prediction={prediction}
                onPredict={setPrediction}
                onContinue={() => setStep('co2')}
              />
            )}
            {step === 'co2' && <Co2Teaching onContinue={() => setStep('effort')} />}
            {step === 'effort' && <DemandEffortTeaching onContinue={() => setStep('return')} />}
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
      <blockquote className="mt-4 max-w-4xl border border-teal-700/40 bg-teal-50/40 px-5 py-4 text-2xl font-medium leading-9 text-slate-900 md:text-3xl">
        “{teachingCaseA.patient.quote}”
      </blockquote>
      <p className="mt-3 text-base text-slate-600">{teachingCaseA.patient.observation}</p>
      <h2
        id="case-a-heading"
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-7 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl"
      >
        How can these numbers coexist with a patient who says every breath feels difficult?
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        Build the physiology in three moves, then return to this same bedside snapshot.
      </p>

      <div className="mt-7 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 md:grid-cols-2">
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
      </div>

      <ol className="mt-7 grid gap-4 border-y border-slate-300 py-6 md:grid-cols-3">
        <li>
          <span className="font-mono text-xs text-teal-800">01</span>
          <p className="mt-2 font-semibold">Follow oxygen from support to the blood</p>
        </li>
        <li>
          <span className="font-mono text-xs text-teal-800">02</span>
          <p className="mt-2 font-semibold">Connect one breath to one minute and then to CO2</p>
        </li>
        <li>
          <span className="font-mono text-xs text-teal-800">03</span>
          <p className="mt-2 font-semibold">
            Explain why a displayed breath does not measure effort
          </p>
        </li>
      </ol>

      <PrototypeButton className="mt-8" onClick={onContinue}>
        Start with oxygen
      </PrototypeButton>
    </section>
  );
}

function OxygenationTeaching({ onContinue }: { readonly onContinue: () => void }) {
  const [phase, setPhase] = useState<OxygenPhase>('exchange');
  const [choice, setChoice] = useState<OxygenChoice>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (phase === 'carriage') {
      document
        .querySelector<HTMLElement>('[data-oxygen-phase-heading]')
        ?.focus({ preventScroll: true });
      document
        .querySelector<HTMLElement>('[data-oxygen-phase-heading]')
        ?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }, [phase]);

  const choose = (nextChoice: Exclude<OxygenChoice, null>) => {
    setChoice(nextChoice);
    setRevealed(false);
  };

  const feedback =
    choice === 'Snapshot B'
      ? 'You selected Snapshot B. Yes. The lower-hemoglobin sample has fewer oxygen carriers.'
      : choice === 'Snapshot A'
        ? 'You selected Snapshot A. Compare the amount of hemoglobin available in the two samples.'
        : 'You selected the same oxygen content. Saturation is the occupied fraction, not the number of available hemoglobin carriers.';

  return (
    <section aria-labelledby="oxygen-pathway-heading" className="max-w-6xl">
      <p className="text-sm font-semibold text-teal-800">Connected oxygen physiology</p>
      <h2
        id="oxygen-pathway-heading"
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Follow oxygen from support to systemic delivery.
      </h2>
      {phase === 'exchange' && (
        <>
          <div className="mt-5 max-w-4xl space-y-4 text-base leading-7 text-slate-700">
            <p>
              <strong>FiO2 identifies the set oxygen concentration of the inspired gas.</strong>{' '}
              Ventilation carries that oxygen-containing gas toward the alveoli. Pulmonary blood
              flow brings venous blood past the gas-exchange surface.
            </p>
            <p>
              Oxygen moves into blood where air and perfusion meet. The pulse oximeter then
              estimates the fraction of hemoglobin binding sites occupied by oxygen. It does not
              count how much hemoglobin is present.
            </p>
          </div>

          <OxygenExchangeDiagram />

          <section aria-labelledby="vq-heading" className="mt-10 border-t border-slate-300 pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
              Qualitative regional comparison
            </p>
            <h3 id="vq-heading" className="mt-2 text-2xl font-semibold">
              Change the balance between air and blood in one lung region.
            </h3>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Ventilation is the air path. Perfusion is the blood path. Their regional relationship
              affects how much that region contributes to the mixed arterial oxygen result. The
              arrows below show qualitative direction only.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <VQRegion
                title="Better matched region"
                ventilationWidth="72%"
                perfusionWidth="72%"
                summary="Ventilation and perfusion are better aligned."
              />
              <VQRegion
                title="Relatively low V/Q"
                ventilationWidth="34%"
                perfusionWidth="72%"
                summary="Less ventilation for the region’s perfusion; blood leaves less oxygenated."
              />
              <VQRegion
                title="Relatively high V/Q"
                ventilationWidth="72%"
                perfusionWidth="34%"
                summary="More ventilation for the region’s perfusion; some ventilation contributes less to exchange."
              />
            </div>
            <p className="mt-5 max-w-4xl text-sm leading-6 text-slate-600">
              This contrast does not assign a V/Q pattern, shunt, diagnosis, or oxygen response to
              Case A. V/Q mismatch is not the only possible cause of impaired oxygenation.
            </p>
          </section>
          <PrototypeButton className="mt-8" onClick={() => setPhase('carriage')}>
            Continue to oxygen carriage
          </PrototypeButton>
        </>
      )}

      {phase === 'carriage' && (
        <section
          aria-labelledby="hemoglobin-application-heading"
          className="mt-10 border-t border-slate-300 pt-7"
        >
          <p className="text-sm font-semibold text-teal-800">
            Air and blood meet regionally → arterial oxygenation
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            Oxygen carriage
          </p>
          <h3
            id="hemoglobin-application-heading"
            data-oxygen-phase-heading
            tabIndex={-1}
            className="mt-2 text-2xl font-semibold"
          >
            Same saturation, different carrier amount.
          </h3>
          <p className="mt-3 max-w-4xl leading-7 text-slate-700">
            Two fictional snapshots have the same arterial saturation, PaO2, and cardiac output.
            They differ in hemoglobin amount. Compare equal volumes of blood: the same fraction of
            binding sites is occupied in each snapshot, while the carrier diagrams show different
            amounts available in that equal volume.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 border-y border-slate-300 py-4 text-sm leading-6 text-slate-700">
            <p>
              <strong>Symbol:</strong> Each outlined cluster is one schematic hemoglobin carrier.
            </p>
            <p>
              <strong>Fill:</strong> Three of four binding-site dots are occupied in both samples.
            </p>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <HemoglobinSample
              title="Snapshot A"
              carrierCount={4}
              description="Four schematic carriers; same occupied fraction"
            />
            <HemoglobinSample
              title="Snapshot B"
              carrierCount={2}
              description="Two schematic carriers; same occupied fraction"
            />
          </div>

          <fieldset className="mt-7 border-y border-slate-300 py-6">
            <legend className="max-w-3xl text-lg font-semibold leading-7">
              Which snapshot carries less oxygen per volume of arterial blood and has lower systemic
              oxygen delivery under these held conditions?
            </legend>
            <div className="mt-4 flex flex-wrap gap-3">
              {(['Snapshot A', 'Snapshot B', 'Same oxygen content'] as const).map((option) => (
                <label
                  key={option}
                  className={`min-h-11 border px-5 py-2 text-sm font-semibold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-800 ${
                    choice === option
                      ? 'border-teal-800 bg-teal-800 text-white'
                      : 'border-slate-400 text-slate-900 hover:border-slate-950'
                  }`}
                >
                  <input
                    type="radio"
                    name="m02-oxygen-comparison"
                    className="sr-only"
                    checked={choice === option}
                    onChange={() => choose(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">Local practice only. No score or grader.</p>
            <PrototypeButton
              className="mt-5"
              disabled={choice === null}
              onClick={() => setRevealed(true)}
            >
              Compare with the explanation
            </PrototypeButton>
          </fieldset>

          {revealed && (
            <div className="mt-6 border border-teal-800/30 bg-teal-50 px-6 py-5">
              <p className="font-semibold" role="status" aria-live="polite">
                {feedback}
              </p>
              <p className="mt-4 border-t border-teal-800/20 pt-4 leading-7 text-slate-700">
                Snapshot B has lower arterial oxygen content because less hemoglobin is available to
                carry oxygen even though arterial saturation and PaO2 are the same. With cardiac
                output held equal, lower oxygen content also means lower systemic oxygen delivery in
                this simplified comparison. This does not establish regional tissue perfusion,
                tissue oxygen use, a treatment threshold, or why the hemoglobin differs.
              </p>
            </div>
          )}

          {revealed && (
            <section
              aria-labelledby="oxygen-summary-heading"
              className="mt-9 border-t border-slate-300 pt-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
                Complete oxygen pathway summary
              </p>
              <h3 id="oxygen-summary-heading" className="mt-2 text-2xl font-semibold">
                Put exchange, carriage, and blood flow together.
              </h3>
              <div
                className="mt-5 border-y border-slate-300"
                aria-label="Simplified oxygen pathway"
              >
                <ol className="grid lg:grid-cols-5">
                  <OxygenPathStep
                    number="01"
                    title="Set support"
                    primary="FiO2"
                    detail="Inspired-oxygen context"
                  />
                  <OxygenPathStep
                    number="02"
                    title="Pulmonary gas exchange"
                    primary="Ventilation meets pulmonary perfusion"
                    detail="Fresh gas and capillary blood meet regionally"
                  />
                  <OxygenPathStep
                    number="03"
                    title="Arterial oxygenation"
                    primary="SaO2; SpO2 estimates it"
                    detail="Occupied fraction of available binding sites"
                  />
                  <OxygenPathStep
                    number="04"
                    title="Oxygen content"
                    dependsOn={['Arterial saturation', 'Hemoglobin concentration']}
                    primary="Oxygen content"
                    detail="Mostly hemoglobin-bound, plus a small dissolved contribution"
                  />
                  <OxygenPathStep
                    number="05"
                    title="Systemic delivery"
                    dependsOn={['Oxygen content', 'Cardiac output']}
                    primary="Systemic oxygen delivery"
                    detail="Not regional tissue use or a treatment target"
                  />
                </ol>
              </div>
              <p className="mt-3 text-sm font-semibold text-teal-800">
                Simplified qualitative pathway, not a patient calculation or guaranteed response to
                changing FiO2
              </p>
            </section>
          )}

          <PrototypeButton className="mt-8" disabled={!revealed} onClick={onContinue}>
            Continue to the paired-breath model
          </PrototypeButton>
        </section>
      )}
    </section>
  );
}

function OxygenExchangeDiagram() {
  return (
    <figure
      className="mt-8 border-y border-slate-300 py-7"
      aria-labelledby="oxygen-exchange-caption"
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1fr)] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-800">
            Air path
          </p>
          <p className="mt-2 text-lg font-semibold">Fresh gas reaches the alveolus</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Ventilation carries inspired gas toward the gas-exchange surface.
          </p>
        </div>
        <div className="grid place-items-center" aria-hidden="true">
          <span className="h-24 w-24 rounded-[45%_55%_50%_50%] border-2 border-teal-700 bg-teal-50" />
          <span className="mt-2 text-xl text-teal-800">↓ O2</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            Blood path
          </p>
          <p className="mt-2 text-lg font-semibold">
            Pulmonary blood passes the gas-exchange surface
          </p>
          <div className="mt-3 flex items-center gap-2" aria-hidden="true">
            <span className="h-3 flex-1 bg-slate-300" />
            <span className="text-xl text-slate-700">→</span>
            <span className="h-3 flex-1 bg-teal-300" />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Where air and perfusion meet, oxygen moves into blood and contributes to the arterial
            oxygen result.
          </p>
        </div>
      </div>
      <figcaption id="oxygen-exchange-caption" className="mt-5 text-sm leading-6 text-slate-600">
        Gas-exchange surface: simplified regional relationship, not an anatomical measurement or a
        finding assigned to Teaching Case A.
      </figcaption>
    </figure>
  );
}

function OxygenPathStep({
  number,
  title,
  dependsOn,
  primary,
  detail,
}: {
  readonly number: string;
  readonly title: string;
  readonly dependsOn?: readonly [string, string];
  readonly primary: string;
  readonly detail: string;
}) {
  return (
    <li className="border-t border-slate-300 py-5 lg:border-t-0 lg:border-l lg:px-4 lg:first:border-l-0">
      <p className="font-mono text-xs text-teal-800">{number}</p>
      <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">
        {title}
      </h3>
      {dependsOn && (
        <div
          className="mt-3 grid gap-2 text-xs font-semibold leading-5 text-slate-700"
          aria-label={`${primary} depends on ${dependsOn[0]} and ${dependsOn[1]}`}
        >
          <span className="border border-slate-300 px-2 py-2">{dependsOn[0]}</span>
          <span className="text-center font-medium text-teal-800">depends on</span>
          <span className="border border-slate-300 px-2 py-2">{dependsOn[1]}</span>
        </div>
      )}
      {dependsOn && (
        <p className="mt-1 text-center text-teal-800" aria-hidden="true">
          ↓
        </p>
      )}
      <p className="mt-3 font-semibold text-slate-950">{primary}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </li>
  );
}

function VQRegion({
  title,
  ventilationWidth,
  perfusionWidth,
  summary,
}: {
  readonly title: string;
  readonly ventilationWidth: string;
  readonly perfusionWidth: string;
  readonly summary: string;
}) {
  return (
    <article className="border-t-2 border-slate-950 pt-4">
      <h4 className="font-semibold">{title}</h4>
      <div className="mt-4" aria-label={`${title}. ${summary}`}>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3">
          <div className="grid h-24 place-items-center rounded-[45%_55%_50%_50%] border-2 border-teal-700 bg-teal-50">
            <span className="text-xs font-semibold text-teal-900">Alveolus</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-800">
                Airflow toward alveolus
              </p>
              <div className="mt-1 h-2 bg-slate-200">
                <div className="h-full bg-teal-500" style={{ width: ventilationWidth }} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
                Blood flow past alveolus
              </p>
              <div className="mt-1 h-2 bg-slate-200">
                <div className="h-full bg-slate-800" style={{ width: perfusionWidth }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{summary}</p>
    </article>
  );
}

function HemoglobinSample({
  title,
  carrierCount,
  description,
}: {
  readonly title: string;
  readonly carrierCount: number;
  readonly description: string;
}) {
  return (
    <article className="border border-slate-300 px-5 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className="text-xs text-slate-500">Equal-volume schematic</span>
      </div>
      <div
        className="mt-5 flex min-h-16 flex-wrap content-start gap-2"
        aria-label={`${title}: ${description}. Schematic carrier amount, not a measured count.`}
      >
        {Array.from({ length: carrierCount }, (_, carrierIndex) => (
          <span
            key={`${title}-${carrierIndex}`}
            className="grid h-14 w-14 grid-cols-2 gap-1 rounded-md border border-slate-500 bg-[#fbfcfa] p-2"
            aria-hidden="true"
          >
            {[0, 1, 2, 3].map((siteIndex) => (
              <span
                key={siteIndex}
                className={`rounded-full border border-slate-500 ${siteIndex < 3 ? 'bg-teal-300' : 'bg-[#fbfcfa]'}`}
              />
            ))}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">{description}</p>
      <p className="mt-2 text-xs text-slate-500">
        Same arterial saturation and PaO2 · equal blood volume
      </p>
    </article>
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
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Watch a fixed portion repeat across one minute.
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        For this comparison only, assume that{' '}
        <strong>0.15 L of each breath does not participate in gas exchange.</strong>
      </p>
      <p className="mt-4 max-w-4xl leading-7 text-slate-700">
        A breath can move gas without all of it contributing equally to exchange. Some occupies
        conducting airways before reaching alveoli. Some reaches ventilated alveoli that contribute
        little or no exchange because perfusion is limited. This model combines those contributors
        into one fixed 0.15 L teaching assumption.
      </p>
      <p className="mt-3 text-sm font-semibold text-teal-800">
        Fixed teaching assumption—not a patient measurement
      </p>

      <div className="mt-10 border-y border-slate-300 py-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
              One breath · L
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Pattern A’s 0.50 L breath is twice Pattern B’s 0.25 L breath. The pale 0.15 L portion
              keeps the same absolute width in both.
            </p>
          </div>
          <p className="border-l border-slate-300 pl-4 text-sm leading-6 text-slate-600">
            <strong>Count the breaths · breaths/min</strong>
            <br />
            Pattern A repeats 20 times; Pattern B repeats 40 times.
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 md:gap-8">
        {patterns.map((pattern) => {
          const widthPercent =
            (pattern.tidalVolumeLiters / pairedBreathModel.patternA.tidalVolumeLiters) * 100;
          const excludedPercent =
            (pairedBreathModel.assumptionLitersPerBreath / pattern.tidalVolumeLiters) * 100;
          return (
            <article key={pattern.name} className="min-w-0 border-t-2 border-slate-950 pt-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold sm:text-2xl">{pattern.name}</h3>
                <p className="font-mono text-xs text-slate-500 sm:text-sm">
                  {pattern.tidalVolumeLiters.toFixed(2)} L × {pattern.respiratoryRate} breaths/min
                </p>
              </div>
              <p className="mt-4 text-lg font-medium">
                One breath: {pattern.tidalVolumeLiters.toFixed(2)} L
              </p>
              <div
                className="mt-8 h-20 border-b border-slate-300"
                aria-label={`${pattern.name} representative breath`}
              >
                <div className="flex h-full" style={{ width: `${widthPercent}%` }}>
                  <div
                    className="shrink-0 border border-r-0 border-teal-800 bg-teal-100"
                    style={{ width: `${excludedPercent}%` }}
                  >
                    <span className="sr-only">0.15 L assumed non-gas-exchanging portion</span>
                  </div>
                  <div className="flex-1 border border-slate-950 bg-slate-950" />
                </div>
              </div>
              <p className="mt-2 text-xs">
                <strong>0.15 L assumed non-gas-exchanging portion</strong> +{' '}
                <strong>
                  {(pattern.tidalVolumeLiters - 0.15).toFixed(2)} L modeled gas-exchanging portion
                </strong>
              </p>
              <div className="mt-5 border-t border-dashed border-slate-400 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                  Repeat across one minute
                </p>
                <p className="mt-2 font-semibold">
                  Count this breath {pattern.respiratoryRate} times
                </p>
              </div>
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
              className={`min-h-11 border px-5 py-2 text-sm font-semibold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-800 ${
                prediction === pattern.name
                  ? 'border-teal-800 bg-teal-800 text-white'
                  : 'border-slate-400 bg-transparent text-slate-900 hover:border-slate-950'
              }`}
            >
              <input
                type="radio"
                name="m02-prediction"
                className="peer sr-only"
                checked={prediction === pattern.name}
                onChange={() => onPredict(pattern.name)}
              />
              {pattern.name}
            </label>
          ))}
        </div>
      </fieldset>

      {revealed && (
        <div className="mt-8 border border-teal-800/30 bg-teal-50 px-6 py-5">
          <p className="text-lg font-semibold" role="status" aria-live="polite">
            {prediction === 'Pattern A'
              ? 'You selected Pattern A. Yes. Follow the fixed portion across one minute.'
              : 'You selected Pattern B. Compare how often the fixed 0.15 L portion is counted.'}
          </p>
        </div>
      )}

      {revealed && (
        <section
          aria-labelledby="one-minute-heading"
          className="mt-8 border-y border-slate-300 py-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            One minute · L/min
          </p>
          <h3 id="one-minute-heading" className="mt-2 text-2xl font-semibold">
            Count each portion at the pattern’s breathing rate.
          </h3>
          <p className="mt-2 max-w-3xl leading-7 text-slate-700">
            The smaller breath gives the fixed portion a larger share. Pattern B also repeats that
            fixed portion twice as often. Both patterns still total 10 L/min, but their modeled
            partitions differ.
          </p>
          <div className="mt-5 grid gap-5 text-sm leading-6 md:grid-cols-2">
            <article className="border-t border-slate-400 pt-3">
              <p className="font-semibold">Pattern A · 20 breaths/min</p>
              <p className="mt-2">0.15 L × 20 breaths = 3 L/min assumed non-gas-exchanging</p>
              <p>0.35 L modeled gas-exchanging portion × 20 = 7 L/min</p>
            </article>
            <article className="border-t border-slate-400 pt-3">
              <p className="font-semibold">Pattern B · 40 breaths/min</p>
              <p className="mt-2">0.15 L × 40 breaths = 6 L/min assumed non-gas-exchanging</p>
              <p>0.10 L modeled gas-exchanging portion × 40 = 4 L/min</p>
            </article>
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <MinuteBar
              label="Pattern A · 10 L/min"
              assumed="3 L/min assumed non-gas-exchanging"
              alveolar="7 L/min modeled alveolar ventilation"
              totalTestId="minute-a-total"
              assumedTestId="minute-a-assumed"
              alveolarTestId="minute-a-alveolar"
              assumedWidth="30%"
              alveolarWidth="70%"
            />
            <MinuteBar
              label="Pattern B · 10 L/min"
              assumed="6 L/min assumed non-gas-exchanging"
              alveolar="4 L/min modeled alveolar ventilation"
              totalTestId="minute-b-total"
              assumedTestId="minute-b-assumed"
              alveolarTestId="minute-b-alveolar"
              assumedWidth="60%"
              alveolarWidth="40%"
            />
          </div>
        </section>
      )}

      <PrototypeButton className="mt-8" disabled={!revealed} onClick={onContinue}>
        Use modeled alveolar ventilation to explain CO2
      </PrototypeButton>
    </section>
  );
}

function Co2Teaching({ onContinue }: { readonly onContinue: () => void }) {
  const [choice, setChoice] = useState<Co2Choice>(null);
  const [revealed, setRevealed] = useState(false);

  const choose = (nextChoice: Exclude<Co2Choice, null>) => {
    setChoice(nextChoice);
    setRevealed(false);
  };

  const feedback =
    choice === 'Model Y'
      ? 'You selected Model Y. Yes. The same production with less alveolar ventilation corresponds to a higher steady-state CO2 concentration.'
      : choice === 'Model X'
        ? 'You selected Model X. Both models produce CO2 at the same rate; compare which model moves less alveolar gas available for CO2 elimination.'
        : 'You selected the same modeled PaCO2. With production held constant, changing alveolar ventilation changes the steady-state concentration associated with eliminating that production.';

  return (
    <section aria-labelledby="co2-teaching-heading" className="max-w-6xl">
      <p className="text-sm font-semibold text-teal-800">
        From alveolar ventilation to arterial CO2
      </p>
      <h2
        id="co2-teaching-heading"
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl"
      >
        The fraction summarizes a rate balance.
      </h2>
      <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
        CO2 is produced at a rate. Alveolar ventilation carries CO2-containing gas out of the lungs.
        At steady state, CO2 elimination equals CO2 production. PaCO2 reflects the CO2 concentration
        associated with achieving that balance at the current alveolar ventilation.
      </p>

      <figure className="mt-8 border-y border-slate-300 py-7" aria-labelledby="co2-flow-caption">
        <div data-testid="co2-rate-relationship" className="grid gap-4 md:grid-cols-2">
          <div className="border border-slate-300 bg-[#fbfcfa] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
              CO2 production rate
            </p>
            <p className="mt-2 font-semibold">Adds CO2 to the body</p>
            <p className="mt-3 text-center text-xl text-teal-800" aria-hidden="true">
              ↘
            </p>
          </div>
          <div className="border border-slate-300 bg-[#fbfcfa] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
              Alveolar ventilation rate
            </p>
            <p className="mt-2 font-semibold">Moves alveolar gas through the lungs</p>
            <p className="mt-3 text-center text-xl text-teal-800" aria-hidden="true">
              ↙
            </p>
          </div>
          <div className="border border-teal-700 bg-teal-50/40 px-5 py-5 text-center md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
              Steady-state relationship
            </p>
            <p className="mt-2 text-lg font-semibold">
              Steady-state PaCO2 reflects the relationship between these rates
            </p>
          </div>
        </div>
        <figcaption id="co2-flow-caption" className="mt-5 text-sm leading-6 text-slate-600">
          At each modeled steady state, elimination equals production. A different PaCO2 does not
          mean production and elimination remain out of balance.
        </figcaption>
      </figure>

      <section
        aria-labelledby="co2-relationship-heading"
        className="mt-8 max-w-4xl border border-teal-700/40 bg-white px-6 py-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          CO2 production relative to alveolar ventilation
        </p>
        <h3 id="co2-relationship-heading" className="mt-2 text-2xl font-semibold">
          Use the relationship after the rates have meaning.
        </h3>
        <div
          className="mt-5 flex flex-wrap items-center gap-3 text-xl font-semibold text-slate-950"
          aria-label="PaCO2 approximately equals K times carbon dioxide production divided by alveolar ventilation"
        >
          <span>PaCO2 ≈ K ×</span>
          <span className="inline-grid text-center leading-6">
            <span className="border-b-2 border-slate-950 px-2 pb-1 text-base">CO2 production</span>
            <span className="px-2 pt-1 text-base">alveolar ventilation</span>
          </span>
        </div>
        <div className="mt-6 grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
          <p className="border-t border-slate-300 pt-3">
            We assume steady state and negligible inspired CO2. Under those assumptions, CO2
            elimination equals production.
          </p>
          <p className="border-t border-slate-300 pt-3">
            K keeps the units and gas-reference conditions consistent; it is not a patient input or
            an adjustable value here.
          </p>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-600">
          Production is held constant for the comparison. This is a simplified relationship, not a
          Case A calculation or a prediction of the measured PaCO2.
        </p>
      </section>

      <section
        aria-labelledby="co2-application-heading"
        className="mt-9 border-t border-slate-300 pt-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
          Local application · CO2 direction
        </p>
        <h3 id="co2-application-heading" className="mt-2 text-2xl font-semibold">
          Hold production constant; change alveolar ventilation only.
        </h3>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Model Y has lower modeled alveolar ventilation than Model X. Under simplified steady-state
          conditions with negligible inspired CO2 and equal production, which model has the higher
          modeled PaCO2?
        </p>
        <fieldset className="mt-5 border-y border-slate-300 py-6">
          <legend className="text-lg font-semibold">
            Choose before revealing the explanation.
          </legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {(['Model X', 'Model Y', 'Same modeled PaCO2'] as const).map((option) => (
              <label
                key={option}
                className={`min-h-11 border px-5 py-2 text-sm font-semibold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-800 ${
                  choice === option
                    ? 'border-teal-800 bg-teal-800 text-white'
                    : 'border-slate-400 text-slate-900 hover:border-slate-950'
                }`}
              >
                <input
                  type="radio"
                  name="m02-co2-application"
                  className="sr-only"
                  checked={choice === option}
                  onChange={() => choose(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">Local practice only. No score or grader.</p>
          <PrototypeButton
            className="mt-5"
            disabled={choice === null}
            onClick={() => setRevealed(true)}
          >
            Compare with the physiology
          </PrototypeButton>
        </fieldset>
        {revealed && (
          <div className="mt-6 border border-teal-800/30 bg-teal-50 px-6 py-5">
            <p className="font-semibold" role="status" aria-live="polite">
              {feedback}
            </p>
            <p className="mt-4 border-t border-teal-800/20 pt-4 leading-7 text-slate-700">
              Model Y has the higher modeled PaCO2. With the same CO2 production and less alveolar
              ventilation available to carry CO2 out, the steady-state concentration is higher. At
              that new steady state, elimination still equals production.
            </p>
          </div>
        )}
      </section>

      <PrototypeButton className="mt-8" disabled={!revealed} onClick={onContinue}>
        Explain breathing effort and experience
      </PrototypeButton>
    </section>
  );
}

function DemandEffortTeaching({ onContinue }: { readonly onContinue: () => void }) {
  const [phase, setPhase] = useState<EffortPhase>('drive');
  const [assistanceChoice, setAssistanceChoice] = useState<AssistanceChoice>(null);
  const [assistanceRevealed, setAssistanceRevealed] = useState(false);

  useEffect(() => {
    if (phase !== 'drive') {
      document
        .querySelector<HTMLElement>('[data-effort-phase-heading]')
        ?.focus({ preventScroll: true });
      document
        .querySelector<HTMLElement>('[data-effort-phase-heading]')
        ?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }, [phase]);

  const chooseAssistance = (choice: Exclude<AssistanceChoice, null>) => {
    setAssistanceChoice(choice);
    setAssistanceRevealed(false);
  };

  const assistanceFeedback =
    assistanceChoice === 'Model B'
      ? 'You selected Model B. Yes. Less actual inspiratory assistance means more muscular contribution is required under the held conditions.'
      : assistanceChoice === 'Model A'
        ? 'You selected Model A. Both models produce the same breath; identify which one receives less actual inspiratory assistance.'
        : 'You selected the same muscle contribution. The output is held equal, but the ventilator contribution is not.';

  return (
    <section aria-labelledby="effort-teaching-heading" className="max-w-6xl">
      <p className="text-sm font-semibold text-teal-800">Breathing effort and experience</p>
      <h2
        id="effort-teaching-heading"
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl"
      >
        Trace what produces the breath, then what the patient experiences.
      </h2>
      <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
        A displayed volume is the achieved result. During assisted ventilation, that result can
        reflect both respiratory-muscle effort and actual delivered ventilator assistance.
      </p>

      {phase === 'drive' && (
        <section
          aria-labelledby="effort-drive-heading"
          className="mt-10 border-y border-slate-300 py-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            1 · Demand and command
          </p>
          <h3 id="effort-drive-heading" className="mt-2 text-2xl font-semibold">
            The body wants something from breathing.
          </h3>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Respiratory demand describes what breathing must accomplish under the current
            physiological and mechanical conditions. That demand influences respiratory drive, the
            neural command generated by the respiratory centers.
          </p>
          <div className="mt-6 grid gap-3 text-center sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
            <p className="border border-slate-300 bg-[#fbfcfa] px-4 py-4 font-semibold">
              Respiratory demand
            </p>
            <span className="text-xl text-teal-800" aria-hidden="true">
              →
            </span>
            <p className="border border-teal-700 bg-teal-50 px-4 py-4 font-semibold">
              Respiratory drive / command
            </p>
          </div>
          <PrototypeButton className="mt-7" onClick={() => setPhase('contributors')}>
            Continue to muscles and assistance
          </PrototypeButton>
        </section>
      )}

      {phase === 'contributors' && (
        <section
          aria-labelledby="effort-contributors-heading"
          className="mt-10 border-y border-slate-300 py-7"
        >
          <p className="text-sm font-semibold text-teal-800">Demand influences drive / command</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
            2 · Produce the breath
          </p>
          <h3
            id="effort-contributors-heading"
            data-effort-phase-heading
            tabIndex={-1}
            className="mt-2 text-2xl font-semibold"
          >
            Muscles act against load, within their capacity.
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="border border-slate-300 bg-[#fbfcfa] px-4 py-4">
              <p className="font-semibold">Patient respiratory muscles</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Mechanical load opposes movement. Muscle capacity affects how much force the muscles
                can generate.
              </p>
            </div>
            <div className="border border-slate-300 bg-[#fbfcfa] px-4 py-4">
              <p className="font-semibold">Actual delivered ventilator assistance</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                During assisted ventilation, the machine can contribute to the same achieved breath.
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xl text-teal-800" aria-hidden="true">
            ↓ contributions join
          </p>
          <p className="mt-3 border border-teal-700 bg-teal-50 px-4 py-4 text-center font-semibold">
            Patient muscle effort and actual delivered ventilator assistance contribute to achieved
            breathing
          </p>
          <PrototypeButton className="mt-7" onClick={() => setPhase('feedback')}>
            Continue to sensory feedback
          </PrototypeButton>
        </section>
      )}

      {phase === 'feedback' && (
        <>
          <section
            aria-labelledby="effort-map-heading"
            className="mt-12 border-t border-slate-300 pt-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
              Connected physiology
            </p>
            <h3
              id="effort-map-heading"
              data-effort-phase-heading
              tabIndex={-1}
              className="mt-2 text-2xl font-semibold"
            >
              A displayed breath is an outcome, not a measurement of the patient’s share.
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 leading-7 text-slate-700">
              <p>
                <strong>Respiratory demand describes what breathing must accomplish.</strong>{' '}
                Respiratory drive is the neural command generated by the respiratory centers. They
                are related, but neither is the muscular effort that follows.
              </p>
              <p>
                Respiratory muscles generate effort against elastic and resistive mechanical load.
                Muscle capacity affects how much pressure those muscles can generate. During
                assisted ventilation, patient muscle effort and ventilator assistance can both
                contribute to the achieved breath.
              </p>
            </div>

            <div
              className="mt-7 border-y border-slate-300 py-6"
              aria-label="General relationship map from respiratory demand and drive through achieved breathing and sensory feedback"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-stretch">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                    Respiratory demand
                  </p>
                  <p className="text-sm leading-6 text-slate-600">
                    What breathing must accomplish in the current conditions
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    ↓ influences, but is not identical to
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                    Respiratory command
                  </p>
                  <p className="text-lg font-semibold">Respiratory drive</p>
                  <p className="text-sm leading-6 text-slate-600">
                    Neural output from respiratory centers
                  </p>
                  <div className="border-t border-dashed border-slate-400 pt-3">
                    <p className="text-sm font-semibold">Expected sensory consequences</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      The respiratory command carries an expectation of the breathing that should
                      result.
                    </p>
                  </div>
                </div>

                <div className="border-y border-slate-300 py-4 lg:border-x lg:border-y-0 lg:px-6 lg:py-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Respiratory command activates
                  </p>
                  <p className="mt-2 text-lg font-semibold">Patient respiratory muscles</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold">Mechanical load</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Elastic and resistive forces oppose movement.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Muscle capacity</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Ability of respiratory muscles to generate force.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <p className="border border-slate-300 px-4 py-3 text-sm font-semibold">
                      Patient muscle effort
                    </p>
                    <p className="border border-slate-300 px-4 py-3 text-sm font-semibold">
                      Actual delivered ventilator assistance
                    </p>
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-slate-500">
                    contributions join to produce ↓
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                    Achieved breathing
                  </p>
                  <p className="mt-2 text-lg font-semibold">Resulting flow, volume, and timing</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
                    Actual sensory feedback returns toward the brain
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Information about achieved breathing returns toward the brain.
                  </p>
                </div>
              </div>
              <div className="mt-6 border-t border-dashed border-slate-400 pt-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
                  <p className="text-sm font-semibold text-slate-700">
                    Expected sensory consequences from the respiratory command
                  </p>
                  <p
                    className="text-center text-2xl font-semibold text-teal-800"
                    aria-hidden="true"
                  >
                    ↔
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    Actual sensory feedback from achieved breathing
                  </p>
                </div>
                <p className="mt-4 text-center text-lg font-semibold">
                  Expected ↔ actual comparison
                </p>
                <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-600">
                  A mismatch can contribute to breathing discomfort. This is one general explanatory
                  model, not the only cause of dyspnoea and not a diagnosis of Teaching Case A.
                </p>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="assistance-application-heading"
            className="mt-12 border-t border-slate-300 pt-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">
              Local application 02 · Assistance and contribution
            </p>
            <h3 id="assistance-application-heading" className="mt-2 text-2xl font-semibold">
              Hold the modeled breath and mechanics constant.
            </h3>
            <div className="mt-5 max-w-4xl border-y border-slate-300 py-5 text-sm leading-6 text-slate-700">
              <p>
                Compare two modeled assisted breaths with the{' '}
                <strong>same modeled volume-and-flow pattern over time</strong>.
              </p>
              <p className="mt-2">
                Resistance, elasticity, end-expiratory conditions, timing, starting conditions, and
                muscle capacity stay the same.
              </p>
              <p className="mt-2">
                The bars show different relative amounts of actual delivered inspiratory assistance.
              </p>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <article className="border-t-2 border-slate-950 pt-4">
                <h4 className="text-lg font-semibold">Model A</h4>
                <div className="mt-4 text-sm">
                  <p className="font-semibold">Actual delivered ventilator assistance</p>
                  <div
                    className="mt-2 h-4 bg-slate-200"
                    aria-label="Model A relative delivered-assistance amount"
                  >
                    <span className="block h-full w-3/4 bg-teal-500" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-2 border border-teal-700 bg-teal-50 px-3 py-3 text-center font-semibold">
                  Same modeled volume-and-flow pattern over time
                </p>
              </article>
              <article className="border-t-2 border-slate-950 pt-4">
                <h4 className="text-lg font-semibold">Model B</h4>
                <div className="mt-4 text-sm">
                  <p className="font-semibold">Actual delivered ventilator assistance</p>
                  <div
                    className="mt-2 h-4 bg-slate-200"
                    aria-label="Model B relative delivered-assistance amount"
                  >
                    <span className="block h-full w-[35%] bg-teal-500" aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-2 border border-teal-700 bg-teal-50 px-3 py-3 text-center font-semibold">
                  Same modeled volume-and-flow pattern over time
                </p>
              </article>
            </div>
            <fieldset className="mt-6 border-y border-slate-300 py-6">
              <legend className="max-w-4xl text-lg font-semibold leading-7">
                Which model requires the greater respiratory-muscle contribution to produce the same
                modeled breath?
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {(['Model A', 'Model B', 'Same muscle contribution'] as const).map((option) => (
                  <label
                    key={option}
                    className={`min-h-11 border px-5 py-2 text-sm font-semibold transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-800 ${
                      assistanceChoice === option
                        ? 'border-teal-800 bg-teal-800 text-white'
                        : 'border-slate-400 text-slate-900 hover:border-slate-950'
                    }`}
                  >
                    <input
                      type="radio"
                      name="m02-assistance-comparison"
                      className="sr-only"
                      checked={assistanceChoice === option}
                      onChange={() => chooseAssistance(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Local practice only. No score or grader.
              </p>
              <PrototypeButton
                className="mt-5"
                disabled={assistanceChoice === null}
                onClick={() => setAssistanceRevealed(true)}
              >
                Compare the required contributions
              </PrototypeButton>
            </fieldset>
            {assistanceRevealed && (
              <div className="mt-6 border border-teal-800/30 bg-teal-50 px-6 py-5">
                <p className="font-semibold" role="status" aria-live="polite">
                  {assistanceFeedback}
                </p>
                <div className="mt-4 grid gap-3 border-t border-teal-800/20 pt-4 text-sm font-semibold md:grid-cols-2">
                  <p className="border border-teal-700/40 bg-white px-4 py-3">
                    Model A → less required muscular contribution
                  </p>
                  <p className="border border-teal-700/40 bg-white px-4 py-3">
                    Model B → more required muscular contribution
                  </p>
                </div>
                <p className="mt-4 leading-7 text-slate-700">
                  Model B requires the greater respiratory-muscle contribution. With the same
                  modeled breath and held mechanical, timing, starting, and muscle-capacity
                  conditions, the muscles must contribute more when the ventilator contributes less.
                  That contribution is required to produce the same modeled breath; it does not
                  guarantee patient compensation, measure drive, predict symptoms, or recommend a
                  setting.
                </p>
              </div>
            )}
          </section>

          <PrototypeButton className="mt-10" disabled={!assistanceRevealed} onClick={onContinue}>
            Return to Teaching Case A
          </PrototypeButton>
        </>
      )}
    </section>
  );
}

function ReturnToCaseA({ onRestart }: { readonly onRestart: () => void }) {
  return (
    <section aria-labelledby="return-case-a-heading" className="max-w-5xl">
      <p className="text-sm font-semibold text-teal-800">Back to Teaching Case A</p>
      <h2
        id="return-case-a-heading"
        data-prototype-step-heading
        tabIndex={-1}
        className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight md:text-4xl"
      >
        These findings can coexist because they answer different physiological questions.
      </h2>
      <div className="mt-8 grid gap-px overflow-hidden border border-slate-300 bg-slate-300 sm:grid-cols-2">
        {caseFacts.map((fact) => (
          <div key={fact.label} className="bg-[#fbfcfa] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {fact.label}
            </p>
            <p className="mt-1 text-lg font-semibold">{fact.value}</p>
          </div>
        ))}
        <div className="bg-[#fbfcfa] p-4 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Patient / bedside
          </p>
          <p className="mt-2 text-lg font-medium">“{teachingCaseA.patient.quote}”</p>
          <p className="mt-1 text-sm text-slate-600">{teachingCaseA.patient.observation}</p>
        </div>
      </div>
      <section className="mt-8 max-w-5xl" aria-labelledby="case-a-synthesis-heading">
        <h3 id="case-a-synthesis-heading" className="text-2xl font-semibold">
          What the lesson now lets you say
        </h3>
        <div className="mt-5 grid gap-px border border-slate-300 bg-slate-300 md:grid-cols-3">
          <article className="bg-[#fbfcfa] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">CO2</p>
            <p className="mt-2 leading-7 text-slate-700">
              The measured PaCO2 describes current arterial CO2 at this support and time. The 8.0
              L/min display describes total gas moved, not how much reached effective exchange.
            </p>
          </article>
          <article className="bg-[#fbfcfa] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
              Oxygen
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              The SpO2 is an estimated arterial saturation on FiO2 0.50. Saturation is not the
              amount of hemoglobin, oxygen content, or systemic delivery.
            </p>
          </article>
          <article className="bg-[#fbfcfa] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-800">
              Breathing experience
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              The patient’s report establishes real breathing difficulty. Accessory-muscle activity
              adds an effort-related observation; the displayed volume does not measure the muscular
              contribution used to produce it.
            </p>
          </article>
        </div>
        <article className="mt-6 border border-teal-700/40 bg-teal-50/30 px-5 py-5 leading-7 text-slate-700">
          <h4 className="text-lg font-semibold text-slate-950">
            What remains unresolved is specific.
          </h4>
          <p className="mt-2">
            Case A does not supply the dead-space input needed to partition 8.0 L/min, so the
            model’s 0.15 L assumption cannot be borrowed. It also does not supply hemoglobin
            concentration, cardiac output, quantified respiratory-muscle work, or the cause of the
            patient’s discomfort. Those limits do not erase the useful conclusions above.
          </p>
        </article>
      </section>
      <PrototypeButton className="mt-8" onClick={onRestart}>
        Restart the teaching segment
      </PrototypeButton>
    </section>
  );
}

function MinuteBar({
  label,
  assumed,
  alveolar,
  totalTestId,
  assumedTestId,
  alveolarTestId,
  assumedWidth,
  alveolarWidth,
}: {
  readonly label: string;
  readonly assumed: string;
  readonly alveolar: string;
  readonly totalTestId: string;
  readonly assumedTestId: string;
  readonly alveolarTestId: string;
  readonly assumedWidth: string;
  readonly alveolarWidth: string;
}) {
  return (
    <article>
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <div
        data-testid={totalTestId}
        className="mt-3 flex h-9 w-full overflow-hidden border border-slate-950"
      >
        <span
          data-testid={assumedTestId}
          className="shrink-0 bg-teal-200"
          style={{ width: assumedWidth }}
          aria-label={assumed}
        />
        <span
          data-testid={alveolarTestId}
          className="shrink-0 bg-slate-950"
          style={{ width: alveolarWidth }}
          aria-label={alveolar}
        />
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-700">
        <strong>{assumed}</strong> + <strong>{alveolar}</strong>
      </p>
    </article>
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
