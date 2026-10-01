# TODOs

status: active   date: 2026-09-30

Merge writes `proposed`. Execute approval is the designer naming TODOs, not the session’s overall goal (canonical: `AGENTS.md`). Keep finished entries in Done and prune old ones so the active list stays short.

## Active

### T-009: Lay out page-type-1 left column to match the blank sheet
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Left column was a partial stack (general info, stats, characteristics including Goals/Temperaments/Relationships, movement). The sheet’s left column is Name through Favor.
scope: `app/src/pages/v2/pageTypes/pageType1/` (view character sheet adjacency): `PageType1.tsx`, `GeneralInfo/`, `Stats/`, `Characteristics/` (capacity, social suites, reputation, strengthNDiscount, descriptions, flaws), `Favor/`.
steps:
1. Order left column: Name, Ancestry, Class / Subclass / Lvl, CrP, Stats, Characteristics / Emotional Capacity, Current Emotions, Social Suites, Reputation, Cultural Strength / Social Skill Discount, Descriptions, Flaws, Favor.
2. Keep vault fonts and the label Cultural Strength. Match sheet labels otherwise (`Lvl`, `Spent to lvl`, `Social Suites`, `Reputation`).
3. Do not render Goals, Temperaments, Relationships, or Movement on this page. Leave those components in place; they are not this page.
4. Current Emotions: lined write-in (no stored field). Descriptions: bind to `convictions`.
done when: `npx tsc -p app --noEmit` has no errors under `app/src/pages/v2/`; grep `Cultural Strength` still hits `StrengthNDiscount.tsx`; `PageType1.tsx` and `Characteristics.tsx` do not import Movement, Goals, Temperaments, or Relationships; left column section headings match the sheet order.
depends on: none
open questions: Social suite display names (sheet Influence / Inform / Inspire / Intimidate vs v2 Empathize / Lecture / Intimidate / Tempt). Whether Current Emotions should bind to `goals` instead of empty lines. Whether Descriptions should bind to `convictions`.
deviations from design: Code for these steps is already on this branch from a premature execute. On execute, verify and correct; do not recreate unless review rejects the code.

### T-010: Lay out page-type-1 right column to match the blank sheet
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: Right column was a placeholder (`Right`). The sheet’s right column is Positions, Self Doubt, Damage, Stress, Defenses, Attacks.
scope: `app/src/pages/v2/pageTypes/pageType1/` (view character sheet adjacency): `PageType1.tsx`, `Positions/`, `Vitals/`, `Defenses/`, `Attacks/`.
steps:
1. Add static Positions legend (Low + X through High + X, including the Neutral / Weak 1 outline).
2. Render Self Doubt (die d4–d20, Integrity Threshold, Die Penalty), Damage (die, Trauma label, Knock Back, damage / threshold), Stress (die, stress / threshold) from `vitalsInfo`.
3. Render Defenses (`Def (Parry / Flanks)`, Cover, P. DR, DR, Initiative) and four Attacks (`Meas/RI`, Atk, Damage, Type, Rec) from `combatInfo`.
done when: `npx tsc -p app --noEmit` has no errors under `app/src/pages/v2/`; `PageType1.tsx` right column mounts Positions, Vitals, Defenses, Attacks in that order; die faces are `d4 d6 d8 d10 d12 d20`.
depends on: none
open questions: Highlight `dieIndex` 0 as d4, or treat 0 as none selected. Whether to draw defense `name`/`notes` and attack `notes` (not on the sheet).
deviations from design: Code for these steps is already on this branch from a premature execute. On execute, verify and correct; do not recreate unless review rejects the code.

### T-011: Assign basic characteristics onto the page-type-1 payload
status: proposed
source: rewrite-ledger/page1-view.md, 2026-10-01
why: `getCharacteristicsInfo` discarded `getBasicCharacteristics`’s return, so capacity, Cultural Strength, social skill discount, and temperaments never reached the view.
scope: `backend/server/v2/view/assembleV2Character/utilities/pageType1/utilities/getCharacteristics/getCharacteristicsInfo.ts` (view character sheet primary).
steps:
1. Copy `capacity`, `culturalStrength`, `socialSkillDiscount`, and `temperaments` from `getBasicCharacteristics` onto `characteristicInfo`. Do not replace the whole object (parallel array assignments must keep their results).
done when: that `.then` assigns those four fields; grep in that file for `return { ...characteristicInfo, ...basicCharacteristics }` has 0 hits.
depends on: none
open questions: none
deviations from design: Assignment already present on this branch from a premature execute. On execute, verify the four fields are assigned in place.

