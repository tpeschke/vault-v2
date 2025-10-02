import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { viewURL } from "../../../../frontend-config";
import jsPDF from "jspdf";
import { getFileName, getPageImage, getPregen, getWidthAndHeight } from "./utilities/downloadUtilities";
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { CharacterHookReturn } from "./interfaces/CharacterHookInterfaces";
import { CharacteristicPairObjectsKeys, CharacteristicStringKeys, IntegrityKeys, MovementKeys, PairObject, StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { updateGeneralInfoUtility, updateStatUtility, updateMovementUtility } from "./utilities/updateUtilities/pageOneUtilities/upperColumnUtilities";
import { updateIntegrityInfoUtility, updateCharacteristicStringUtility, insertCharacteristicUtility, updateCharacteristicUtility } from "./utilities/updateUtilities/pageOneUtilities/LeftColumnUtilities";
import { toggleIsThrownUtility, updateFavorInfoUtility } from "./utilities/updateUtilities/pageOneUtilities/rightColumnUtilities";
import { FavorInfoKeys } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

export default function CharacterHook(pathname: string): CharacterHookReturn {
    const [revertedCharacter, setRevertedCharacter] = useState<CharacterVersion1 | null>(null)
    const [character, setCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')
        axios.get(viewURL + characterID).then(({ data }) => {
            setCharacter(data)
            setRevertedCharacter(data)
        })
    }, [pathname])

    const [isDownloading, setIsDownloading] = useState(false)
    const [oldCharacter, setOldCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        if (isDownloading) {
            const pdf = new jsPDF("p", "mm", "letter");
            const widthAndHeight = getWidthAndHeight(pdf)

            if (character) {
                let promiseArray: any[] = []

                promiseArray.push(getPageImage('page-one'))
                promiseArray.push(getPageImage('page-two'))

                if (!character?.generalNotes.isSecret || character.userInfo.ownsThisCharacter) {
                    promiseArray.push(getPageImage('page-three'))
                }

                Promise.all(promiseArray).then(pages => {
                    pdf.addImage(pages[0], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

                    pdf.addPage(widthAndHeight);
                    pdf.addImage(pages[1], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);

                    if (pages[2]) {
                        pdf.addPage(widthAndHeight);
                        pdf.addImage(pages[2], 'jpeg', 0, 0, widthAndHeight[0], widthAndHeight[1] - 5);
                    }

                    const fileName = getFileName(character)

                    pdf.save(`${fileName}.pdf`)

                    if (oldCharacter) {
                        setCharacter(oldCharacter)
                    }

                    setIsDownloading(false)
                })
            }
        }
    }, [isDownloading])

    async function downloadCharacter(isPregen: boolean): Promise<void> {
        if (character) {
            setIsDownloading(true)
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            let oldCharacter: CharacterVersion1 | null = null
            if (isPregen) {
                oldCharacter = { ...character }
                setOldCharacter(oldCharacter)
                setCharacter(getPregen(character))
            }
        }
    }

    function revertCharacter() {
        setCharacter(revertedCharacter)
    }

    function saveCharacterToBackend() {
        // TODO
        console.log(character)
        // send to backend
        // set character to null to showing loading
        // set returned character
        // set revertedCharacter
    }

    function updateGeneralInfo(key: GeneralInfoKeys, value: string | number) {
        if (character) {
            setCharacter(updateGeneralInfoUtility(character, key, value))
        }
    }

    function updateStat(key: StatKeys, value: number) {
        if (character) {
            setCharacter(updateStatUtility(character, key, value))
        }
    }

    function updateMovement(key: MovementKeys, value: number) {
        if (character) {
            setCharacter(updateMovementUtility(character, key, value))
        }
    }

    function updateIntegrityInfo(key: IntegrityKeys, value: number) {
        if (character) {
            setCharacter(updateIntegrityInfoUtility(character, key, value))
        }
    }

    function updateCharacteristicString(key: CharacteristicStringKeys, value: number) {
        if (character) {
            setCharacter(updateCharacteristicStringUtility(character, key, value))
        }
    }

    function insertCharacteristic(characteristic: CharacteristicPairObjectsKeys) {
        return (newObject: PairObject) => {
            if (character) {
                setCharacter(insertCharacteristicUtility(character, characteristic, newObject))
            }
        }
    }

    function updateCharacteristic(characteristic: CharacteristicPairObjectsKeys) {
        return (changedIndex: number, newObject: PairObject) => {
            if (character) {
                setCharacter(updateCharacteristicUtility(character, characteristic, changedIndex, newObject))
            }
        }
    }

    function toggleIsThrown() {
        if (character) {
            setCharacter(toggleIsThrownUtility(character))
        }
    }

    function updateFavorInfo(key: FavorInfoKeys, value: number | boolean) {
        if (character) {
            setCharacter(updateFavorInfoUtility(character, key, value))
        }
    }

    return {
        character,
        downloadCharacter,
        isDownloading,
        updateFunctions: {
            revertCharacter,
            saveCharacterToBackend,
            pageOneUpdateFunction: {
                updateGeneralInfo,
                leftColumnUpdateFunctions: {
                    updateStat,
                    updateMovement,
                    characteristicUpdateFunctions: {
                        updateIntegrityInfo,
                        insertCharacteristic,
                        updateCharacteristic,
                        updateCharacteristicString
                    }
                },
                rightColumnUpdateFunctions: {
                    toggleIsThrown,
                    updateFavorInfo
                }
            }
        }
    }
}