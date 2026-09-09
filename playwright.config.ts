import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3002';

export default defineConfig({
  testDir: './e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // CI builds the production bundle in a dedicated workflow step, so this
  // process only drives Chromium. Two workers fit a 4-core runner.
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'html' : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    // In CI the production build runs as a dedicated workflow step before
    // Playwright, so this only boots the already-built server (`pnpm start`).
    // The 120s budget covers startup, not the (much slower) build. Locally we
    // run the dev server.
    command: process.env.CI ? 'pnpm start' : 'pnpm dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Enable the MAIC Editor (Pro mode) so editor e2e can reach it. This is a
    // build-time NEXT_PUBLIC_* flag: in CI it must be set on the dedicated
    // `pnpm build` step; locally `pnpm dev` reads it here.
    env: {
      PORT: '3002',
      NEXT_PUBLIC_MAIC_EDITOR_ENABLED: 'true',
      // E2E fixtures seed their own browser-local documents and runtime state.
      // A developer's native persistence setting must not make those tests
      // share or mutate their live PostgreSQL acceptance data.
      NEXT_PUBLIC_PERSISTENCE: '0',
    },
  },
});
