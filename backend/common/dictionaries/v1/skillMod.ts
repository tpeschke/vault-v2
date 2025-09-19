export default function getSkillMod(stat: number = 0): number {
    const dictionary: { [key: number]: number } = {
        0: -6,
        1: -6,
        2: -5,
        3: -4,
        4: -3,
        5: -3,
        6: -2,
        7: -2,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 2,
        14: 2,
        15: 3,
        16: 3,
        17: 3,
        18: 4,
        19: 4,
        20: 4,
        21: 5,
        22: 5,
        23: 6
    }

    if (stat > 23) {
        return 6
    }

    if (stat < 0) {
        return 0
    }

    return dictionary[stat]
}