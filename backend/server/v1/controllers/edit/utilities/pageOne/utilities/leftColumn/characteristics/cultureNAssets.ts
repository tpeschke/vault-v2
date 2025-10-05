import query from "../../../../../../../../db/database";

const saveCulturalNContactsInfoSQL = 'update cvcharactermain set strength = $1, contacts = $2 where id = $3'

export async function saveCulturalNContactsInfo(characterID: number, culturalStrength: string, assets: string) {
    return query(saveCulturalNContactsInfoSQL, [culturalStrength, assets, characterID])
}