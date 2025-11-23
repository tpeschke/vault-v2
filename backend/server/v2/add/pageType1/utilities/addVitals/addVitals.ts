import addDamage from "./utilities/addDamage";
import addSelfDoubt from "./utilities/addSelfDoubt";
import addStress from "./utilities/addStress";

export default async function addVitals(characterID: number) {
    return Promise.all([
        addSelfDoubt(characterID),
        addDamage(characterID),
        addStress(characterID)
    ])
}