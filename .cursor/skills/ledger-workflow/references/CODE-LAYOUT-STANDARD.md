# Ownership-First Code Layout Standard

## Purpose

This standard is for an LLM establishing or transforming a codebase whose directory tree should explain what the software does, who uses each capability, and who owns its meaning.

**Organization is Zen. Not bureaucracy.** This governs the entire folder
structure. Every layer, owner, folder, prefix, front panel, and indirection must
make the codebase calmer to perceive and easier to navigate. Use the least
structure that communicates real ownership, order, and purpose. Do not create a
capsule merely because the grammar permits one, duplicate words already visible
in the path, or add navigation documents whose only purpose is to explain
unnecessary navigation. Expand structure when real complexity appears; collapse
it when the structure exceeds the thing being organized.

The layout is not a filing convention layered over an architecture. The layout is an architectural interface. A useful path should tell a reader whether code is a user-facing composition, an operational recipe, a reusable capability, or shared machinery. Imports should preserve that story.

Optimize for comprehension and change safety, not for minimizing file moves. Path churn is cheap when an LLM can update references mechanically. A misleading stable path is more expensive than a well-executed move.

### Required reading before structural work

This document must be routed from the repository's `AGENTS.md` and root paired
front panels. Read it in full before changing the repository taxonomy, owner
boundaries, capsule slots, names, demonstrations, contracts, subscriber files,
or the location of code. A passive reference buried in notes is insufficient:
mandatory behavior belongs in agent instructions, repository-wide navigation
belongs in the root front panel, and owner-specific capabilities belong in that
owner's front panel.

## Part I — Operating Standard

### 1. Begin with the human objective

Before moving code, establish:

- what users are trying to accomplish;
- the distinct work surfaces they use;
- which behavior is shared between those surfaces;
- which concepts own business meaning;
- which mechanisms merely make those concepts run.

Do not infer ownership from the current folder. Existing deployment boundaries, package boundaries, and historical naming are evidence, not authority.

### 2. Root taxonomy

Use numbered semantic roles where they are applicable:

```text
<Project>/
├── 00-START-HERE.md
├── 00-START-HERE.yaml
├── 10-Workbenches/
├── 20-Shared-Playbooks/
├── 30-Shared-Tools/
├── 80-Provenance/
├── 90-Mechanisms/
└── rewrite-ledger/
```

Not every repository needs every directory. Do not create empty categories merely to resemble this diagram.

#### 10-Workbenches

A Workbench is a coherent surface through which a particular user or operator accomplishes an objective. It composes Playbooks, Tools, and Mechanisms; it does not need to own all of them.

Examples:

- Festival Map Editor
- Local Dev Map Editor
- Release Workbench

Deployment is not sufficient to define a Workbench. A web bundle, server process, or Apps Script project may instead implement a shared Playbook or a Mechanism.

Workbench-local children use local names:

```text
10-Workbenches/
└── Example Workbench/
    ├── 00-START-HERE.md
    ├── 20-Playbooks/
    └── 30-Tools/
```

#### 20-Shared-Playbooks

A Playbook describes an organized user or operator activity: the sequence, state, decisions, and tools involved in accomplishing something.

A Shared Playbook is used by more than one Workbench. It belongs at root rather than being copied or arbitrarily assigned to one Workbench.

Playbooks may contain contextual Tools:

```text
20-Shared-Playbooks/
└── Map Editor GUI/
    ├── 00-START-HERE.md
    ├── 30-Tools/
    │   ├── Zoom Map/
    │   └── Move Item/
    └── 40-Code/
```

The nested Tools own reusable or independently changeable capabilities within the Playbook. The Playbook owns their orchestration and user-facing context. Do not duplicate their implementations in the Playbook shell.

#### 30-Shared-Tools

A Tool is a named capability, rule set, data definition, adapter, or operation that owns meaning and can be reasoned about independently.

A Shared Tool has direct consumers in more than one owner context. Each Shared Tool must contain `10-Subscribers.md` so a reader can discover those consumers and why they depend on the Tool.

Examples:

```text
30-Shared-Tools/
├── Kearney-Sheet-Compatibility/
├── Contract-Festival-Snapshot/
├── Contract-Layout-Item/
└── Contract-Festival-Identity/
```

The word `Shared` appears on the root category, not on every child. Avoid repeating classification words in both parent and child names.

#### 90-Mechanisms

