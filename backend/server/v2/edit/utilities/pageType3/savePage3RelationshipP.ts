import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../db/database"

const updateSQL = `update v2Page3Relationships set p = $1 where id = $2 and pageID = $3`

export default async function savePage3RelationshipP(pageID: number, id: number, p: SkillNumber): Promise<void> {
    await query(updateSQL, [p === '' ? null : p, id, pageID])
}
