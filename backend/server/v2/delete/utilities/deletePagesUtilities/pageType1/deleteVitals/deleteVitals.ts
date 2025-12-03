import deleteDamage from "./utilities/deleteDamage";
import deleteSelfDoubt from "./utilities/deleteSelfDoubt";
import deleteStress from "./utilities/deleteStress";

export default async function deleteVitals(pageID: number) {
    return Promise.all([
        deleteSelfDoubt(pageID),
        deleteDamage(pageID),
        deleteStress(pageID)
    ])
}