import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteGoalsSQL = 'delete from cvgoals where characterid = $1 and not (id = any($2))'
const updateGoalSQL = 'update cvgoals set goal = $1 where id = $2'
const saveGoalSQL = 'insert into cvgoals (goal, characterid) values ($1, $2)'

export async function saveGoals(characterID: number, goals: PairObject[]) {
    await query(deleteGoalsSQL, [characterID, [0, ...goals.map(goal => goal.id)]])

    let promiseArray: Promise<any>[] = []

    goals.forEach(({ id, value }) => {
        if (id) {
            promiseArray.push(query(updateGoalSQL, [value, id]))
        } else {
            promiseArray.push(query(saveGoalSQL, [value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}