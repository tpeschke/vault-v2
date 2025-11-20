import addGeneralInfo from "./utilities/addGeneralInfo"


export default async function addPageType1(characterID: number): Promise<boolean> {
    await Promise.all([
        addGeneralInfo(characterID)
    ])
    return true
}