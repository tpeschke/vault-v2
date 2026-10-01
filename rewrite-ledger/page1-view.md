# Page type 1 first-page view
status: accepted   date: 2026-10-01

Decision: The v2 page-type-1 view matches the first page of the official blank sheet: two columns, same section order and labels. Fonts stay the vault set (HamletOrNot, oldClaude, Source Sans 3). The strength label stays **Cultural Strength**, not the sheet’s “Culture Strength.”

Why: The attached blank sheet is the layout source. Vault typefaces and the existing Cultural Strength name are the two listed exceptions.

Constraints it imposes:
- Left: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
- Right: Positions (static legend), Self Doubt, Damage, Stress, Defenses, Attacks.
- Do not put Goals, Temperaments, Relationships, or Movement on this page.
- Descriptions bind to `convictions`. Current Emotions is a lined write-in with no stored field.
- Social suite display names stay Empathize / Lecture / Intimidate / Tempt (v2 data). Positions, die faces, and combat field labels follow the sheet.

Rejected:
- Replacing vault fonts with the sheet’s IM FELL / Arial.
- Renaming Cultural Strength to Culture Strength.

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/getCharacteristicsInfo.ts`
TODOs: T-009
