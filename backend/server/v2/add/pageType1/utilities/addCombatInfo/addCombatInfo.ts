import addAttackInfo from "./utilities/addAttackInfo";
import addDefenseInfo from "./utilities/addDefenseInfo";

export default async function addCombatInfo(pageID: number) {
    return Promise.all([
        addDefenseInfo(pageID),
        addAttackInfo(pageID)
    ])
}