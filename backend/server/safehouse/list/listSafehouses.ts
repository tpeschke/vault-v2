import { SafehouseHomeInfo } from '@vault/common/interfaces/safehouse/safehouse'
import { checkForContentTypeBeforeSending } from '../../controllers/common/sendingFunctions'
import query from '../../db/database'
import { Response, Request } from '../../interfaces/apiInterfaces'

export default async function listSafehouses(request: Request, response: Response) {
    const userID = request.user?.id
    if (!userID) {
        checkForContentTypeBeforeSending(response, [])
        return
    }

    const houses = await query(`select id from safehouses where userID = $1 order by id`, userID)
    const names = await query(
        `select p.safehouseID as safehouseid, p1.name
        from safehousePages p
        left join safehousePage1 p1 on p1.pageID = p.id
        where p.pageTypeID = 1
        and p.safehouseID in (select id from safehouses where userID = $1)
        order by p.safehouseID, p.index`,
        userID
    )

    const byHouse = new Map<number, string[]>()
    for (const row of names) {
        const id = Number(row.safehouseid)
        const list = byHouse.get(id) ?? []
        list.push(typeof row.name === 'string' ? row.name : '')
        byHouse.set(id, list)
    }

    const body: SafehouseHomeInfo[] = houses.map((row: { id: number | string }) => {
        const id = Number(row.id)
        const pageNames = byHouse.get(id) ?? []
        const first = pageNames[0]
        const name = first && first.trim() ? first : 'New Safehouse'
        return {
            id,
            name,
            otherPageType1Names: pageNames.slice(1)
        }
    })

    checkForContentTypeBeforeSending(response, body)
}
