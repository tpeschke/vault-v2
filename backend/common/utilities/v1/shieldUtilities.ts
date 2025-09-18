export function calculateShieldDefense(base: number, misc: number): number {
    return base + misc
}

export function calculateShieldFatigue(base: number, skill: number, misc: number): number {
    const total = base - Math.floor(skill / 2) + misc

    if (base <= 0) {
        return total
    } else {
        return 0
    }
}

export function calculateShieldParry(base: number, skill: number, misc: number): number {
    return base + skill + misc
}

export function calculateShieldBreakage(base: number, skill: number, misc: number): number {
    return base + Math.floor(skill / 2) + misc
}