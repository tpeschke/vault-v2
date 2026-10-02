import { Favor } from "@vault/common/interfaces/v2/page1/favor";
import query from "../../../../../../db/database";

const getFavorSQL = `select * from v2Favor where pageID = $1`

type RawFavor = {
    anointed: boolean
    current: number
    max: number
    divinerelationship?: string | null
}

export default async function getFavor(pageID: number): Promise<Favor> {
    const [info]: RawFavor[] = await query(getFavorSQL, pageID)

    if (info) {
        const { anointed, current, max, divinerelationship } = info

        return {
            anointed, current, max,
            divineRelationship: divinerelationship ?? ''
        }
    }

    return {
        anointed: false,
        current: 0,
        max: 0,
        divineRelationship: ''
    }
}
