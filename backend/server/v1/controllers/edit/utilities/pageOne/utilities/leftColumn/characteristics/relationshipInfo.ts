import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteRelationshipsSQL = 'delete from cvdevotions where characterid = $1 and not (id = any($2))'
const updateRelationshipSQL = 'update cvdevotions set title = $1, value = $2 where id = $3'
const saveRelationshipSQL = 'insert into cvdevotions (title, value, characterid) values ($1, $2, $3)'

export async function saveRelationships(characterID: number, relationships: PairObject[]) {
    await query(deleteRelationshipsSQL, [characterID, [0, ...relationships.map(relationship => relationship.id)]])

    let promiseArray: Promise<any>[] = []

    relationships.forEach(({ id, title, value }) => {
        if (id) {
            promiseArray.push(query(updateRelationshipSQL, [title, value, id]))
        } else {
            promiseArray.push(query(saveRelationshipSQL, [title, value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}