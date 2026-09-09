# Native Windows setup

Run these commands from this repository in PowerShell:

```powershell
docker compose --env-file .env.local -f compose.postgres.yml up -d --wait
corepack pnpm dev --hostname 127.0.0.1 --port 3001
```

Open http://localhost:3001/workspace. PostgreSQL is dedicated to OpenMAIC,
bound to 127.0.0.1:55432, with named volume
`openmaic-native_openmaic-postgres`. The application runs on Windows.
The upstream Dockerfile and docker-compose.yml were restored unchanged.

Credentials and feature flags are in the Git-ignored `.env.local`.
Do not commit or share that file. This configuration is for localhost personal use.
Set `OPENMAIC_POSTGRES_PASSWORD` in `.env.local` to the same database password
used by `DATABASE_URL`. The Compose file requires this variable and contains no
credential value. Changing it does not rotate a password in an existing database.

To stop the database without deleting its container or volume:

```powershell
docker compose --env-file .env.local -f compose.postgres.yml stop
```

## Validation

- Native Windows PostgreSQL connection passed; application tables initialized.
- Pro Workbench opened and created a durable session.
- The session record survived an application restart.
- Applied upstream PR #1297 commit 0352ffde4d5b218ef106ff55478ec53e68d6307c
  by cherry-pick as 2ee95f3d. It fixes Windows skill discovery; pinned Pi
  dependencies remain unchanged.
- All 81 tests in tests/agent-runtime/skills.test.ts passed, including real
  built-in discovery. Production-scope TypeScript check passed with
  `corepack pnpm exec tsc --noEmit -p tsconfig.build.json`.
- A broader optional 10-file skill test run stalled without results and was
  cancelled; it is not a passing full-suite result.
- OpenAI Workbench created Ventilation Infrastructure Smoke Test:
  stage-cvJMpOrYz6, two slides and a short quiz. A follow-up added a fourth
  quiz question about PEEP to the same course.
- Workbench session 05d059f8-b0b1-4391-a4df-f4fd2c0ffae8 and all three scenes
  survived a native application restart, with identical stored scene hashes.
  The added PEEP question remained visible after reloading Workbench.
- No OpenAI/model errors occurred in the successful creation and edit runs.
- Original stock classroom eNdww3xtoY opens an empty 0/0 shell in the current
  test browser. Its earlier browser-local data was not found here; successful
  recovery has not been verified. No course data was deleted during this setup.
- No MealBoard/Supabase containers or databases were changed in this setup.

Use the native app and dedicated PostgreSQL service; no application Docker
build is needed. No custom RT curriculum has been developed.

## Recovery checkpoint

The local Git tag `checkpoint/native-windows-postgres-workbench-2026-09-04`
records the verified application code and reusable setup. It does not back up
PostgreSQL data or ignored credentials. Retain `.env.local` securely and preserve
the named database volume separately. Do not use a volume-deleting Compose command
when stopping this installation.
