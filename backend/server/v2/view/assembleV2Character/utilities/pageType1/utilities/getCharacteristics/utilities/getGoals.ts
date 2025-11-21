import { Goal } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../../db/database"

interface GoalReturn {
    id: number,
    characterid: number,
    goal: string
}

const getGoalsSQL = `select * from v2goals where characterID = $1`

export default async function getGoals(characterID: number): Promise<Goal[]> {
    const info: GoalReturn[] = await query(getGoalsSQL, characterID)

    if (info.length > 0) {
        return info.map(({ id, goal }) => {
            return {
                id, goal
            }
        })
    }

    return []
}