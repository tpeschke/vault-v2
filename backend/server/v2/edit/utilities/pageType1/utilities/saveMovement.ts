import { Movement } from "@vault/common/interfaces/v2/page1/movement"
import query from "../../../../../db/database"

const saveMovementSQL = `update v2movements set crawl = $1, walk = $2, jog = $3, run = $4, sprint = $5 where pageID = $6`

export default async function saveMovement(pageID: number, movement: Movement) {
    const { crawl, walk, jog, run, sprint } = movement
    return query(saveMovementSQL, [crawl, walk, jog, run, sprint, pageID])
}
