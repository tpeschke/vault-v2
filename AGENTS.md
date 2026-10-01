# Agents

Read `00-START-HERE.md` and `00-START-HERE.yaml` first. That pair is L1. Route the task; do not scan the tree.

A new session that states an overall goal is Merge: write ledger TODOs and stop. That goal statement is not Execute approval. Execute only TODOs the designer names or approves.

When a phase is finished, report that phase and stop. Do not list or offer the next phase.

Unmarked **character** means v2. Say **v1** (or “ancient”) otherwise. Canonical: `00-START-HERE.md` § Designer vocabulary.

Decisions, inventory, and TODOs: `rewrite-ledger/00-START-HERE.md`. The ledger exposes context; it does not add coding procedure.

YAML `routing` maps each user objective to a backend `primary` (when one exists) and app `adjacent` paths. YAML `unindexed` is machinery and chrome, not missing features. Do not invent a feature to house an unindexed path.

Create v1 character is not a route. Exclude `dist/`.

Later tree: Feature-Sliced Design layers under `app/src/` (`app/src/app`, `pages`, `widgets`, `features`, `entities`, `shared`). Repo `app/` stays the Vite package. View page slices are `app/src/pages/v1` and `app/src/pages/v2`; home stays `app/src/pages/home`. Backend stays L1-only. Create character stays on the home page slice; do not add `features/create-character`. Do not create `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` unless a ledger TODO says so. Canonical: `rewrite-ledger/fsd-colocation.md`.

Keep `00-START-HERE.yaml` in the same change as add/move/rename/delete of indexed files. After a rename, grep the old path; expect zero hits.
