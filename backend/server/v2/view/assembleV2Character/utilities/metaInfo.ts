import query from "../../../../db/database";

const getCharacterOwnerSQL = `select ownerID from v2CharacterPages where characterID = $1`

export default async function getCharacterOwnerID(characterID: number): Promise<number> {
    const [info] = await query(getCharacterOwnerSQL, characterID)

    if (info) {
        return info.ownerid
    }

    return 1
}