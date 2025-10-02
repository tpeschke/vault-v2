import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import { FavorInfoKeys } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

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

export function updateFavorInfoUtility(character: CharacterVersion1, key: FavorInfoKeys, value: number | boolean) {
    return {
        ...character,
        pageOneInfo: {
            ...character.pageOneInfo,
            rightColumnInfo: {
                ...character.pageOneInfo.rightColumnInfo,
                favorInfo: {
                    ...character.pageOneInfo.rightColumnInfo.favorInfo,
                    [key]: value
                }
            }
        }
    }
}