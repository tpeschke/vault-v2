export interface CombatInfo {
    defenses: Defense,
    attacks: AttacksArray
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

export type AttacksArray = [Attack, Attack, Attack, Attack]

export interface Attack {
    index: 0 | 1 | 2 | 3,
    name: string,
    measure: number,
    attack: number,
    damage: string,
    type: string,
    recovery: number,
    notes: string
}