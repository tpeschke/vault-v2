import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    SAFEHOUSE_SECTION_CAPS,
    SAFEHOUSE_SHEET_CAP_MESSAGE,
    SAFEHOUSE_SHEET_MAX,
    Safehouse,
    SafehouseFieldAttribute,
    SafehouseFunctionRow,
    SafehouseHomeInfo,
    SafehouseNumber,
    SafehousePage,
    SafehousePage1,
    SafehousePage2,
    SafehouseSection,
    emptyPage1,
    emptyPage2
} from '@vault/common/interfaces/safehouse/safehouse'
import { safehouseApiURL } from '../../frontend-config'
import { cacheSafehouse, SafehouseCacheMap } from '../../redux/slices/characterCacheSlice'
import { updateSafehouseCatalogInfo, updateSafehouseCatalogName } from '../../redux/slices/usersCharactersSlice'
import makeTempID from '../../utilities/makeTempId'

export interface SafehouseUpdates {
    setHeader: (pageID: number, field: 'name' | 'location' | 'cRankLimit', value: string | SafehouseNumber) => void,
    commitFunction: (pageID: number, section: SafehouseSection, index: number, next: SafehouseFunctionRow) => void,
    insertFunction: (pageID: number, section: SafehouseSection, row: SafehouseFunctionRow) => void,
    blurFunctionCell: (pageID: number, section: SafehouseSection, row: SafehouseFunctionRow, field: 'name' | 'rank' | 'space' | 'notes') => void,
    toggleFunctionR: (pageID: number, section: SafehouseSection, index: number, row: SafehouseFunctionRow) => void,
    setFooter: (pageID: number, field: 'wealth' | 'spaceLimit' | 'wear', value: SafehouseNumber) => void,
    blurFooter: (pageID: number, field: 'wealth' | 'spaceLimit' | 'wear', value: SafehouseNumber) => void,
    setDamage: (pageID: number, field: 'npcs' | 'resources', value: string) => void,
    blurDamage: (pageID: number, field: 'npcs' | 'resources', value: string) => void,
    addPageAfter: (index: number) => void,
    addDamageHealingAfter: (index: number) => void,
    removePageAt: (index: number) => void,
    swapWithNext: (index: number) => void,
    moveToTop: (index: number) => void,
    moveToBottom: (index: number) => void
}

function firstType1(safehouse: Safehouse): SafehousePage1 | undefined {
    return safehouse.pages.find((page): page is SafehousePage1 => page.type === 1)
}

function catalogName(name: string): string {
    return name.trim() ? name : 'New Safehouse'
}

function catalogFrom(safehouse: Safehouse): SafehouseHomeInfo {
    const type1 = safehouse.pages.filter((page): page is SafehousePage1 => page.type === 1)
    const first = type1[0]
    return {
        id: safehouse.id,
        name: first && first.name.trim() ? first.name : 'New Safehouse',
        otherPageType1Names: type1.slice(1).map(page => page.name)
    }
}

function rowIsEmpty(row: { name: string, rank: SafehouseNumber, r: boolean, space: SafehouseNumber, notes: string }) {
    return row.name === '' && row.rank === '' && row.space === '' && row.notes === '' && !row.r
}

function mapPage2(safehouse: Safehouse, pageID: number, mapper: (page: SafehousePage2) => SafehousePage2): Safehouse {
    return {
        ...safehouse,
        pages: safehouse.pages.map(page => page.type === 2 && page.pageID === pageID ? mapper(page) : page)
    }
}

function mapPage(safehouse: Safehouse, pageID: number, mapper: (page: SafehousePage1) => SafehousePage1): Safehouse {
    return {
        ...safehouse,
        pages: safehouse.pages.map(page => page.type === 1 && page.pageID === pageID ? mapper(page) : page)
    }
}

function findPage(safehouse: Safehouse | null, pageID: number): SafehousePage1 | undefined {
    return safehouse?.pages.find((page): page is SafehousePage1 => page.type === 1 && page.pageID === pageID)
}

function blankSafehouse(): Safehouse {
    return {
        id: 0,
        name: 'New Safehouse',
        ownsThisSafehouse: false,
        pages: [emptyPage1(0), emptyPage2(-1)]
    }
}

function failureMessage(error: unknown): string {
    if (axios.isAxiosError(error) && typeof error.response?.data?.message === 'string') {
        return error.response.data.message
    }
    return 'Save failed'
}

