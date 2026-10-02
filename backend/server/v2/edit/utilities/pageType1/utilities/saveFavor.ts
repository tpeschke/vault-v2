import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import query from "../../../../../db/database"

const saveFavorSQL = `update v2Favor set anointed = $1, current = $2, max = $3 where pageID = $4`

export default async function saveFavor(pageID: number, favor: Favor) {
    const { anointed, current, max } = favor
    return query(saveFavorSQL, [anointed, current, max, pageID])
}
