import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import query from "../../../../../../db/database"

const deleteSkillsSQL = 'delete from cvskills where characterid = $1 and not (id = any($2))'
const updateSkillSQL = 'update cvskills set skill = $1, cost = $2, rank = $3, mod = $4 where id = $5'
const saveSkillSQL = 'insert into cvskills (skill, cost, rank, mod, characterid) values ($1, $2, $3, $4, $5)'

export async function saveAdvancedSkills(characterID: number, skills: SkillObject[]) {
    await query(deleteSkillsSQL, [characterID, [0, ...skills.map(skill => skill.id)]])

    let promiseArray: Promise<any>[] = []

    skills.forEach(({ id, skill, cost, rank, mod }) => {
        if (id) {
            promiseArray.push(query(updateSkillSQL, [skill, cost, rank, mod, id]))
        } else {
            promiseArray.push(query(saveSkillSQL, [skill, cost, rank, mod, characterID]))
        }
    })

    return Promise.all(promiseArray)
}