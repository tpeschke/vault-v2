# FSD colocation
status: accepted (question 1 only)   date: 2026-10-01

Decision: Keep the Vite/React package at repo `app/` (`index.html`, `src/`, `vite.config.ts`). When FSD folders are created, they go under `app/src/` as `app/src/app`, `app/src/pages`, `app/src/widgets`, `app/src/features`, `app/src/entities`, `app/src/shared`. Do not rename or replace the `app/` package with an FSD layer at the monorepo root.

Why: Vite and the current frontend expect a package root with `index.html` + `src/`. FSD’s `app` layer is a slice of `src`, not the npm package. Colliding those names at repo top level would fight the bundler.

Constraints it imposes:
- Repo top level stays `app/` (frontend package) and `backend/` (server).
- FSD `app` ≠ package `app/`. The layer path is `app/src/app`.
- Do not create those `app/src/...` layer folders until remaining open questions are decided and TODOs execute the move.
- L1 YAML must be updated in the same change as any later move.

Rejected: Replacing `app/` with FSD layers at the repository root.

Open (not decided):
- One `pages/view` with v1/v2 inside vs two page slices
- Backend: L1-only vs a later backend taxonomy
- When Create character becomes `features/create-character` vs staying on the home page slice

Touches: future `app/src/{app,pages,widgets,features,entities,shared}`; not `backend/`
TODOs: none until the remaining questions are answered
