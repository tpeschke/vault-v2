# Bonfire Character Vault

status: active   date: 2026-09-30

## What this owner is for

Repository navigation. L1 feature index for this project. Lookup replaces scanning.

## Designer vocabulary

Unmarked **character** means a **v2** character. Say **v1** (or “ancient”) when the other sheet is meant. Do not infer v1 from an unmarked “character.”

## Who owns changes to its meaning

The designer. This panel owns how tasks route to code, not product meaning.

## What it provides

- This file: purpose, vocabulary, where to go
- `00-START-HERE.yaml`: feature routing (`primary` / `adjacent`) and `unindexed`
- `AGENTS.md`: agent entry — start at this pair, then the ledger
- Pointers to `rewrite-ledger/` (decisions, inventory, TODOs)

## What it does not own

- Application code, tests, build, and scripts
- Design decisions (ledger)
- FSD layer directories (deferred; will be `app/src/{app,pages,…}`, not a rename of package `app/`)

## Neighboring owners

- `rewrite-ledger/` — project memory. Feature list: `rewrite-ledger/feature-inventory.md`. Index decision: `rewrite-ledger/feature-index.md`.
- Code still lives at observed paths, not owners: `app/`, `backend/`, `replaceScripts/`.

## Where things are

| Need | Go to |
|---|---|
| Agent entry | `AGENTS.md` |
| Feature route (L1) | `00-START-HERE.yaml` `routing` |
| Unindexed source | `00-START-HERE.yaml` `unindexed` |
| Accepted feature names | `rewrite-ledger/feature-inventory.md` |
| Index rules | `rewrite-ledger/feature-index.md` |
| TODOs | `rewrite-ledger/TODO.md` |
| Ledger | `rewrite-ledger/00-START-HERE.md` |

Create v1 character is not a route. `dist/` is excluded from the index.

Keep routing in the same change as add/move/rename/delete of indexed files.
