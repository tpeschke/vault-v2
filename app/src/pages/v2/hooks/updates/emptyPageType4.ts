import { Page4 } from "@vault/common/interfaces/v2/pageTypes"

export default function emptyPageType4(pageID: number): Page4 {
    return {
        type: 4,
        pageID,
        scene: ''
    }
}
