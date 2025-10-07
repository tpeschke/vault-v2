import { SkillInfo } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import { saveSkillSuites } from "./skillSuites"

export async function saveSkillInfo(characterID: number, skillInfo: SkillInfo) {
    const { skillSuites } = skillInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveSkillSuites(characterID, skillSuites))

    return Promise.all(promiseArray)
}