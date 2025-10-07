import { SkillInfo } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import { saveSkillSuites } from "./skillSuites"
import { saveNativeLanguage } from "./nativeLanguage"
import { saveAdvancedSkills } from "./advancedSkills"

export async function saveSkillInfo(characterID: number, skillInfo: SkillInfo) {
    const { skillSuites, nativeLanguage, advancedSkills } = skillInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveSkillSuites(characterID, skillSuites))
    promiseArray.push(saveNativeLanguage(characterID, nativeLanguage))
    promiseArray.push(saveAdvancedSkills(characterID, advancedSkills))
    // adepts

    return Promise.all(promiseArray)
}