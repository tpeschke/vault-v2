import { Page3Relationship } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import { SkillNumber } from "@vault/common/interfaces/v2/page2/page2Interfaces"
import query from "../../../../db/database"

const deleteSQL = `delete from v2Page3Relationships where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2Page3Relationships set value = $1, r = $2, p = $3, index = $4 where id = $5`
const insertSQL = `insert into v2Page3Relationships (pageID, value, r, p, index) values ($1, $2, $3, $4, $5)`

function numberParam(value: SkillNumber) {
    return value === '' ? null : value
}

function hasContent(value: string, r: SkillNumber, p: SkillNumber) {
    return value !== '' || r !== '' || p !== ''
}

export default async function savePage3Relationships(pageID: number, relationships: Page3Relationship[]): Promise<void> {
    await query(deleteSQL, [pageID, [0, ...relationships.map(row => row.id)]])
    await Promise.all(relationships.map(({ id, value, r, p }, index) => {
        if (id) {
            return query(updateSQL, [value, numberParam(r), numberParam(p), index, id])
        }
        if (hasContent(value, r, p)) {
            return query(insertSQL, [pageID, value, numberParam(r), numberParam(p), index])
        }
        return Promise.resolve()
    }))
}
