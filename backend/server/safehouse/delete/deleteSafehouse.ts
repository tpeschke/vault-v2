import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'

interface DeleteRequest extends Request {
    params: {
        safehouseID: string
    }
}

export async function deleteSafehouse(request: DeleteRequest, response: Response) {
    const safehouseID = +request.params.safehouseID
    const rows = await query(`select userID as userid from safehouses where id = $1`, safehouseID)
    const ownerID = rows[0]?.userid

    if (!(Number.isFinite(safehouseID) && request.user?.id && Number(ownerID) === request.user.id)) {
        checkForContentTypeBeforeSending(response, { message: "You Don't Own This Safehouse" })
        return
    }

    await query(`delete from safehousePage1Functions where pageID in (select id from safehousePages where safehouseID = $1)`, safehouseID)
    await query(`delete from safehousePage1 where pageID in (select id from safehousePages where safehouseID = $1)`, safehouseID)
    await query(`delete from safehousePages where safehouseID = $1`, safehouseID)
    await query(`delete from safehouses where id = $1`, safehouseID)
    checkForContentTypeBeforeSending(response, { message: 'Deleted' })
}
