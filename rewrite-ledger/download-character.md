# Download a character
status: accepted   date: 2026-10-30

Decision: A v2 character downloads as one PDF from the view sidebar. The writer is `html2pdf.js` 0.14.0, one worker per `.page` card. `pdf-lib` 1.17.1 joins those PDFs into one file. There is no pregen control. The v2 card’s border box is US Letter in CSS pixels so the captured card and the PDF page are the same size.

Why: The designer named html2pdf.js and rejected v1’s per-page `html2canvas` plus `jsPDF.addImage` (2026-10-30). One html2pdf canvas of the whole stack sits near the browser canvas ceiling, so each card is its own worker. They confirmed `pdf-lib` as the join, left pregen out, and said to change the HTML page size to match the PDF page. jsPDF `letter` with unit `px` and hotfix `px_scaling` is 816×1056, which is 8.5×11 in at 96 px/in. Without that hotfix, jsPDF’s `px` unit is 96/72 and the numbers are not CSS pixels.

Constraints it imposes:
- View mode only. On a real character the sidebar order is Edit (when `ownsThisCharacter`), then Download, then the quick-edit toggle. Download is not owner-gated and stays visible on `/v/blank` (`blank-sheet.md`). Hidden while editing and while a download is running. Click clears quick-edit highlights and waits for the next paint before capture. A second click does not start a second file.
- Capture every `.page` in `.version-two-shell`, DOM order, including type 4. The sidebar is not inside that set. Edit gutters are absent in view mode.
- Each worker: `margin: 0`, `html2canvas.scale: 2`, jpeg quality 0.95, `enableLinks: false`, no page-break mode. `jsPDF`: unit `px`, format `letter`, orientation `portrait`, `hotfixes: ['px_scaling']`. After `toPdf`, that page is 816×1056. If it is not, stop.
- In the worker container, copy live `textarea` and text/number/search `input` values onto blocks in the clone. Leave checkbox, radio, button, file, and hidden inputs. Copy live canvas bitmaps onto the clone canvases so the notes sheet is in the file. Do not change the on-screen controls.
- One download. Filename is `character.name` with `\ / : * ? " < > |` and control characters removed, trimmed, or `Blank` when that is empty, then `.pdf`.
- While it runs, show the v1-style banner: sticky, “Downloading”, the existing loading indicator. Do not render the sidebar during that wait.
- Client only. No backend route. No `features/` directory. Do not edit the v1 download path. Root `jspdf` stays `^3.0.3` for v1. `html2pdf.js` 0.14.0 depends on `jspdf` 4; that copy stays nested. `pdf-lib` is `1.17.1`.
- Page box: `v2-page-type.md`. This file does not resize v1.

Rejected:
- Pregen — designer, 2026-10-30.
- One `html2pdf().from(page-shell).save()` for the stack — one canvas of 15 cards at scale 2 is about 31,080 px tall, under Chrome’s rough ceiling and close enough that a phone canvas comes out blank.
- US Letter in mm with the 796×1036 card left as it is — the designer said to change the HTML page to match.
- Resizing the unscoped `.page` rule — that box is also v1. v1 stays 796×1036.

Touches: `app/src/pages/v2/`; `app/src/pages/View.css`; root `package.json`; `00-START-HERE.yaml`; `rewrite-ledger/feature-inventory.md`; `v2-page-type.md`
TODOs: T-155, T-156
