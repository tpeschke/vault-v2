import { WeaponTable } from "../../interfaces/v1/pageOne/rightColumnInterfaces";
import { ArmorInfo } from "../../interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";
import { ShieldInfo } from "../../interfaces/v1/pageTwo/shieldInterfaces";
import { WeaponInfo } from "../../interfaces/v1/pageTwo/weaponInterfaces";

export default function formatWeaponTable(
    weaponInfo: WeaponInfo,
    armorInfo: ArmorInfo,
    shieldInfo: ShieldInfo,
    initSkill: number,
    atkMod: number,
    defMod: number,
    damMod: number,
    recMod: number
): WeaponTable {
    const { name: weaponName, measure, damage, type, recovery, modifiers: weaponMods, size } = weaponInfo
    const { atk, rec: weaponSkillRec, pry, dam } = weaponMods

    const { name: armorName, dr, modifiers: armorMods } = armorInfo
    const { def: armorDef, rec: armorSkillRec, init } = armorMods

    const { name: shieldName, dr: shieldParryDR, cover, flanks, modifiers: shieldMods } = shieldInfo
    const { def: shieldDef, pry: shieldParry } = shieldMods

    const weaponDamage = damage ?? ''

    return {
        name: getWeaponName(weaponName, armorName, shieldName),
        attacks: {
            meas: measure,
            atk: atkMod + atk.total,
            damage: weaponDamage + ` +${damMod}` + getExtraDamage(type, dam.total),
            type,
            rec: recovery + weaponSkillRec.total + armorSkillRec.total + getRecoveryModFromSize(recMod, size),
            init: 5 - Math.floor(initSkill / 2) + init.total
        },
        defenses: {
            def: defMod + armorDef.total + shieldDef.total,
            flanks: flanks ?? 1,
            parry: shieldParry.total ?? pry.total,
            cover: cover ?? '0',
            parryDR: shieldParryDR ?? '2/d',
            dr: dr ?? '0'
        }
    }
}

function getWeaponName(weapon: string | null, armor: string | null, shield: string | null): string {
    let name = ''

    if (weapon) { name += weapon }

    if (armor) {
        if (name.length > 0) { name += ', ' }
        name += armor
    }

    if (shield) {
        if (name.length > 0) { name += ', ' }
        name += shield
    }

    return name
}

function getExtraDamage(type: string, damageSkillTotal: number): string {
    if (damageSkillTotal === 0) {
        return ''
    }

    type = type ?? 'C'

    switch (type.toUpperCase()) {
        case 'C':
            return ' ' + getCrushingDamage(damageSkillTotal)
        case 'P':
            return ' ' + getPiercingDamage(damageSkillTotal)
        case 'S':
            return ' ' + getSlashingDamage(damageSkillTotal)
        default:
            return ''
    }
}

function getCrushingDamage(damageSkillTotal: number): string {
    return `+${Math.ceil(damageSkillTotal / 2)}`
}

const diceSizeDictionary = [
    '',
    ' +d3!',
    ' +d4!',
    ' +d6!',
    ' +d8!'
]

function getPiercingDamage(damageSkillTotal: number): string {
    const effectiveRanks = Math.ceil(damageSkillTotal / 2)

    const diceSizeCap = 4
    const numberOfDice = Math.ceil(effectiveRanks / diceSizeCap)
    const leftOverDie = effectiveRanks % diceSizeCap

    if (numberOfDice > 0) {
        return `+${numberOfDice}d8!${diceSizeDictionary[leftOverDie]}`
    }
    return diceSizeDictionary[leftOverDie]
}

function getSlashingDamage(damageSkillTotal: number): string {
    const effectiveRanks = Math.ceil(damageSkillTotal / 2)

    const diceSizeCap = 2
    const numberOfDice = Math.ceil(effectiveRanks / diceSizeCap)
    const leftOverDie = effectiveRanks % diceSizeCap

    if (numberOfDice > 0) {
        return `+${numberOfDice}d4!${diceSizeDictionary[leftOverDie]}`
    }
    return diceSizeDictionary[leftOverDie]
}

function getRecoveryModFromSize(recoveryMod: number, size: string): number {
    size = size ?? 'S'

    switch (size.toUpperCase()) {
        case 'S':
            return recoveryMod
        case 'M':
            return recoveryMod * -2
        case 'L':
            return recoveryMod * -3
        case 'H':
            return recoveryMod * -4
        default:
            return 0
    }
}