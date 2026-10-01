# Ledger templates

Contents: What the ledger records, Skeleton, Decision entry, TODO entry, Ledger hygiene

Use the ledger's existing layout and formats when they exist. These are starting points for a new ledger or a new kind of entry.

## What the ledger records

Inherited behavior, architectural discoveries, decisions, migration plans, known gaps, why rewrites preserve or replace existing choices, design notes and detailed TODOs.

The ledger exposes context; it does not impose coding procedure. Coding practices and procedures go in only when the user asks for them.

## Skeleton

Only when no ledger exists and the user asked for one. Add a file only when a real need appears, and let context-loss reviews shape the layout.

```
rewrite-ledger/
├── 00-START-HERE.md     # what the ledger is for, what it owns and excludes, where things are
├── 00-START-HERE.yaml   # machine routing
├── TODO.md              # detailed TODOs
└── <topic>.md           # decisions, design notes, inherited behavior, migration plans, known gaps; one file per topic
```

The YAML panel follows the standard's fields:

```yaml
schema_version: 1
kind: ledger
id: rewrite-ledger
name: Rewrite Ledger
owns: <one-sentence ownership boundary>
excludes: []
uses: []
entrypoints: {}
routing: {}
```

## Decision entry

Written during Merge wherever the ledger keeps decisions. The distilled result of a design note, not a copy of it.

```markdown
# <topic>
status: <accepted | superseded by <link>>   date: <YYYY-MM-DD>

Decision: <what was decided, 1-3 lines>
Why: <the rationale a future change would need>
Constraints it imposes: <what future code must respect>
Rejected: <alternatives and why, one line each; omit if none mattered>
Touches: <owners, paths or modules>
TODOs: <T-ids>
```

## TODO entry

Detailed enough that an agent with no memory of the session can execute it.

```markdown
### T-<n>: <imperative title>
status: proposed | approved | in-progress | done | blocked
source: <design note or decision entry, with date>
why: <1-2 lines>
scope: <files and symbols, with their owner, taken from the front panels; "owner unresolved: <what is ambiguous>" if so>
steps:
1. <concrete action>
2. <concrete action>
done when: <mechanical checks: test command, type-check, build, grep expecting zero hits>
depends on: <T-ids or none>
open questions: <items needing a designer ruling, or none>
deviations from design: <changes made at merge, and why, or none>
result: <filled on completion: 1-3 lines>
```

Status flow: Merge writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in a `Done` section at the bottom of `TODO.md` and prune old ones so the active list stays short.

## Ledger hygiene

- One canonical home per fact. Link instead of copying, because duplicates drift. A short pointer-style reminder is acceptable where losing the fact would cost more than the duplication, and it never overrides the canonical entry.
- Record what is true and binding for this codebase: decisions, constraints, inherited behavior, known gaps. Leave out essays, source lists and generic advice; every line is re-read on every task.
- Date entries. Mark superseded decisions as superseded instead of deleting the history that explains current code.
- When a change revises an existing rule or standard, keep the original and record a disposition for each original rule (retained, revised, rejected, relocated).
