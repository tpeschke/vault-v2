import {
    SAFEHOUSE_FUNCTION_TEXT_MAX,
    SAFEHOUSE_HEADER_TEXT_MAX,
    SAFEHOUSE_SECTIONS,
    SAFEHOUSE_SHEET_CAP_MESSAGE,
    SAFEHOUSE_SHEET_MAX,
    SafehouseFunctions,
    SafehouseNumber,
    SafehouseSection,
    emptyFunctions,
    isSafehouseNumber
} from '@vault/common/interfaces/safehouse/safehouse'
import { TEXTAREA_DEFAULT_MAX, textareaCharCount } from '@vault/common/textareaLimits'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response } from '../../interfaces/apiInterfaces'
import { SafehouseRequest, viewSafehouse } from '../view/viewSafehouse'

interface EditRequest extends SafehouseRequest {
    body: {
        pages?: unknown
    }
}

interface PostedFunction {
    name: string,
    rank: SafehouseNumber,
    r: boolean,
    space: SafehouseNumber,
    notes: string
}

interface PostedPage2 {
    pageID: number,
    npcs: string,
    resources: string
}

interface PostedPage1 {
    pageID: number,
    name: string,
    location: string,
    cRankLimit: SafehouseNumber,
    wealth: SafehouseNumber,
    spaceLimit: SafehouseNumber,
    wear: SafehouseNumber,
    functions: Record<SafehouseSection, PostedFunction[]>
}

function sqlNumber(value: SafehouseNumber): number | null {
    return value === '' ? null : Math.trunc(value)
}

function storedHeaderName(name: string): string {
    return name.trim() ? name : 'New Safehouse'
}

function readFunctions(value: unknown): Record<SafehouseSection, PostedFunction[]> | null {
    if (!value || typeof value !== 'object') {
        return null
    }
    const source = value as Record<string, unknown>
    const functions = emptyFunctions() as Record<SafehouseSection, PostedFunction[]>
    for (const section of SAFEHOUSE_SECTIONS) {
        const rows = source[section]
        if (rows === undefined) {
            continue
        }
        if (!Array.isArray(rows)) {
            return null
        }
        for (const row of rows) {
            if (!row || typeof row !== 'object') {
                return null
            }
            const candidate = row as Record<string, unknown>
            if (typeof candidate.name !== 'string' || typeof candidate.notes !== 'string') {
                return null
            }
            if (candidate.name.length > SAFEHOUSE_FUNCTION_TEXT_MAX || candidate.notes.length > SAFEHOUSE_FUNCTION_TEXT_MAX) {
                return null
            }
            if (!isSafehouseNumber(candidate.rank) || !isSafehouseNumber(candidate.space) || typeof candidate.r !== 'boolean') {
                return null
            }
            functions[section].push({
                name: candidate.name,
                rank: candidate.rank,
                r: candidate.r,
                space: candidate.space,
                notes: candidate.notes
            })
        }
    }
    return functions
}

function readPage1(value: unknown): PostedPage1 | null {
    if (!value || typeof value !== 'object') {
        return null
    }
    const page = value as Record<string, unknown>
    if (page.type !== 1 || typeof page.pageID !== 'number' || !Number.isFinite(page.pageID)) {
        return null
    }
    if (typeof page.name !== 'string' || typeof page.location !== 'string') {
        return null
    }
    if (page.name.length > SAFEHOUSE_HEADER_TEXT_MAX || page.location.length > SAFEHOUSE_HEADER_TEXT_MAX) {
        return null
    }
    if (!isSafehouseNumber(page.cRankLimit) || !isSafehouseNumber(page.wealth) || !isSafehouseNumber(page.spaceLimit) || !isSafehouseNumber(page.wear)) {
        return null
    }
    const functions = readFunctions(page.functions)
    if (!functions) {
        return null
    }
    return {
        pageID: page.pageID,
        name: storedHeaderName(page.name),
        location: page.location,
        cRankLimit: page.cRankLimit,
        wealth: page.wealth,
        spaceLimit: page.spaceLimit,
        wear: page.wear,
        functions
    }
}

function readPage2(value: unknown): PostedPage2 | null {
    if (!value || typeof value !== 'object') {
        return null
    }
    const page = value as Record<string, unknown>
    if (page.type !== 2 || typeof page.pageID !== 'number' || !Number.isFinite(page.pageID)) {
        return null
    }
    if (typeof page.npcs !== 'string' || typeof page.resources !== 'string') {
        return null
    }
    return {
        pageID: page.pageID,
        npcs: page.npcs,
        resources: page.resources
    }
}