A Mechanism is general supporting machinery: a runtime, transport, persistence access layer, coordinate engine, execution host, or reusable library-like facility. Mechanisms roughly correspond to shared libraries or DLLs.

Mechanisms are not Workbench-local. Siloing general machinery under one consumer hides reuse and creates false ownership.

Mechanisms may contain contextual Tools, including contracts that define their boundary:

```text
90-Mechanisms/
├── Google Sheets Access/
├── Local Development Host/
├── Apps Script Host/
├── Map Coordinates/
│   └── 30-Tools/
│       └── Contract-Map-Definition/
└── Command Runtime/
    └── 30-Tools/
        ├── Contract-Command-Envelope/
        └── Contract-Command-Result/
```

The distinction is ownership: a user operation such as Move Item is a Tool within the Map Editor GUI Playbook; the command runtime that transports and applies its command is a Mechanism.

#### 80-Provenance

Provenance owns mostly frozen reference material received from outside the
active transformation: harvested images, reference implementations, design references, source
archives, or bulk knowledge and business-rule libraries. Provenance is defined
by that reference posture, not by file type, rawness, immutability, or size.

Reference material may be indexed, annotated, deduplicated, or reorganized into
a more useful library and remain Provenance. What matters is that it continues
to serve as external evidence rather than becoming the code or asset currently
being transformed. A source implementation stays in Provenance while the code
derived from it belongs to active Tools, Playbooks, or Mechanisms. A referenced
image may remain Provenance; an image actively transformed into a product asset
belongs with the owner of that transformation.

Use one lean layer panel to route collections. Do not wrap every archive or raw
collection in its own capsule unless it has an independent operating contract.
Live external data, ordinary tests, sanitized fixtures, small evidence notes,
and the rewrite ledger are not Provenance.

#### rewrite-ledger

The rewrite ledger is foundational project memory. It records inherited behavior, architectural discoveries, decisions, migration plans, known gaps, and why rewrites preserve or replace existing choices.

It belongs at root and is named literally so an LLM cannot mistake it for optional project administration. Consult it before rewriting or replacing inherited behavior.

The ledger exposes context. It does not automatically impose coding procedure. Procedures may be added later at the human's direction.

### 3. Recursive roles and contextual ownership

The numbered roles are semantic, not restricted to one directory depth. A Playbook can contain Tools. A Mechanism can contain Tools. A Workbench can contain local Playbooks and Tools.

Use the nearest meaningful owner. If a capability only makes sense inside one Playbook or Mechanism, nest it there. If several independent owners directly use it, promote it to the corresponding root Shared category.

Do not create generic holding buckets such as `core`, `common`, `shared`, `types`, `utilities`, or root-level `fixtures` merely because ownership is unclear. If no owner can be determined, stop and explain the ambiguity to the human. Do not make a vague base-level directory the default answer.

### 4. Capsule grammar

An owner directory may use these numbered slots:

```text
<Owner>/
├── 00-START-HERE.md
├── 00-START-HERE.yaml
├── 10-Subscribers.md
├── 20-Demo.<ext>
├── 30-Tools/
├── 40-Code/
├── 50-Tests/
└── 100-Export Glue/
```

Use only applicable slots.

- `00-START-HERE.md` explains purpose, ownership, boundaries, important relationships, and navigation.
- `00-START-HERE.yaml` provides compact machine-readable routing when useful.
- `10-Subscribers.md` is required for a Shared Tool and absent where subscriber discovery does not apply.
- `20-Demo.<ext>` is a visible fixture or no-input demonstration owned by the
  capsule. A demo must make the owner inspectable without requiring the reader
  to reconstruct a launch sequence. Use `20-Demo/` only when the demonstration
  has several substantive artifacts.
- `30-Tools` holds contextual Tools whose meaning depends on the owner.
- `40-Code` holds implementation owned by the capsule. It may itself be a package/build root.
- `50-Tests` holds owner-specific tests and fixtures when the toolchain permits it.
- `100-Export Glue` holds generated schemas, adapters, manifests, or boundary artifacts whose purpose is to expose this owner elsewhere.

Numbers communicate reading order and semantic role. When adding a numbered slot, preserve spacing for future roles. In particular, the addition of `10-Subscribers.md` moves Demo, Tools, Code, Tests, and Export Glue to 20, 30, 40, 50, and 100.

