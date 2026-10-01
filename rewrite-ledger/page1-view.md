# Page type 1 first-page view
status: accepted   date: 2026-10-01

Decision: The v2 page-type-1 view matches the first page of the official blank sheet: two columns, same section order and labels. Fonts stay the vault set (HamletOrNot, oldClaude, Source Sans 3). The strength label stays **Cultural Strength**, not the sheet’s “Culture Strength.”

Why: The attached blank sheet is the layout source. Vault typefaces and the existing Cultural Strength name are the two listed exceptions.

Constraints it imposes:
- Left: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
- Right: Bonfire wordmark (attached logo: flame + BONFIRE + “The Roleplaying Game”) at the top, then Positions (static legend), Self Doubt, Damage, Stress, Defenses, Attacks. Compress the blocks below the logo so the page still fits `.page` height (1036px). Do not use the v1 flame-only `logo-black.png` plus HTML title.
- Do not put Goals, Temperaments, Relationships, or Movement on this page.
- Fonts unchanged. Label “Cultural Strength” unchanged.
- Social suite labels and payload keys are Influence / Inform / Inspire / Intimidate. Draw order: Influence, Inform, then Inspire, Intimidate. `suiteID` 1–4 stays. Map: 1 influence, 2 intimidate, 3 inform, 4 inspire. Description tables: `v2influenceDescriptions`, `v2informDescriptions`, `v2inspireDescriptions`, `v2intimidateDescriptions`. (Revised: T-012 left storage keys as empathize/lecture/tempt.)
- Current Emotions is a stored string on `v2BasicCharacteristics` (`currentEmotions`). The view binds that one string. Live column is applied by the boot script (`schema-on-boot.md`).
- Descriptions is the renamed v2 convictions store: table `v2descriptions` (was `v2convictions`; `rank` kept, view ignores it). v2 payload has `descriptions` only — no `convictions` key. Not goals or relationships. `DescriptionsDisplay` treats a missing array as `[]` (five empty lines). (Revised: T-014 added a parallel empty table and kept `convictions` on the payload.)
- `dieIndex` 0 draws no selection. Stored 1–6 map to d4–d20 (`selected` when `index === dieIndex - 1`).
- Defense `name` / `notes` and attack `notes` stay undrawn on this page.

Rejected:
- Binding Descriptions to goals or relationships. Binding to the old `convictions` *payload key* while keeping both stores (T-014) — superseded by renaming the convictions *table* to descriptions.
- Treating `dieIndex` 0 as d4.
- Drawing defense name/notes or attack notes on page type 1.
- A new migration framework for these patches (`schema-on-boot.md`).

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/` (unindexed; wordmark file); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/`; `backend/server/v2/add/pageType1/` (Current Emotions column default only); `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/deleteCharacteristics/`; `backend/server/v2/backupTables/page1.sql` (unindexed schema snapshot); boot script `schema-on-boot.md`
TODOs: T-009–T-018 (done)
