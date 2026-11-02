import { pdfFileName } from '../v2/hooks/utilities/downloadCharacter'

interface PdfPageSize {
    getWidth: () => number
    getHeight: () => number
}

interface Html2PdfWorker {
    set: (options: object) => Html2PdfWorker
    from: (src: HTMLElement) => Html2PdfWorker
    toContainer: () => Html2PdfWorker
    toPdf: () => Html2PdfWorker
    then: (onFulfilled: (this: { prop: { pdf: { internal: { pageSize: PdfPageSize } } } }) => void | Promise<void>) => Html2PdfWorker
    outputPdf: (type: string) => Promise<ArrayBuffer>
}

const LETTER_WIDTH = 816
const LETTER_HEIGHT = 1056
const CAPTURE_SCALE = 2
const RULE_BAND = 17.38
const RULE_PERIOD = 34.76
const RULED_SELECTOR = '.page-type-safehouse-damage .safehouse-damage-notes > .character-value'

const workerOptions = {
    margin: 0,
    image: { type: 'jpeg' as const, quality: 0.95 },
    html2canvas: { scale: 2 },
    enableLinks: false,
    jsPDF: {
        unit: 'px',
        format: 'letter',
        orientation: 'portrait' as const,
        hotfixes: ['px_scaling']
    }
}

function removeClones() {
    document.querySelectorAll('.html2pdf__overlay, .html2pdf__container').forEach(node => node.remove())
}

function isCopiedInput(node: Element): node is HTMLInputElement {
    if (node.tagName !== 'INPUT') return false
    const type = (node.getAttribute('type') || 'text').toLowerCase()
    return type === '' || type === 'text' || type === 'number' || type === 'search'
}

function copyControlStyle(live: HTMLElement, clone: HTMLElement) {
    const block = clone.ownerDocument.createElement('div')
    block.textContent = (live as HTMLInputElement | HTMLTextAreaElement).value
    block.className = clone.className
    const style = getComputedStyle(clone)
    block.style.fontFamily = style.fontFamily
    block.style.fontSize = style.fontSize
    block.style.fontWeight = style.fontWeight
    block.style.fontStyle = style.fontStyle
    block.style.lineHeight = style.lineHeight
    block.style.letterSpacing = style.letterSpacing
    block.style.color = style.color
    block.style.paddingTop = style.paddingTop
    block.style.paddingRight = style.paddingRight
    block.style.paddingBottom = style.paddingBottom
    block.style.paddingLeft = style.paddingLeft
    block.style.textAlign = style.textAlign
    block.style.whiteSpace = style.whiteSpace
    block.style.overflowWrap = style.overflowWrap
    block.style.overflowX = style.overflowX === 'visible' ? 'hidden' : style.overflowX
    block.style.overflowY = style.overflowY === 'visible' ? 'hidden' : style.overflowY
    block.style.boxSizing = 'border-box'
    block.style.width = `${live.offsetWidth}px`
    block.style.height = `${live.offsetHeight}px`
    clone.replaceWith(block)
    block.scrollTop = live.scrollTop
}