Apply the governing maxim here: a numbered role is not automatically a folder,
and a folder is not automatically a new owner. Prefer the smallest
representation that exposes the capability cleanly:

- one executable demo becomes `20-Demo.cmd` (or the appropriate extension);
- several real demo fixtures or cooperating files justify `20-Demo/`;
- front panels do not count as substantive files and must not be created merely
  to justify a one-file directory;
- add paired front panels only when a directory is genuinely a bounded owner,
  not recursively to every organizational slot.

If navigating the organization takes more effort than understanding the
artifact, the structure has stopped serving comprehension.

#### Ordering and naming inside a capsule

Numbers are the ordering system. They fix visual and reading order regardless
of the first letter of a name. Do not let alphabetic sorting accidentally
decide which artifact a reader encounters first.

Use a canonical slot or artifact name whenever its role fits. Canonical names
carry stable meaning and should not be replaced merely for novelty:

- `00-START-HERE.md` and `00-START-HERE.yaml` route the owner;
- `10-Subscribers.md` exposes direct Shared Tool consumers;
- `20-Demo`, `30-Tools`, `40-Code`, `50-Tests`, and `100-Export Glue` have the
  meanings defined above.

A noncanonical child receives a numeric ordering prefix. Choose its semantic
name only after removing words already supplied by its ancestor path. For
example, if a multi-artifact `20-Demo/` genuinely needs a launcher, use
`21-Launch.cmd`, not `Launch Local Dev Map Editor.cmd`. If that launcher is the
entire demonstration, collapse both levels to the canonical `20-Demo.cmd`.

Deduplicate against the whole path, not only the immediate parent. Repetition
is justified only where a canonical name intentionally establishes a role or
where removing a term would make the name ambiguous outside its path.

For genuinely novel names, favor a precise, flavorful, comparatively rare word
that fits the concept over a vague word reused throughout the repository.
Repeated generic words such as `manager`, `service`, `helper`, `handler`,
`processor`, or `data` lose discriminating meaning and are difficult to recall.
Do not become whimsical, and favor short, rather than long: rarity is useful when the word remains
accurate and immediately teachable. Canonical vocabulary is the deliberate
exception; its repetition preserves rather than erodes meaning.

### 5. Start-here documents

Every repository, semantic layer, and bounded owner needs paired front panels:
`00-START-HERE.md` for people and `00-START-HERE.yaml` for machine routing. The
human panel should answer:

1. What is this owner for?
2. Who owns changes to its meaning?
3. What does it provide?
4. What does it deliberately not own?
5. Which neighboring owners matter?
6. Where are implementation, tests, and export glue?

Avoid duplicating detailed documentation from children. Route to the child that owns the detail.

The YAML panel uses these fields when applicable:

```yaml
schema_version: 1
kind: project | layer | tool | playbook | mechanism | workbench | demo | ledger
id: stable-kebab-case-id
name: Human Name
owns: One-sentence ownership boundary.
excludes: []
uses: []
entrypoints: {}
routing: {}
```

Do not copy volatile file counts, test counts, or reverse dependency lists into
front panels. Generate those when needed.

Navigate in this order:

1. Repository paired front panels.
2. Current status, when the repository routes one.
3. The smallest owning capsule's paired front panels.
4. Definitions and evidence routed by that capsule.
5. Implementation and only the declared dependencies.

Search inside the routed owner before searching the entire repository.

### 6. Paths and imports must tell the story

Names must distinguish a user operation from its supporting machinery. The path carries the surrounding context and should remain visible in an import statement.

Prefer:

```ts
import { FestivalSnapshot } from "@festival-map/contract-festival-snapshot";
import { applyMapCalibration } from "@festival-map/mechanism-map-coordinates";
import { KearneySheetAdapter } from "@festival-map/kearney-sheet-compatibility";
```

Avoid:

```ts
import { FestivalSnapshot, applyMapCalibration } from "@festival-map/core";
import { KearneySheetAdapter } from "@festival-map/common";
```

Package roots may live inside semantic capsules such as `40-Code`. Workspace configuration should point to those nested package roots. Do not preserve `apps/` or `packages/` as permanent root categories when they obscure semantic ownership.

### 7. Shared Tool subscribers

Every Shared Tool contains `10-Subscribers.md`.

It should expose:

- each direct subscriber;
- why the subscriber uses the Tool;
- the boundary or behavior on which it relies.

Before changing a Shared Tool, read its `00-START-HERE.md` and `10-Subscribers.md` to understand the context at risk.

