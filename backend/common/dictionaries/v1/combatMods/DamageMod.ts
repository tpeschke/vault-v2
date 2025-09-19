export default function getDamageMod(str: number = 0): number {
    const dictionary: { [key: number]: number } = {
        0: -5,
        1: -5,
        2: -4,
        3: -3,
        4: -2,
        5: -2,
        6: -2,
        7: -2,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 2,
        14: 2,
        15: 2,
        16: 3,
        17: 3,
        18: 3,
        19: 4,
        20: 4,
        21: 4,
        22: 4,
        23: 5
    }

    if (str > 23) {
        return 5
    }

    if (str < 0) {
        return -5
    }

    return dictionary[str]
}