function textTooLong(pages: unknown[]): boolean {
    return pages.some(page => {
        if (!page || typeof page !== 'object') {
            return false
        }
        const kind = (page as { type?: unknown }).type
        if (kind === 2) {
            const candidate = page as Record<string, unknown>
            return (typeof candidate.npcs === 'string' && textareaCharCount(candidate.npcs) > TEXTAREA_DEFAULT_MAX)
                || (typeof candidate.resources === 'string' && textareaCharCount(candidate.resources) > TEXTAREA_DEFAULT_MAX)
        }
        if (kind !== 1) {
            return false
        }
        const candidate = page as Record<string, unknown>
        if (typeof candidate.name === 'string' && candidate.name.length > SAFEHOUSE_HEADER_TEXT_MAX) {
            return true
        }
        if (typeof candidate.location === 'string' && candidate.location.length > SAFEHOUSE_HEADER_TEXT_MAX) {
            return true
        }
        const functions = candidate.functions
        if (!functions || typeof functions !== 'object') {
            return false
        }
        for (const section of SAFEHOUSE_SECTIONS) {
            const rows = (functions as Record<string, unknown>)[section]
            if (!Array.isArray(rows)) {
                continue
            }
            for (const row of rows) {
                if (!row || typeof row !== 'object') {
                    continue
                }
                const cell = row as Record<string, unknown>
                if (typeof cell.name === 'string' && cell.name.length > SAFEHOUSE_FUNCTION_TEXT_MAX) {
                    return true
                }
                if (typeof cell.notes === 'string' && cell.notes.length > SAFEHOUSE_FUNCTION_TEXT_MAX) {
                    return true
                }
            }
        }
        return false
    })
}

async function writeHeader(pageID: number, page: PostedPage1): Promise<boolean> {
    const rows = await query(
        `insert into safehousePage1 (pageID, name, location, cRankLimit, wealth, spaceLimit, wear)
        values ($1, $2, $3, $4, $5, $6, $7)
        on conflict (pageID) do update set
            name = excluded.name,
            location = excluded.location,
            cRankLimit = excluded.cRankLimit,
            wealth = excluded.wealth,
            spaceLimit = excluded.spaceLimit,
            wear = excluded.wear
        returning pageID`,
        [
            pageID,
            page.name,
            page.location,
            sqlNumber(page.cRankLimit),
            sqlNumber(page.wealth),
            sqlNumber(page.spaceLimit),
            sqlNumber(page.wear)
        ]
    )
    return Number(rows[0]?.pageid) > 0
}

