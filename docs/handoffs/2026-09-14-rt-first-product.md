# RT-first product handoff — 2026-09-14

## Product direction

OpenMAIC Teach is a private, RT-first learning product. Its primary promise is better respiratory reasoning at the bedside. A future licensure track will teach respiratory fundamentals and prepare students for RRT licensure, but it will not promise exam passage. Both tracks use the shared learning arc: visual explanation, worked example, retrieval or decision, targeted feedback, and spaced practice or transfer.

The product is educational. It does not provide patient-specific advice, replace local protocols or qualified supervision, or certify clinical competence. Clinical-ready material must be source-traceable and qualified-RT reviewed.

See [CONTEXT.md](../../CONTEXT.md) and [ADRs](../adr/) for the settled vocabulary and durable decisions.

## Verified current state

- Private remote only: `https://github.com/byonk19-svg/openmaic-teach.git`; do not work against the public upstream repository.
- `67583595` prevents malformed structured reasoning-gate metadata from reaching completed outline generation.
- Fresh live acceptance course `rP78uftpXO` generated one hard typed reasoning checkpoint, persisted its `rubric` and `passThreshold: 0.8`, passed one learner response, and retained Course Complete after reload.
- `1ff56f81` aligns the local verification runtime with Next 16.3.3 and removes unsafe Tailwind scans of published Streamdown bundles.
- Node 22 root typecheck, focused reasoning-gate route tests, generation package tests, and a local HTTP 200 check passed after that repair.

## Working constraints

- Provider attempts are explicit, bounded, and never retried without authorization.
- Do not open an incomplete classroom merely to inspect it; inspect authoritative persistence and logs instead.
- Keep generation completion distinct from learner completion.
- Preserve historical prototypes and unrelated working-tree files.
- Do not push, deploy, alter hosted resources, or modify the public upstream repository without explicit authorization.

## Current repository state

- Branch: `main`, one local commit ahead of `origin/teach/integrated-runtime`.
- The verification-runtime commit is local and unpushed.
- Untracked `CLAUDE.md` and `output/` belong to the user and are excluded from checkpoints.

## Recommended next task

Design the clinician-track content standard and review workflow before building additional modules. Define a source-record format, qualified-review status, and the first clinician module sequence; keep the licensure track as a future, separate planning slice.
