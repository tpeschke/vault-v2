# Page type 1 first-page view
status: accepted   date: 2026-10-01

Decision: The v2 page-type-1 view matches the first page of the official blank sheet: two columns, same section order and labels. Fonts stay the vault set (HamletOrNot, oldClaude, Source Sans 3). The strength label stays **Cultural Strength**, not the sheet’s “Culture Strength.”

Why: The attached blank sheet is the layout source. Vault typefaces and the existing Cultural Strength name are the two listed exceptions.

Constraints it imposes:
- Left: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
- Right: Bonfire wordmark (attached logo: flame + BONFIRE + “The Roleplaying Game”) at the top, then Positions (static legend), Self Doubt, Damage, Stress, Defenses, Attacks. Compress the blocks below the logo so the page still fits `.page` height (1036px), except the Vitals die row: that row’s height follows the die PNGs. Do not shrink those glyphs to protect page height. Do not further compress to make room for attack/defense notes; if those overflow, record it. Do not use the v1 flame-only `logo-black.png` plus HTML title.
- Do not put Goals, Temperaments, Relationships, or Movement on this page.
- Fonts unchanged. Label “Cultural Strength” unchanged.
- Social suite labels and payload keys are Influence / Inform / Inspire / Intimidate. Draw order: Influence, Inform, then Inspire, Intimidate. `suiteID` 1–4 stays. Map: 1 influence, 2 intimidate, 3 inform, 4 inspire. Description tables: `v2influenceDescriptions`, `v2informDescriptions`, `v2inspireDescriptions`, `v2intimidateDescriptions`. (Revised: T-012 left storage keys as empathize/lecture/tempt.)
- Current Emotions is a child table `v2currentEmotions` (`pageID`, `value`, `rank` 0–5). Payload `currentEmotions` is `{ id, value }[]` (same shape as Descriptions). The view draws six unlabeled cells in a 3×2 CSS grid, row-major (rank 0–2 then 3–5), heading **Current Emotions**. Short/missing arrays pad to six empty cells. Social Suite–style `#bdbdbd` 1px grid lines; `min-height: 17.38px`. The old `v2BasicCharacteristics.currentEmotions` varchar is copied into rank 0 then dropped. Boot script owns that DDL (`schema-on-boot.md`). (Revised: T-013 stored one string on basic characteristics.)
- Descriptions is the renamed v2 convictions store: table `v2descriptions` (was `v2convictions`; `rank` kept, view ignores it). v2 payload has `descriptions` only — no `convictions` key. Not goals or relationships. `DescriptionsDisplay` treats a missing array as `[]` (five empty lines). (Revised: T-014 added a parallel empty table and kept `convictions` on the payload.)
- `dieIndex` 0 draws no selection. Stored 1–6 map to d4–d20 (`selected` when `index === dieIndex - 1`). The Die row paints those six as PNGs (`d4.png` … `d20.png` in `app/src/assets/images/`), not the strings `d4`…`d20`. All six images show even when `dieIndex` is 0. Selected is Positions-style outline (`outline: 2px solid black; outline-offset: -1px`), not a black fill. Keep the grey die-cell boxes. `alt` is the die name only. v1 Integrity `d4!` text is out of scope.
- Defense `name` stays undrawn. Defense `notes` and each attack `notes` draw unlabeled below that block’s stats (after Cover / P. DR / DR; after Type / Rec). Bare value `<p>`, two-line min-height (`calc(2 * 17.38px)`), wrap and grow. All four attack slots get the block. `varchar(150)` unchanged. (Revised: T-009 left notes undrawn.)
- Empty value cells keep one line of height (`min-height: 17.38px`, same as global `p` in `app/src/index.css`). Do not use a border to hold that height.
- Extra chrome to omit: Attack value underlines, Defense value underlines, Favor number boxes, Favor anointed outline box. Keep GeneralInfo `p.border`, Social Suite grid, Current Emotions 3×2 grid lines, Vitals boxes (including die-cell borders), Positions Neutral/W1 outlines, and the selected-die outline.

Rejected:
- Binding Descriptions to goals or relationships. Binding to the old `convictions` *payload key* while keeping both stores (T-014) — superseded by renaming the convictions *table* to descriptions.
- Treating `dieIndex` 0 as d4.
- Drawing defense `name` on page type 1. Labeled Specials/Notes heading on the notes block. A new notes column or field. `#bdbdbd` box or underline on notes. Hiding the block on empty-named attacks. Clip/ellipsis instead of wrap. Widening `varchar(150)`. Compressing other blocks so notes still fit 1036px.
- A new migration framework for these patches (`schema-on-boot.md`).
- SVG die glyphs; CSS invert / second asset set for unselected; selected as black fill; capping die-row height to one text line; visually hidden text in addition to `alt`.
- Current Emotions as one string (T-013), a `text[]` column, or six named columns. Named labels on emotion cells. Heading shortened to Emotions.

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/` (unindexed; wordmark and die PNGs); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/`; `backend/server/v2/add/pageType1/`; `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/deleteCharacteristics/`; `backend/server/v2/backupTables/page1.sql` (unindexed schema snapshot); boot script `schema-on-boot.md`
TODOs: T-009–T-024 (done)
