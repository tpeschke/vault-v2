export default function getSkillSuiteMod(
    skillSuite: string,
    strMod: number,
    dexMod: number,
    conMod: number,
    intMod: number,
    willMod: number,
    preMod: number
): number {
    switch (skillSuite) {
        case 'Athletics':
            return Math.min(strMod, conMod)
        case 'Lore':
            return intMod
        case 'Streetwise':
            return Math.min(willMod, preMod)
        case 'Strategy':
            return Math.min(willMod, preMod)
        case 'Survival':
            return Math.min(conMod, willMod)
        case 'Trades':
            return Math.min(dexMod, intMod)
        case 'Weirdcraft':
            return Math.min(intMod, willMod)
        default:
            return 0
    }
}