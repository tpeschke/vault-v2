export default function getRecoveryMod(str: number = 0): number {
    const dictionary: { [key: number]: number } = {
        0: -1.5,
        1: -1.5,
        2: -1,
        3: -1,
        4: -1,
        5: -.5,
        6: -.5,
        7: -.5,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: .5,
        13: .5,
        14: .5,
        15: .5,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1.5,
        21: 1.5,
        22: 1.5,
        23: 2
    }

    if (str > 23) {
        return 2
    }

    if (str < 0) {
        return -1.5
    }

    return dictionary[str]
}