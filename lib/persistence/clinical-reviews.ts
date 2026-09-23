import type { Queryable } from '@openmaic/storage/document/pg';

import type { ClinicalReviewBinding, ClinicalReviewDecision } from '@/lib/clinical-review/manifest';

export const CLINICAL_REVIEW_SCHEMA = `
CREATE TABLE IF NOT EXISTS clinical_review_bindings (
  stage_id TEXT PRIMARY KEY REFERENCES document_stages(id) ON DELETE CASCADE,
  owner_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  source_records JSONB NOT NULL,
  dependencies JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS clinical_review_decisions (
  id TEXT PRIMARY KEY,
  stage_id TEXT NOT NULL REFERENCES document_stages(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  reviewer_owner_id TEXT NOT NULL,
  credential TEXT NOT NULL,
  attested_human_review BOOLEAN NOT NULL,
  decision TEXT NOT NULL,
  reviewed_at TIMESTAMPTZ NOT NULL,
  manifest_fingerprint TEXT NOT NULL,
  manifest JSONB NOT NULL,
  notes TEXT,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS clinical_review_decisions_stage_idx
  ON clinical_review_decisions (stage_id, reviewed_at DESC);
`;

export async function ensureClinicalReviewSchema(queryable: Queryable): Promise<void> {
  for (const fragment of CLINICAL_REVIEW_SCHEMA.split(';')) {
    const statement = fragment.trim();
    if (statement) await queryable.query(statement);
  }
}

function asBinding(row: Record<string, unknown>): ClinicalReviewBinding {
  return {
    stageId: String(row.stage_id),
    moduleId: String(row.module_id),
    sourceRecords: Array.isArray(row.source_records)
      ? (row.source_records as ClinicalReviewBinding['sourceRecords'])
      : [],
    dependencies: Array.isArray(row.dependencies)
      ? (row.dependencies as ClinicalReviewBinding['dependencies'])
      : [],
  };
}

function asDecision(row: Record<string, unknown>): ClinicalReviewDecision {
  return {
    id: String(row.id),
    stageId: String(row.stage_id),
    moduleId: String(row.module_id),
    reviewerOwnerId: String(row.reviewer_owner_id),
    credential: String(row.credential),
    attestedHumanReview: row.attested_human_review === true,
    decision: row.decision as ClinicalReviewDecision['decision'],
    reviewedAt: new Date(String(row.reviewed_at)).toISOString(),
    manifestFingerprint: String(row.manifest_fingerprint),
    manifest: row.manifest as ClinicalReviewDecision['manifest'],
    ...(typeof row.notes === 'string' ? { notes: row.notes } : {}),
    ...(row.expires_at ? { expiresAt: new Date(String(row.expires_at)).toISOString() } : {}),
    ...(row.revoked_at ? { revokedAt: new Date(String(row.revoked_at)).toISOString() } : {}),
  };
}

export async function readClinicalReviewBinding(queryable: Queryable, stageId: string) {
  const result = await queryable.query<Record<string, unknown>>(
    'SELECT stage_id, module_id, source_records, dependencies FROM clinical_review_bindings WHERE stage_id = $1',
    [stageId],
  );
  return result.rows[0] ? asBinding(result.rows[0]) : null;
}

export async function listClinicalReviewDecisions(queryable: Queryable, stageId: string) {
  const result = await queryable.query<Record<string, unknown>>(
    'SELECT id, stage_id, module_id, reviewer_owner_id, credential, attested_human_review, decision, reviewed_at, manifest_fingerprint, manifest, notes, expires_at, revoked_at FROM clinical_review_decisions WHERE stage_id = $1 ORDER BY reviewed_at DESC',
    [stageId],
  );
  return result.rows.map(asDecision);
}

export async function upsertClinicalReviewBinding(
  queryable: Queryable,
  binding: ClinicalReviewBinding,
  ownerId: string,
) {
  await queryable.query(
    `INSERT INTO clinical_review_bindings (stage_id, owner_id, module_id, source_records, dependencies)
     VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)
     ON CONFLICT (stage_id) DO UPDATE SET module_id = EXCLUDED.module_id, source_records = EXCLUDED.source_records, dependencies = EXCLUDED.dependencies, updated_at = CURRENT_TIMESTAMP
     WHERE clinical_review_bindings.owner_id = EXCLUDED.owner_id`,
    [
      binding.stageId,
      ownerId,
      binding.moduleId,
      JSON.stringify(binding.sourceRecords),
      JSON.stringify(binding.dependencies),
    ],
  );
}

export async function appendClinicalReviewDecision(
  queryable: Queryable,
  decision: ClinicalReviewDecision,
) {
  await queryable.query(
    `INSERT INTO clinical_review_decisions (id, stage_id, module_id, reviewer_owner_id, credential, attested_human_review, decision, reviewed_at, manifest_fingerprint, manifest, notes, expires_at, revoked_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8::timestamptz, $9, $10::jsonb, $11, $12::timestamptz, $13::timestamptz)`,
    [
      decision.id,
      decision.stageId,
      decision.moduleId,
      decision.reviewerOwnerId,
      decision.credential,
      decision.attestedHumanReview,
      decision.decision,
      decision.reviewedAt,
      decision.manifestFingerprint,
      JSON.stringify(decision.manifest),
      decision.notes ?? null,
      decision.expiresAt ?? null,
      decision.revokedAt ?? null,
    ],
  );
}
