import { Flaw } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2flaws where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2flaws set flaw = $1 where id = $2`
const insertSQL = `insert into v2flaws (pageID, flaw) values ($1, $2)`

export default async function saveFlaws(pageID: number, flaws: Flaw[]) {
    await query(deleteSQL, [pageID, [0, ...flaws.map(flaw => flaw.id)]])
    return Promise.all(flaws.map(({ id, flaw }) => {
        if (id) {
            return query(updateSQL, [flaw, id])
        }
        if (flaw) {
            return query(insertSQL, [pageID, flaw])
        }
        return Promise.resolve()
    }))
}
