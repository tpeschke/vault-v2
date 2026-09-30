# TODOs

status: active   date: 2026-09-30

Merge writes `proposed`. The user's instruction to execute counts as approval. Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-001: Add repository front panels that own the feature index
status: proposed
source: rewrite-ledger/feature-index.md, 2026-09-30
why: L1 for the repo does not exist. The feature index lives on the root panels, not in the ledger.
scope: new `00-START-HERE.md` and `00-START-HERE.yaml` at repo root. Owner unresolved until those panels exist; they will own repository navigation.
steps:
1. Wait until `rewrite-ledger/feature-inventory.md` status is `accepted` (designer finished edits).
2. Create paired root front panels. Human panel: what the repo is, that L1 routing is the feature index, pointer to `rewrite-ledger/feature-index.md`.
3. YAML: `kind: project`, `routing` keys = inventory names plus aliases, each value `primary` (backend path) and `adjacent` (app paths) left empty until T-002, plus `excludes: [dist/]`.
4. Update `rewrite-ledger/00-START-HERE.md` and `.yaml` to route “feature index” to the root panels, and drop the gap “no repository 00-START-HERE panels”.
done when: both root panel files exist; YAML parses; `rewrite-ledger/00-START-HERE.yaml` `gaps` no longer lists missing root panels; grep `no repository 00-START-HERE` in `rewrite-ledger/` is 0 hits.
depends on: designer accepting `rewrite-ledger/feature-inventory.md`
open questions: none once inventory is accepted
deviations from design: none
result:

### T-002: Map each accepted feature to backend primary and frontend adjacency
status: proposed
source: rewrite-ledger/feature-index.md, 2026-09-30
why: Index-in-place needs current paths. Backend is primary when the feature spans surfaces.
scope: `00-START-HERE.yaml` `routing` entries. Observed code under `backend/` (primary) and `app/` (adjacent). Owner unresolved: application owners are not established; use current paths.
steps:
1. For each row in the accepted inventory, set `primary` to the backend router/controller/directory that implements it (v1 vs v2 paths as split).
2. Set `adjacent` to the app page/hook/component directories that call or render it.
3. Unversioned log in / log out: primary `backend/server/routes/authentication.ts`; adjacent `app/src/components/header/icons/LoginLogoutIcons.tsx`.
4. Do not move files. Do not create FSD layer directories.
done when: every accepted inventory row has a `routing` key; YAML parses; each `primary` path exists on disk; `features/`, `entities/`, `widgets/` directories have not been created.
depends on: T-001
open questions: none
deviations from design: none
result:

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
depends on: T-002
open questions: where to put files that are mechanisms (Redux store, database helper, replaceScripts) if they are not a user objective — list them as `unindexed` and stop, do not assign a feature.
deviations from design: none
result:

## Done

(none)
