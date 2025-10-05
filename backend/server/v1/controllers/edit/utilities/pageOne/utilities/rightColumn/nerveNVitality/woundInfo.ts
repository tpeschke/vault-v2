import { Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces"
import query from "../../../../../../../../db/database"

const deleteWoundsSQL = 'delete from damageone where characterid = $1 and not (id = any($2))'
const updateWoundSQL = 'update damageone set title = $1, value = $2 where id = $3'
const saveWoundSQL = 'insert into damageone (title, value, characterid) values ($1, $2, $3)'

export async function saveWounds(characterID: number, wounds: Wound[]) {
    await query(deleteWoundsSQL, [characterID, [0, ...wounds.map(wound => wound.id)]])

    let promiseArray: Promise<any>[] = []

    wounds.forEach(({ id, severity, days }) => {
        if (id) {
            promiseArray.push(query(updateWoundSQL, [severity, days, id]))
        } else {
            promiseArray.push(query(saveWoundSQL, [severity, days, characterID]))
        }
    })

    return Promise.all(promiseArray)
}