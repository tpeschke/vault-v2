import { SkillInfo } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces"
import { saveSkillSuites } from "./skillSuites"
import { saveNativeLanguage } from "./nativeLanguage"

export async function saveSkillInfo(characterID: number, skillInfo: SkillInfo) {
    const { skillSuites, nativeLanguage } = skillInfo

    let promiseArray: Promise<any>[] = []

    promiseArray.push(saveSkillSuites(characterID, skillSuites))
    promiseArray.push(saveNativeLanguage(characterID, nativeLanguage))

    return Promise.all(promiseArray)
}