## Done

### T-008: Split nested view folder into two FSD page slices
status: done
source: rewrite-ledger/fsd-colocation.md, 2026-10-01
why: Designer chose two view page slices, not one nested view folder with v1/v2 inside.
scope: former nested view folder under `app/src/pages/`; `app/src/routes/AllRoutes.tsx`; `00-START-HERE.yaml` view routing keys. Home slice and backend paths unchanged.
result: `git mv` to `app/src/pages/v1` and `app/src/pages/v2`. `View.css` is `app/src/pages/View.css`, imported by both slices. Home and create-character paths unchanged. No `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` created. Backend unmoved.
deviations from design: Slice names `v1`/`v2` taken from observed folders because execute was ordered while names were unset. `View.css` kept as a sibling of both slices rather than creating `shared/`.
open questions: none

### T-005: Add AGENTS.md as agent entry to L1 and the ledger
status: done
source: recorded gap “no AGENTS.md”; session 2026-10-01
why: Agents must route through root panels instead of scanning.
scope: `AGENTS.md`; `00-START-HERE.md` / `.yaml`; `rewrite-ledger/00-START-HERE.md` / `.yaml`.
result: `AGENTS.md` points at L1, vocabulary, ledger, unindexed rule, and FSD-later. Gap removed.
deviations from design: AGENTS.md does not route CODE-LAYOUT-STANDARD as current tree law; designer adopted FSD for a later transformation.

### T-006: Tighten L1 from unindexed misses
status: done
source: index next-steps 2026-10-01 item 3
why: Files that implement an accepted objective were listed unindexed (home rows, header, v1 widgets, contracts, SQL).
scope: `00-START-HERE.yaml` `routing` and `unindexed`.
result: Promoted home row display, header, App login bootstrap, v1 displayArray/textArea, view/home CSS, v1/v2 interfaces, v1 dictionaries, and v1 query SQL onto existing features. Remaining unindexed is shell/machinery (38 files). Completeness still holds.
deviations from design: none

### T-007: Context-loss review for L2/L3
status: done
source: anne-index applying-to-code; session 2026-10-01 item 4
why: L2/L3 only if a miss the front panel cannot carry.
scope: `rewrite-ledger/l2-l3-deferred.md`
result: No such miss after T-006. L2/L3 not added. Format remains unset.
deviations from design: none


### T-003: Completeness pass excluding dist/
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: An unrouted source file is an index gap. Generated `dist/` is excluded by decision.
scope: `00-START-HERE.yaml` `unindexed`; source under `app/src`, `backend/`, `replaceScripts/`.
result: 372 source files are either under a routing primary/adjacent path or named in `unindexed`. Mechanisms (redux, db, vault.ts, replaceScripts, common contracts) listed unindexed; no new features invented. `dist/` is in excludes and not a routing target.
deviations from design: none
open questions: none (mechanisms listed unindexed as specified)

### T-002: Map each accepted feature to backend primary and frontend adjacency
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: Index-in-place needs current paths. Backend is primary when the feature spans surfaces.
scope: `00-START-HERE.yaml` `routing`.
result: Twelve inventory rows mapped. PDF has no backend; primary is now `app/src/pages/v1/hooks/utilities/downloadUtilities.ts` (path updated by T-008). Create character maps to `backend/server/v2/add/`.
deviations from design: download v1 PDF primary is frontend-only (no backend path).

### T-004: Remove HomeController.addCharacter
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30 (v1 create permanently excluded)
why: v1 will never add characters. `HomeController.addCharacter` inserts into `cvcharactermain` and is not mounted. It is not the v2 Create character path.
scope: `backend/server/controllers/home/HomeController.ts`; `backend/server/v1/queries/home.ts`.
result: Deleted `addCharacter` and unused imports from HomeController. Removed `insertCharacter` and `characterCount` SQL. Home GET/DELETE and v2 add path unchanged.
deviations from design: none

### T-001: Add repository front panels that own the feature index
status: done
source: rewrite-ledger/feature-index.md, 2026-09-30
why: L1 for the repo does not exist. The feature index lives on the root panels, not in the ledger.
scope: `00-START-HERE.md` and `00-START-HERE.yaml` at repo root (now the navigation owner).
result: Root panels added. YAML routing keys match the accepted inventory plus aliases; `primary`/`adjacent` left empty for T-002. No v1 create-character key. Vocabulary lives on the repo human panel. Ledger routes L1 to the root YAML.
deviations from design: none

