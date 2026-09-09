import { test, expect } from '../fixtures/base';
import type { Page } from '@playwright/test';
import { ClassroomPage } from '../pages/classroom.page';

const stageId = 'e2e-reasoning-gate-learner';
const sceneId = 'e2e-reasoning-gate-scene';
const questionId = 'e2e-reasoning-gate-question';
const analysis = 'The hidden clinical explanation appears only after a passing assessment.';

async function seedGatedQuiz(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(
    ({ stageId, sceneId, questionId, analysis }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open('maic-documents', 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          db.createObjectStore('stages', { keyPath: 'id' });
          const scenes = db.createObjectStore('scenes', { keyPath: ['stageId', 'id'] });
          scenes.createIndex('by-stage', 'stageId');
          db.createObjectStore('outlines', { keyPath: 'stageId' });
        };
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(['stages', 'scenes', 'outlines'], 'readwrite');
          const now = Date.now();
          tx.objectStore('stages').put({
            id: stageId,
            name: 'Reasoning gate learner test',
            description: '',
            language: 'en-US',
            style: 'professional',
            createdAt: now,
            updatedAt: now,
            dslVersion: '0.1.0',
          });
          tx.objectStore('scenes').put({
            id: sceneId,
            stageId,
            type: 'quiz',
            title: 'Reasoning checkpoint',
            order: 0,
            content: {
              type: 'quiz',
              questions: [
                {
                  id: questionId,
                  type: 'short_answer',
                  question: 'Explain the evidence, mechanism, action, and observable target.',
                  analysis,
                  points: 1,
                  reasoningGate: { rubric: 'evidence, mechanism, action, observable target', passThreshold: 0.8 },
                },
              ],
            },
            createdAt: now,
            updatedAt: now,
          });
          tx.objectStore('outlines').put({
            stageId,
            outline: { outlines: [], createdAt: now, updatedAt: now },
          });
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
        request.onerror = () => reject(request.error);
      }),
    { stageId, sceneId, questionId, analysis },
  );
}

test('keeps reasoning analysis locked through revisions and restores a passing review', async ({
  page,
}) => {
  await seedGatedQuiz(page);
  await page.route('**/api/quiz-grade', async (route) => {
    const answer = String(route.request().postDataJSON()?.userAnswer ?? '');
    const body = answer.includes('adequate')
      ? { success: true, decision: 'pass', score: 0.9, feedback: 'Complete reasoning.' }
      : answer.includes('partial')
        ? {
            success: true,
            decision: 'revise',
            score: 0.6,
            feedback: 'You supplied evidence and mechanism.',
            followUp: 'What action will you take?',
          }
        : {
            success: true,
            decision: 'revise',
            score: 0.2,
            feedback: 'The response is too vague.',
            followUp: 'What evidence did you observe?',
          };
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
  });

  const classroom = new ClassroomPage(page);
  await classroom.goto(stageId);
  await classroom.waitForLoaded();
  await page.getByRole('button', { name: 'Start Quiz' }).click();
  const answer = page.getByPlaceholder('Type your answer here...');
  const submit = page.getByRole('button', { name: 'Submit Answers' });

  await answer.fill('vague');
  await submit.click();
  await expect(page.getByText('What evidence did you observe?')).toBeVisible();
  await expect(page.getByText(analysis)).toBeHidden();

  await page.reload();
  await classroom.waitForLoaded();
  await page.getByRole('button', { name: 'Start Quiz' }).click();
  await expect(answer).toHaveValue('vague');
  await expect(page.getByText('What evidence did you observe?')).toBeHidden();

  await answer.fill('partial');
  await submit.click();
  await expect(page.getByText('What action will you take?')).toBeVisible();
  await expect(page.getByText(analysis)).toBeHidden();

  await answer.fill('adequate evidence mechanism action observable target');
  await submit.click();
  await expect(page.getByText('Complete reasoning.')).toBeVisible();
  await expect(page.getByText(analysis)).toBeVisible();

  await page.reload();
  await classroom.waitForLoaded();
  await expect(page.getByText(analysis)).toBeVisible();
  await expect(page.getByText('Complete reasoning.')).toBeVisible();
});
