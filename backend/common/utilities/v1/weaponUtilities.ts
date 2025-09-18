export function calculateWeaponAttack(skill: number = 0, misc: number = 0): number {
    return skill + misc
}

export function calculateWeaponRecovery(skill: number = 0, misc: number = 0): number {
    return (Math.floor(skill / 2) * -1) + misc
}

export function calculateWeaponParry(skill: number = 0, misc: number = 0): number {
    return skill + misc
}

export function calculateWeaponDamage(skill: number = 0, misc: number = 0): number {
    return skill + misc
}