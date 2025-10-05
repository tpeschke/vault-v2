import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteConvictionsSQL = 'delete from cvtraits where characterid = $1 and not (id = any($2))'
const updateConvictionSQL = 'update cvtraits set title = $1, value = $2 where id = $3'
const saveConvictionSQL = 'insert into cvtraits (title, value, characterid) values ($1, $2, $3)'

export async function saveConvictions(characterID: number, convictions: PairObject[]) {
    await query(deleteConvictionsSQL, [characterID, [0, ...convictions.map(conviction => conviction.id)]])

    let promiseArray: Promise<any>[] = []

    convictions.forEach(({ id, title, value }) => {
        if (id) {
            promiseArray.push(query(updateConvictionSQL, [title, value, id]))
        } else {
            promiseArray.push(query(saveConvictionSQL, [title, value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}