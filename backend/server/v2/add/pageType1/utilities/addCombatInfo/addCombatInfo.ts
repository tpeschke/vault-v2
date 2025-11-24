import addDefenseInfo from "./utilities/addDefenseInfo";

export default async function addCombatInfo(characterID: number) {
    return Promise.all([
        addDefenseInfo(characterID)
    ])
}