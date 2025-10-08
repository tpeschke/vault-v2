import { WeaponInfo } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces"
import query from "../../../../../../db/database"

export async function saveWeaponInfo(position: 'one' | 'two' | 'three' | 'four', weaponInfo: WeaponInfo) {
    switch(position) {
        case 'one':
        case 'two':
        case 'three':
            return saveMeleeWeapon(position, weaponInfo)
        case 'four':
            return saveRangedWeapon(weaponInfo)
        default:
            return true
    }
}

async function saveMeleeWeapon(position: 'one' | 'two' | 'three', weaponInfo: WeaponInfo) {
    const { id, name, type, bonus, traits, size, damage, recovery, parry, measure, modifiers } = weaponInfo
    const { atk, rec, pry, dam } = modifiers
    
    const saveWeaponInfoSQL = `update weapon${position} set name = $1, type = $2, bonus = $3, traits = $4, size = $5 where weaponid = $6`
    const saveBaseModifierSQL = `update weapon${position} set basedamage = $1, baserecovery = $2, baseparry = $3, basemeasure = $4 where weaponid = $5`
    const saveSkillModifierSQL = `update weapon${position} set trainattack = $1, trainrecovery = $2, trainparry = $3, traindamage = $4 where weaponid = $5`
    const saveMiscModifierSQL = `update weapon${position} set miscattack = $1, miscrecovery = $2, miscparry = $3, miscdamage = $4 where weaponid = $5`

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveWeaponInfoSQL, [name, type, bonus, traits, size, id]))
    promiseArray.push(query(saveBaseModifierSQL, [damage, recovery, parry, measure, id]))
    promiseArray.push(query(saveSkillModifierSQL, [atk.skill, rec.skill, pry.skill, dam.skill, id]))
    promiseArray.push(query(saveMiscModifierSQL, [atk.misc, rec.misc, pry.misc, dam.misc, id]))

    return Promise.all(promiseArray)
}

async function saveRangedWeapon(weaponInfo: WeaponInfo) {
    const { id, name, type, bonus, traits, size, damage, recovery, isThrown, modifiers } = weaponInfo
    const { atk, rec, dam } = modifiers
    
    const saveWeaponInfoSQL = `update weaponfour set name = $1, type = $2, bonus = $3, traits = $4, size = $5 where weaponid = $6`
    const saveBaseModifierSQL = `update weaponfour set basedamage = $1, baserecovery = $2, thrownweapon = $3 where weaponid = $4`
    const saveSkillModifierSQL = `update weaponfour set trainattack = $1, trainrecovery = $2, traindamage = $3 where weaponid = $4`
    const saveMiscModifierSQL = `update weaponfour set miscattack = $1, miscrecovery = $2, miscdamage = $3 where weaponid = $4`

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveWeaponInfoSQL, [name, type, bonus, traits, size, id]))
    promiseArray.push(query(saveBaseModifierSQL, [damage, recovery, isThrown, id]))
    promiseArray.push(query(saveSkillModifierSQL, [atk.skill, rec.skill, dam.skill, id]))
    promiseArray.push(query(saveMiscModifierSQL, [atk.misc, rec.misc, dam.misc, id]))

    return Promise.all(promiseArray)
}