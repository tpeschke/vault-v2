# Design chat

Contents: Steps, Prompt, Design-note template

The design chat is a separate conversation with an LLM that can search the web. It gets the zipped ledger as background, researches prior art, screens the design and writes design notes. It never edits the ledger and never sees the code, which is why the merge step exists.

## Steps

1. Pack the ledger: `python scripts/pack_ledger.py` (prints the zip path). Add `--include 00-START-HERE.md` to bring the repo-level front panel along, and `--include CODE-LAYOUT-STANDARD.md` when the design adds or moves code.
2. Start a chat with a web-search-capable LLM and attach the zip. If the design touches a topic covered by an Anne-style knowledge base, attach that too.
3. Paste the prompt below, filling in the task.
4. Iterate until the design notes are solid.
5. Bring the notes into the coding session and ask for a merge (see *Merge a design into the ledger* in SKILL.md).

## Prompt

```
Attached is the project ledger (zip). It is background only. Do not modify or restate it.

Task: <the feature or problem, in my words>

Process:
1. Read the ledger's front panel and the parts relevant to this task. List the constraints and conventions you will respect. If a layout standard is attached, design within it: say which owner the new capability belongs to and why (who may change its meaning), or say plainly that ownership is unresolved and what is ambiguous.
2. Before giving any opinion, search the web for how others have solved this or similar problems. Report 3-6 distinct approaches with sources and the conditions under which each fits. Give no unresearched opinion at any point.
3. Then evaluate my design against what you found and screen it for cognitive errors: confirmation bias (finding only sources that agree), anchoring on the first approach, planning fallacy, over-engineering or premature generalization, sunk cost, cargo-culting ("X does it") without checking fit, survivorship bias in the prior art, false dichotomy, unexamined assumptions.
4. Write design notes in the template below.

Rules:
- You cannot see the code. List every assumption about it under "Assumptions about the code".
- Decisions that belong to me go under "Open questions". Do not decide them.
- Do not write the implementation. Short illustrative snippets only.
- No pleasantries, no praise, no restating my message.
[Optional, delete if unused: an Anne-style knowledge base is attached. Load its AnnesRules.md once, then route through its START-HERE.md before searching the web. List new findings worth adding to it, addressed by owner file and heading.]

Template:
<paste the design-note template from below>
```

## Design-note template

```markdown
# Design notes: <topic>
date: <YYYY-MM-DD>

## Problem and constraints
<from the task, plus the ledger constraints being respected>

## Prior art
| Approach | Source | Fits when | Costs |
|---|---|---|---|

## Proposed design
<what, in enough detail to derive TODOs>

## Ownership (if the design adds or moves code)
<proposed owner and why, or "unresolved: <what is ambiguous>">

## Screen for cognitive errors
<each error checked: the finding, or "no issue found" and why>

## Assumptions about the code
<each assumption the merge step must verify>

## Open questions
<decisions for the designer>

## TODO outline
<coarse ordered steps; the coding agent makes them detailed at merge>
```
