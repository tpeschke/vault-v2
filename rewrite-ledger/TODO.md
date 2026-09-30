# TODOs

status: active   date: 2026-09-30

Merge writes `proposed`. The user's instruction to execute counts as approval. Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-003: Completeness pass excluding dist/
status: proposed
source: rewrite-ledger/feature-index.md, 2026-09-30
why: An unrouted source file is an index gap. Generated `dist/` is excluded by decision.
scope: owned source under `app/src`, `backend/`, `replaceScripts/`. Root `00-START-HERE.yaml`.
steps:
1. List source files under `app/src`, `backend/`, `replaceScripts/` (exclude `**/dist/**`, `node_modules`, lockfiles).
2. Mark each as covered by a routing `primary`/`adjacent` path (directory cover counts), or record it under a panel `unindexed` gap list — do not invent a new feature.
3. Confirm `app/dist` and `backend/**/dist` are not routing targets.
done when: a file list of those three trees minus `dist/` and `node_modules` is either path-prefixed by some routing entry or named in `unindexed`; YAML `excludes` contains `dist/`; no `dist` path appears under `routing` values.
depends on: T-002, T-004
open questions: where to put files that are mechanisms (Redux store, database helper, replaceScripts) if they are not a user objective — list them as `unindexed` and stop, do not assign a feature.
deviations from design: none
result:

## Done

### T-002: Map each accepted feature to backend primary and frontend adjacency
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: Index-in-place needs current paths. Backend is primary when the feature spans surfaces.
scope: `00-START-HERE.yaml` `routing`.
result: Twelve inventory rows mapped. PDF has no backend; primary is `app/src/pages/view/v1/hooks/utilities/downloadUtilities.ts`. Create character maps to `backend/server/v2/add/`.
deviations from design: download v1 PDF primary is frontend-only (no backend path).

### T-004: Remove HomeController.addCharacter
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30 (v1 create permanently excluded)
why: v1 will never add characters. `HomeController.addCharacter` inserts into `cvcharactermain` and is not mounted. It is not the v2 Create character path.
scope: `backend/server/controllers/home/HomeController.ts`; `backend/server/v1/queries/home.ts`.
result: Deleted `addCharacter` and unused imports from HomeController. Removed `insertCharacter` and `characterCount` SQL. Home GET/DELETE and v2 add path unchanged.
deviations from design: none

### T-001: Add repository front panels that own the feature index
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: L1 for the repo does not exist. The feature index lives on the root panels, not in the ledger.
scope: `00-START-HERE.md` and `00-START-HERE.yaml` at repo root (now the navigation owner).
result: Root panels added. YAML routing keys match the accepted inventory plus aliases; `primary`/`adjacent` left empty for T-002. No v1 create-character key. Vocabulary lives on the repo human panel. Ledger routes L1 to the root YAML.
deviations from design: none

