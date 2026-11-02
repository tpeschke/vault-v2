import {
    SAFEHOUSE_FUNCTION_TEXT_MAX,
    SafehouseFieldAttribute,
    SafehouseFunctionInsertValue,
    SafehouseNumber,
    isSafehouseNumber,
    isSection
} from '@vault/common/interfaces/safehouse/safehouse'
import { TEXTAREA_DEFAULT_MAX, textareaCharCount } from '@vault/common/textareaLimits'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response } from '../../interfaces/apiInterfaces'
import { SafehouseRequest } from '../view/viewSafehouse'

const attributes: SafehouseFieldAttribute[] = [
    'safehouseFunctionName',
    'safehouseFunctionRank',
    'safehouseFunctionR',
    'safehouseFunctionSpace',
    'safehouseFunctionNotes',
    'safehouseFunctionInsert',
    'safehouseFunctionDelete',
    'safehouseWealth',
    'safehouseSpaceLimit',
    'safehouseWear',
    'safehouseNpcs',
    'safehouseResources'
]

interface FieldRequest extends SafehouseRequest {
    body: {
        pageID?: unknown,
        attribute?: unknown,
        value?: unknown
    }
}

function isAttribute(value: unknown): value is SafehouseFieldAttribute {
    return typeof value === 'string' && attributes.includes(value as SafehouseFieldAttribute)
}

function refuse(response: Response, message: string) {
    checkForContentTypeBeforeSending(response, { success: false, message })
}

function sqlNumber(value: SafehouseNumber): number | null {
    return value === '' ? null : Math.trunc(value)
}

async function pageIsOwned(safehouseID: number, pageID: number, userID: number | undefined, pageTypeID: number): Promise<boolean> {
    if (!userID || !(pageID > 0)) {
        return false
    }
    const rows = await query(
        `select s.userID as userid
        from safehouses s
        join safehousePages p on p.safehouseID = s.id
        where s.id = $1 and p.id = $2 and p.pageTypeID = $3`,
        [safehouseID, pageID, pageTypeID]
    )
    return !!userID && Number(rows[0]?.userid) === userID
}

async function functionRowID(safehouseID: number, pageID: number, rowID: number): Promise<boolean> {
    const rows = await query(
        `select f.id
        from safehousePage1Functions f
        join safehousePages p on p.id = f.pageID
        where f.id = $1 and f.pageID = $2 and p.safehouseID = $3`,
        [rowID, pageID, safehouseID]
    )
    return Number(rows[0]?.id) > 0
}

function cellID(value: unknown): number {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return 0
    }
    const id = (value as { id?: unknown }).id
    return typeof id === 'number' && id > 0 ? id : 0
}

function readInsert(value: unknown): SafehouseFunctionInsertValue | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return null
    }
    const row = value as Record<string, unknown>
    if (!isSection(row.section) || typeof row.name !== 'string' || typeof row.notes !== 'string' || typeof row.r !== 'boolean') {
        return null
    }
    if (row.name.length > SAFEHOUSE_FUNCTION_TEXT_MAX || row.notes.length > SAFEHOUSE_FUNCTION_TEXT_MAX) {
        return null
    }
    if (!isSafehouseNumber(row.rank) || !isSafehouseNumber(row.space)) {
        return null
    }
    return {
        section: row.section,
        name: row.name,
        rank: row.rank,
        r: row.r,
        space: row.space,
        notes: row.notes
    }
}

