import { CombatSkillObject } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills"
import query from "../../../../../../../db/database"

const deleteSkillsSQL = 'delete from cvcombatskills where characterid = $1 and not (id = any($2))'
const updateSkillSQL = 'update cvcombatskills set skill = $1, cost = $2, rank = $3 where id = $4'
const saveSkillSQL = 'insert into cvcombatskills (skill, cost, rank, characterid) values ($1, $2, $3, $4)'

export async function saveAdvancedCombatSkills(characterID: number, skills: CombatSkillObject[]) {
    await query(deleteSkillsSQL, [characterID, [0, ...skills.map(skill => skill.id)]])

    let promiseArray: Promise<any>[] = []

    skills.forEach(({ id, skill, cost, rank }) => {
        if (id) {
            promiseArray.push(query(updateSkillSQL, [skill, cost, rank, id]))
        } else {
            promiseArray.push(query(saveSkillSQL, [skill, cost, rank, characterID]))
        }
    })

    return Promise.all(promiseArray)
}