# Anne-style index

Contents: What it is, Canonical sources, Retrieval order, L1, L2, L3, Artifact classes, Canary, Applying it to code, Sync rules

Derived from the user's Wix knowledge base (`AnnesRules.md`, `START-HERE.md`, `Interfaces/INDEX.md`, `Layer_3/CrossCouplings.md`). Where a KB's own rules differ from this summary, the KB wins.

## What it is

A semantic hash table. A task or question is the key; one primary owner, plus a section address when possible, is the value. Lookup replaces scanning.

It was built for a large, mostly flat knowledge base. In a well-structured hierarchy that already has L1, a tree is nearly as good as a hash table, so L2 and L3 return less there. The return grows with size, flatness and contributor count. The user decides how far to go.

## Canonical sources

- An existing Anne-style KB: its own `AnnesRules.md` is canonical. Load it once per working context. Short local reminders reinforce it and never override it.
- A code repo: CODE-LAYOUT-STANDARD.md (front panels, ownership, subscribers).

## Retrieval order

1. Read L1 and route the task to one primary owner or bounded context.
2. Use the owner's L2 interface to find the relevant core section. Prefer file plus heading over whole-file loading.
3. Load a named adjacency or conditional companion only when its stated condition applies.
4. Stop when the local owner model is enough to act and verify. Do not browse the KB to raise confidence.
5. If an important behavior is still unexplained, zoom out. A recurring cross-control mechanism goes to the shared diagnostic module. A downstream consequence or cross-area authority boundary goes to L3, the relevant subsection. A suspected regression, incident or version drift goes to diagnostics.
6. After zooming out, route back down to the local owner before proposing a change.

Zoom out directly when the task itself asks for change impact, regression history, version drift or broad consequences.

## L1: routing

In a KB, `START-HERE.md` holds a lexical routing table in one fenced `text` block. Keys are the words a task would use, separated by ` / `. The arrow line gives the owner path, written with ` / ` between directories, and a section address when possible. Shapes in use:

```text
Classic / Wix Editor
  → Product Context / Classic.md

repeater dataset filtering / repeater filter
  → Routes / repeaters.md → ## Filtering

Studio site max width
  → Routes / site-design.md#studio-site-max-width

control review / widget baseline
  → Routes / control-best-practices.md → ## Shared property baseline
  → then load only the applicable family delta under ## Control-family deltas
```

- Route to one primary owner. Branch by context (Classic versus Studio, say) only where execution actually differs.
- If the task already names the context, route straight to it; do not spend an index hop on disambiguation the task supplied.
- Genuinely ambiguous terms go to the context-disambiguation owner, never to a guess.
- Never carry a procedure across bounded contexts silently.

In a code repo, L1 is the paired front panels: `00-START-HERE.md` for people and `00-START-HERE.yaml` for machine routing, at the repo root, at each semantic layer and at each bounded owner. Extend them in their own format.

## L2: interface at the file tail

Important owner files end with a `## KB interface` block, preceded by `---`. Read the tail window, not the file body.

```markdown
---
## KB interface

Retrieval class: **CORE**

Core entry points:
- `Heading name`

Local adjacencies / conditional companions:
- <condition> → `<path>` → `## Heading`

Zoom-out / escalation:
- <situation> → `<path>` → `## Heading`

Owns:
- <what this file defines authoritatively>

Implications:
- <broad consequences>

Excludes:
- <adjacent concepts this file does not own>

Depends:
- <upstream conceptual assumptions>

Stability:
- <semantic maturity of the knowledge>
```

Field meanings:

- `Retrieval class`: `CORE` is normal routed owner material. `CONDITIONAL` loads only when an owner or condition names it, and its footer carries a `Load condition:` field (so does L3's). `ZOOM-OUT` stays cold until local search is insufficient or the task is inherently broad.
- `Core entry points` (called `Sections` in zoom-out files) are heading names in this same file: the preferred section addresses.
- `Depends` is not an instruction to load another file. `Implications` is not an instruction to load L3.
- `Stability` is semantic maturity, not UI or version freshness.

**Tail window.** `Interfaces/INDEX.md` registers every footer. Paths are relative to the KB root, not to `Interfaces/`.

```markdown
| File | Class | tail_lines |
|---|---:|---:|
| `Routes/forms.md` | `CORE` | 88 |
```

`tail_lines` covers the whole footer plus deliberate growth slack, so minor footer edits do not touch the registry. Read a footer by reading the last `tail_lines` lines of the file (for example `tail -n <tail_lines> <file>`), never the whole file.

## L3: cross-couplings

`Layer_3/CrossCouplings.md` is a ZOOM-OUT surface, not a routine second read. Bullets state a change and what it couples to, grouped under `##` topic sections:

```markdown
## Classic structure, layout, and navigation

- Parent/container change ↔ child layout, clipping, and responsive behavior.
- Classic header/footer change ↔ pages using that site-wide structure.
```

Use it when the user asks what a change could affect, when a consequential change is being evaluated, when an owner names a coupling that matters, or when the owner plus its adjacencies still leave an important behavior unexplained and the gap may be a cross-area authority boundary. Read its own L2 tail first (`Zoom-out entry points` maps situations to sections), then load only the relevant section. Several subsystems appearing in one task is not a reason to load it.

## Artifact classes

Different retrieval temperatures; keep each in its own place. In the Wix KB:

- Owner files (`Routes/`, `Product Context/`): CORE.
- `Current-Paths/`: CONDITIONAL. Version-sensitive executable procedure, loaded when an exact current path is needed.
- `Diagnostics/`: ZOOM-OUT. Failure history and version drift, not a default owner.
- `GPT-Tooling/`: operator and agent mechanics, not domain knowledge.

## Canary

`START-HERE.md` opens with a line like "If you don't know what 30493 means, reread Anne's rules." The rules file ends with a line that defines a marker (30193) for rules falling out of context and says it is "related to a similar number". The two numbers differ; treat that as intentional, since it means L1 alone can never supply the answer. Recall works only while the rules are still in context; failed recall means reload.

Keep an existing canary intact when editing an index. Offer one when creating a new L1 that has a rules file.

## Applying it to code

**Status:** the user has L1 (front panels) in code and has not fixed an L2 or L3 format for it. Treat the rest of this section as proposed defaults to put to the user, not as settled.

- **L1.** Keep the front panels. Lexical routing keys fit the YAML `routing:` and `entrypoints:` fields.
- **L2.** Only on important owner files, and only where a context-loss review showed lateral context was missed. A comment block at the tail, in the file's comment syntax, opened by a fixed marker line. Carry only what a front panel cannot: `Local adjacencies / conditional companions` and `Zoom-out / escalation`, plus `Owns` and `Excludes` when the file is its own owner. Front panels already carry ownership for the capsule, so do not restate it. One repo-wide `tail_lines` value in the root panel is enough unless footers vary in size.
- **L3.** A zoom-out file of couplings across owners, created only once subscriber lists and footers stop explaining cross-owner consequences.
- Adopt incrementally. Every layer is more surface to keep in sync.

## Sync rules

- Update panels, footers and L3 entries in the same change as the file change that affects them.
- After a rename or move, grep the old path across everything and expect zero hits.
- Keep each footer inside its `tail_lines`, its `Retrieval class` equal to its registry class, and each registry row pointing at a file that has a footer.
- Verify a KB mechanically: `python scripts/check_anne_kb.py <kb-root>`.
