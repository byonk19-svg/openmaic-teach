/**
 * Local, Playwright-owned learner browser for acceptance checks.
 *
 * It intentionally has no dependency on a desktop browser profile or the
 * Codex browser bridge. Run `pnpm browser:learner -- --help` for options.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, type ConsoleMessage, type Page, type Response } from '@playwright/test';

export const LEARNER_KEY_STORAGE_KEY = 'maic:device:runtime.learnerKey';

export interface LearnerBrowserOptions {
  baseURL: string;
  stageId: string;
  learnerKey?: string;
  headless: boolean;
  screenshotDir: string;
  timeoutMs: number;
  requireDraft: boolean;
  submitRestored: boolean;
}

const DEFAULTS = {
  baseURL: 'http://127.0.0.1:3001',
  screenshotDir: 'output/playwright/learner-browser',
  timeoutMs: 15_000,
};

function requiredValue(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

/** Parse only the intentionally small developer-tool surface. */
export function parseLearnerBrowserArgs(args: string[]): LearnerBrowserOptions {
  const normalizedArgs = args[0] === '--' ? args.slice(1) : args;
  const options: LearnerBrowserOptions = {
    ...DEFAULTS,
    stageId: '',
    ...(process.env.OPENMAIC_LEARNER_KEY
      ? { learnerKey: process.env.OPENMAIC_LEARNER_KEY }
      : {}),
    headless: true,
    requireDraft: false,
    submitRestored: false,
  };
  for (let index = 0; index < normalizedArgs.length; index += 1) {
    const flag = normalizedArgs[index];
    switch (flag) {
      case '--stage':
        options.stageId = requiredValue(normalizedArgs, index, flag);
        index += 1;
        break;
      case '--base-url':
        options.baseURL = requiredValue(normalizedArgs, index, flag).replace(/\/$/, '');
        index += 1;
        break;
      case '--learner-key':
        options.learnerKey = requiredValue(normalizedArgs, index, flag);
        index += 1;
        break;
      case '--screenshot-dir':
        options.screenshotDir = requiredValue(normalizedArgs, index, flag);
        index += 1;
        break;
      case '--timeout-ms': {
        const value = Number(requiredValue(normalizedArgs, index, flag));
        if (!Number.isSafeInteger(value) || value < 1_000 || value > 120_000) {
          throw new Error('--timeout-ms must be an integer from 1000 to 120000');
        }
        options.timeoutMs = value;
        index += 1;
        break;
      }
      case '--headed':
        options.headless = false;
        break;
      case '--require-draft':
        options.requireDraft = true;
        break;
      case '--submit-restored':
        options.submitRestored = true;
        options.requireDraft = true;
        break;
      case '--help':
        throw new Error('HELP');
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }
  if (!options.stageId) throw new Error('--stage is required');
  return options;
}

export function seedLearnerKey(
  storage: Pick<Storage, 'setItem'>,
  learnerKey: string,
): void {
  storage.setItem(LEARNER_KEY_STORAGE_KEY, JSON.stringify(learnerKey));
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split('?')[0];
  }
}

function safeConsole(message: ConsoleMessage): string | undefined {
  if (message.type() !== 'error' && message.type() !== 'warning') return undefined;
  return `[console:${message.type()}] ${message.text().slice(0, 500)}`;
}

function summarizeGrade(response: Response): Promise<Record<string, unknown>> {
  return response
    .json()
    .then((body: unknown) => {
      if (!body || typeof body !== 'object') return { shape: typeof body };
      const value = body as Record<string, unknown>;
      return {
        success: value.success === true,
        decision: value.decision,
        score: value.score,
        hasFeedback: typeof value.feedback === 'string' && value.feedback.length > 0,
        hasFollowUp: typeof value.followUp === 'string' && value.followUp.length > 0,
      };
    })
    .catch(() => ({ shape: 'non-json' }));
}

async function saveDiagnostics(
  page: Page,
  options: LearnerBrowserOptions,
  diagnostics: string[],
): Promise<void> {
  await mkdir(options.screenshotDir, { recursive: true });
  await page.screenshot({ path: join(options.screenshotDir, `${options.stageId}.png`), fullPage: true });
  await writeFile(
    join(options.screenshotDir, `${options.stageId}.json`),
    JSON.stringify({ url: safeUrl(page.url()), diagnostics: diagnostics.slice(-100) }, null, 2),
  );
}

async function waitForQuiz(page: Page, timeoutMs: number): Promise<void> {
  await page.getByText('Loading classroom...').waitFor({ state: 'hidden', timeout: timeoutMs });
  await page
    .getByRole('button', { name: 'Start Quiz' })
    .or(page.getByPlaceholder('Type your answer here...'))
    .waitFor({ state: 'visible', timeout: timeoutMs });
}

