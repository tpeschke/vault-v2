import '@excalidraw/excalidraw/index.css'
import './PageType4.css'
import { NOTES_SCENE_MAX_BYTES } from '@vault/common/interfaces/v2/page4/notesScene'
import { Page4 } from '@vault/common/interfaces/v2/pageTypes'
import { CaptureUpdateAction, Excalidraw } from '@excalidraw/excalidraw'
import type { AppState, BinaryFiles, ExcalidrawImperativeAPI, NormalizedZoomValue } from '@excalidraw/excalidraw/types'
import type { ClipboardData } from '@excalidraw/excalidraw/clipboard'
import type { ExcalidrawElement } from '@excalidraw/excalidraw/element/types'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import EditingContext from '../../contexts/EditingContext'
import { PageType4Updates } from '../../hooks/interfaces/UpdateInterfaces'

interface Props {
    pageInfo: Page4
    updates: PageType4Updates
    notesEpoch: number
}

const NOTES_UI_OPTIONS = {
    canvasActions: {
        loadScene: false,
        export: false as const,
        saveToActiveFile: false,
        saveAsImage: false
    }
}

const ZOOM_EPSILON = 0.0001
const SCROLL_EPSILON = 0.5
const CAP_MESSAGE = 'Notes sheet is limited to 100 MB'

interface AcceptedScene {
    elements: readonly ExcalidrawElement[]
    files: BinaryFiles
    scene: string
}

function zoomOne() {
    return { value: 1 as NormalizedZoomValue }
}

function readScene(scene: string): { elements: readonly ExcalidrawElement[], files: BinaryFiles } {
    if (scene === '') {
        return { elements: [], files: {} }
    }
    try {
        const parsed = JSON.parse(scene) as { elements?: unknown, files?: BinaryFiles }
        const elements = Array.isArray(parsed.elements) ? parsed.elements as ExcalidrawElement[] : []
        const files = parsed.files && typeof parsed.files === 'object' ? parsed.files : {}
        return { elements, files }
    } catch {
        return { elements: [], files: {} }
    }
}

function persistedScene(elements: readonly ExcalidrawElement[], files: BinaryFiles): AcceptedScene {
    const live = elements.filter(element => !element.isDeleted)
    const referenced = new Set<string>()
    for (const element of live) {
        if ('fileId' in element && typeof element.fileId === 'string' && element.fileId) {
            referenced.add(element.fileId)
        }
    }
    const kept: BinaryFiles = {}
    for (const id of referenced) {
        const file = files[id as keyof BinaryFiles]
        if (file) {
            kept[id as keyof BinaryFiles] = file
        }
    }
    const scene = live.length === 0 && Object.keys(kept).length === 0
        ? ''
        : JSON.stringify({ elements: live, files: kept })
    return { elements: live, files: kept, scene }
}

function utf8Bytes(value: string): number {
    return new TextEncoder().encode(value).length
}

function overCap(scene: string): boolean {
    return utf8Bytes(scene) > NOTES_SCENE_MAX_BYTES
}

