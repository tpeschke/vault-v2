import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";

export function toggleIsThrownUtility(character: CharacterVersion1) {
    const [weaponOne, weaponTwo, weaponThree, weaponFour] = character.pageTwoInfo.combatWorkspaceInfo.weaponInfo

    return {
        ...character,
        pageTwoInfo: {
            ...character.pageTwoInfo,
            combatWorkspaceInfo: {
                ...character.pageTwoInfo.combatWorkspaceInfo,
                weaponInfo: [
                    weaponOne, weaponTwo, weaponThree,
                    {
                        ...weaponFour,
                        isThrown: !weaponFour.isThrown
                    }
                ]
            }
        }
    }
}