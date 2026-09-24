'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

import { useStageStore } from '@/lib/store';
import { shouldShowClinicalReviewUi } from '@/lib/config/feature-flags';

type Status = { label: string; current: boolean; reason: string };
type Binding = {
  moduleId: string;
  sourceRecords: Array<{ id: string; fingerprint: string }>;
  dependencies: Array<{ kind: string; id: string; fingerprint: string }>;
};
type ReviewRead = { status: Status; manifestFingerprint: string | null; binding: Binding | null };

/** Owner-scoped, author-facing indicator. It intentionally has no learner-facing rendering path. */
export function ClinicalReviewStatus() {
  const enabled = shouldShowClinicalReviewUi();
  const stageId = useStageStore((state) => state.stage?.id);
  const [review, setReview] = useState<ReviewRead | null>(null);
  const [reviewerName, setReviewerName] = useState('');
  const [credential, setCredential] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [relevantRoleOrExperience, setRelevantRoleOrExperience] = useState('');
  const [attested, setAttested] = useState(false);
  const [decision, setDecision] = useState<'approved' | 'changes_requested'>('approved');
  const [message, setMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled || !stageId) return;
    try {
      const response = await fetch(`/api/stages/${encodeURIComponent(stageId)}/clinical-review`, {
        credentials: 'same-origin',
      });
      setReview(response.ok ? ((await response.json()) as ReviewRead) : null);
    } catch {
      setReview({
        status: {
          label: 'Review status unavailable',
          current: false,
          reason: 'Review status could not be read.',
        },
        manifestFingerprint: null,
        binding: null,
      });
    }
  }, [enabled, stageId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(timeout);
  }, [refresh]);

  const submit = async (method: 'POST' | 'DELETE') => {
    if (!stageId || !review?.manifestFingerprint) return;
    const response = await fetch(`/api/stages/${encodeURIComponent(stageId)}/clinical-review`, {
      method,
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        reviewerName,
        credential,
        jurisdiction,
        relevantRoleOrExperience,
        attestedHumanReview: attested,
        manifestFingerprint: review.manifestFingerprint,
        decision,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setMessage(body?.error ?? 'Review action could not be recorded.');
      return;
    }
    setReviewerName('');
    setCredential('');
    setJurisdiction('');
    setRelevantRoleOrExperience('');
    setAttested(false);
    setMessage(null);
    await refresh();
  };

  if (!enabled || !stageId || !review) return null;
  return (
    <details
      className="hidden sm:block text-xs text-muted-foreground"
      data-testid="clinical-review-status"
    >
      <summary
        className="flex cursor-pointer list-none items-center gap-1.5"
        title={review.status.reason}
      >
        <ClipboardCheck
          className={review.status.current ? 'h-3.5 w-3.5 text-emerald-600' : 'h-3.5 w-3.5'}
          aria-hidden="true"
        />
        <span>{review.status.label}</span>
      </summary>
      <div className="absolute right-4 z-50 mt-2 w-80 space-y-2 rounded-lg border bg-popover p-3 text-foreground shadow-lg">
        <p className="text-muted-foreground">{review.status.reason}</p>
        {review.binding ? (
          <>
            <p className="font-medium">{review.binding.moduleId}</p>
            <p>
              {review.binding.sourceRecords.length} source record(s) ·{' '}
              {review.binding.dependencies.length} dependency record(s)
            </p>
          </>
        ) : (
          <p>Module 01 is not yet bound to this persisted stage.</p>
        )}
        {review.manifestFingerprint && (
          <>
            <label className="block">
              Reviewer name
              <input
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                className="mt-1 w-full rounded border bg-background p-1"
                autoComplete="name"
              />
            </label>
            <label className="block">
              Self-attested RT credential
              <input
                value={credential}
                onChange={(event) => setCredential(event.target.value)}
                className="mt-1 w-full rounded border bg-background p-1"
              />
            </label>
            <label className="block">
              Credential jurisdiction
              <input
                value={jurisdiction}
                onChange={(event) => setJurisdiction(event.target.value)}
                className="mt-1 w-full rounded border bg-background p-1"
                placeholder="State, province, or country"
              />
            </label>
            <label className="block">
              Relevant adult acute/ICU role or experience
              <textarea
                value={relevantRoleOrExperience}
                onChange={(event) => setRelevantRoleOrExperience(event.target.value)}
                className="mt-1 min-h-16 w-full rounded border bg-background p-1"
              />
            </label>
            <label className="block">
              Decision
              <select
                value={decision}
                onChange={(event) => setDecision(event.target.value as typeof decision)}
                className="mt-1 w-full rounded border bg-background p-1"
              >
                <option value="approved">Approve review</option>
                <option value="changes_requested">Changes requested</option>
              </select>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={attested}
                onChange={(event) => setAttested(event.target.checked)}
              />
              I personally reviewed this exact version.
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded bg-primary px-2 py-1 text-primary-foreground"
                onClick={() => void submit('POST')}
              >
                Record decision
              </button>
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() => void submit('DELETE')}
              >
                Revoke
              </button>
            </div>
          </>
        )}
        {message && (
          <p role="alert" className="text-destructive">
            {message}
          </p>
        )}
      </div>
    </details>
  );
}
