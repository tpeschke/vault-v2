import { MovementInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../db/database";

const saveMovementInfoSQL = 'update cvcharactermain set crawl = $1, walk = $2, jog = $3, run = $4, sprint = $5 where id = $6'

export async function saveMovementInfo(characterID: number, movementInfo: MovementInfo) {
    const { crawl, walk, jog, run, sprint } = movementInfo

    return query(saveMovementInfoSQL, [crawl, walk, jog, run, sprint, characterID])
}