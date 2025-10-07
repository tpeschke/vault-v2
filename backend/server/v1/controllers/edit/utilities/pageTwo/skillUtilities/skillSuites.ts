import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import query from "../../../../../../db/database"

const saveSkillSuiteSQL = 'update cvcharacterskillsuites set trained = $1, rank = $2 where characterskillsuitesid = $3 and characterid = $4'

export async function saveSkillSuites(characterID: number, skillSuites: SkillObject[]) {
    let promiseArray: Promise<any>[] = []

    skillSuites.forEach(({id, isTrained, rank}) => {
        promiseArray.push(query(saveSkillSuiteSQL, [isTrained, rank, id, characterID]))
    })

    return Promise.all(promiseArray)
}