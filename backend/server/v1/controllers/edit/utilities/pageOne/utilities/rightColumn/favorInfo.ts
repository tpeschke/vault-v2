import { FavorInfo } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import query from "../../../../../../../db/database"

const saveFavorInfoSQL = 'update cvcharactermain set currentfavor = $1, favormax = $2, anointed = $3 where id = $4'

export async function saveFavorInfo(characterID: number, favorInfo: FavorInfo) {
    const { favor, maxFavor, anointed } = favorInfo

    return query(saveFavorInfoSQL, [favor, maxFavor, anointed, characterID])
}