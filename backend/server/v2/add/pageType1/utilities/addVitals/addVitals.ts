import addSelfDoubt from "./utilities/addSelfDoubt";

export default async function addVitals(characterID: number) {
    return Promise.all([
        addSelfDoubt(characterID)
    ])
}