async function replaceFunctions(pageID: number, functions: SafehouseFunctions | PostedPage1['functions']): Promise<boolean> {
    await query(`delete from safehousePage1Functions where pageID = $1`, pageID)
    for (const section of SAFEHOUSE_SECTIONS) {
        const rows = functions[section] ?? []
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index]
            const inserted = await query(
                `insert into safehousePage1Functions (pageID, section, name, rank, r, space, notes, index)
                values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
                [pageID, section, row.name, sqlNumber(row.rank), row.r === true, sqlNumber(row.space), row.notes, index]
            )
            if (!(Number(inserted[0]?.id) > 0)) {
                return false
            }
        }
    }
    return true
}

async function updateExisting(safehouseID: number, index: number, page: PostedPage1): Promise<boolean> {
    const updated = await query(
        `update safehousePages set index = $1 where id = $2 and safehouseID = $3 and pageTypeID = 1 returning id`,
        [index, page.pageID, safehouseID]
    )
    if (!(Number(updated[0]?.id) > 0)) {
        return false
    }
    if (!await writeHeader(page.pageID, page)) {
        return false
    }
    return replaceFunctions(page.pageID, page.functions)
}

async function insertPage(safehouseID: number, index: number, page: PostedPage1): Promise<boolean> {
    const inserted = await query(
        `insert into safehousePages (safehouseID, index, pageTypeID) values ($1, $2, $3) returning id`,
        [safehouseID, index, 1]
    )
    const pageID = Number(inserted[0]?.id)
    if (!(pageID > 0)) {
        return false
    }
    if (!await writeHeader(pageID, page)) {
        return false
    }
    return replaceFunctions(pageID, page.functions)
}

async function updateExistingPage2(safehouseID: number, index: number, page: PostedPage2): Promise<boolean> {
    const updated = await query(
        `update safehousePages set index = $1 where id = $2 and safehouseID = $3 and pageTypeID = 2 returning id`,
        [index, page.pageID, safehouseID]
    )
    if (!(Number(updated[0]?.id) > 0)) {
        return false
    }
    const rows = await query(
        `update safehousePage2 set npcs = $1, resources = $2 where pageID = $3 returning pageID`,
        [page.npcs, page.resources, page.pageID]
    )
    return Number(rows[0]?.pageid) > 0
}

async function insertPage2(safehouseID: number, index: number, page: PostedPage2): Promise<boolean> {
    const inserted = await query(
        `insert into safehousePages (safehouseID, index, pageTypeID) values ($1, $2, $3) returning id`,
        [safehouseID, index, 2]
    )
    const pageID = Number(inserted[0]?.id)
    if (!(pageID > 0)) {
        return false
    }
    const rows = await query(
        `insert into safehousePage2 (pageID, npcs, resources) values ($1, $2, $3) returning pageID`,
        [pageID, page.npcs, page.resources]
    )
    return Number(rows[0]?.pageid) > 0
}

async function keepUnknown(safehouseID: number, index: number, pageID: number) {
    await query(
        `update safehousePages set index = $1 where id = $2 and safehouseID = $3 and pageTypeID <> 1`,
        [index, pageID, safehouseID]
    )
}

export async function editSafehouse(request: EditRequest, response: Response) {
    const safehouseID = +request.params.safehouseID
    if (isNaN(safehouseID)) {
        checkForContentTypeBeforeSending(response, { message: 'Bad ID' })
        return
    }

    const ownerRows = await query(`select userID as userid from safehouses where id = $1`, safehouseID)
    if (!(request.user?.id && Number(ownerRows[0]?.userid) === request.user.id)) {
        checkForContentTypeBeforeSending(response, { message: "You Don't Own This Safehouse" })
        return
    }

    const pages = Array.isArray(request.body?.pages) ? request.body.pages : []
    if (pages.length > SAFEHOUSE_SHEET_MAX) {
        checkForContentTypeBeforeSending(response, { message: SAFEHOUSE_SHEET_CAP_MESSAGE })
        return
    }
    if (!pages.some(page => !!page && typeof page === 'object' && (page as { type?: unknown }).type === 1)) {
        checkForContentTypeBeforeSending(response, { message: "Pages weren't able to be removed" })
        return
    }
    if (textTooLong(pages)) {
        checkForContentTypeBeforeSending(response, { message: 'Text is too long' })
        return
    }

    const existingRows = await query(
        `select id from safehousePages where safehouseID = $1 and pageTypeID = 1`,
        safehouseID
    )
    const existingIDs = existingRows.map((row: { id: number | string }) => Number(row.id))
    const existingDamageRows = await query(
        `select id from safehousePages where safehouseID = $1 and pageTypeID = 2`,
        safehouseID
    )
    const existingDamageIDs = existingDamageRows.map((row: { id: number | string }) => Number(row.id))
    const kept = new Set<number>()
    const keptDamage = new Set<number>()
    let postedType1 = 0
    let postedType2 = 0
    for (let index = 0; index < pages.length; index++) {
        const page = pages[index] as { type?: unknown, pageID?: unknown }
        if (page?.type === 404 && typeof page.pageID === 'number') {
            await keepUnknown(safehouseID, index, page.pageID)
            continue
        }
        if (page?.type === 2) {
            const parsed = readPage2(page)
            if (!parsed) {
                checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
                return
            }
            postedType2 += 1
            const wrote = parsed.pageID > 0
                ? await updateExistingPage2(safehouseID, index, parsed)
                : await insertPage2(safehouseID, index, parsed)
            if (!wrote) {
                checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
                return
            }
            if (parsed.pageID > 0) {
                keptDamage.add(parsed.pageID)
            }
            continue
        }
        if (page?.type !== 1) {
            continue
        }
        const parsed = readPage1(page)
        if (!parsed) {
            checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
            return
        }
        postedType1 += 1
        const wrote = parsed.pageID > 0
            ? await updateExisting(safehouseID, index, parsed)
            : await insertPage(safehouseID, index, parsed)
        if (!wrote) {
            checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
            return
        }
        if (parsed.pageID > 0) {
            kept.add(parsed.pageID)
        }
    }

    const omitted = existingIDs.filter((id: number) => !kept.has(id))
    for (const pageID of omitted) {
        await query(`delete from safehousePage1Functions where pageID = $1`, pageID)
        await query(`delete from safehousePage1 where pageID = $1`, pageID)
        await query(`delete from safehousePages where id = $1 and safehouseID = $2 and pageTypeID = 1`, [pageID, safehouseID])
    }
    if (omitted.length > 0) {
        const remaining = await query(
            `select id from safehousePages where safehouseID = $1 and pageTypeID = 1`,
            safehouseID
        )
        const remainingIDs = remaining.map((row: { id: number | string }) => Number(row.id))
        if (omitted.some((id: number) => remainingIDs.includes(id))) {
            checkForContentTypeBeforeSending(response, { message: "Pages weren't able to be removed" })
            return
        }
    }

    const omittedDamage = existingDamageIDs.filter((id: number) => !keptDamage.has(id))
    for (const pageID of omittedDamage) {
        await query(`delete from safehousePage2 where pageID = $1`, pageID)
        await query(`delete from safehousePages where id = $1 and safehouseID = $2 and pageTypeID = 2`, [pageID, safehouseID])
    }
    if (omittedDamage.length > 0) {
        const remainingDamage = await query(
            `select id from safehousePages where safehouseID = $1 and pageTypeID = 2`,
            safehouseID
        )
        const remainingDamageIDs = remainingDamage.map((row: { id: number | string }) => Number(row.id))
        if (omittedDamage.some((id: number) => remainingDamageIDs.includes(id))) {
            checkForContentTypeBeforeSending(response, { message: "Pages weren't able to be removed" })
            return
        }
    }

    const storedType1 = await query(
        `select id from safehousePages where safehouseID = $1 and pageTypeID = 1`,
        safehouseID
    )
    if (storedType1.length < postedType1) {
        checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
        return
    }
    const storedType2 = await query(
        `select id from safehousePages where safehouseID = $1 and pageTypeID = 2`,
        safehouseID
    )
    if (storedType2.length < postedType2) {
        checkForContentTypeBeforeSending(response, { message: 'Could not save all sheets' })
        return
    }

    await viewSafehouse(request, response)
}
