# Page type 1 view
status: accepted   date: 2026-10-01

Decision: Page type 1 is view-only. Left column is generalInfo, stats, characteristics (including convictions), movement. Right column is Logo, Vitals, Favor, Defenses, Attacks, in that order.

Why: That order is the remaining-work list in `PageType1.tsx`. Inventory has no v2 edit. Backend already returns every listed block. Convictions are assembled with characteristics and were the only unused page-1 field on the left.

Constraints it imposes:
- Do not add editing, quick-edit, or PDF to v2 here.
- New widgets stay under `app/src/pages/v2/pageTypes/pageType1/`. They are not L1 features (`rewrite-ledger/feature-index.md`).
- `dieIndex` is shown as an integer labeled Die until a face mapping is recorded.
- Logo is `app/src/assets/images/logo-black.png` plus the v1 wordmark, at the top of the right column.

Rejected:
- Copying v1 right-column widgets (nerve/vitality tracks, 2×2 weapon tables). v2 vitals and combatInfo shapes differ.

Touches: `app/src/pages/v2/pageTypes/pageType1/`; `backend/common/interfaces/v2/page1/`
TODOs: T-009, T-010
