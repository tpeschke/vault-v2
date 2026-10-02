import { PageV2 } from "@vault/common/interfaces/v2/pageTypes"
import savePageType1 from "./pageType1/savePageType1"

export default async function savePages(pages: PageV2[]): Promise<void> {
    await Promise.all(pages.map(page => {
        switch (page.type) {
            case 1:
                return savePageType1(page)
            default:
                return Promise.resolve()
        }
    }))
}