Do not require subscriber symmetry. The subscriber list is not a mirrored dependency graph, lockfile, approval workflow, or prescribed change procedure. Its job is to expose context. Normal coding practices belong elsewhere and may be defined by the rewrite ledger only when the human asks for them.

### 8. Contracts are Tools

A contract owns a definition on which other code relies. Therefore each independently changeable contract is a Tool.

At the Shared Tools root, give the individual Tool its full distinguishing name:

```text
30-Shared-Tools/
├── Contract-Festival-Snapshot/
├── Contract-Layout-Item/
└── Contract-Festival-Identity/
```

Do not create this redundant shape:

```text
30-Shared-Tools/
└── Contracts/
    ├── Contract-Festival-Snapshot/
    └── Contract-Layout-Item/
```

Inside an owner whose path already supplies the domain, use a contextual name:

```text
20-Shared-Playbooks/
└── Map Editor GUI/
    └── 30-Tools/
        └── Move Item/
            └── 30-Tools/
                └── Contract-Definition/
```

Use `Move definition`, not `Move command definition`, when the path already establishes that the definition belongs to Move Item. Repeated words are a signal that the tree is failing to carry context.

An aggregate contract must remain thin. For example, `Contract-Festival-Snapshot` can compose and delegate to `Contract-Layout-Item`, `Contract-Festival-Identity`, and a Map Coordinates contract. It must not silently become the owner of every constituent concept. Its front panel and code should identify the delegated owners.

Use the authorization test: who is allowed to change the meaning? That owner should define the contract. A Mechanism may therefore own contract Tools at its boundary.

### 9. Tests, fixtures, generated artifacts, and evidence

Tests and fixtures belong with the owner that defines their meaning. A fixture used by several consumers is not automatically a Provenance category, Shared Tool, or Mechanism. It can remain test material inside the owning Tool or Mechanism.

Automated tests must be deterministic and offline unless explicitly labeled as
a manual integration harness. Network, Google APIs, credentials, device access,
and mutable external services must not be implicit requirements of an ordinary
test command.

Generated schemas and adapters belong in the owning capsule's `100-Export Glue`, not in an unexplained root bucket.

Source hashes, extraction notes, and small evidence files may live with the decision or owner they support. Do not create an `80-Provenance` layer by default. Collections of bulk harvested source material may justify a separately designed provenance system, but live application data stored in an external system does not.

If an artifact appears to be shared but its semantic owner is unclear, stop and explain the ambiguity to the human before inventing a root-level home.

### 10. Deployment and host adaptation

Treat runtime shape independently from semantic ownership.

- A browser bundle may be the `40-Code` of a Shared Playbook used by multiple Workbenches.
- A local API server may be a `Local Development Host` Mechanism.
- Production Apps Script may be an `Apps Script Host` Mechanism.
- Google Sheets access is a Mechanism; compatibility with one historical sheet layout is a Tool.
- Retained legacy code should be labeled as retained legacy material rather than presented as the target architecture.

For constrained hosts such as Apps Script, keep authoritative source in semantic owners and generate or bundle host-compatible output into the relevant `100-Export Glue` or host Mechanism. Do not let deployment restrictions erase ownership boundaries in the source tree.

For Apps Script specifically:

- `.clasp.json` identifies the deployment root; semantic source may be assembled
  into it rather than authored as one undifferentiated folder.
- Numbered folders are ownership boundaries, not JavaScript modules. Apps Script
  still presents one shared global namespace.
- Use unique global names, unique file basenames, and explicit registries. Do not
  discover behavior by scanning the shared namespace.
- Never depend on folder order for initialization. Avoid top-level dependencies;
  where retained legacy code makes order unavoidable, declare `filePushOrder`.
- Tests, Markdown/YAML panels, the rewrite ledger, and retained legacy archives
  must not deploy.

### 11. Repository hygiene and implementation guidance

Keep credentials, generated run output, scratch data, raw retained inputs,
local environment files, and runtime artifacts out of source control. Store
safe example configuration separately from active secrets.

Within the ownership layout:

- separate orchestration from execution details;
- give a function or module one coherent responsibility;
- prefer readable transformations to hidden stateful iteration;
- use descriptive names and named constants rather than magic values;
- use explicit registries at extension boundaries;
- keep a change within the smallest owner that can correctly contain it.

