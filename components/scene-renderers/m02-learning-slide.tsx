'use client';

import { useState } from 'react';

export function M02LearningSlide({ sceneId }: { readonly sceneId: string }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<Record<string, string>>({});
  const next = () => setStep((value) => value + 1);
  const card = 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm';
  if (sceneId === 'm02-orient')
    return (
      <section aria-labelledby="m02-orient-heading" className="mx-auto max-w-4xl space-y-6 p-8">
        <h2 id="m02-orient-heading" className="text-3xl font-semibold">
          One snapshot. Different questions.
        </h2>
        <p className="text-xl">
          A saturation, a minute-volume display, and a patient report of breathing difficulty may
          all be true at the same time.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className={card}>
            <b>DISPLAYED</b>
            <br />
            SpO2
          </div>
          <div className={card}>
            <b>DISPLAYED</b>
            <br />
            Exhaled minute volume
          </div>
          <div className={card}>
            <b>PATIENT REPORT</b>
            <br />
            Patient reports that breathing feels difficult
          </div>
        </div>
        <p className="font-medium">
          Which question does each piece of evidence actually help answer?
        </p>
        {step === 0 ? (
          <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
            Continue
          </button>
        ) : (
          <p role="status" className="font-semibold">
            Each helps answer a different question.
          </p>
        )}
      </section>
    );
  if (sceneId === 'm02-pathways') {
    const paths = [
      [
        'OXYGEN PATHWAY',
        'Inspired O2/support → lung transfer → arterial oxygenation → hemoglobin/content/perfusion as downstream context',
      ],
      [
        'EFFECTIVE CO2 PATHWAY',
        'Total gas moved → non-gas-exchanging portion → modeled alveolar portion → CO2 evidence in context',
      ],
      [
        'BREATHING DEMAND / EFFORT-RELATED EVIDENCE',
        'Drive, load, and support; patient breathing experience; effort-related observation; measured muscle effort is a different datum',
      ],
    ];
    return (
      <section aria-labelledby="m02-pathways-heading" className="mx-auto max-w-5xl space-y-5 p-8">
        <h2 id="m02-pathways-heading" className="text-3xl font-semibold">
          PATIENT + CURRENT SUPPORT + TIME CONTEXT
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.slice(0, Math.min(step + 1, 3)).map(([title, body]) => (
            <article key={title} className={card}>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2">{body}</p>
            </article>
          ))}
        </div>
        {step < 3 ? (
          <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
            Reveal next pathway
          </button>
        ) : (
          <div className="space-y-3">
            <p role="status" className="font-semibold">
              Related questions. Different evidence.
            </p>
            {[
              [
                'oxygen',
                'Current inspired-oxygen/support setting',
                'OXYGEN PATHWAY',
                'Support context helps interpret oxygenation evidence. It is not an oxygen-delivery calculation.',
              ],
              [
                'co2',
                'Time-matched arterial PaCO2',
                'EFFECTIVE CO2 PATHWAY',
                'This is current arterial CO2 evidence under the stated conditions. It is not a global adequacy label.',
              ],
              [
                'volume',
                'Exhaled minute volume over a stated interval',
                'EFFECTIVE CO2 PATHWAY',
                'This describes total gas moved over the interval. It does not by itself supply effective or alveolar ventilation.',
              ],
              [
                'report',
                'Patient report of breathing discomfort',
                'BREATHING DEMAND / EFFORT-RELATED EVIDENCE',
                'This is meaningful qualitative evidence. It does not quantify respiratory-muscle effort or establish a mechanism.',
              ],
            ].map(([id, label, correct, reveal]) => (
              <fieldset key={id} className={card}>
                <legend className="font-medium">{label}</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {paths.map(([path]) => (
                    <button
                      key={path}
                      aria-pressed={choice[id] === path}
                      onClick={() => setChoice((current) => ({ ...current, [id]: path }))}
                      className="rounded border px-2 py-1 text-sm"
                    >
                      {path}
                    </button>
                  ))}
                </div>
                {choice[id] && (
                  <p role="status" className="mt-2 text-sm">
                    {choice[id] === correct
                      ? reveal
                      : `Try again: ${correct} is the pathway this item most directly helps address.`}
                  </p>
                )}
              </fieldset>
            ))}
          </div>
        )}
      </section>
    );
  }
  if (sceneId === 'm02-paired-breaths')
    return (
      <section aria-labelledby="m02-paired-heading" className="mx-auto max-w-5xl space-y-5 p-8">
        <h2 id="m02-paired-heading" className="text-3xl font-semibold">
          Same total gas moved, different modeled portion
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <article className={card}>
            <h3 className="font-bold">Pattern A</h3>
            <p>RR 20/min · VT 0.50 L</p>
            {step >= 2 && (
              <>
                <div className="mt-2 flex h-8 w-full border">
                  <span className="border-r px-1 text-xs" style={{ width: '30%' }}>
                    0.15 L stated
                  </span>
                  <span className="px-1 text-xs" style={{ width: '70%' }}>
                    0.35 L modeled
                  </span>
                </div>
                <p>0.15 L stated non-gas-exchanging + 0.35 L modeled exchange-reaching</p>
              </>
            )}
            {step >= 3 && <p className="font-semibold">Total 10.0 L/min · modeled 7.0 L/min</p>}
          </article>
          <article className={card}>
            <h3 className="font-bold">Pattern B</h3>
            <p>RR 40/min · VT 0.25 L</p>
            {step >= 2 && (
              <>
                <div className="mt-2 flex h-8 w-1/2 border">
                  <span className="border-r px-1 text-xs" style={{ width: '60%' }}>
                    0.15 L stated
                  </span>
                  <span className="px-1 text-xs" style={{ width: '40%' }}>
                    0.10 L modeled
                  </span>
                </div>
                <p>0.15 L stated non-gas-exchanging + 0.10 L modeled exchange-reaching</p>
              </>
            )}
            {step >= 3 && <p className="font-semibold">Total 10.0 L/min · modeled 4.0 L/min</p>}
          </article>
        </div>
        {step === 0 && (
          <>
            <p>Both patterns move 10.0 L/min total gas.</p>
            <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
              Make a prediction
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <p>
              Will modeled gas reaching exchange units be the same, different, or impossible to
              judge until an assumption is stated?
            </p>
            <div
              role="radiogroup"
              aria-label="Paired-breath prediction"
              className="flex flex-wrap gap-2"
            >
              {['Same', 'Different', 'Cannot tell until an assumption is stated'].map((answer) => (
                <button
                  key={answer}
                  role="radio"
                  aria-checked={choice.prediction === answer}
                  onClick={() => setChoice((current) => ({ ...current, prediction: answer }))}
                  className="rounded border px-3 py-2"
                >
                  {answer}
                </button>
              ))}
            </div>
            {choice.prediction && (
              <>
                <p role="status">
                  {choice.prediction === 'Cannot tell until an assumption is stated'
                    ? 'Cannot tell until an assumption is stated.'
                    : 'Total minute ventilation alone does not tell us the size of the non-gas-exchanging portion.'}
                </p>
                <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
                  Reveal teaching assumption
                </button>
              </>
            )}
          </>
        )}
        {step === 2 && (
          <>
            <p>
              <b>0.15 L/breath non-gas-exchanging portion for this teaching comparison only</b>
            </p>
            <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
              Reveal modeled comparison
            </button>
          </>
        )}
        {step >= 3 && (
          <p role="status" className="font-semibold">
            MODELED ALVEOLAR VENTILATION — TEACHING COMPARISON, NOT A PATIENT MEASUREMENT. Equal
            total gas moved does not guarantee equal modeled gas reaching exchange units.
          </p>
        )}
      </section>
    );
  if (sceneId === 'm02-output-burden')
    return (
      <section aria-labelledby="m02-burden-heading" className="mx-auto max-w-4xl space-y-5 p-8">
        <h2 id="m02-burden-heading" className="text-3xl font-semibold">
          Useful output does not answer every patient question.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className={card}>
            <b>OBSERVED / DISPLAYED OUTPUT</b>
            <br />
            Exhaled minute volume
          </div>
          <div className={card}>
            <b>PATIENT REPORT</b>
            <br />
            Breathing experience
          </div>
          <div className={card}>
            <b>EFFORT-RELATED OBSERVATION</b>
            <br />
            Visible bedside sign
          </div>
        </div>
        {step === 0 ? (
          <>
            <p>
              What does the patient/bedside evidence add that the minute-volume display does not?
            </p>
            <button onClick={next} className="rounded bg-slate-900 px-4 py-2 text-white">
              Reveal
            </button>
          </>
        ) : (
          <p role="status">
            It adds meaningful evidence about breathing experience and an effort-related
            observation. Neither is a measurement of respiratory-muscle effort or work of breathing.
          </p>
        )}
      </section>
    );
  return (
    <section aria-labelledby="m02-synthesis-heading" className="mx-auto max-w-4xl space-y-4 p-8">
      <h2 id="m02-synthesis-heading" className="text-3xl font-semibold">
        Use each signal for its question.
      </h2>
      <p>
        SpO2 belongs with FiO2 context. Current PaCO2 is current arterial CO2 evidence, not a global
        adequacy label. Minute volume is total gas moved, not an alveolar estimate without an
        assumption.
      </p>
      <p>
        The patient report and neck-muscle recruitment add a different concern without becoming a
        measured work value.
      </p>
    </section>
  );
}