function paintStripes(livePage: HTMLElement, container: HTMLElement) {
    const liveRuled = [...livePage.querySelectorAll(RULED_SELECTOR)]
    const cloneRuled = [...container.querySelectorAll(RULED_SELECTOR)]
    if (liveRuled.length === 0 && cloneRuled.length === 0) {
        return
    }
    if (liveRuled.length !== cloneRuled.length) {
        removeClones()
        throw new Error('Download ruled-line count does not match the sheet.')
    }
    liveRuled.forEach((live, index) => {
        const clone = cloneRuled[index]
        if (!(live instanceof HTMLElement) || !(clone instanceof HTMLElement)) return
        const width = clone.offsetWidth
        const height = clone.offsetHeight
        if (width < 1 || height < 1) return
        const canvas = clone.ownerDocument.createElement('canvas')
        canvas.width = Math.max(1, Math.round(width * CAPTURE_SCALE))
        canvas.height = Math.max(1, Math.round(height * CAPTURE_SCALE))
        const context = canvas.getContext('2d')
        if (!context) return
        context.scale(CAPTURE_SCALE, CAPTURE_SCALE)
        const scrollTop = live.scrollTop
        for (let y = 0; y < height; y += 1) {
            const phase = ((y + scrollTop) % RULE_PERIOD + RULE_PERIOD) % RULE_PERIOD
            context.fillStyle = phase < RULE_BAND ? '#ffffff' : '#f3f3f3'
            context.fillRect(0, y, width, 1)
        }
        clone.scrollTop = scrollTop
        clone.style.setProperty('background-image', `url("${canvas.toDataURL('image/png')}")`, 'important')
        clone.style.setProperty('background-repeat', 'no-repeat', 'important')
        clone.style.setProperty('background-size', `${width}px ${height}px`, 'important')
        clone.style.setProperty('background-attachment', 'scroll', 'important')
    })
}

function copyFields(livePage: HTMLElement, container: HTMLElement) {
    const liveFields = [...livePage.querySelectorAll('input, textarea')]
    const cloneFields = [...container.querySelectorAll('input, textarea')]
    if (liveFields.length !== cloneFields.length) {
        removeClones()
        throw new Error('Download field count does not match the sheet.')
    }
    liveFields.forEach((live, index) => {
        const clone = cloneFields[index]
        if (!(live instanceof HTMLElement)) return
        if (clone.tagName !== 'TEXTAREA' && !isCopiedInput(clone)) return
        if (!(clone instanceof HTMLElement)) return
        copyControlStyle(live, clone)
    })
    paintStripes(livePage, container)
}

async function renderPage(html2pdf: () => Html2PdfWorker, page: HTMLElement): Promise<ArrayBuffer> {
    const worker = html2pdf().set(workerOptions).from(page).toContainer().then(() => {
        const container = document.querySelector('.html2pdf__container')
        if (!(container instanceof HTMLElement)) {
            removeClones()
            throw new Error('Download could not clone the sheet.')
        }
        container.classList.add('v2')
        copyFields(page, container)
    }).toPdf().then(function (this: { prop: { pdf: { internal: { pageSize: PdfPageSize } } } }) {
        const { pageSize } = this.prop.pdf.internal
        const width = pageSize.getWidth()
        const height = pageSize.getHeight()
        if (width !== LETTER_WIDTH || height !== LETTER_HEIGHT) {
            removeClones()
            throw new Error(`PDF page is ${width} by ${height}.`)
        }
    })
    try {
        return await worker.outputPdf('arraybuffer')
    } finally {
        removeClones()
    }
}

function saveFile(bytes: Uint8Array, fileName: string) {
    const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
}

export async function downloadSafehouse(fileName: string): Promise<void> {
    const pages = [...document.querySelectorAll('.safehouse-shell .page')].filter((page): page is HTMLElement => page instanceof HTMLElement)
    if (pages.length === 0) {
        throw new Error('Download could not find the sheet.')
    }
    const loaded = await import('html2pdf.js')
    const html2pdf = (loaded.default ?? loaded) as unknown as () => Html2PdfWorker
    const { PDFDocument } = await import('pdf-lib')
    const buffers: ArrayBuffer[] = []
    for (const page of pages) {
        buffers.push(await renderPage(html2pdf, page))
    }
    const merged = await PDFDocument.create()
    for (const buffer of buffers) {
        const document = await PDFDocument.load(buffer)
        const copied = await merged.copyPages(document, document.getPageIndices())
        copied.forEach(pdfPage => merged.addPage(pdfPage))
    }
    saveFile(await merged.save(), fileName)
}

export function safehousePdfFileName(name: string): string {
    return pdfFileName(name)
}
