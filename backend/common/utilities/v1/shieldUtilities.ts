export function calculateShieldDefense(base: number = 0, misc: number = 0): number {
    return base + misc
}

export function calculateShieldFatigue(base: number = 0, skill: number = 0, misc: number = 0): number {
    const total = base - Math.floor(skill / 2) + misc

    if (base <= 0) {
        return total
    } else {
        return 0
    }
}

export function calculateShieldParry(base: number = 0, skill: number = 0, misc: number = 0): number {
    return base + skill + misc
}

export function calculateShieldBreakage(base: number = 0, skill: number = 0, misc: number = 0): number {
    return base + Math.floor(skill / 2) + misc
}