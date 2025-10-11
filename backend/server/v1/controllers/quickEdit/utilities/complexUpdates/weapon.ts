import { WeaponQuickEditModifiers } from "@vault/common/interfaces/v1/quickEdit"
import query from "../../../../../db/database"

export async function saveWeapon(miscWeapon: WeaponQuickEditModifiers) {
    const { weaponID, position, atk, rec, pry, dam } = miscWeapon

    const positionDictionary = ['one', 'two', 'three', 'four']
    
    const saveMiscModifierSQL = `update weapon${positionDictionary[position]} set miscattack = $1, miscrecovery = $2, miscparry = $3, miscdamage = $4 where weaponid = $5`

    await query(saveMiscModifierSQL, [atk, rec, pry, dam, weaponID])

    return true
}