function usage(): string {
  return `Usage: pnpm browser:learner -- --stage <stageId> [options]

Options:
  --base-url <url>          Local server URL (default ${DEFAULTS.baseURL})
  --learner-key <key>       Seed maic:device:runtime.learnerKey before bootstrap
  --headed                  Show Chromium (headless by default)
  --screenshot-dir <path>   Diagnostics output (default ${DEFAULTS.screenshotDir})
  --timeout-ms <ms>         Bounded action timeout (1000-120000)
  --require-draft           Fail unless a restored short-answer draft is visible
  --submit-restored         Submit the restored draft exactly once, then reload and verify review`;
}

export async function runLearnerBrowser(options: LearnerBrowserOptions): Promise<void> {
  const browser = await chromium.launch({ headless: options.headless });
  const context = await browser.newContext();
  const diagnostics: string[] = [];
  try {
    if (options.learnerKey) {
      await context.addInitScript(
        ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
        { key: LEARNER_KEY_STORAGE_KEY, value: options.learnerKey },
      );
    }
    const page = await context.newPage();
    page.setDefaultTimeout(options.timeoutMs);
    page.on('console', (message) => {
      const entry = safeConsole(message);
      if (entry) diagnostics.push(entry);
    });
    page.on('pageerror', (error) => diagnostics.push(`[pageerror] ${error.message.slice(0, 500)}`));
    page.on('requestfailed', (request) =>
      diagnostics.push(`[requestfailed] ${safeUrl(request.url())} ${request.failure()?.errorText ?? ''}`),
    );
    page.on('response', (response) => {
      if (response.status() >= 400 && response.url().startsWith(options.baseURL)) {
        diagnostics.push(`[http:${response.status()}] ${safeUrl(response.url())}`);
      }
    });

    await page.goto(`${options.baseURL}/classroom/${encodeURIComponent(options.stageId)}`, {
      waitUntil: 'domcontentloaded',
      timeout: options.timeoutMs,
    });
    await waitForQuiz(page, options.timeoutMs);
    const startQuiz = page.getByRole('button', { name: 'Start Quiz' });
    if (await startQuiz.isVisible()) await startQuiz.click();
    const answer = page.getByPlaceholder('Type your answer here...');
    await answer.waitFor({ state: 'visible', timeout: options.timeoutMs });
    const restoredAnswer = await answer.inputValue();
    if (options.requireDraft && !restoredAnswer.trim()) {
      throw new Error('Expected a durable learner draft, but the quiz answer was blank');
    }
    diagnostics.push(`[learner] restoredDraft=${restoredAnswer.trim().length > 0}`);

    if (options.submitRestored) {
      const responsePromise = page.waitForResponse(
        (response) => response.url().includes('/api/quiz-grade') && response.request().method() === 'POST',
        { timeout: options.timeoutMs },
      );
      await page.getByRole('button', { name: 'Submit Answers' }).click();
      const response = await responsePromise;
      const grade = await summarizeGrade(response);
      diagnostics.push(`[grader] status=${response.status()} ${JSON.stringify(grade)}`);
      if (response.status() !== 200 || grade.decision !== 'pass') {
        throw new Error('Restored learner draft did not receive a passing grade');
      }
      await page.getByText('Analysis').waitFor({ state: 'visible', timeout: options.timeoutMs });
      await page.reload({ waitUntil: 'domcontentloaded', timeout: options.timeoutMs });
      await waitForQuiz(page, options.timeoutMs).catch(() => undefined);
      await page.getByText('Analysis').waitFor({ state: 'visible', timeout: options.timeoutMs });
      diagnostics.push('[learner] review persisted after reload');
    }
    await saveDiagnostics(page, options, diagnostics);
    console.log(JSON.stringify({ stageId: options.stageId, diagnostics }, null, 2));
  } catch (error) {
    const pages = context.pages();
    const page = pages.at(-1);
    if (page) await saveDiagnostics(page, options, diagnostics).catch(() => undefined);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

async function main(): Promise<void> {
  try {
    await runLearnerBrowser(parseLearnerBrowserArgs(process.argv.slice(2)));
  } catch (error) {
    if (error instanceof Error && error.message === 'HELP') {
      console.log(usage());
      process.exitCode = 0;
    } else {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    }
  }
}

if (process.argv[1]?.replace(/\\/g, '/').endsWith('/scripts/learner-browser.ts')) {
  void main();
}
