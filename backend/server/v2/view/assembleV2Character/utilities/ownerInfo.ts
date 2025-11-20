import query from "../../../../db/database";

const getCharacterOwnerSQL = `select ownerID from v2CharacterOwner where characterID = $1`

export async function getCharacterOwnerID(characterID: number): Promise<number> {
    const [info] = await query(getCharacterOwnerSQL, characterID)

    if (info) {
        return info.ownerid
    }

    return 1
}

const setCharacterOwnerSQL = `insert into v2CharacterOwner (ownerid) values ($1) returning *`

export async function addCharacterToOwnerTable(userID: number): Promise<number> {
    const [info] = await query(setCharacterOwnerSQL, userID)

    if (info) {
        return info.characterid
    }

    return 0
}