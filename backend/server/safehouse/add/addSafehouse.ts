import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'

function insertedID(rows: { id?: number | string }[]): number {
    const value = Number(rows[0]?.id)
    return Number.isFinite(value) && value > 0 ? value : 0
}

async function removePartial(safehouseID: number) {
    await query(`delete from safehousePage1Functions where pageID in (select id from safehousePages where safehouseID = $1)`, safehouseID)
    await query(`delete from safehousePage1 where pageID in (select id from safehousePages where safehouseID = $1)`, safehouseID)
    await query(`delete from safehousePages where safehouseID = $1`, safehouseID)
    await query(`delete from safehouses where id = $1`, safehouseID)
}

export default async function addSafehouse(request: Request, response: Response) {
    const userID = request.user?.id

    if (!userID) {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You must be logged in to add a Safehouse" })
        return
    }

    const safehouseID = insertedID(await query(`insert into safehouses (userID) values ($1) returning id`, userID))
    if (!(safehouseID > 0)) {
        checkForContentTypeBeforeSending(response, { color: 'red', message: 'Could not add a Safehouse' })
        return
    }

    const pageID = insertedID(await query(
        `insert into safehousePages (safehouseID, index, pageTypeID) values ($1, $2, $3) returning id`,
        [safehouseID, 0, 1]
    ))
    if (!(pageID > 0)) {
        await removePartial(safehouseID)
        checkForContentTypeBeforeSending(response, { color: 'red', message: 'Could not add a Safehouse' })
        return
    }

    const page1 = await query(`insert into safehousePage1 (pageID) values ($1) returning pageID`, pageID)
    const storedPageID = Number(page1[0]?.pageid)
    if (!(storedPageID > 0)) {
        await removePartial(safehouseID)
        checkForContentTypeBeforeSending(response, { color: 'red', message: 'Could not add a Safehouse' })
        return
    }

    checkForContentTypeBeforeSending(response, safehouseID)
}
