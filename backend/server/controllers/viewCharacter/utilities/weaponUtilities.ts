import { WeaponInfo } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces";
import { calculateWeaponAttack, calculateWeaponRecovery, calculateWeaponParry, calculateWeaponDamage } from '@vault/common/utilities/v1/weaponUtilities'

export function formatWeapon(rawWeapon: any): WeaponInfo {
    const {
        weaponid, trainattack, trainparry, trainrecovery,
        traindamage, miscattack, miscparry, miscrecovery, miscdamage,
        name, basedamage, baserecovery, baseparry, basemeasure, type, bonus,
        traits, size
    } = rawWeapon

    return {
        id: weaponid,
        name,
        damage: basedamage,
        recovery: baserecovery,
        size,
        measure: basemeasure,
        parry: baseparry,
        type,
        bonus,
        traits,
        modifiers: {
            atk: {
                skill: trainattack,
                misc: miscattack,
                total: calculateWeaponAttack(trainattack, miscattack)
            },
            rec: {
                skill: trainrecovery,
                misc: miscrecovery,
                total: calculateWeaponRecovery(trainrecovery, miscrecovery)
            },
            pry: {
                skill: trainparry,
                misc: miscparry,
                total: calculateWeaponParry(trainparry, miscparry)
            },
            dam: {
                skill: traindamage,
                misc: miscdamage,
                total: calculateWeaponDamage(traindamage, miscdamage)
            }
        }
    }
}