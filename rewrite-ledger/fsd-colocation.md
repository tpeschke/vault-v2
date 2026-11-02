# FSD colocation
status: accepted   date: 2026-10-01

Decision: Keep the Vite/React package at repo `app/` (`index.html`, `src/`, `vite.config.ts`). When further FSD folders are created, they go under `app/src/` as `app/src/app`, `app/src/pages`, `app/src/widgets`, `app/src/features`, `app/src/entities`, `app/src/shared`. `pages/` is `home`, `v1`, `v2`, and `safehouse`. Character views stay two slices, not one nested view folder. The safehouse sheet is `app/src/pages/safehouse` (`safehouse.md`). Shared sheet chrome is `app/src/pages/View.css`. Backend has no FSD or other parallel taxonomy; it stays on L1. Frontend Create character stays on the home page slice. Safehouse create stays there too, inside the Your Characters card.

Why: Vite and the current frontend expect a package root with `index.html` + `src/`. FSD’s `app` layer is a slice of `src`, not the npm package. The two view routes (`/view/:characterID`, `/v/:characterID`) are separate pages. Backend meaning is already the L1 `primary`. Create is a home-footer action, not a route. Slice names `v1` and `v2` are the observed folder names lifted one level. `View.css` is imported by both view slices; it stays a sibling of those slices, not a `shared/` layer.

Constraints it imposes:
- Repo top level stays `app/` (frontend package) and `backend/` (server).
- FSD `app` ≠ package `app/`. The layer path is `app/src/app`.
- Character view slices are `app/src/pages/v1` and `app/src/pages/v2`. The safehouse page slice is `app/src/pages/safehouse` (`safehouse.md`). Do not reintroduce a nested view folder. Do not put the safehouse sheet under `v1` or `v2`.
- Home remains `app/src/pages/home`. Create character on the frontend stays there (`HomeFooter`, `V2CharacterDisplay`, `UsersCharactersHook.addCharacter`). Safehouse create stays in that Your Characters card (`safehouse.md`). Do not extract `features/create-character` or `features/create-safehouse`. Do not add a create route. v1 create remains excluded.
- `app/src/pages/View.css` is shared by both view slices. Do not create `shared/` to hold it.
- Do not add backend layer folders. Backend paths stay on `00-START-HERE.yaml` routing.
- Do not create empty `app/src/app`, `widgets/`, `features/`, `entities/`, or `shared/` because the grammar lists them. Create a layer folder only when a TODO moves an owner into it.
- L1 YAML must be updated in the same change as any later move.

Rejected:
- Replacing `app/` with FSD layers at the repository root.
- One nested view folder with v1/v2 inside.
- A later backend taxonomy parallel to FSD.
- Extracting Create character to `features/create-character`.

Touches: `app/src/pages/{home,v1,v2,safehouse}`; `app/src/pages/View.css`; not `backend/` tree shape
TODOs: T-008 (done); safehouse slice: T-163 (`safehouse.md`)

Revised 2026-11-01 (`safehouse.md`):
- “`pages/` is home, v1, and v2” — **revised**: home, v1, v2, and safehouse.
- “View slices are `app/src/pages/v1` and `app/src/pages/v2`” — **revised**: those stay the character view slices. Safehouse is `app/src/pages/safehouse`.
- “Do not reintroduce a nested view folder” — **retained**.
- “Home remains `app/src/pages/home`. Create character stays there” — **retained**. Safehouse create stays on that home page too, inside the Your Characters card (`safehouse.md`).
- “Do not extract `features/create-character`” — **retained**. Do not add `features/create-safehouse`.
- `View.css` stays a sibling of the page slices — **retained**. The safehouse shell uses class `v2` so those rules apply. Do not move `View.css` into `shared/`.
