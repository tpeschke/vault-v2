# Rewrite Ledger

status: active   date: 2026-09-30

## What this owner is for

Project memory for this repository. Records inherited behavior, architectural discoveries, decisions, migration plans, known gaps, design notes, and detailed TODOs. Consult it before rewriting or replacing inherited behavior.

The ledger exposes context. It does not impose coding procedure.

## Designer vocabulary

Canonical: repository `00-START-HERE.md` § Designer vocabulary. Unmarked **character** means v2.

## Who owns changes to its meaning

The designer (the human directing this session). Agents merge, execute, and record; they do not invent design.

## What it provides

- `00-START-HERE.md` / `00-START-HERE.yaml`: this owner’s purpose, boundary, and routing
- `TODO.md`: detailed TODOs (proposed, approved, in-progress, done, blocked)
- Topic files (one per topic, added only when a real need appears): decisions, inherited behavior, migration plans, known gaps, design notes

## What it does not own

- Application code, tests, build config, and scripts
- Design-chat research (sources, essays, generic doctrine)
- Coding practices and procedures, unless the user asks to record them
- The live feature index (repository `00-START-HERE` panels)

## Neighboring owners

- Repository front panels: `../00-START-HERE.md` and `../00-START-HERE.yaml` (L1 feature index).
- No `AGENTS.md`. Current code locations are observed paths, not owners:

- `app/` — Vite/React frontend (`@vault/main` workspace)
- `backend/` — server and common packages
- `replaceScripts/` — post-build replace-in-file configs

Do not park new meaning in `core`, `common`, `shared`, `types`, `utilities`, or root-level `fixtures` when an owner is unclear; stop and ask.

## Where things are

| Need | Go to |
|---|---|
| Designer vocabulary (“character”) | `../00-START-HERE.md` § Designer vocabulary |
| TODOs | `TODO.md` |
| Feature-index decision | `feature-index.md` |
| Feature inventory (accepted) | `feature-inventory.md` |
| Feature index (L1) | `../00-START-HERE.yaml` |
| Code | `../00-START-HERE.yaml` `routing` |
| Layout standard | later transformation uses FSD layer names; skill fallback `CODE-LAYOUT-STANDARD.md` is not the target taxonomy |

## Ledger hygiene

- One canonical home per fact. Link instead of copying.
- Date entries. Mark superseded decisions as superseded; do not delete the history that explains current code.
- Add a topic file only when a real need appears. Let context-loss reviews shape the layout.
