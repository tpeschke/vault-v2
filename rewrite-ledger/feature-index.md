# Index files by feature
status: accepted   date: 2026-09-30

Decision: Index files in place. L1 keys are user objectives, each split by sheet version (v1 / v2) when that objective exists in that version. When a feature spans frontend and backend, the primary owner is the backend. Exclude `dist/` from completeness. A later tree transformation, if done, uses Feature-Sliced Design layer names (`app`, `pages`, `widgets`, `features`, `entities`, `shared`), not Workbenches / Playbooks / Tools / Mechanisms.

Why: Task lookup needs a feature vocabulary without moving code. Version splits match the two live sheet implementations. Backend owns meaning for cross-surface features. FSD names are the designer’s target taxonomy for a future move, not this index.

Constraints it imposes:
- Do not relocate application files as part of building the index.
- Do not treat sheet widgets (weapons, stats, armor, …) as features unless the inventory names them as user objectives.
- One file, one primary owner; primary is backend when the feature has a backend. Frontend paths are adjacencies.
- `dist/` is excluded from the completeness rule (generated SPA output).
- Do not create FSD folders until a separate structural design is approved.
- v1 has no create-character objective, ever. Do not add it to the inventory or to L1 routing.
- Designer speech: unmarked “character” means v2. Canonical: repository `00-START-HERE.md` § Designer vocabulary.

Rejected:
- Colocate into feature folders now (index-in-place chosen).
- Derive feature names from current folders (`pageOne`, `pageTwo`) as the primary vocabulary.
- CODEOWNERS, FeatureIDE traces, or recovered feature-location as the living index.
- v1 create character (permanently excluded).

Touches: repository `00-START-HERE.md`, `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`; observed `app/`, `backend/`
TODOs: T-001–T-007 (all done)
