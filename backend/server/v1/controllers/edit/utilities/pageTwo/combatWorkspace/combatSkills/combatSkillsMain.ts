import { CombatSkillsInfo } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills";
import { saveMartialAdept } from "./martialAdepts";
import { saveCombatSkillSuites } from "./combatSuites";
import { saveAdvancedCombatSkills } from "./combatAdvSkills";

export async function saveCombatSkillsMain(characterID: number, combatSkillInfo: CombatSkillsInfo) {
    const { martialAdepts, combatSkillSuites, combatAdvSkills } = combatSkillInfo;

    let promiseArray: Promise<any>[] = [];

    promiseArray.push(saveMartialAdept(characterID, martialAdepts))
    
    promiseArray.push(saveCombatSkillSuites(characterID, combatSkillSuites))
    promiseArray.push(saveAdvancedCombatSkills(characterID, combatAdvSkills))

    return Promise.all(promiseArray);
}
