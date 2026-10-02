# Session phases
status: accepted   date: 2026-10-02

Decision: A new session that states an overall goal is Design (prior art, design notes, stop). That statement is not Order and not Execute. Order after the designer answers Design open questions or asks for Order. Execute only named TODOs.

Why: Design and implementation pollute each other. TODOs written before a screened design invent structure.

Constraints it imposes:
- Design does not touch the ledger or code.
- Order writes ledger decisions and detailed TODOs, then stops.
- Execute does not start from an overall goal alone.

Original `AGENTS.md` rule (disposition: **revised**): “A new session that states an overall goal is Order: write ledger TODOs and stop.” Canonical text is now `../AGENTS.md`.

Touches: `../AGENTS.md`
TODOs: none (recorded at Order)