export function M02QuizEvidence({
  sceneId,
  revealed = false,
}: {
  readonly sceneId: string;
  readonly revealed?: boolean;
}) {
  const card = 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm';
  if (sceneId === 'm02-case-b')
    return (
      <section aria-labelledby="m02-case-b-evidence" className="space-y-4">
        <h2 id="m02-case-b-evidence" className="text-xl font-semibold">
          Current bedside snapshot
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <section aria-labelledby="m02-support" className={card}>
            <h3 id="m02-support" className="font-bold">
              CURRENT SUPPORT
            </h3>
            <p>FiO2 0.70</p>
            <p className="text-sm">SET</p>
          </section>
          <section aria-labelledby="m02-monitor" className={card}>
            <h3 id="m02-monitor" className="font-bold">
              MONITOR / RESPIRATORY DISPLAY
            </h3>
            <p>SpO2 94% — reliable signal</p>
            <p className="text-sm">OBSERVED DISPLAY</p>
            <p>Exhaled minute volume 10.0 L/min</p>
            <p className="text-sm">CALCULATED FOR THE STATED CURRENT INTERVAL</p>
          </section>
          <section aria-labelledby="m02-gas" className={card}>
            <h3 id="m02-gas" className="font-bold">
              CURRENT GAS EVIDENCE
            </h3>
            <p>PaCO2 42 mm Hg</p>
            <p className="text-sm">MEASURED ARTERIAL SAMPLE</p>
            <p>Matched to current support and time snapshot</p>
          </section>
          <section aria-labelledby="m02-patient" className={card}>
            <h3 id="m02-patient" className="font-bold">
              PATIENT / BEDSIDE
            </h3>
            <p>“Breathing feels hard right now.”</p>
            <p className="text-sm">PATIENT REPORT</p>
            <p>Visible inspiratory neck-muscle recruitment</p>
            <p className="text-sm">OBSERVED</p>
          </section>
        </div>
        <section
          aria-labelledby="m02-not-supplied"
          className="rounded-lg border border-slate-200 p-4"
        >
          <h3 id="m02-not-supplied" className="font-semibold">
            Not supplied
          </h3>
          <p>
            Dead-space estimate; diagnosis; waveform; quantified respiratory-muscle effort; PaO2;
            hemoglobin; perfusion assessment.
          </p>
        </section>
      </section>
    );
  if (sceneId === 'm02-transfer')
    return (
      <section aria-labelledby="m02-transfer-evidence" className="space-y-4">
        <h2 id="m02-transfer-evidence" className="text-xl font-semibold">
          Same displayed saturation. Different support context.
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <section aria-labelledby="m02-c1" className={card}>
            <h3 id="m02-c1" className="font-bold">
              C1
            </h3>
            <p>SpO2 94% — reliable signal</p>
            <p className="text-sm">OBSERVED DISPLAY</p>
            <p>FiO2 0.30</p>
            <p className="text-sm">SET SUPPORT</p>
          </section>
          <section aria-labelledby="m02-c2" className={card}>
            <h3 id="m02-c2" className="font-bold">
              C2
            </h3>
            <p>SpO2 94% — reliable signal</p>
            <p className="text-sm">OBSERVED DISPLAY</p>
            <p>FiO2 0.70</p>
            <p className="text-sm">SET SUPPORT</p>
          </section>
        </div>
        <p>
          Controlled/outside this comparison: CO2 and breathing-burden evidence are not supplied as
          changed variables.
        </p>
        {revealed && (
          <p role="status" className="font-medium">
            Both cards show the same reliable SpO2. C2 shows the same displayed SpO2 while receiving
            higher FiO2. The cards do not establish severity, oxygen delivery, cause, modality,
            escalation, or what CO2 and breathing-burden evidence would show.
          </p>
        )}
      </section>
    );
  return null;
}
