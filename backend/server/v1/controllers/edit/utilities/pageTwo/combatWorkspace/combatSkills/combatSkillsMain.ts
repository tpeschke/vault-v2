import { CombatSkillsInfo } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills";
import { saveMartialAdept } from "./martialAdepts";

export async function saveCombatSkillsMain(characterID: number, combatSkillInfo: CombatSkillsInfo) {
    const { martialAdepts } = combatSkillInfo;

    let promiseArray: Promise<any>[] = [];

    promiseArray.push(saveMartialAdept(characterID, martialAdepts))

    return Promise.all(promiseArray);
}
