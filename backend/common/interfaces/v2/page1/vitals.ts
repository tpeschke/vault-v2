export interface Vitals {
    selfDoubt: SelfDoubt,
    damage: Damage,
    stress: Stress
}

export interface SelfDoubt {
    dieIndex: number,
    threshold: number,
    diePenalty: number
}

export interface Damage {
    dieIndex: number,
    knockback: number,
    damage: number,
    threshold: number
}

export interface Stress {
    dieIndex: number,
    stress: number,
    threshold: number
}