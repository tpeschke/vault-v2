# Page type 2 skills view
status: accepted   date: 2026-10-04

Decision: The v2 page-type-2 view matches the second page of the official blank: stacked General Skills, Combat Skills, then Abilities | Burdens & Injuries. `pageTypeID` 2. Multiple instances allowed. New characters get one type-2 at `v2CharacterPages.index` 1. Existing characters are not backfilled. No play-time view controls. Sheet-wide fonts, `character-value`, page box, overflow, and island: `v2-page-type.md`. Wordmark is page-1 only. Gutter: `add-page-type-1.md` / `page-reorder.md` (generic under every card).

Why: Designer named page type 2 from the official blank and answered Design Q1–Q12 (2026-10-04). Official blank is the layout source. Caps are the lined Adv Skills rows on that page.

Constraints it imposes:
- Sheet-wide contract: `v2-page-type.md`. This file owns page-type-2 section order, labels, stores, and exceptions.
- Stacked order, not page 1’s identity | vitals split: (1) General Skills full width, (2) Combat Skills full width, (3) Abilities | Burdens & Injuries. Reuse `doubleColumn` only for that last pair. Do not wrap the skill tables in page 1’s left/right shell.
- `.page` is 1036×796. Official blank is letter portrait; leftover Adv Skills rows will overflow 1068. Record overflow; do not shrink type or drop leftover pads to fit. Do not set `--mapped-row-min-height: 19.38px` on `.page-type-two` (the bump would add more overflow). Use the sheet-wide 15px / 17.38px box.
- No wordmark. No Positions, dice, or page-1 leftover widgets (Temperaments, Relationships, Movement, Goals). Those stay on the page-1 store.
- Labels: **General Skills**, **Gen. Suites**, **Stat**, **Rank**, **Adv Skills**, Athletics / Lore / Strategy / Streetwise / Survival / Trades / Weirdcraft, **Native Language**, **Armor Skill Adj**, **Gen. Skill Discount**, **Combat Skills**, **Combat Suites**, Armor / Melee / Ranged / Shields / Unarmed, **Combat Skill Discount**, **Abilities**, **Burdens & Injuries** (correct the blank’s “Injures”).
- General suites: fixed 7, keys `athletics` `lore` `strategy` `streetwise` `survival` `trades` `weirdcraft`, `suiteID` 1–7 in that order. Each `{ stat, rank }` (`number | ''`, same as page-1 social suite Stat/Rank). Names are chrome. Each General and Combat `suites-col` value row has **one used height in view and in edit**. Edit must not grow or shrink that row. Lock every value cell in that column (`em`, view `p`, edit `input`, discount `h2`) to the empty-edit **17.38px** box (`height` and `min-height`), including Native Language and both discount rows. Beat View.css filled-input `1.2em` and `padding: 0` on these cells (restate island padding). Do not set `--mapped-row-min-height` on `.page-type-two`. Header `h2` stays the header bar. Native Language name stays stacked in **both** modes; that row is two 17.38 boxes in both modes. Adv Skills already lock 17.38; leave them.
- Native language: `{ name, stat, rank }`. `name` is stored (`varchar(250)`). Chrome **Native Language** stays on the row; `name` is the `character-value` in that name track.
- Armor Skill Adj, Gen. Skill Discount, Combat Skill Discount: stored numbers. Not computed.
- Advanced general skills: one array `{ id, key?, name, stat, rank }`. Cap **36**. Leftover pads to cap. Two visual columns, **one list that wraps** column-major (fill down the left Adv Skills track, then the right; 18 rows each, matching the blank). Not two stores. Not two slots glued to each suite.
- Combat suites: fixed 5, keys `armor` `melee` `ranged` `shields` `unarmed`, `suiteID` 1–5 in that order. Each `{ rank }` only (`number | ''`).
- Advanced combat skills: one array `{ id, key?, name, rank }`. Cap **20**. Same wrap (10 rows per column). Two-field rows may use v2 `DisplayPairArray` (`name` as `value`). General adv three-field rows stay local; do not add a shared triple widget.
- Abilities and Burdens & Injuries: one `text` string each, notes-style textarea in edit, `p.character-value` on view. Wrap and grow. Min-height `calc(16 * 17.38px)` (lined rows on the blank). Overflow recorded. **15px** between the two panes (scoped to `.page-type-two`; do not put `gap` on shared `DoubleColumn.css`). Shrink the 50% column widths so 50+50+15 does not overflow `.page`. Leftover zebra behind both the view `p` and the edit `textarea`: `#f3f3f3` / white full bands, pitch **17.38px**, **first band white**, `repeating-linear-gradient`, `background-attachment: local`. Tile the same zebra when the pane grows past 16 rows. View `p` is zebra only. In `.view-edit`, each textarea keeps that zebra with a **default teal wash at rest** (`rgba(173, 216, 230, 0.35)` over the bands) and a **darker wash on hover** (`rgba(145, 181, 194, 0.35)`). Beat `index.css` solid `.view-edit textarea` teal. Not a solid fill. Do not convert to leftover list rows. Do not change `line-height` to chase the 17.38 pitch.
- List arrays: real rows only; leftover pads to cap; one insert row while editing and `length < cap`; insert on blur if any stored field is non-empty; `makeTempID` for React keys; clearing stored fields removes the row. New rows `id` 0 or omitted.
- Edit: stored drawn cells swap to controlled `character-value` inputs. Suite names, section bars, and Stat/Rank headers stay chrome. Computed: none on this page.
- Persist every type-2 field on the full Save payload. Schema: `ensureSchema` + `backupTables/page2.sql` in the same change (`schema-on-boot.md`). Tables keyed by `pageID` (several type-2 pages per character):
  - `v2Page2Basics` — unique `pageID`; native language name/stat/rank; three discounts; `abilities` `text`; `burdens` `text`
  - `v2GeneralSkillSuites` — `pageID`, `suiteID` 1–7, `stat`, `rank`
  - `v2AdvancedGeneralSkills` — `pageID`, `name`, `stat`, `rank`, `index` (array order for wrap)
  - `v2CombatSkillSuites` — `pageID`, `suiteID` 1–5, `rank`
  - `v2AdvancedCombatSkills` — `pageID`, `name`, `rank`, `index`
