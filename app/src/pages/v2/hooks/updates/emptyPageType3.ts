import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import { emptyPage3Coinage, emptyPage3Gear } from "@vault/common/interfaces/v2/page3/page3Interfaces"

export default function emptyPageType3(pageID: number): Page3 {
    return {
        type: 3,
        pageID,
        contacts: [],
        relationships: [],
        gear: emptyPage3Gear(),
        coinage: emptyPage3Coinage(),
        notes: ''
    }
}
