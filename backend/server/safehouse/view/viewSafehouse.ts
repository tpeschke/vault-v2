import {
    Safehouse,
    SafehouseFunctions,
    SafehouseNumber,
    SafehousePage,
    SafehousePage1,
    SafehousePage2,
    SafehouseSection,
    emptyFunctions,
    isSection
} from '@vault/common/interfaces/safehouse/safehouse'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'

export interface SafehouseRequest extends Request {
    params: {
        safehouseID: string
    }
}

function numberOrBlank(value: unknown): SafehouseNumber {
    if (value === null || value === undefined || value === '') {
        return ''
    }
    const numeric = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(numeric) ? numeric : ''
}

function storedName(value: unknown): string {
    return typeof value === 'string' && value.trim() ? value : 'New Safehouse'
}

async function assemblePage1(pageID: number): Promise<SafehousePage1> {
    const headerRows = await query(
        `select name, location, cRankLimit as cranklimit, wealth, spaceLimit as spacelimit, wear
        from safehousePage1 where pageID = $1`,
        pageID
    )
    const header = headerRows[0] ?? {}
    const functionRows = await query(
        `select id, section, name, rank, r, space, notes
        from safehousePage1Functions
        where pageID = $1
        order by index`,
        pageID
    )
    const functions: SafehouseFunctions = emptyFunctions()
    for (const row of functionRows) {
        if (!isSection(row.section)) {
            continue
        }
        const section: SafehouseSection = row.section
        functions[section].push({
            id: Number(row.id),
            name: typeof row.name === 'string' ? row.name : '',
            rank: numberOrBlank(row.rank),
            r: row.r === true,
            space: numberOrBlank(row.space),
            notes: typeof row.notes === 'string' ? row.notes : ''
        })
    }
    return {
        type: 1,
        pageID,
        name: typeof header.name === 'string' ? header.name : 'New Safehouse',
        location: typeof header.location === 'string' ? header.location : '',
        cRankLimit: numberOrBlank(header.cranklimit),
        wealth: numberOrBlank(header.wealth),
        spaceLimit: numberOrBlank(header.spacelimit),
        wear: numberOrBlank(header.wear),
        functions
    }
}

async function assemblePage2(pageID: number): Promise<SafehousePage2> {
    const rows = await query(
        `select npcs, resources from safehousePage2 where pageID = $1`,
        pageID
    )
    const row = rows[0] ?? {}
    return {
        type: 2,
        pageID,
        npcs: typeof row.npcs === 'string' ? row.npcs : '',
        resources: typeof row.resources === 'string' ? row.resources : ''
    }
}

export async function assembleSafehouse(safehouseID: number, userID: number | undefined): Promise<Safehouse | { message: string }> {
    const pageRows = await query(
        `select id, pageTypeID as pagetypeid from safehousePages where safehouseID = $1 order by index`,
        safehouseID
    )
    if (pageRows.length === 0) {
        return { message: 'No Pages' }
    }

    const ownerRows = await query(`select userID as userid from safehouses where id = $1`, safehouseID)
    const pages: SafehousePage[] = []
    for (const row of pageRows) {
        const pageID = Number(row.id)
        if (Number(row.pagetypeid) === 1) {
            pages.push(await assemblePage1(pageID))
        } else if (Number(row.pagetypeid) === 2) {
            pages.push(await assemblePage2(pageID))
        } else {
            pages.push({ type: 404, pageID })
        }
    }
    const first = pages.find((page): page is SafehousePage1 => page.type === 1)
    return {
        id: safehouseID,
        name: storedName(first?.name),
        ownsThisSafehouse: !!userID && Number(ownerRows[0]?.userid) === userID,
        pages
    }
}

export async function viewSafehouse(request: SafehouseRequest, response: Response) {
    const safehouseID = +request.params.safehouseID
    if (isNaN(safehouseID)) {
        checkForContentTypeBeforeSending(response, { message: 'Bad ID' })
        return
    }
    const body = await assembleSafehouse(safehouseID, request.user?.id)
    checkForContentTypeBeforeSending(response, body)
}
