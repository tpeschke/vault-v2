export default function getCarry(str: number = 0): number {
    const dictionary: { [key: number]: number } = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 9,
        11: 0,
        12: 1,
        13: 3,
        14: 5,
        15: 7,
        16: 9,
        17: 7,
        18: 0,
        19: 3,
        20: 6,
        21: 9,
        22: 2,
        23: 5,
    }

    if (str > 23) {
        return 45
    }

    if (str < 0) {
        return 0
    }

    return dictionary[str]
}