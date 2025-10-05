import { PairObject } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import query from "../../../../../../../../db/database";

const deleteReputationsSQL = 'delete from cvreputation where characterid = $1 and not (id = any($2))'
const updateReputationSQL = 'update cvreputation set value = $1 where id = $2'
const saveReputationSQL = 'insert into cvreputation (value, characterid) values ($1, $2)'

export async function saveReputations(characterID: number, reputations: PairObject[]) {
    await query(deleteReputationsSQL, [characterID, [0, ...reputations.map(reputation => reputation.id)]])

    let promiseArray: Promise<any>[] = []

    reputations.forEach(({ id, value }) => {
        if (id) {
            promiseArray.push(query(updateReputationSQL, [value, id]))
        } else {
            promiseArray.push(query(saveReputationSQL, [value, characterID]))
        }
    })

    return Promise.all(promiseArray)
}