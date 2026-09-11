'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClipboardCheck, LoaderCircle } from 'lucide-react';

type Status = 'idle' | 'running' | 'completed' | 'failed';
type Check = { name: string; status: 'PASS' | 'FAIL' | 'WARNING' | 'UNVERIFIED'; detail: string };
type Scene = { order: number; title: string; type: string; checks: Check[]; screenshot: string };
type AuditState = {
  status: Status;
  error?: string;
  summary?: Record<string, number>;
  report?: { scenes: Scene[] };
};

export function BrowserQaControl({ stageId }: { readonly stageId: string }) {
  const [state, setState] = useState<AuditState>({ status: 'idle' });
  const refresh = useCallback(async () => {
    const response = await fetch(`/api/browser-audit/${encodeURIComponent(stageId)}`);
    if (response.ok) setState(await response.json());
  }, [stageId]);
  useEffect(() => {
    void refresh();
    if (state.status !== 'running') return;
    const timer = window.setInterval(() => void refresh(), 1000);
    return () => window.clearInterval(timer);
  }, [refresh, state.status]);
  const start = async () => {
    setState({ status: 'running' });
    const response = await fetch(`/api/browser-audit/${encodeURIComponent(stageId)}`, {
      method: 'POST',
    });
    if (!response.ok) setState({ status: 'failed', error: 'QA failed to start.' });
    else void refresh();
  };
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        data-testid="workbench-run-learner-qa"
        onClick={() => void start()}
        disabled={state.status === 'running'}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-violet-300 px-3 text-[11px] font-medium text-violet-700 disabled:opacity-50 dark:border-violet-500/50 dark:text-violet-300"
      >
        {state.status === 'running' ? (
          <LoaderCircle className="size-3.5 animate-spin" />
        ) : (
          <ClipboardCheck className="size-3.5" />
        )}
        {state.status === 'running' ? 'QA running' : 'Run Learner QA'}
      </button>
      {state.status === 'failed' ? (
        <p className="absolute right-0 top-9 z-20 w-64 rounded bg-red-50 p-2 text-xs text-red-700 shadow">
          {state.error ?? 'QA failed.'}
        </p>
      ) : null}
      {state.status === 'completed' && state.summary && state.report ? (
        <details className="absolute right-0 top-9 z-20 w-[28rem] rounded border bg-background p-3 text-xs shadow-lg">
          <summary className="cursor-pointer font-medium">
            QA completed · {state.summary.scenesReached}/{state.summary.scenesDiscovered} scenes ·{' '}
            {state.summary.PASS} PASS · {state.summary.FAIL} FAIL · {state.summary.WARNING} WARNING
            · {state.summary.UNVERIFIED} UNVERIFIED
          </summary>
          <p className="mt-2 text-muted-foreground">
            Browser/runtime QA only; it does not validate clinical teaching content.
          </p>
          <ul className="mt-2 max-h-56 space-y-2 overflow-auto">
            {state.report.scenes.map((scene) => (
              <li key={scene.order}>
                <strong>
                  {scene.order}. {scene.title}
                </strong>{' '}
                <span className="text-muted-foreground">({scene.type})</span> ·{' '}
                <a
                  className="text-violet-700 underline dark:text-violet-300"
                  href={`/api/browser-audit/${encodeURIComponent(stageId)}/artifacts/${scene.screenshot}`}
                >
                  Screenshot
                </a>
                <br />
                {scene.checks.map((check) => (
                  <span key={check.name} className="mr-2">
                    {check.status}: {check.name}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