export default function safehouseHook(pathname: string, isEditing: boolean, blank: boolean) {
    const [safehouse, setSafehouse] = useState<Safehouse | null>(null)
    const [snapshot, setSnapshot] = useState<Safehouse | null>(null)
    const [saving, setSaving] = useState(false)
    const [inFlight, setInFlight] = useState(0)
    const safehouseRef = useRef<Safehouse | null>(null)
    const snapshotRef = useRef<Safehouse | null>(null)
    const tempPageID = useRef(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cache: SafehouseCacheMap = useSelector((state: { charactersCache: { characterCache: { safehouse: SafehouseCacheMap } } }) => state.charactersCache.characterCache.safehouse)

    function capture(data: Safehouse) {
        const next = structuredClone(data)
        const snap = structuredClone(data)
        safehouseRef.current = next
        snapshotRef.current = snap
        setSafehouse(next)
        setSnapshot(snap)
    }

    useEffect(() => {
        if (blank) {
            capture(blankSafehouse())
            return
        }
        const safehouseID = Number(pathname.split('/')[2])
        if (!Number.isFinite(safehouseID)) {
            navigate('/')
            return
        }
        const apply = (data: Safehouse & { message?: string }) => {
            if (!data || data.message || !data.pages) {
                navigate('/')
                return
            }
            capture(data)
        }
        const cached = cache[safehouseID]
        if (cached) {
            cached.safehouseInfo.then(data => apply(data as Safehouse & { message?: string })).catch(() => navigate('/'))
            return
        }
        const request = axios.get(safehouseApiURL + '/' + safehouseID).then(({ data }) => {
            apply(data)
            return data as Safehouse
        })
        request.catch(() => navigate('/'))
        dispatch(cacheSafehouse({ id: safehouseID, safehouseInfo: request }))
    }, [pathname, blank])

    function remember(next: Safehouse) {
        safehouseRef.current = next
        setSafehouse(next)
        if (!isEditing) {
            const snap = structuredClone(next)
            snapshotRef.current = snap
            setSnapshot(snap)
        }
    }

    function write(recipe: (current: Safehouse) => Safehouse): Safehouse | null {
        const current = safehouseRef.current
        if (!current) {
            return null
        }
        const next = recipe(current)
        remember(next)
        return next
    }

    function canPersist(pageID: number): boolean {
        const current = safehouseRef.current
        return !blank && !isEditing && !!current?.ownsThisSafehouse && pageID > 0 && !!current
    }

    function cacheLive() {
        const current = safehouseRef.current
        if (!current || !(current.id > 0)) {
            return
        }
        dispatch(cacheSafehouse({
            id: current.id,
            safehouseInfo: Promise.resolve(structuredClone(current))
        }))
    }

    async function postField(pageID: number, attribute: SafehouseFieldAttribute, value: unknown): Promise<{ success?: boolean, id?: number, message?: string } | null> {
        const current = safehouseRef.current
        if (!current || !canPersist(pageID)) {
            return null
        }
        setInFlight(count => count + 1)
        try {
            const { data } = await axios.post(safehouseApiURL + '/' + current.id + '/field', { pageID, attribute, value })
            if (!data?.success) {
                toast.error(typeof data?.message === 'string' ? data.message : 'Save failed')
                return data
            }
            cacheLive()
            return data
        } catch (error) {
            toast.error(failureMessage(error))
            return null
        } finally {
            setInFlight(count => count - 1)
        }
    }

    function syncFirstName(next: Safehouse, pageID: number) {
        const first = firstType1(next)
        if (first && first.pageID === pageID) {
            dispatch(updateSafehouseCatalogName({ id: next.id, name: catalogName(first.name) }))
        }
    }

    function syncIfFirstChanged(before: Safehouse, next: Safehouse) {
        const previous = firstType1(before)
        const after = firstType1(next)
        if (previous && after && previous.pageID !== after.pageID) {
            dispatch(updateSafehouseCatalogName({ id: next.id, name: catalogName(after.name) }))
        }
    }

    function setHeader(pageID: number, field: 'name' | 'location' | 'cRankLimit', value: string | SafehouseNumber) {
        const before = safehouseRef.current
        const next = write(current => mapPage(current, pageID, page => ({ ...page, [field]: value })))
        if (isEditing && field === 'name' && next && before) {
            syncFirstName(next, pageID)
        }
    }

    function commitFunction(pageID: number, section: SafehouseSection, index: number, nextRow: SafehouseFunctionRow) {
        const page = findPage(safehouseRef.current, pageID)
        const existing = page?.functions[section][index]
        if (!existing) {
            return
        }
        write(current => mapPage(current, pageID, candidate => {
            const rows = candidate.functions[section].slice()
            if (rowIsEmpty(nextRow)) {
                rows.splice(index, 1)
            } else {
                rows[index] = nextRow
            }
            return {
                ...candidate,
                functions: { ...candidate.functions, [section]: rows }
            }
        }))
        if (rowIsEmpty(nextRow) && existing.id > 0) {
            void postField(pageID, 'safehouseFunctionDelete', { id: existing.id })
        }
    }

    function blurFunctionCell(pageID: number, section: SafehouseSection, row: SafehouseFunctionRow, field: 'name' | 'rank' | 'space' | 'notes') {
        const livePage = findPage(safehouseRef.current, pageID)
        const live = livePage?.functions[section].find(candidate => candidate.id > 0 && candidate.id === row.id)
        if (!live) {
            return
        }
        const attribute: SafehouseFieldAttribute = field === 'name'
            ? 'safehouseFunctionName'
            : field === 'rank'
                ? 'safehouseFunctionRank'
                : field === 'space'
                    ? 'safehouseFunctionSpace'
                    : 'safehouseFunctionNotes'
        const value = field === 'name'
            ? { id: live.id, name: live.name }
            : field === 'rank'
                ? { id: live.id, rank: live.rank }
                : field === 'space'
                    ? { id: live.id, space: live.space }
                    : { id: live.id, notes: live.notes }
        void postField(pageID, attribute, value)
    }

    function toggleFunctionR(pageID: number, section: SafehouseSection, index: number, row: SafehouseFunctionRow) {
        const nextRow = { ...row, r: !row.r }
        commitFunction(pageID, section, index, nextRow)
        if (!rowIsEmpty(nextRow) && row.id > 0) {
            void postField(pageID, 'safehouseFunctionR', { id: row.id, r: nextRow.r })
        }
    }

    function insertFunction(pageID: number, section: SafehouseSection, row: SafehouseFunctionRow) {
        const page = findPage(safehouseRef.current, pageID)
        if (!page || page.functions[section].length >= SAFEHOUSE_SECTION_CAPS[section] || rowIsEmpty(row)) {
            return
        }
        const key = row.key ?? makeTempID()
        const nextRow = { ...row, id: 0, key }
        write(current => mapPage(current, pageID, candidate => ({
            ...candidate,
            functions: {
                ...candidate.functions,
                [section]: [...candidate.functions[section], nextRow]
            }
        })))
        if (!canPersist(pageID)) {
            return
        }
        void postField(pageID, 'safehouseFunctionInsert', {
            section,
            name: nextRow.name,
            rank: nextRow.rank,
            r: nextRow.r,
            space: nextRow.space,
            notes: nextRow.notes
        }).then(data => {
            const dropUnsaved = (source: Safehouse) => mapPage(source, pageID, candidate => ({
                ...candidate,
                functions: {
                    ...candidate.functions,
                    [section]: candidate.functions[section].filter(item => item.key !== key || item.id > 0)
                }
            }))
            const stamp = (source: Safehouse, id: number) => mapPage(source, pageID, candidate => ({
                ...candidate,
                functions: {
                    ...candidate.functions,
                    [section]: candidate.functions[section].map(item => item.key === key ? { ...item, id } : item)
                }
            }))
            if (!data?.success || typeof data.id !== 'number' || !(data.id > 0)) {
                if (safehouseRef.current) {
                    const next = dropUnsaved(safehouseRef.current)
                    safehouseRef.current = next
                    setSafehouse(next)
                }
                if (snapshotRef.current) {
                    const next = dropUnsaved(snapshotRef.current)
                    snapshotRef.current = next
                    setSnapshot(next)
                }
                return
            }
            const id = data.id
            const stillThere = findPage(safehouseRef.current, pageID)?.functions[section].some(candidate => candidate.key === key)
            if (!stillThere) {
                void postField(pageID, 'safehouseFunctionDelete', { id })
                return
            }
            if (safehouseRef.current) {
                const next = stamp(safehouseRef.current, id)
                safehouseRef.current = next
                setSafehouse(next)
            }
            if (snapshotRef.current) {
                const next = stamp(snapshotRef.current, id)
                snapshotRef.current = next
                setSnapshot(next)
            }
            cacheLive()
        })
    }

    function setFooter(pageID: number, field: 'wealth' | 'spaceLimit' | 'wear', value: SafehouseNumber) {
        write(current => mapPage(current, pageID, page => ({ ...page, [field]: value })))
    }

    function blurFooter(pageID: number, field: 'wealth' | 'spaceLimit' | 'wear', value: SafehouseNumber) {
        const attribute: SafehouseFieldAttribute = field === 'wealth'
            ? 'safehouseWealth'
            : field === 'spaceLimit'
                ? 'safehouseSpaceLimit'
                : 'safehouseWear'
        void postField(pageID, attribute, value)
    }

    function replacePages(before: Safehouse, pages: SafehousePage[], syncCatalog: boolean) {
        const next = { ...before, pages }
        remember(next)
        if (syncCatalog) {
            syncIfFirstChanged(before, next)
        }
    }

    function setDamage(pageID: number, field: 'npcs' | 'resources', value: string) {
        write(current => mapPage2(current, pageID, page => ({ ...page, [field]: value })))
    }

    function blurDamage(pageID: number, field: 'npcs' | 'resources', value: string) {
        const attribute: SafehouseFieldAttribute = field === 'npcs' ? 'safehouseNpcs' : 'safehouseResources'
        void postField(pageID, attribute, value)
    }

    function addPageAfter(index: number) {
        const current = safehouseRef.current
        if (!current) {
            return
        }
        if (current.pages.length >= SAFEHOUSE_SHEET_MAX) {
            toast.error(SAFEHOUSE_SHEET_CAP_MESSAGE)
            return
        }
        tempPageID.current -= 1
        const page = emptyPage1(tempPageID.current, makeTempID())
        const pages = current.pages.slice()
        pages.splice(index + 1, 0, page)
        replacePages(current, pages, true)
    }

    function addDamageHealingAfter(index: number) {
        const current = safehouseRef.current
        if (!current) {
            return
        }
        if (current.pages.length >= SAFEHOUSE_SHEET_MAX) {
            toast.error(SAFEHOUSE_SHEET_CAP_MESSAGE)
            return
        }
        tempPageID.current -= 1
        const page = emptyPage2(tempPageID.current, makeTempID())
        const pages = current.pages.slice()
        pages.splice(index + 1, 0, page)
        replacePages(current, pages, true)
    }

    function removePageAt(index: number) {
        const current = safehouseRef.current
        if (!current) {
            return
        }
        const page = current.pages[index]
        const firstIndex = current.pages.findIndex(candidate => candidate.type === 1)
        if (!page || (page.type === 1 && index === firstIndex)) {
            return
        }
        if (page.type === 2 || page.type === 1) {
            replacePages(current, current.pages.filter((_, pageIndex) => pageIndex !== index), false)
        }
    }

    function swapWithNext(index: number) {
        const current = safehouseRef.current
        if (!current || index >= current.pages.length - 1) {
            return
        }
        const pages = current.pages.slice()
        const swap = pages[index + 1]
        pages[index + 1] = pages[index]
        pages[index] = swap
        replacePages(current, pages, true)
    }

    function moveToTop(index: number) {
        const current = safehouseRef.current
        if (!current || index <= 0) {
            return
        }
        const pages = current.pages.slice()
        const [page] = pages.splice(index, 1)
        pages.unshift(page)
        replacePages(current, pages, true)
    }

    function moveToBottom(index: number) {
        const current = safehouseRef.current
        if (!current || index >= current.pages.length - 1) {
            return
        }
        const pages = current.pages.slice()
        const [page] = pages.splice(index, 1)
        pages.push(page)
        replacePages(current, pages, true)
    }

    async function save(): Promise<boolean> {
        const current = safehouseRef.current
        if (blank || !current) {
            return false
        }
        const first = firstType1(current)
        if (!first || first.name.trim() === '') {
            toast.error('Name cannot be empty')
            return false
        }
        const draft = current
        setSaving(true)
        try {
            const { data } = await axios.post(safehouseApiURL + '/' + draft.id, draft)
            if (data?.message && !data.pages) {
                toast.error(data.message)
                return false
            }
            capture(data)
            dispatch(cacheSafehouse({ id: data.id, safehouseInfo: Promise.resolve(structuredClone(data)) }))
            dispatch(updateSafehouseCatalogInfo({ info: catalogFrom(data) }))
            return true
        } catch (error) {
            toast.error(failureMessage(error))
            return false
        } finally {
            setSaving(false)
        }
    }

    function revert() {
        const snap = snapshotRef.current
        if (!snap) {
            return
        }
        const next = structuredClone(snap)
        safehouseRef.current = next
        setSafehouse(next)
        const first = firstType1(next)
        if (first) {
            dispatch(updateSafehouseCatalogName({ id: next.id, name: catalogName(first.name) }))
        }
    }

    function restoreCatalogFromSnapshot() {
        const snap = snapshotRef.current
        if (!snap) {
            return
        }
        const first = firstType1(snap)
        if (!first) {
            return
        }
        dispatch(updateSafehouseCatalogName({ id: snap.id, name: catalogName(first.name) }))
    }

    const updates: SafehouseUpdates = {
        setHeader,
        commitFunction,
        insertFunction,
        blurFunctionCell,
        toggleFunctionR,
        setFooter,
        blurFooter,
        setDamage,
        blurDamage,
        addPageAfter,
        addDamageHealingAfter,
        removePageAt,
        swapWithNext,
        moveToTop,
        moveToBottom
    }

    return {
        safehouse,
        isDirty: !!(safehouse && snapshot && JSON.stringify(safehouse) !== JSON.stringify(snapshot)),
        isViewSaving: saving || inFlight > 0,
        save,
        revert,
        restoreCatalogFromSnapshot,
        updates
    }
}
