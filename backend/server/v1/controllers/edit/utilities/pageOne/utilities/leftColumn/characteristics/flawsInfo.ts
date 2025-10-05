import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteFlawsSQL = 'delete from cvflaws where characterid = $1 and not (id = any($2))'
const updateFlawSQL = 'update cvflaws set title = $1, value = $1 where id = $2'
const saveFlawSQL = 'insert into cvflaws (value, characterid) values ($1, $2)'

export async function saveFlaws(characterID: number, flaws: PairObject[]) {
    await query(deleteFlawsSQL, [characterID, [0, ...flaws.map(flaw => flaw.id)]])

    let promiseArray: Promise<any>[] = []

    flaws.forEach(({ id, value }) => {
        if (id) {
            promiseArray.push(query(updateFlawSQL, [value, id]))
        } else {
            promiseArray.push(query(saveFlawSQL, [value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}