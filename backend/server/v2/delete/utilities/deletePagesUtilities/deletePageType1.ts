import deleteCharacteristics from "./pageType1/deleteCharacteristics/deleteCharacteristics";

export default async function deletePageType1(pageID: number) {
    return Promise.all([
        deleteCharacteristics(pageID)
    ])
}