These are portable boundary-preserving guidelines. Project-specific style rules
belong in that repository's `AGENTS.md` or an explicitly routed engineering
standard. The original source document's blanket comment prohibition is not a
portable layout rule and is therefore not imposed here.

### 12. Transformation workflow

When applying this layout to an existing repository:

1. Read the root start-here and rewrite ledger.
2. Inventory actual runtime entry points, packages, tests, generators, and deployment constraints.
3. Identify Workbenches from user objectives, not process names.
4. Identify shared Playbooks from user activities reused across Workbenches.
5. Identify Tools by independent meaning and Mechanisms by shared supporting machinery.
6. Resolve ownership before creating paths. Surface ambiguities to the human.
7. Draft the target tree and map every existing artifact to an owner.
8. Move one coherent slice at a time, updating imports, workspace configuration, scripts, tests, and documentation.
9. Verify a focused representative path after each slice; expand validation only if risk or failures justify it.
10. Remove empty historical buckets and stale references after the new owner is proven.

Do not invent new visible product behavior during a structural migration.

## Part II — Distinctions and Corrections

This section records common misreadings so another LLM can avoid repeating them.

### A. Workbench is not another word for app

An `apps/` directory describes a physical build or deployment boundary. A Workbench describes a human objective and operating surface. One browser application can implement a Shared Playbook used by two Workbenches. One Workbench can compose several deployed processes.

Ask: “Who is doing what here?” before asking “What process runs this?”

### B. Shared Playbook versus copied local Playbook

If Festival Map Editor and Local Dev Map Editor use the same Map Editor GUI behavior, the GUI is one `20-Shared-Playbooks/Map Editor GUI`, not two local copies and not arbitrarily owned by production.

The Workbench declares the composition. The Shared Playbook owns the shared interaction model.

### C. Tool versus Mechanism

A Tool owns a capability or meaning. A Mechanism makes capabilities run across contexts.

- Move Item: Tool.
- Move definition: contract Tool nested under Move Item when independently useful.
- Command transport/execution: Mechanism.
- Kearney Sheet Compatibility: Tool.
- Google Sheets Access: Mechanism.
- Local Development Host: Mechanism.

When uncertain, ask who may change the meaning and who merely supplies execution.

### D. Mechanisms are shared, but may have Tools

Do not put a general runtime or coordinate engine under one Workbench just because that Workbench currently uses it most. Mechanisms are not Workbench-local.

This does not make them featureless. A Mechanism can own nested Tools, particularly boundary contracts, codecs, or adapters meaningful only in that mechanism's context.

### E. Contracts are individual Tools, not a grand Contracts subsystem

`Contracts/Contract-Festival-Snapshot` repeats classification and creates a broad owner with unrelated subscribers. Prefer flat, individually owned Shared Tools such as `Contract-Festival-Snapshot` and `Contract-Layout-Item`.

A contract can instead be nested beneath the Playbook, Tool, or Mechanism that owns its meaning. The parent path supplies context, so do not repeat it in the child name.

### F. Aggregate contracts delegate

Festival Snapshot spans too much context to own every definition itself. It composes delegated types from their true owners. Its documentation should route readers to those owners, and its implementation should import or re-export their definitions rather than duplicate them.

### G. Subscribers expose context; they do not govern development

The correct file is `10-Subscribers.md`, not `subscribers.md`. Its placement intentionally shifts downstream capsule slots by ten.

Subscriber symmetry is not required. The file is not a reverse-dependency database and does not need to match declarations elsewhere. It tells a maintainer which direct consumers care and why.

Reading it before changing a Shared Tool is sensible context gathering. Do not turn that observation into archive-owned coding policy, approval steps, or mandatory post-change procedure.

### H. Shared does not mean root-level miscellaneous

An artifact used in several places still has an owner. Place sanitized fixtures under the owner that defines their semantics. Place generated schemas under that owner's Export Glue. Place generic runtime code under an explicit Mechanism.

“Several consumers use this” is not enough reason for a base-level directory. If ownership is unresolved, tell the human exactly what is ambiguous.

### I. Provenance is not a universal layer

Tests and fixtures are not provenance. Live Google Sheet data is not a repository provenance collection. Small evidence and source hashes do not justify an `80-Provenance` architecture.

Only introduce provenance when the project truly owns bulk source collections or raw harvested material whose lineage is itself an operational concern.

### J. Repetition signals lost context

