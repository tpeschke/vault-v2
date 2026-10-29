import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../db/database"

const insertSQL = `insert into v2Page3Relationships (pageID, value, r, p, index)
values ($1, $2, $3, $4, (select count(*)::int from v2Page3Relationships where pageID = $1))
returning id`

function numberParam(value: SkillNumber) {
    return value === '' ? null : value
}

export default async function savePage3RelationshipInsert(
    pageID: number,
    value: string,
    r: SkillNumber,
    p: SkillNumber
): Promise<number> {
    const rows = await query(insertSQL, [pageID, value, numberParam(r), numberParam(p)])
    const nextId = rows[0]?.id
    return typeof nextId === 'number' && nextId > 0 ? nextId : 0
}
