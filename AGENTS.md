# Agents

Read `00-START-HERE.md` and `00-START-HERE.yaml` first. That pair is L1. Route the task; do not scan the tree.

Unmarked **character** means v2. Say **v1** (or “ancient”) otherwise. Canonical: `00-START-HERE.md` § Designer vocabulary.

Decisions, inventory, and TODOs: `rewrite-ledger/00-START-HERE.md`. The ledger exposes context; it does not add coding procedure.

YAML `routing` maps each user objective to a backend `primary` (when one exists) and app `adjacent` paths. YAML `unindexed` is machinery and chrome, not missing features. Do not invent a feature to house an unindexed path.

Create v1 character is not a route. Exclude `dist/`.

Later tree (not now): Feature-Sliced Design layer names (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). Do not create those folders unless a ledger TODO says so. Repo `app/` is the current frontend package, not an FSD layer.

Keep `00-START-HERE.yaml` in the same change as add/move/rename/delete of indexed files. After a rename, grep the old path; expect zero hits.