Paths should let parent directories carry meaning. Redundant names such as `Contracts/Contract-*`, `Shared-Tools/Shared-*`, or `Move Item/Contract-Move-Definition` indicate that the hierarchy is not doing its job.

Use the full classifier at a root where distinction is necessary; use the contextual name when the parent already provides it.

### K. Package layout must follow architecture, not dictate it

`apps`, `packages`, and a generic `core` are implementation-era conventions, not permanent semantic truths. A `40-Code` directory can be an npm package root. Workspace globs and import aliases can point there.

Because automated moves and import rewrites are cheap, do not retain misleading buckets merely to avoid path churn. Perform coherent moves, verify them, and keep the resulting import story legible.

### L. The archive exposes knowledge; it does not invent authority

Start-here documents, subscriber lists, and the rewrite ledger help a maintainer find context and understand decisions. They do not independently decide coding practices. Add procedural rules only when the human establishes them.

### M. Canonical names versus novel names

Canonical names answer “what is this slot for?” and are reused deliberately.
Do not rename `20-Demo` to a flavorful synonym. Let the artifact carry the slot
name directly when one file is sufficient: `20-Demo.cmd` is preferable to a
`20-Demo/` directory containing only navigation files and one launcher. Novel
names distinguish siblings within genuinely multi-artifact slots: prefix them
numerically, remove words already present in the path, and prefer a memorable
precise word over repository-wide filler language.

The test is both visual and verbal: does the number put it in the intended
reading position, and does the shortest path-relative phrase distinguish it?

### N. Rule preservation during a transformation

Do not reconstruct a supplied standard from conversational memory. Preserve the
original, diff proposed changes against it, and give every original rule an
explicit disposition. Silent omission is a defect even when the new document
looks coherent.

For the current revision, the original rules were handled as follows:

| Original rule family | Disposition |
| --- | --- |
| Ownership-first navigation and routed-owner search | Restored and retained. |
| Paired Markdown/YAML panels and stable YAML fields | Restored and retained. |
| Demo as visible fixture or no-input demonstration | Restored; renumbered from `10-Demo` to `20-Demo` after Subscribers was inserted, and represented as a file unless several substantive artifacts justify a folder. |
| Deterministic offline tests; explicit manual integration harnesses | Restored and retained. |
| Apps Script shared-namespace, registry, basename, ordering, and deploy-exclusion rules | Restored and generalized for semantic source plus generated host output. |
| Repository hygiene | Restored and retained. |
| One-direction Workbench → Playbook → Tool → Mechanism dependency ladder | Revised: ownership is recursive, Mechanisms may own Tools, and composition must avoid cycles rather than pretend every dependency follows one ladder. |
| `80-Provenance` as a standard layer | Rejected as universal; bulk source collections justify it in this project, while foundational rewrite memory remains `rewrite-ledger`. |
| Original numbered capsule slots | Revised only by the settled Subscribers insertion: Demo/Tools/Code/Tests/Export Glue are now 20/30/40/50/100. |
| Blanket prohibition on comments | Relocated out of the portable layout standard; a project may impose it explicitly in its own operating rules. |
| RevEngine-specific fiction, provider, packaging, and MVC choices | Remain intentionally excluded because they are source-project implementation choices, not portable ownership rules. |

## Compact Evaluation Checklist

Before accepting a transformed tree, verify:

- Can a new reader name the user Workbenches from the root?
- Are shared user activities represented once as Shared Playbooks?
- Do Tool names describe capabilities or definitions rather than implementation buckets?
- Are general runtimes and access layers Mechanisms outside Workbenches?
- Does every Shared Tool have `10-Subscribers.md`?
- Does every repository, layer, and bounded owner have paired front panels?
- Does every Demo expose a visible fixture or no-input path without an unnecessary one-file folder?
- Do numeric prefixes establish intentional reading order rather than alphabetic accident?
- Are canonical names reused and novel names deduplicated against their paths?
- Are novel words precise and memorable rather than generic repository-wide filler?
- Are contracts individual Tools with explicit ownership and delegation?
- Do paths and imports distinguish operations from machinery?
- Are tests, fixtures, and exports next to the owner of their meaning?
- Have generic root buckets been removed or explicitly justified?
- Does the rewrite ledger explain inherited behavior and migration decisions?
- Were unresolved ownership questions surfaced to the human instead of hidden in `common`, `core`, or a base-level holding area?
