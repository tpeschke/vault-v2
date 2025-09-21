export function calculateArmorDefenseTotal(base: number = 0, skill: number = 0, misc: number = 0): number {
    const total = base + skill + misc

    if (total <= 0) {
        return total
    } else {
        return Math.floor(total / 3)
    }
}

export function calculateArmorFatigueTotal(base: string = 'B', skill: number = 0, misc: number = 0): number {
    const fatigueDictionary: {[key: string]: number} = {
        'C': 0,
        'W': 1,
        'B': 2,
        'H': 3
    }
    const total = fatigueDictionary[base] - Math.floor(skill / 2) + misc

    if (total <= 0) {
        return total
    } else {
        return 0
    }
}

export function calculateArmorRecoveryOrInitiativeTotal(base: number = 0, skill: number = 0, misc: number = 0): number {
    const total = base - skill + misc

    if (total <= 0) {
        return total
    } else {
        return 0
    }
}