import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  enabled: false,
  reviewSchema: vi.fn(),
  stageSchema: vi.fn(),
  runtimeSchema: vi.fn(),
  documentSchema: vi.fn(),
  assetSchema: vi.fn(),
  ownerMaterialSchema: vi.fn(),
}));
vi.mock('@/lib/config/feature-flags', () => ({ isClinicalReviewEnabled: () => mocks.enabled }));
vi.mock('@/lib/persistence/clinical-reviews', () => ({
  ensureClinicalReviewSchema: mocks.reviewSchema,
}));
vi.mock('@/lib/persistence/stage-meta', () => ({ ensureStageMetaSchema: mocks.stageSchema }));
vi.mock('@/lib/persistence/owner-materials', () => ({
  ensureOwnerMaterialSchema: mocks.ownerMaterialSchema,
}));
vi.mock('@openmaic/storage/runtime/pg', () => ({
  PgRuntimeStore: class {},
  ensureSchema: mocks.runtimeSchema,
}));
vi.mock('@openmaic/storage/document/pg', () => ({
  PgDocumentStore: class {},
  ensureDocumentSchema: mocks.documentSchema,
}));
vi.mock('@openmaic/storage/asset/pg', () => ({
  PgAssetStore: class {},
  ensureAssetSchema: mocks.assetSchema,
}));
vi.mock('@openmaic/storage/server/reference', () => ({
  nodePostgresTransaction: () => async () => undefined,
}));

import { getServerPersistenceProvider } from '@/lib/persistence/server-provider';

function pool() {
  return {
    query: vi.fn().mockResolvedValue({ rows: [] }),
    end: vi.fn().mockResolvedValue(undefined),
  } as never;
}

describe('clinical-review persistence containment', () => {
  beforeEach(() => {
    mocks.enabled = false;
    Object.values(mocks).forEach((value) => {
      if (typeof value === 'function') value.mockClear();
    });
  });

  it('skips review DDL by default while retaining the existing schema bootstrap', async () => {
    await getServerPersistenceProvider('clinical-review-disabled-bootstrap', pool);
    expect(mocks.runtimeSchema).toHaveBeenCalledOnce();
    expect(mocks.documentSchema).toHaveBeenCalledOnce();
    expect(mocks.stageSchema).toHaveBeenCalledOnce();
    expect(mocks.ownerMaterialSchema).toHaveBeenCalledOnce();
    expect(mocks.assetSchema).toHaveBeenCalledOnce();
    expect(mocks.reviewSchema).not.toHaveBeenCalled();
  });
});
