import { PageV2 } from "@vault/common/interfaces/v2/pageTypes"
import persistPageType1 from "./persistPageType1"
import persistPageType2 from "./persistPageType2"
import persistPageType3 from "./persistPageType3"
import persistPageType4 from "./persistPageType4"

export default async function savePages(characterID: number, pages: PageV2[]): Promise<void> {
    await Promise.all(pages.map((page, arrayIndex) => {
        switch (page.type) {
            case 1:
                return persistPageType1(characterID, page, arrayIndex)
            case 2:
                return persistPageType2(characterID, page, arrayIndex)
            case 3:
                return persistPageType3(characterID, page, arrayIndex)
            case 4:
                return persistPageType4(characterID, page, arrayIndex)
            default:
                return Promise.resolve()
        }
    }))
}
