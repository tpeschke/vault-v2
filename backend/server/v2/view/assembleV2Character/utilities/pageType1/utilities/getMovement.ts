import { Movement } from "@vault/common/interfaces/v2/page1/movement";
import query from "../../../../../../db/database";

const getMovementSQL = `select * from v2movements where characterID = $1`

export default async function getMovement(characterID: number): Promise<Movement> {
    const [movement]: Movement[] = await query(getMovementSQL, characterID)

    if (movement) {
        return movement
    }

    return {
        crawl: 0,
        walk: 0,
        jog: 0,
        run: 0,
        sprint: 0
    }
}