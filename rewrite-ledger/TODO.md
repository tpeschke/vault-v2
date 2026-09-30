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
1. Create paired root front panels. Human panel: what the repo is, that L1 routing is the feature index, pointer to `rewrite-ledger/feature-index.md`, and designer vocabulary (unmarked “character” means v2; say v1 otherwise).
2. YAML: `kind: project`, `routing` keys = accepted inventory names plus aliases (no v1 create-character key), each value `primary` (backend path) and `adjacent` (app paths) left empty until T-002, plus `excludes: [dist/]`.
3. Update `rewrite-ledger/00-START-HERE.md` and `.yaml` to route “feature index” to the root panels, and drop the gap “no repository 00-START-HERE panels”.
done when: both root panel files exist; YAML parses; `rewrite-ledger/00-START-HERE.yaml` `gaps` no longer lists missing root panels; grep `no repository 00-START-HERE` in `rewrite-ledger/` is 0 hits.
depends on: none (inventory accepted 2026-09-30)
open questions: none
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
5. Do not add a v1 create-character route. Do not map v2 Create character to `HomeController.addCharacter`. Map it to `backend/server/v2/add/`. T-004 removes the unwired v1 function.
done when: every accepted inventory row has a `routing` key; YAML parses; each `primary` path exists on disk; `features/`, `entities/`, `widgets/` directories have not been created; grep of root `00-START-HERE.yaml` for a v1 create-character key is 0 hits.
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
depends on: T-002, T-004
open questions: where to put files that are mechanisms (Redux store, database helper, replaceScripts) if they are not a user objective — list them as `unindexed` and stop, do not assign a feature.
deviations from design: none
result:

### T-004: Remove HomeController.addCharacter
status: proposed
source: rewrite-ledger/feature-index.md, 2026-09-30 (v1 create permanently excluded)
why: v1 will never add characters. `HomeController.addCharacter` inserts into `cvcharactermain` and is not mounted. It is not the v2 Create character path.
scope: `backend/server/controllers/home/HomeController.ts`; `backend/server/v1/queries/home.ts` keys `insertCharacter` and `characterCount` (only used by that function). Owner unresolved: home/backend has no front panel; current paths.
steps:
1. Delete `export async function addCharacter` from `HomeController.ts`.
2. Remove imports that become unused (`homeSQL`, `isOwner`, `query`) if `viewUsersCharacters` does not use them.
3. Remove `insertCharacter` and `characterCount` from `backend/server/v1/queries/home.ts` if no remaining references.
4. Do not change `UsersCharactersHook.addCharacter`, `HomeFooter`, `V2CharacterDisplay`, or `backend/server/v2/add/`.
5. Do not mount a replacement v1 create route.
done when: grep `function addCharacter` in `backend/server/controllers/home/` is 0 hits; grep `homeSQL.insertCharacter` and `homeSQL.characterCount` in `backend/` is 0 hits; grep `insertCharacter:` and `characterCount:` in `backend/server/v1/queries/home.ts` is 0 hits; `HomeRoutes.ts` still exports GET `allOfUsersCharacter` and DELETE `/:characterID`; v2 add route in `vault.ts` is unchanged.
depends on: none
open questions: none
deviations from design: none
result:

## Done

(none)