export async function editSafehouseField(request: FieldRequest, response: Response) {
    const safehouseID = +request.params.safehouseID
    if (isNaN(safehouseID)) {
        refuse(response, 'Bad ID')
        return
    }
    const pageID = request.body?.pageID
    const attribute = request.body?.attribute
    const value = request.body?.value
    if (typeof pageID !== 'number' || !(pageID > 0) || !isAttribute(attribute)) {
        refuse(response, isAttribute(attribute) ? 'Invalid field' : 'Unknown attribute')
        return
    }
    if (attribute === 'safehouseNpcs' || attribute === 'safehouseResources') {
        if (!await pageIsOwned(safehouseID, pageID, request.user?.id, 2)) {
            refuse(response, "You Don't Own This Safehouse")
            return
        }
        if (typeof value !== 'string') {
            refuse(response, 'Invalid field')
            return
        }
        if (textareaCharCount(value) > TEXTAREA_DEFAULT_MAX) {
            refuse(response, 'Text is too long')
            return
        }
        const column = attribute === 'safehouseNpcs' ? 'npcs' : 'resources'
        const rows = await query(
            `update safehousePage2 set ${column} = $1 where pageID = $2 returning pageID`,
            [value, pageID]
        )
        if (!(Number(rows[0]?.pageid) > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (!await pageIsOwned(safehouseID, pageID, request.user?.id, 1)) {
        refuse(response, "You Don't Own This Safehouse")
        return
    }

    if (attribute === 'safehouseFunctionInsert') {
        const row = readInsert(value)
        if (!row) {
            refuse(response, typeof (value as { name?: unknown } | null)?.name === 'string'
                && ((value as { name: string }).name.length > SAFEHOUSE_FUNCTION_TEXT_MAX
                    || (typeof (value as { notes?: unknown }).notes === 'string' && (value as { notes: string }).notes.length > SAFEHOUSE_FUNCTION_TEXT_MAX))
                ? 'Text is too long'
                : 'Invalid field')
            return
        }
        const inserted = await query(
            `insert into safehousePage1Functions (pageID, section, name, rank, r, space, notes, index)
            values (
                $1, $2, $3, $4, $5, $6, $7,
                (select coalesce(max(index), -1) + 1 from safehousePage1Functions where pageID = $1 and section = $8)
            ) returning id`,
            [pageID, row.section, row.name, sqlNumber(row.rank), row.r, sqlNumber(row.space), row.notes, row.section]
        )
        const id = Number(inserted[0]?.id)
        if (!(id > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true, id })
        return
    }

    if (attribute === 'safehouseFunctionDelete') {
        const id = cellID(value)
        if (!(id > 0) || !await functionRowID(safehouseID, pageID, id)) {
            refuse(response, 'Invalid field')
            return
        }
        await query(`delete from safehousePage1Functions where id = $1 and pageID = $2`, [id, pageID])
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'safehouseWealth' || attribute === 'safehouseSpaceLimit' || attribute === 'safehouseWear') {
        if (!isSafehouseNumber(value)) {
            refuse(response, 'Invalid field')
            return
        }
        const column = attribute === 'safehouseWealth' ? 'wealth' : attribute === 'safehouseSpaceLimit' ? 'spaceLimit' : 'wear'
        const rows = await query(
            `update safehousePage1 set ${column} = $1 where pageID = $2 returning pageID`,
            [sqlNumber(value), pageID]
        )
        if (!(Number(rows[0]?.pageid) > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    const id = cellID(value)
    if (!(id > 0) || !value || typeof value !== 'object' || !await functionRowID(safehouseID, pageID, id)) {
        refuse(response, 'Invalid field')
        return
    }
    const cell = value as Record<string, unknown>

    if (attribute === 'safehouseFunctionName' || attribute === 'safehouseFunctionNotes') {
        const text = attribute === 'safehouseFunctionName' ? cell.name : cell.notes
        if (typeof text !== 'string') {
            refuse(response, 'Invalid field')
            return
        }
        if (text.length > SAFEHOUSE_FUNCTION_TEXT_MAX) {
            refuse(response, 'Text is too long')
            return
        }
        const column = attribute === 'safehouseFunctionName' ? 'name' : 'notes'
        const rows = await query(
            `update safehousePage1Functions set ${column} = $1 where id = $2 and pageID = $3 returning id`,
            [text, id, pageID]
        )
        if (!(Number(rows[0]?.id) > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'safehouseFunctionRank' || attribute === 'safehouseFunctionSpace') {
        const numeric = attribute === 'safehouseFunctionRank' ? cell.rank : cell.space
        if (!isSafehouseNumber(numeric)) {
            refuse(response, 'Invalid field')
            return
        }
        const column = attribute === 'safehouseFunctionRank' ? 'rank' : 'space'
        const rows = await query(
            `update safehousePage1Functions set ${column} = $1 where id = $2 and pageID = $3 returning id`,
            [sqlNumber(numeric), id, pageID]
        )
        if (!(Number(rows[0]?.id) > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    if (attribute === 'safehouseFunctionR') {
        if (typeof cell.r !== 'boolean') {
            refuse(response, 'Invalid field')
            return
        }
        const rows = await query(
            `update safehousePage1Functions set r = $1 where id = $2 and pageID = $3 returning id`,
            [cell.r, id, pageID]
        )
        if (!(Number(rows[0]?.id) > 0)) {
            refuse(response, 'Invalid field')
            return
        }
        checkForContentTypeBeforeSending(response, { success: true })
        return
    }

    refuse(response, 'Unknown attribute')
}
