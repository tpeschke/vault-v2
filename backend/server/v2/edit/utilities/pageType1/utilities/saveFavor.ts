import { Favor } from "@vault/common/interfaces/v2/page1/favor"
import { textareaCaps, textareaCharCount, TextareaLimitError } from "@vault/common/textareaLimits"
import query from "../../../../../db/database"

const saveFavorSQL = `update v2Favor set anointed = $1, current = $2, max = $3, divineRelationship = $4 where pageID = $5`

export default async function saveFavor(pageID: number, favor: Favor) {
    const { anointed, current, max, divineRelationship } = favor
    if (textareaCharCount(divineRelationship ?? '') > textareaCaps.divineRelationship) {
        throw new TextareaLimitError()
    }
    return query(saveFavorSQL, [anointed, current, max, divineRelationship ?? '', pageID])
}
