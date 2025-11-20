export interface CombatInfo {
    defenses: Defense,
    attacks: Attack[]
}

export interface Defense {
    name: string,
    initiative: number,
    defense: number,
    parry: number,
    flanks: number,
    cover: string,
    parryDR: string,
    dr: string,
    notes: string
}

export interface Attack {
    name: string,
    measure: number,
    attack: number,
    damage: string,
    type: string,
    recovery: number,
    notes: string,
}