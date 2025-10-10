import query from "../../../../../db/database"

const saveAssetsSQL = 'update cvcharactermain set contacts = $1 where id = $2'

export async function saveAssets(characterID: number, assets: string): Promise<boolean> {
    await query(saveAssetsSQL, [assets, characterID])
    return true
}