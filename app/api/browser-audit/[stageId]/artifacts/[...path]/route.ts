import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { isAgentRuntimeConfigured } from '@/lib/config/feature-flags';
import { resolveStageAccess } from '@/lib/server/stage-access';

export const runtime = 'nodejs';
type Params = { params: Promise<{ stageId: string; path: string[] }> };

export async function GET(_req: Request, { params }: Params) {
  if (!isAgentRuntimeConfigured()) return new Response('Not found', { status: 404 });
  const { stageId, path } = await params;
  if (!(await resolveStageAccess(stageId))) return new Response('Not found', { status: 404 });
  const base = resolve(process.cwd(), 'output', 'playwright', 'course-audits', stageId);
  const target = resolve(base, ...path);
  if (!target.startsWith(`${base}${sep}`) || !/\.(png|json|md)$/i.test(target))
    return new Response('Not found', { status: 404 });
  try {
    const body = await readFile(target);
    const type = target.endsWith('.png')
      ? 'image/png'
      : target.endsWith('.json')
        ? 'application/json; charset=utf-8'
        : 'text/markdown; charset=utf-8';
    return new Response(body, {
      headers: { 'Content-Type': type },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
