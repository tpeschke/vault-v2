import { Stats } from "@vault/common/interfaces/v2/page1/statsInterface";
import query from "../../../../../../db/database";

interface RawStats {
    pageid: number,
    str: number,
    dex: number,
    con: number,
    mem: number,
    ins: number,
    pre: number
}

const getStatsSQL = `select * from v2stats where pageID = $1`

export default async function getStats(pageID: number): Promise<Stats> {
    const [info]: RawStats[] = await query(getStatsSQL, pageID)

    if (info) {
        const { str, dex, con, mem, ins, pre } = info
        
        return { str, dex, con, mem, ins, pre }
    }

    return {
        str: 0,
        dex: 0,
        con: 0,
        mem: 0,
        ins: 0,
        pre: 0
    }
}