interface PdfPageSize {
    getWidth: () => number
    getHeight: () => number
}

interface Html2PdfWorker {
    set: (options: object) => Html2PdfWorker
    from: (src: HTMLElement) => Html2PdfWorker
    toContainer: () => Html2PdfWorker
    toPdf: () => Html2PdfWorker
    then: (onFulfilled: (this: { prop: { pdf: { internal: { pageSize: PdfPageSize } } } }) => void) => Html2PdfWorker
    outputPdf: (type: string) => Promise<ArrayBuffer>
    get: (key: 'pdf') => Promise<{ internal: { pageSize: PdfPageSize } }>
}

const LETTER_WIDTH = 816
const LETTER_HEIGHT = 1056

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

export function pdfFileName(name: string): string {
    const cleaned = name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').trim()
    return `${cleaned || 'Blank'}.pdf`
}

function removeClones() {
    document.querySelectorAll('.html2pdf__overlay, .html2pdf__container').forEach(node => node.remove())
}

function isCopiedInput(node: Element): node is HTMLInputElement {
    if (node.tagName !== 'INPUT') return false
    const type = (node.getAttribute('type') || 'text').toLowerCase()
    return type === '' || type === 'text' || type === 'number' || type === 'search'
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
        if (clone.tagName !== 'TEXTAREA' && !isCopiedInput(clone)) return
        const box = live as HTMLElement
        const block = clone.ownerDocument.createElement('div')
        block.textContent = (live as HTMLInputElement | HTMLTextAreaElement).value
        block.className = (clone as HTMLElement).className
        block.style.whiteSpace = 'pre-wrap'
        block.style.boxSizing = 'border-box'
        block.style.width = `${box.offsetWidth}px`
        block.style.height = `${box.offsetHeight}px`
        clone.replaceWith(block)
    })
    const liveCanvases = [...livePage.querySelectorAll('canvas')]
    const cloneCanvases = [...container.querySelectorAll('canvas')]
    liveCanvases.forEach((live, index) => {
        const clone = cloneCanvases[index]
        const context = clone?.getContext('2d')
        if (!context) return
        context.drawImage(live, 0, 0)
    })
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

export async function downloadPages(pages: HTMLElement[], fileName: string): Promise<void> {
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
