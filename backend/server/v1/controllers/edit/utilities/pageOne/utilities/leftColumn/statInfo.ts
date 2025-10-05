import { StatsInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../db/database";

const saveStatInfoSQL = 'update cvcharactermain set str = $1, dex = $2, con = $3, int = $4, wis = $5, cha = $6 where id = $7'

export async function saveStatInfo(characterID: number, statInfo: StatsInfo) {
    const { str, dex, con, int, will, pre } = statInfo

    return query(saveStatInfoSQL, [str, dex, con, int, will, pre, characterID])
}