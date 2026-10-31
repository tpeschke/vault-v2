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
    get: (key: 'pdf') => Promise<{ internal: { pageSize: PdfPageSize } }>
}

const LETTER_WIDTH = 816
const LETTER_HEIGHT = 1056
const CAPTURE_SCALE = 2
const RULE_BAND = 17.38
const RULE_PERIOD = 34.76
const RULED_SELECTOR = '.page3-contacts > .character-value, .page-type-two-notes > .character-value, .page3-notes'
const SELECTED_DIE_SELECTOR = '.vitals-v2 .die-row p.selected img'

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

async function bakeSelectedDice(livePage: HTMLElement, container: HTMLElement) {
    const liveImages = [...livePage.querySelectorAll(SELECTED_DIE_SELECTOR)]
    const cloneImages = [...container.querySelectorAll(SELECTED_DIE_SELECTOR)]
    if (liveImages.length !== cloneImages.length) {
        removeClones()
        throw new Error('Download die count does not match the sheet.')
    }
    await Promise.all(liveImages.map(async (live, index) => {
        if (!(live instanceof HTMLImageElement)) return
        const clone = cloneImages[index]
        if (!(clone instanceof HTMLImageElement)) return
        const filter = getComputedStyle(live).filter
        if (!filter || filter === 'none') return
        const width = live.naturalWidth || live.offsetWidth
        const height = live.naturalHeight || live.offsetHeight
        const canvas = clone.ownerDocument.createElement('canvas')
        canvas.width = Math.max(1, width)
        canvas.height = Math.max(1, height)
        const context = canvas.getContext('2d')
        if (!context) return
        context.filter = filter
        context.drawImage(live, 0, 0, canvas.width, canvas.height)
        context.filter = 'none'
        clone.src = canvas.toDataURL('image/png')
        clone.style.filter = 'none'
        await clone.decode()
    }))
}

function frameLabelText(label: HTMLElement): string {
    const input = label.querySelector('input')
    if (input instanceof HTMLInputElement) return input.value
    return label.textContent ?? ''
}

function fitFrameText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    if (maxWidth <= 0) return ''
    if (context.measureText(text).width <= maxWidth) return text
    for (let length = text.length; length > 0; length -= 1) {
        const shortened = `${text.slice(0, length)}...`
        if (context.measureText(shortened).width <= maxWidth) return shortened
    }
    return '...'
}

async function bakeFrameLabels(livePage: HTMLElement, container: HTMLElement) {
    const liveLabels = [...livePage.querySelectorAll('[id*="-frame-name-"]')]
    await Promise.all(liveLabels.map(async node => {
        if (!(node instanceof HTMLElement)) return
        const editor = node.closest('.excalidraw')
        if (!(editor instanceof HTMLElement)) return
        const clone = container.querySelector(`[id="${CSS.escape(node.id)}"]`)
        if (!(clone instanceof HTMLElement)) return
        const style = getComputedStyle(node)
        const width = node.offsetWidth
        const height = node.offsetHeight
        const canvas = clone.ownerDocument.createElement('canvas')
        canvas.width = Math.max(1, Math.round(Math.max(width, 1) * CAPTURE_SCALE))
        canvas.height = Math.max(1, Math.round(Math.max(height, 1) * CAPTURE_SCALE))
        const context = canvas.getContext('2d')
        if (!context) return
        context.font = style.font
        context.fillStyle = style.color
        context.textBaseline = 'alphabetic'
        const fontSize = Number.parseFloat(style.fontSize) || 14
        const parsedLine = Number.parseFloat(style.lineHeight)
        const lineHeight = style.lineHeight === 'normal' || Number.isNaN(parsedLine) ? fontSize * 1.2 : parsedLine
        const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
        const paddingRight = Number.parseFloat(style.paddingRight) || 0
        const paddingTop = Number.parseFloat(style.paddingTop) || 0
        const paddingBottom = Number.parseFloat(style.paddingBottom) || 0
        const contentWidth = Math.max(0, width - paddingLeft - paddingRight)
        const contentHeight = Math.max(0, height - paddingTop - paddingBottom)
        const text = frameLabelText(node)
        const clipped = node.scrollWidth > node.clientWidth + 1
        const drawn = clipped ? fitFrameText(context, text, contentWidth) : text
        const sample = context.measureText(drawn || ' ')
        const ascent = sample.fontBoundingBoxAscent || fontSize
        const halfLeading = (lineHeight - fontSize) / 2
        context.scale(CAPTURE_SCALE, CAPTURE_SCALE)
        context.beginPath()
        context.rect(paddingLeft, paddingTop, contentWidth, contentHeight)
        context.clip()
        context.fillText(drawn, paddingLeft, paddingTop + halfLeading + ascent)
        const image = clone.ownerDocument.createElement('img')
        image.src = canvas.toDataURL('image/png')
        image.alt = ''
        image.style.display = 'block'
        image.style.width = '100%'
        image.style.height = '100%'
        const liveRect = node.getBoundingClientRect()
        const editorRect = editor.getBoundingClientRect()
        clone.replaceChildren(image)
        clone.style.position = 'absolute'
        clone.style.top = `${liveRect.top - editorRect.top}px`
        clone.style.left = `${liveRect.left - editorRect.left}px`
        clone.style.width = `${width}px`
        clone.style.height = `${height}px`
        clone.style.bottom = 'auto'
        clone.style.right = 'auto'
        clone.style.margin = '0'
        clone.style.transform = 'none'
        clone.style.maxWidth = 'none'
        clone.style.overflow = 'hidden'
        await image.decode()
    }))
}

