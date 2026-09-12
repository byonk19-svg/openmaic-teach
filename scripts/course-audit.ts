/**
 * Browser/runtime QA for a persisted learner course. This deliberately does not
 * grade learner answers or make clinical judgments.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, type Page } from '@playwright/test';
import { LEARNER_KEY_STORAGE_KEY } from './learner-browser';

export type AuditStatus = 'PASS' | 'FAIL' | 'WARNING' | 'UNVERIFIED';
export type CourseSceneType =
  | 'static'
  | 'reasoning-gate'
  | 'interactive-simulation'
  | 'unknown-interactive';

export const ACTIVE_SCENE_TEXT_SELECTOR = '[data-testid="active-scene-content"]';
export const REASONING_GATE_READINESS_TIMEOUT_MS = 10_000;

export interface CourseAuditOptions {
  baseURL: string;
  stageId: string;
  learnerKey: string;
  outputDir: string;
  timeoutMs: number;
  headless: boolean;
}

export interface AuditCheck {
  name: string;
  status: AuditStatus;
  detail: string;
}

export interface AuditedScene {
  order: number;
  title: string;
  type: CourseSceneType;
  summary?: string;
  checks: AuditCheck[];
  diagnostics: string[];
  screenshot: string;
  changedScreenshot?: string;
  resetScreenshot?: string;
}

export interface CourseAuditReport {
  stageId: string;
  startedAt: string;
  completedAt: string;
  discovery: {
    visibleSceneItems: number;
    terminalProgressPositionDetected: boolean;
  };
  scenes: AuditedScene[];
  diagnostics: string[];
}

const DEFAULTS = {
  baseURL: 'http://127.0.0.1:3001',
  timeoutMs: 30_000,
};

function requiredValue(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

export function parseCourseAuditArgs(args: string[]): CourseAuditOptions {
  const values = args[0] === '--' ? args.slice(1) : args;
  let stageId = '';
  let baseURL = DEFAULTS.baseURL;
  let learnerKey: string | undefined;
  let outputDir: string | undefined;
  let timeoutMs = DEFAULTS.timeoutMs;
  let headless = true;
  for (let index = 0; index < values.length; index += 1) {
    const flag = values[index];
    switch (flag) {
      case '--stage':
        stageId = requiredValue(values, index, flag);
        index += 1;
        break;
      case '--base-url':
        baseURL = requiredValue(values, index, flag).replace(/\/$/, '');
        index += 1;
        break;
      case '--learner-key':
        learnerKey = requiredValue(values, index, flag);
        index += 1;
        break;
      case '--output-dir':
        outputDir = requiredValue(values, index, flag);
        index += 1;
        break;
      case '--timeout-ms': {
        const parsed = Number(requiredValue(values, index, flag));
        if (!Number.isSafeInteger(parsed) || parsed < 1_000 || parsed > 120_000) {
          throw new Error('--timeout-ms must be an integer from 1000 to 120000');
        }
        timeoutMs = parsed;
        index += 1;
        break;
      }
      case '--headed':
        headless = false;
        break;
      case '--help':
        throw new Error('HELP');
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }
  if (!stageId) throw new Error('--stage is required');
  return {
    baseURL,
    stageId,
    learnerKey: learnerKey ?? `audit:${stageId}`,
    outputDir: outputDir ?? `output/playwright/course-audits/${stageId}`,
    timeoutMs,
    headless,
  };
}

export function isTerminalProgressLabel(label: string): boolean {
  return label.trim().replace(/\s+/g, ' ').toLowerCase() === 'course complete';
}

export function classifyScene(input: {
  hasReasoningGate: boolean;
  iframeCount: number;
  hasRangeControl?: boolean;
}): CourseSceneType {
  if (input.hasReasoningGate) return 'reasoning-gate';
  if (input.iframeCount === 0) return 'static';
  return input.hasRangeControl ? 'interactive-simulation' : 'unknown-interactive';
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split('?')[0];
  }
}

function statusLine(check: AuditCheck): string {
  return `- ${check.status} — **${check.name}**: ${check.detail}`;
}

function countStatuses(report: Pick<CourseAuditReport, 'scenes'>): Record<AuditStatus, number> {
  const counts: Record<AuditStatus, number> = { PASS: 0, FAIL: 0, WARNING: 0, UNVERIFIED: 0 };
  for (const scene of report.scenes) for (const check of scene.checks) counts[check.status] += 1;
  return counts;
}

export function renderCourseAuditMarkdown(report: CourseAuditReport): string {
  const counts = countStatuses(report);
  const lines = [
    `# OpenMAIC Browser QA: ${report.stageId}`,
    '',
    'Browser/runtime QA only; this report does not evaluate clinical quality or learner reasoning.',
    '',
    '## Summary',
    '',
    `- Scenes discovered/reached: ${report.scenes.length}/${report.scenes.length}`,
    `- Terminal Course complete position: ${report.discovery.terminalProgressPositionDetected ? 'detected and excluded' : 'not detected'}`,
    `- Scene types: ${report.scenes.map((scene) => scene.type).join(', ') || 'none'}`,
    `- Checks: ${counts.PASS} PASS, ${counts.FAIL} FAIL, ${counts.WARNING} WARNING, ${counts.UNVERIFIED} UNVERIFIED`,
    `- Browser/runtime diagnostics: ${report.diagnostics.length}`,
    '- Artifacts: `report.json`, `report.md`, and `screenshots/` in this directory.',
    `- Started: ${report.startedAt}`,
    `- Completed: ${report.completedAt}`,
    '',
    '## Scenes',
    '',
  ];
  for (const scene of report.scenes) {
    lines.push(`### ${scene.order}. ${scene.title} (${scene.type})`, '');
    if (scene.summary) lines.push(scene.summary, '');
    lines.push(`- Screenshot: [${scene.screenshot}](${scene.screenshot})`);
    if (scene.changedScreenshot)
      lines.push(`- Changed state: [${scene.changedScreenshot}](${scene.changedScreenshot})`);
    if (scene.resetScreenshot)
      lines.push(`- Reset state: [${scene.resetScreenshot}](${scene.resetScreenshot})`);
    lines.push(...scene.checks.map(statusLine));
    if (scene.diagnostics.length) lines.push(`- Diagnostics: ${scene.diagnostics.join('; ')}`);
    lines.push('');
  }
  if (report.diagnostics.length) {
    lines.push(
      '## Browser/runtime diagnostics',
      '',
      ...report.diagnostics.map((entry) => `- ${entry}`),
      '',
    );
  }
  return `${lines.join('\n')}\n`;
}

async function visibleText(page: Page): Promise<string> {
  const active = page.locator(ACTIVE_SCENE_TEXT_SELECTOR);
  const parts = await active.locator('h1, h2, h3, p, li, label').evaluateAll((nodes) =>
    nodes
      .filter((node) => {
        const style = window.getComputedStyle(node);
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          node.getClientRects().length > 0
        );
      })
      .map((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .slice(0, 40),
  );
  return parts.join(' ').slice(0, 3_000);
}

async function waitForClassroom(page: Page, timeoutMs: number): Promise<void> {
  await page.getByText('Loading classroom...').waitFor({ state: 'hidden', timeout: timeoutMs });
}

async function openSidebar(page: Page): Promise<void> {
  const firstScene = page.locator('[data-testid="scene-item"]').first();
  if (await firstScene.isVisible().catch(() => false)) return;
  const toggle = page.getByRole('button', { name: 'Toggle sidebar' });
  if (await toggle.isVisible().catch(() => false)) await toggle.click({ timeout: 5_000 });
  else await page.keyboard.press('s');
  await firstScene.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => undefined);
}

async function sceneLabels(page: Page): Promise<string[]> {
  return page
    .locator('[data-testid="scene-item"] [data-testid="scene-title"]')
    .evaluateAll((nodes) =>
      nodes.map((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim()),
    );
}

async function currentTitle(page: Page, fallback: string): Promise<string> {
  const heading = page.locator('h1').first();
  if (await heading.isVisible().catch(() => false))
    return (await heading.innerText()).trim() || fallback;
  return fallback;
}

async function captureSceneScreenshot(page: Page, path: string, timeoutMs: number): Promise<void> {
  // Viewport captures are sufficient QA evidence and avoid an animated iframe
  // holding a full-page screenshot open after a scene has rendered.
  await page.screenshot({ path, fullPage: false, timeout: Math.min(timeoutMs, 10_000) });
}

export interface ReasoningGateReadinessProbe {
  waitForActiveQuiz(timeoutMs: number): Promise<void>;
  waitForAnswerVisible(timeoutMs: number): Promise<void>;
  waitForAnswerActionable(timeoutMs: number): Promise<void>;
}

export async function waitForReasoningGateReady(
  probe: ReasoningGateReadinessProbe,
  timeoutMs: number,
): Promise<{ ready: boolean; detail: string }> {
  const readinessTimeoutMs = Math.min(timeoutMs, REASONING_GATE_READINESS_TIMEOUT_MS);
  try {
    await probe.waitForActiveQuiz(readinessTimeoutMs);
    await probe.waitForAnswerVisible(readinessTimeoutMs);
    await probe.waitForAnswerActionable(readinessTimeoutMs);
    return { ready: true, detail: 'Short-answer control is visible and actionable.' };
  } catch (error) {
    const reason =
      error instanceof Error ? error.message.slice(0, 300) : String(error).slice(0, 300);
    return {
      ready: false,
      detail: `Expected short-answer control did not become ready within ${readinessTimeoutMs}ms: ${reason}`,
    };
  }
}

export async function inspectReasoningGate(
  page: Page,
  checks: AuditCheck[],
  timeoutMs: number,
): Promise<boolean> {
  const start = page.getByRole('button', { name: 'Start Quiz' });
  if (await start.isVisible().catch(() => false)) await start.click();
  const answer = page.getByPlaceholder('Type your answer here...');
  const readiness = await waitForReasoningGateReady(
    {
      waitForActiveQuiz: (timeout) =>
        page.getByRole('button', { name: 'Submit Answers' }).waitFor({ state: 'visible', timeout }),
      waitForAnswerVisible: (timeout) => answer.waitFor({ state: 'visible', timeout }),
      waitForAnswerActionable: (timeout) =>
        answer.isEditable({ timeout }).then((actionable) => {
          if (!actionable) throw new Error('Short-answer control was not actionable.');
        }),
    },
    timeoutMs,
  );
  if (readiness.ready) {
    checks.push({
      name: 'learner answer control',
      status: 'PASS',
      detail: readiness.detail,
    });
  } else {
    checks.push({
      name: 'learner answer control',
      status: 'FAIL',
      detail: readiness.detail,
    });
  }
  const report = page.getByText('Quiz Report', { exact: true });
  const existingReview = await report.isVisible().catch(() => false);
  if (existingReview) {
    checks.push({
      name: 'review state',
      status: 'WARNING',
      detail: 'Existing reviewed learner state detected; runner did not overwrite it.',
    });
    return true;
  }
  const analysis = page.getByText('Analysis', { exact: true });
  const analysisVisible = await analysis.isVisible().catch(() => false);
  checks.push({
    name: 'explanation gate',
    status: analysisVisible ? 'FAIL' : 'PASS',
    detail: analysisVisible
      ? 'Explanation was visible before review.'
      : 'Explanation is locked before review.',
  });
  return false;
}

async function inspectSimulation(
  page: Page,
  scene: AuditedScene,
  outputDir: string,
  timeoutMs: number,
): Promise<void> {
  const iframes = page.locator('iframe[title^="Interactive Scene"]:visible');
  const iframeCount = await iframes.count();
  const candidates = await iframes.evaluateAll((nodes) =>
    nodes.map((node, index) => ({ index, title: node.getAttribute('title') ?? '' })),
  );
  const candidate = candidates.find((item) => /interactive scene/i.test(item.title));
  if (!candidate) {
    scene.type = 'unknown-interactive';
    scene.checks.push({
      name: 'simulator frame',
      status: 'UNVERIFIED',
      detail: `Found ${iframeCount} iframe(s), but no learner simulator frame.`,
    });
    return;
  }
  const iframe = iframes.nth(candidate.index);
  await iframe.waitFor({ state: 'visible', timeout: timeoutMs });
  // contentFrame is obtained after each scene navigation; never retain it across scenes.
  const frame = await iframe.contentFrame();
  if (!frame) {
    scene.type = 'unknown-interactive';
    scene.checks.push({
      name: 'simulator frame',
      status: 'UNVERIFIED',
      detail: 'Current simulator iframe detached before access.',
    });
    return;
  }
  const ranges = frame.locator('input[type="range"]');
  const rangeCount = await ranges.count();
  if (!rangeCount) {
    scene.type = 'unknown-interactive';
    scene.checks.push({
      name: 'range control discovery',
      status: 'UNVERIFIED',
      detail: 'Simulator has no standard HTML range control.',
    });
    return;
  }
  scene.type = 'interactive-simulation';
  const control = ranges.first();
  const baseline = await control.evaluate((node: HTMLInputElement) => ({
    id: node.id,
    aria: node.getAttribute('aria-label'),
    value: node.value,
    min: node.min,
    max: node.max,
    step: node.step,
  }));
  const beforeText = (await frame.locator('body').innerText())
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2_000);
  scene.checks.push({
    name: 'range control discovery',
    status: 'PASS',
    detail: JSON.stringify(baseline),
  });
  try {
    await control.focus();
    await control.press('ArrowRight');
    await page.waitForTimeout(250);
    const changedValue = await control.inputValue();
    const changedText = (await frame.locator('body').innerText())
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 2_000);
    scene.changedScreenshot = `screenshots/scene-${String(scene.order).padStart(2, '0')}-changed.png`;
    await captureSceneScreenshot(page, join(outputDir, scene.changedScreenshot), timeoutMs);
    scene.checks.push({
      name: 'single-control change',
      status: changedValue === baseline.value ? 'UNVERIFIED' : 'PASS',
      detail:
        changedValue === baseline.value
          ? 'Keyboard range interaction did not change the exposed value.'
          : `Value ${baseline.value} → ${changedValue}; output text captured (${changedText.length} chars).`,
    });
    const reset = frame.locator('button[id*="reset" i]').first();
    if (!(await reset.isVisible().catch(() => false))) {
      scene.checks.push({
        name: 'reset baseline',
        status: 'UNVERIFIED',
        detail: 'No learner-facing Reset control was found.',
      });
      return;
    }
    await reset.click();
    await page.waitForTimeout(250);
    const resetValue = await control.inputValue();
    scene.resetScreenshot = `screenshots/scene-${String(scene.order).padStart(2, '0')}-reset.png`;
    await captureSceneScreenshot(page, join(outputDir, scene.resetScreenshot), timeoutMs);
    scene.checks.push({
      name: 'reset baseline',
      status: resetValue === baseline.value ? 'PASS' : 'FAIL',
      detail: `Exposed range reset ${changedValue} → ${resetValue}; expected ${baseline.value}.`,
    });
  } catch (error) {
    scene.checks.push({
      name: 'simulation interaction',
      status: 'UNVERIFIED',
      detail: error instanceof Error ? error.message.slice(0, 500) : String(error),
    });
  } finally {
    // Preserve enough baseline output evidence for a later domain evaluator.
    scene.summary = `${scene.summary ?? ''}\nSimulator baseline: ${beforeText}`.trim();
  }
}

export async function runCourseAudit(options: CourseAuditOptions): Promise<CourseAuditReport> {
  const screenshotsDir = join(options.outputDir, 'screenshots');
  await mkdir(screenshotsDir, { recursive: true });
  const startedAt = new Date().toISOString();
  const diagnostics: string[] = [];
  const browser = await chromium.launch({ headless: options.headless });
  const context = await browser.newContext();
  const scenes: AuditedScene[] = [];
  let terminalProgressPositionDetected = false;
  try {
    console.log(`[audit] opening ${options.stageId}`);
    await context.addInitScript(
      ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
      { key: LEARNER_KEY_STORAGE_KEY, value: options.learnerKey },
    );
    const page = await context.newPage();
    page.setDefaultTimeout(options.timeoutMs);
    page.on('console', (message) => {
      if (message.type() === 'warning' || message.type() === 'error')
        diagnostics.push(`[console:${message.type()}] ${message.text().slice(0, 500)}`);
    });
    page.on('pageerror', (error) => diagnostics.push(`[pageerror] ${error.message.slice(0, 500)}`));
    page.on('requestfailed', (request) =>
      diagnostics.push(
        `[requestfailed] ${safeUrl(request.url())} ${request.failure()?.errorText ?? ''}`,
      ),
    );
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().startsWith(options.baseURL))
        diagnostics.push(`[http:${response.status()}] ${safeUrl(response.url())}`);
    });
    await page.goto(`${options.baseURL}/classroom/${encodeURIComponent(options.stageId)}`, {
      waitUntil: 'domcontentloaded',
      timeout: options.timeoutMs,
    });
    await waitForClassroom(page, options.timeoutMs);
    console.log('[audit] classroom loaded');
    await openSidebar(page);
    const labels = await sceneLabels(page);
    terminalProgressPositionDetected = await page
      .getByText('Course complete', { exact: true })
      .isVisible()
      .catch(() => false);
    const instructional = labels
      .map((label, index) => ({ label, index }))
      .filter(({ label }) => !isTerminalProgressLabel(label));
    console.log(`[audit] discovered ${instructional.length} instructional scene(s)`);
    for (const entry of instructional) {
      const diagnosticsAtStart = diagnostics.length;
      const scene: AuditedScene = {
        order: scenes.length + 1,
        title: entry.label || `Scene ${scenes.length + 1}`,
        type: 'static',
        checks: [],
        diagnostics: [],
        screenshot: `screenshots/scene-${String(scenes.length + 1).padStart(2, '0')}.png`,
      };
      try {
        console.log(`[audit] scene ${scene.order}: ${scene.title}`);
        await page
          .locator('[data-testid="scene-item"]')
          .nth(entry.index)
          .evaluate((node: HTMLElement) =>
            node.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })),
          );
        await page
          .getByRole('button', { name: 'Start Quiz' })
          .or(page.getByPlaceholder('Type your answer here...'))
          .or(page.locator(ACTIVE_SCENE_TEXT_SELECTOR))
          .first()
          .waitFor({ state: 'visible', timeout: Math.min(options.timeoutMs, 5_000) });
        scene.title = await currentTitle(page, scene.title);
        const hasGate =
          (await page.getByPlaceholder('Type your answer here...').count()) > 0 ||
          (await page.getByRole('button', { name: 'Start Quiz' }).count()) > 0;
        const iframeCount = await page
          .locator('iframe[title^="Interactive Scene"]:visible')
          .count();
        scene.type = classifyScene({ hasReasoningGate: hasGate, iframeCount });
        scene.summary = await visibleText(page);
        if (hasGate) await inspectReasoningGate(page, scene.checks, options.timeoutMs);
        if (iframeCount > 0 && !hasGate)
          await inspectSimulation(page, scene, options.outputDir, options.timeoutMs);
        if (scene.type === 'static')
          scene.checks.push({
            name: 'instructional content',
            status: 'PASS',
            detail: 'Learner-visible instructional content rendered.',
          });
      } catch (error) {
        scene.checks.push({
          name: 'scene reachability',
          status: 'FAIL',
          detail: error instanceof Error ? error.message.slice(0, 500) : String(error),
        });
      } finally {
        scene.diagnostics = diagnostics.slice(diagnosticsAtStart);
        if (scene.diagnostics.length)
          scene.checks.push({
            name: 'runtime diagnostics',
            status: 'WARNING',
            detail: `${scene.diagnostics.length} warning/error event(s) captured.`,
          });
        await captureSceneScreenshot(
          page,
          join(options.outputDir, scene.screenshot),
          options.timeoutMs,
        ).catch(() => undefined);
        scenes.push(scene);
      }
    }
  } finally {
    await context.close();
    await browser.close();
  }
  const report: CourseAuditReport = {
    stageId: options.stageId,
    startedAt,
    completedAt: new Date().toISOString(),
    discovery: {
      visibleSceneItems: scenes.length,
      terminalProgressPositionDetected,
    },
    scenes,
    diagnostics,
  };
  await writeFile(join(options.outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(join(options.outputDir, 'report.md'), renderCourseAuditMarkdown(report));
  return report;
}

function usage(): string {
  return `Usage: pnpm browser:audit -- --stage <stageId> [options]\n\nOptions:\n  --base-url <url>      Local server URL (default ${DEFAULTS.baseURL})\n  --learner-key <key>   Isolated audit learner identity (default audit:<stageId>)\n  --output-dir <path>   Artifact directory\n  --timeout-ms <ms>     Per-action timeout (1000-120000)\n  --headed              Show Chromium`;
}

async function main(): Promise<void> {
  try {
    const report = await runCourseAudit(parseCourseAuditArgs(process.argv.slice(2)));
    console.log(
      JSON.stringify(
        { stageId: report.stageId, scenes: report.scenes.length, report: 'report.json' },
        null,
        2,
      ),
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'HELP') {
      console.log(usage());
      return;
    }
    console.error(error instanceof Error ? (error.stack ?? error.message) : String(error));
    process.exitCode = 1;
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('/scripts/course-audit.ts')) void main();
