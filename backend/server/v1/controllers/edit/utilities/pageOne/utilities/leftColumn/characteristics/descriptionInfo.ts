import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteDescriptionsSQL = 'delete from cvdescriptions where characterid = $1 and not (id = any($2))'
const updateDescriptionSQL = 'update cvdescriptions set title = $1, value = $2 where id = $3'
const saveDescriptionSQL = 'insert into cvdescriptions (title, value, characterid) values ($1, $2, $3)'

export async function saveDescriptions(characterID: number, descriptions: PairObject[]) {
    await query(deleteDescriptionsSQL, [characterID, [0, ...descriptions.map(description => description.id)]])

    let promiseArray: Promise<any>[] = []

    descriptions.forEach(({ id, title, value }) => {
        if (id) {
            promiseArray.push(query(updateDescriptionSQL, [title, value, id]))
        } else {
            promiseArray.push(query(saveDescriptionSQL, [title, value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}