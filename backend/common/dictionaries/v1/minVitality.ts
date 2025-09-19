export default function getMinVitality(con: number = 0): number {
    const dictionary: {[key: number]: number} = {
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 1,
        9: 2,
        10: 2,
        11: 2,
        12: 2,
        13: 2,
        14: 3,
        15: 3,
        16: 4,
        17: 4,
        18: 5,
        19: 5,
        20: 6,
        21: 6,
        22: 6,
        23: 6
    }

    if (con > 23) {
        return 6
    }

    if (con < 0) {
        return 0
    }

    return dictionary[con]
}