import addDamage from "./utilities/addDamage";
import addSelfDoubt from "./utilities/addSelfDoubt";
import addStress from "./utilities/addStress";

export default async function addVitals(pageID: number) {
    return Promise.all([
        addSelfDoubt(pageID),
        addDamage(pageID),
        addStress(pageID)
    ])
}