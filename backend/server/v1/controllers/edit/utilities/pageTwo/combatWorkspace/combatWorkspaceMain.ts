import { CombatWorkspaceInfo } from "@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces";
import { saveArmorInfo } from "./armorInfo";
import { saveShieldInfo } from "./shieldInfo";
import { saveWeaponInfo } from "./weaponInfo";


export async function saveCombatWorkspaceMain(combatWorkspaceInfo: CombatWorkspaceInfo) {
    const { armorInfo, shieldInfo, weaponInfo } = combatWorkspaceInfo;

    let promiseArray: Promise<any>[] = [];

    promiseArray.push(saveArmorInfo(armorInfo));
    promiseArray.push(saveShieldInfo(shieldInfo));

    promiseArray.push(saveWeaponInfo('one', weaponInfo[0]));
    promiseArray.push(saveWeaponInfo('two', weaponInfo[1]));
    promiseArray.push(saveWeaponInfo('three', weaponInfo[2]));
    promiseArray.push(saveWeaponInfo('four', weaponInfo[3]));

    return Promise.all(promiseArray);
}
