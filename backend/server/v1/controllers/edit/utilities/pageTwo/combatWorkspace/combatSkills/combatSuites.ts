import { CombatSkillObject } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills"
import query from "../../../../../../../db/database"

const saveSkillSuiteSQL = 'update cvcharactercombatskillsuites set trained = $1, rank = $2 where characterskillsuitesid = $3 and characterid = $4'

export async function saveCombatSkillSuites(characterID: number, combatSkillSuites: CombatSkillObject[]) {
    let promiseArray: Promise<any>[] = []

    combatSkillSuites.forEach(({id, isTrained, rank}) => {
        promiseArray.push(query(saveSkillSuiteSQL, [isTrained, rank, id, characterID]))
    })

    return Promise.all(promiseArray)
}