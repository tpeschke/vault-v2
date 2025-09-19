export default function getMinNerve(will: number = 0): number {
    const dictionary: { [key: number]: number } = {
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 1,
        8: 2,
        9: 2,
        10: 2,
        11: 2,
        12: 2,
        13: 2,
        14: 3,
        15: 3,
        16: 3,
        17: 3,
        18: 3,
        19: 4,
        20: 4,
        21: 4,
        22: 4,
        23: 4,
    }

    if (will > 23) {
        return 6
    }

    if (will < 0) {
        return 0
    }

    return dictionary[will]
}