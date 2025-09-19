export default function getAttackMod(dex: number = 0, int: number = 0): number {
    const dexMod = getDexModifier(dex)
    const intMod = getIntModifier(int)

    return dexMod + intMod
}

function getDexModifier(dex: number): number {
    const dictionary: { [key: number]: number } = {
        0: -3,
        1: -3,
        2: -3,
        3: -3,
        4: -2,
        5: -2,
        6: -1,
        7: -1,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 1,
        14: 1,
        15: 1,
        16: 2,
        17: 2,
        18: 2,
        19: 2,
        20: 2,
        21: 3,
        22: 3,
        23: 3
    }

    if (dex > 23) {
        return 3
    }

    if (dex < 0) {
        return -3
    }

    return dictionary[dex]
}

function getIntModifier(int: number): number {
    const dictionary: { [key: number]: number } = {
        0: -6,
        1: -6,
        2: -5,
        3: -4,
        4: -3,
        5: -2,
        6: -1,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 1,
        13: 2,
        14: 2,
        15: 2,
        16: 3,
        17: 3,
        18: 4,
        19: 4,
        20: 4,
        21: 5,
        22: 5,
        23: 6
    }

    if (int > 23) {
        return 6
    }

    if (int < 0) {
        return -6
    }

    return dictionary[int]
}