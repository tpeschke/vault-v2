# Page type 1 first-page view
status: accepted   date: 2026-10-01

Decision: The v2 page-type-1 view matches the first page of the official blank sheet: two columns, same section order and labels. Fonts stay the vault set (HamletOrNot, oldClaude, Source Sans 3). The strength label stays **Cultural Strength**, not the sheet’s “Culture Strength.”

Why: The attached blank sheet is the layout source. Vault typefaces and the existing Cultural Strength name are the two listed exceptions.

Constraints it imposes:
- Left: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
- Right: Bonfire wordmark (attached logo: flame + BONFIRE + “The Roleplaying Game”) at the top, then Positions (static legend), Self Doubt, Damage, Stress, Defenses, Attacks. Compress the blocks below the logo so the page still fits `.page` height (1036px). Do not use the v1 flame-only `logo-black.png` plus HTML title.
- Do not put Goals, Temperaments, Relationships, or Movement on this page.
- Fonts unchanged. Label “Cultural Strength” unchanged.
- Social suite **labels** are Influence, Inform, Inspire, Intimidate. Draw order on the page: Influence, Inform, then Inspire, Intimidate. Stored identity stays `suiteID` 1–4. Payload keys and description tables stay `empathize` / `intimidate` / `lecture` / `tempt`. Map: 1 empathize → Influence, 2 intimidate → Intimidate, 3 lecture → Inform, 4 tempt → Inspire.
- Current Emotions is a new stored string on `v2BasicCharacteristics` (`currentEmotions`). The view binds that one string.
- Descriptions binds a new stored list, not `convictions`, `goals`, or `relationships`. Convictions stay in the payload; this page does not draw them.
- `dieIndex` 0 draws no selection. Stored 1–6 map to d4–d20 (`selected` when `index === dieIndex - 1`).
- Defense `name` / `notes` and attack `notes` stay undrawn on this page.

Rejected:
- Binding Descriptions to convictions, goals, or relationships.
- Treating `dieIndex` 0 as d4.
- Drawing defense name/notes or attack notes on page type 1.

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/` (unindexed; wordmark file); `backend/common/interfaces/v2/page1/characteristicsInfo.ts`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/`; `backend/server/v2/add/pageType1/` (Current Emotions column default only); `backend/server/v2/delete/utilities/deletePagesUtilities/pageType1/deleteCharacteristics/`; `backend/server/v2/backupTables/page1.sql` (unindexed schema snapshot)
TODOs: T-009–T-015 (done)
