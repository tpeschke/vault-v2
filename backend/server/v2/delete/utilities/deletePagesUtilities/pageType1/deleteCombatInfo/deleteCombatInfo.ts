import deleteAttacks from "./utilities/deleteAttacks";
import deleteDefenses from "./utilities/deleteDefenses";

export default async function deleteCombatInfo(pageID: number) {
    return Promise.all([
        deleteDefenses(pageID),
        deleteAttacks(pageID)
    ])
}