function notesMismatch(): never {
    removeClones()
    throw new Error('Download notes canvas does not match the sheet.')
}

async function pinNotesCanvas(live: HTMLCanvasElement, clone: Element) {
    if (!(clone instanceof HTMLImageElement) && !(clone instanceof HTMLCanvasElement)) notesMismatch()
    const editor = live.closest('.excalidraw')
    if (!(editor instanceof HTMLElement)) notesMismatch()
    const liveRect = live.getBoundingClientRect()
    const editorRect = editor.getBoundingClientRect()
    clone.style.position = 'absolute'
    clone.style.margin = '0'
    clone.style.zIndex = getComputedStyle(live).zIndex
    clone.style.top = `${liveRect.top - editorRect.top}px`
    clone.style.left = `${liveRect.left - editorRect.left}px`
    clone.style.width = `${liveRect.width}px`
    clone.style.height = `${liveRect.height}px`
    if (clone instanceof HTMLImageElement) {
        clone.removeAttribute('width')
        clone.removeAttribute('height')
        await clone.decode()
        return
    }
    const context = clone.getContext('2d')
    if (!context) notesMismatch()
    context.drawImage(live, 0, 0)
}

async function walkNotes(live: Element, clone: Element) {
    if (live instanceof HTMLCanvasElement) {
        await pinNotesCanvas(live, clone)
        return
    }
    let cloneChildren = [...clone.children]
    if (live instanceof HTMLElement && (live.scrollLeft || live.scrollTop)) {
        if (cloneChildren.length !== 1) notesMismatch()
        cloneChildren = [...cloneChildren[0].children]
    }
    const liveChildren = [...live.children]
    if (liveChildren.length !== cloneChildren.length) notesMismatch()
    for (let index = 0; index < liveChildren.length; index += 1) {
        await walkNotes(liveChildren[index], cloneChildren[index])
    }
}

async function pinNotesScenes(livePage: HTMLElement, container: HTMLElement) {
    const liveEditors = [...livePage.querySelectorAll('.excalidraw')]
    const cloneEditors = [...container.querySelectorAll('.excalidraw')]
    if (liveEditors.length !== cloneEditors.length) notesMismatch()
    for (let index = 0; index < liveEditors.length; index += 1) {
        await walkNotes(liveEditors[index], cloneEditors[index])
    }
}

async function copyFields(livePage: HTMLElement, container: HTMLElement) {
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
    await pinNotesScenes(livePage, container)
    paintStripes(livePage, container)
    await bakeSelectedDice(livePage, container)
    await bakeFrameLabels(livePage, container)
}

async function renderPage(html2pdf: () => Html2PdfWorker, page: HTMLElement): Promise<ArrayBuffer> {
    const worker = html2pdf().set(workerOptions).from(page).toContainer().then(() => {
        const container = document.querySelector('.html2pdf__container')
        if (!(container instanceof HTMLElement)) {
            removeClones()
            throw new Error('Download could not clone the sheet.')
        }
        container.classList.add('v2')
        return copyFields(page, container)
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
