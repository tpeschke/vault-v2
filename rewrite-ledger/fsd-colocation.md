# FSD colocation
status: accepted   date: 2026-10-01

Decision: Keep the Vite/React package at repo `app/` (`index.html`, `src/`, `vite.config.ts`). When FSD folders are created, they go under `app/src/` as `app/src/app`, `app/src/pages`, `app/src/widgets`, `app/src/features`, `app/src/entities`, `app/src/shared`. `pages/` is the home slice plus two view slices (v1 and v2), not one `pages/view` with versions nested. Backend has no FSD or other parallel taxonomy; it stays on L1. Frontend Create character stays on the home page slice.

Why: Vite and the current frontend expect a package root with `index.html` + `src/`. FSD’s `app` layer is a slice of `src`, not the npm package. The two view routes (`/view/:characterID`, `/v/:characterID`) are separate pages. Backend meaning is already the L1 `primary`. Create is a home-footer action, not a route.

Constraints it imposes:
- Repo top level stays `app/` (frontend package) and `backend/` (server).
- FSD `app` ≠ package `app/`. The layer path is `app/src/app`.
- Two FSD view page slices. Do not keep a single `pages/view` that nests v1 and v2.
- Home remains a page slice. Create character on the frontend stays there (`HomeFooter`, `V2CharacterDisplay`, `UsersCharactersHook.addCharacter`). Do not extract `features/create-character`. Do not add a create route. v1 create remains excluded.
- Do not add backend layer folders. Backend paths stay on `00-START-HERE.yaml` routing.
- Do not create empty `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` because the grammar lists them. Create a layer folder only when a TODO moves an owner into it.
- Do not create FSD folders until TODOs execute the move.
- L1 YAML must be updated in the same change as any later move.

Rejected:
- Replacing `app/` with FSD layers at the repository root.
- One `pages/view` with v1/v2 inside.
- A later backend taxonomy parallel to FSD.
- Extracting Create character to `features/create-character`.

Open (not decided):
- Directory names for the two view slices (observed today: `app/src/pages/view/v1`, `app/src/pages/view/v2`).
- Owner of `app/src/pages/view/View.css` after the parent `view/` folder is removed.

Touches: future `app/src/pages/` (home + two view slices); not `backend/` tree shape
TODOs: T-008 (proposed)