- Create-character: insert type 1 at index 0, type 2 at index 1. Existing characters stay without type 2 until the owner clicks **+ Skills & Abilities** (`add-page-type-1.md`).
- Catalog identity stays the first page-type-1. Type 2 has no catalog name.
- No play-time view inputs, die clicks, or location cells on this type (`quick-view-inputs.md`).
- Class root `.page-type-two`. Vertical slice paths: `v2-page-type.md` (`pageType2` / `page2`).

Rejected:
- Landscape remap of the stacked blank (Q1: keep as-is).
- Boot-insert type 2 onto existing characters (Q3: stay).
- Nested two adv-skill slots per suite.
- Two independent Adv Skills stores.
- Abilities / Burdens as leftover list rows or name+rank items (Q6: textarea per pane).
- Official-blank hairline rules on these panes (2026-10-04 Q1: leftover zebra bands).
- Solid edit teal that hides the note zebra (2026-10-04 Q4 wash; rest is a default teal wash, not a solid fill).
- Teal on these panes only while hovering (2026-10-04: rest wash while Edit is on).
- Mid teal `rgb(159, 199, 212)` on these textareas (2026-10-04 Q1: default).
- Teal wash on the view `p` (2026-10-04 Q3: view stays zebra).
- Sheet spelling **Injures**.
- Computing discounts or ranks.
- Play-time view controls on this page.
- Wordmark on type 2.
- A shared three-field array widget.
- The 19.38 leftover bump on this card.
- Growing suite-column edit inputs to the loose view `p` (2026-10-04 Q2: empty-edit 17.38).
- Locking only chrome suite-name rows and leaving Native Language / discounts unmatched (2026-10-04 Q1: every suites-col row).
- Different used height for a suites-col row in view vs edit (2026-10-04 screenshots; Athletics→Unarmed grow in view).

Revised 2026-10-04 (note gap + zebra; Design Q1–Q5):
- Abilities / Burdens textarea / `p` / 16×17.38 min-height — **retained**.
- 15px between the panes; leftover zebra behind both controls (white first, 17.38 pitch, tile on grow) — **added**. Zebra-only in edit (no rest wash) — **revised** by the edit-wash entry below.

Revised 2026-10-04 (note edit wash; Q1 default, Q2 darker, Q3 view zebra, Q4 wash):
- Leftover zebra on view `p` and under the edit textarea — **retained**.
- Edit rest state — **revised**: default teal wash over that zebra, not zebra-only and not a solid fill. Hover stays the darker wash.

Revised 2026-10-04 (suite-column box; Q1 every row, Q2 empty; screenshot clarify):
- Suites-col `min-height` only — **revised**: one used row height in view and edit. `height` + `min-height` 17.38 on every suites-col value cell. Native Language stack is the same in both modes.

Touches: `app/src/pages/v2/pageTypes/pageType2/`; `backend/common/interfaces/v2/page2/`; `backend/server/v2/{view,edit,add,delete}/`; unindexed `backend/server/db/ensureSchema.ts`; `backend/server/v2/backupTables/page2.sql`; ledger front panels
TODOs: T-076–T-087 (done); note gap + zebra: T-088, T-089 (done); suite-column box: T-090 (done); note edit wash: T-091 (done); labeled gutter adds: T-092 (done; `add-page-type-1.md`)
