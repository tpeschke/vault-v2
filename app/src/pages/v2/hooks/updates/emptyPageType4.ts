import { Page4 } from "@vault/common/interfaces/v2/pageTypes"
import makeTempID from "../../../../utilities/makeTempId"

export default function emptyPageType4(pageID: number): Page4 {
    return {
        type: 4,
        pageID,
        scene: '',
        key: makeTempID()
    }
}
