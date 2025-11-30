import { Favor } from "@vault/common/interfaces/v2/page1/favor";
import query from "../../../../../../db/database";

const getFavorSQL = `select * from v2Favor where pageID = $1`

export default async function getFavor(pageID: number): Promise<Favor> {
    const [info]: Favor[] = await query(getFavorSQL, pageID)

    if (info) {
        const { anointed, current, max } = info

        return {
            anointed, current, max
        }
    }

    return {
        anointed: false,
        current: 0,
        max: 0
    }
}