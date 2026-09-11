'use client';

import { getCurrentModelConfig } from '@/lib/utils/model-config';

export async function requestStageContinuation(stageId: string): Promise<void> {
  const config = getCurrentModelConfig();
  const response = await fetch(`/api/stages/${encodeURIComponent(stageId)}/continue-generation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-model': config.modelString || '',
      'x-api-key': config.apiKey || '',
      'x-base-url': config.baseUrl || '',
      'x-provider-type': config.providerType || '',
    },
    body: JSON.stringify(config.thinkingConfig ? { thinkingConfig: config.thinkingConfig } : {}),
  });
  if (!response.ok) throw new Error(`Continuation request failed: HTTP ${response.status}`);
}
