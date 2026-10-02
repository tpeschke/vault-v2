import { Goal } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2goals where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2goals set goal = $1 where id = $2`
const insertSQL = `insert into v2goals (pageID, goal) values ($1, $2)`

export default async function saveGoals(pageID: number, goals: Goal[]) {
    await query(deleteSQL, [pageID, [0, ...goals.map(goal => goal.id)]])
    return Promise.all(goals.map(({ id, goal }) => {
        if (id) {
            return query(updateSQL, [goal, id])
        }
        if (goal) {
            return query(insertSQL, [pageID, goal])
        }
        return Promise.resolve()
    }))
}
