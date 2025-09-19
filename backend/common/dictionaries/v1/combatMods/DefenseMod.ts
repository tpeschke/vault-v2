export default function getDefenseMod(dex: number = 0, will: number = 0): number {
    const dexMod = getDexModifier(dex)
    const willMod = getWillModifier(will)

    return dexMod + willMod
}

function getDexModifier(dex: number): number {
    const dictionary: { [key: number]: number } = {
        0: -3,
        1: -3,
        2: -2,
        3: -2,
        4: -1,
        5: -1,
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
        16: 1,
        17: 1,
        18: 1,
        19: 2,
        20: 2,
        21: 2,
        22: 2,
        23: 2
    }

    if (dex > 23) {
        return 2
    }

    if (dex < 0) {
        return -3
    }

    return dictionary[dex]
}

function getWillModifier(will: number): number {
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
        11: 1,
        12: 1,
        13: 1,
        14: 2,
        15: 2,
        16: 3,
        17: 3,
        18: 4,
        19: 4,
        20: 5,
        21: 5,
        22: 5,
        23: 5
    }

    if (will > 23) {
        return 5
    }

    if (will < 0) {
        return -6
    }

    return dictionary[will]
}