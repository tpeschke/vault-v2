import { GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces"
import query from "../../../../../../db/database"

const deleteGearsSQL = 'delete from cvgearone where characterid = $1 and not (id = any($2))'
const updateGearSQL = 'update cvgearone set title = $1, value = $2 where id = $3'
const saveGearSQL = 'insert into cvgearone (title, value, characterid) values ($1, $2, $3)'

export async function saveGearObject(characterID: number, gears: GearObject[]) {
    await query(deleteGearsSQL, [characterID, [0, ...gears.map(gear => gear.id)]])

    let promiseArray: Promise<any>[] = []

    gears.forEach(({ id, item, size }) => {
        if (id) {
            promiseArray.push(query(updateGearSQL, [item, size, id]))
        } else {
            promiseArray.push(query(saveGearSQL, [item, size, characterID]))
        }
    })

    return Promise.all(promiseArray)
}