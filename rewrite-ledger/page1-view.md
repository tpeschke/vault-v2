# Page type 1 first-page view
status: accepted   date: 2026-10-01

Decision: The v2 page-type-1 view matches the first page of the official blank sheet: two columns, same section order and labels. Fonts stay the vault set (HamletOrNot, oldClaude, Source Sans 3). The strength label stays **Cultural Strength**, not the sheet’s “Culture Strength.”

Why: The attached blank sheet is the layout source. Vault typefaces and the existing Cultural Strength name are the two listed exceptions.

Constraints it imposes:
- Left: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
- Right: Bonfire wordmark (attached logo: flame + BONFIRE + “The Roleplaying Game”) at the top, then Positions (static legend), Self Doubt, Damage, Stress, Defenses, Attacks. Compress the blocks below the logo so the page still fits `.page` height (1036px). Do not use the v1 flame-only `logo-black.png` plus HTML title.
- Do not put Goals, Temperaments, Relationships, or Movement on this page.
- Fonts unchanged. Label “Cultural Strength” unchanged.

Open (not decided):
- Social suite display names: sheet Influence / Inform / Inspire / Intimidate vs v2 data Empathize / Lecture / Intimidate / Tempt.
- Current Emotions has no stored field. Descriptions vs `convictions`. Defense `name`/`notes` and attack `notes` are not on the sheet.

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `app/src/assets/images/` (unindexed; wordmark file); `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/getCharacteristicsInfo.ts`
TODOs: T-009, T-010, T-011