export default function PageType4({ pageInfo, updates, notesEpoch }: Props) {
    const isEditing = useContext(EditingContext)
    const isEditingRef = useRef(isEditing)
    isEditingRef.current = isEditing
    const updatesRef = useRef(updates)
    updatesRef.current = updates
    const pageIDRef = useRef(pageInfo.pageID)
    pageIDRef.current = pageInfo.pageID

    const loaded = useState(() => readScene(pageInfo.scene))[0]
    const [initialData] = useState(() => ({
        elements: loaded.elements,
        files: loaded.files,
        appState: {
            zoom: zoomOne(),
            ...(pageInfo.scene === '' ? { scrollX: 0, scrollY: 0 } : {})
        }
    }))
    const cardRef = useRef<HTMLDivElement | null>(null)
    const apiRef = useRef<ExcalidrawImperativeAPI | null>(null)
    const lockRef = useRef({
        scrollX: 0,
        scrollY: 0,
        captured: pageInfo.scene === ''
    })
    const lastAcceptedRef = useRef<AcceptedScene>({
        elements: loaded.elements,
        files: loaded.files,
        scene: pageInfo.scene
    })
    const acceptBaseline = useRef(true)
    const restoringRef = useRef(false)
    const capToastRef = useRef(false)

    useEffect(() => {
        const id = window.setTimeout(() => {
            acceptBaseline.current = false
        }, 0)
        return () => window.clearTimeout(id)
    }, [])

    useEffect(() => {
        const card = cardRef.current
        if (!card) {
            return
        }
        const swallow = (event: WheelEvent) => {
            event.preventDefault()
            event.stopPropagation()
        }
        card.addEventListener('wheel', swallow, { capture: true, passive: false })
        return () => card.removeEventListener('wheel', swallow, true)
    }, [])

    const onApi = useCallback((api: ExcalidrawImperativeAPI) => {
        apiRef.current = api
    }, [])

    const restoreAccepted = useCallback(() => {
        const api = apiRef.current
        const accepted = lastAcceptedRef.current
        if (!api) {
            return
        }
        restoringRef.current = true
        api.updateScene({
            elements: accepted.elements,
            captureUpdate: CaptureUpdateAction.NEVER
        })
        const files = Object.values(accepted.files)
        if (files.length) {
            api.addFiles(files)
        }
    }, [])

    const toastCap = useCallback(() => {
        if (capToastRef.current) {
            return
        }
        capToastRef.current = true
        toast.error(CAP_MESSAGE)
        window.setTimeout(() => {
            capToastRef.current = false
        }, 300)
    }, [])

    const rejectCap = useCallback(() => {
        toastCap()
        restoreAccepted()
    }, [restoreAccepted, toastCap])

    const onScrollChange = useCallback((scrollX: number, scrollY: number, zoom: { value: number }) => {
        const api = apiRef.current
        if (!api) {
            return
        }
        const lock = lockRef.current
        if (!lock.captured) {
            lock.scrollX = scrollX
            lock.scrollY = scrollY
            lock.captured = true
            if (Math.abs(zoom.value - 1) > ZOOM_EPSILON) {
                api.updateScene({
                    appState: {
                        zoom: zoomOne(),
                        scrollX: lock.scrollX,
                        scrollY: lock.scrollY
                    },
                    captureUpdate: CaptureUpdateAction.NEVER
                })
            }
            return
        }
        const zoomOff = Math.abs(zoom.value - 1) > ZOOM_EPSILON
        const scrollOff = Math.abs(scrollX - lock.scrollX) > SCROLL_EPSILON || Math.abs(scrollY - lock.scrollY) > SCROLL_EPSILON
        if (!zoomOff && !scrollOff) {
            return
        }
        api.updateScene({
            appState: {
                zoom: zoomOne(),
                scrollX: lock.scrollX,
                scrollY: lock.scrollY
            },
            captureUpdate: CaptureUpdateAction.NEVER
        })
    }, [])

    const onChange = useCallback((elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
        if (appState.newElement || appState.resizingElement || appState.multiElement || appState.selectedElementsAreBeingDragged) {
            return
        }
        const next = persistedScene(elements, files)
        if (restoringRef.current) {
            if (!overCap(next.scene)) {
                restoringRef.current = false
            }
            return
        }
        if (acceptBaseline.current) {
            if (!overCap(next.scene)) {
                lastAcceptedRef.current = next
            }
            return
        }
        if (overCap(next.scene)) {
            rejectCap()
            return
        }
        if (next.scene === lastAcceptedRef.current.scene) {
            return
        }
        lastAcceptedRef.current = next
        if (!isEditingRef.current) {
            return
        }
        updatesRef.current.updateNotesScene(pageIDRef.current, next.scene)
    }, [rejectCap])

    const onPaste = useCallback((data: ClipboardData) => {
        if (!data.elements && !data.files) {
            return true
        }
        const base = lastAcceptedRef.current
        const live = base.elements.filter(element => !element.isDeleted)
        const merged = persistedScene(
            [...live, ...(data.elements ?? [])],
            { ...base.files, ...(data.files ?? {}) }
        )
        if (overCap(merged.scene)) {
            toastCap()
            return false
        }
        return true
    }, [toastCap])

    const onDuplicate = useCallback((nextElements: readonly ExcalidrawElement[], prevElements: readonly ExcalidrawElement[]) => {
        const next = persistedScene(nextElements, lastAcceptedRef.current.files)
        if (overCap(next.scene)) {
            toastCap()
            return [...prevElements]
        }
    }, [toastCap])

    return (
        <div
            className="page card page-type-four"
            data-notes-epoch={notesEpoch}
            ref={cardRef}
        >
            <div className="notes-editor">
                <Excalidraw
                    excalidrawAPI={onApi}
                    initialData={initialData}
                    theme="light"
                    aiEnabled={false}
                    viewModeEnabled={!isEditing}
                    UIOptions={NOTES_UI_OPTIONS}
                    onChange={onChange}
                    onScrollChange={onScrollChange}
                    onPaste={onPaste}
                    onDuplicate={onDuplicate}
                />
            </div>
        </div>
    )
}
