import { Flaw } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface FlawReturn {
    id: number,
    characterid: number,
    flaw: string
}

const getFlawsSQL = `select * from v2flaws where characterID = $1`

export default async function getFlaws(characterID: number): Promise<Flaw[]> {
    const info: FlawReturn[] = await query(getFlawsSQL, characterID)

    if (info.length > 0) {
        return info.map(({ id, flaw }) => {
            return {
                id, flaw
            }
        })
    }

    return []
}