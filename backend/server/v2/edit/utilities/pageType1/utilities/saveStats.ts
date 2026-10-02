import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface"
import query from "../../../../../db/database"

const saveStatsSQL = `update v2stats set str = $1, dex = $2, con = $3, mem = $4, ins = $5, pre = $6 where pageID = $7`

export default async function saveStats(pageID: number, stats: Stats) {
    const { str, dex, con, mem, ins, pre } = stats
    return query(saveStatsSQL, [str, dex, con, mem, ins, pre, pageID])
}
