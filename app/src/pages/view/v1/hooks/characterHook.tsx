import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { editURL, quickEditURL, viewURL } from "../../../../frontend-config";
import { CharacterHookReturn } from "./interfaces/CharacterHookInterfaces";
import { updateGeneralInfoUtility } from "./utilities/updateUtilities/pageOneUtilities/upperSectionUtilities";
import { GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";
import { ArmorQuickEditModifiers, QuickEditActions, ShieldQuickEditModifiers, WeaponQuickEditModifiers } from '@vault/common/interfaces/v1/quickEdit'
import { useDispatch, useSelector } from "react-redux";
import { updateCatalogInfo } from "../../../../redux/slices/usersCharactersSlice";
import { useNavigate } from "react-router-dom";
import { cacheCharacter, CharacterCacheInfo } from "../../../../redux/slices/characterCacheSlice";
import jsPDF from "jspdf";
import { getWidthAndHeight, getPageImage, getFileName, getPregen } from "./utilities/downloadUtilities";
import getV1Updates from "./v1Updates/getV1Updates";
import { Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";

export default function CharacterHook(pathname: string, isEditing: boolean): CharacterHookReturn {
    const [revertedCharacter, setRevertedCharacter] = useState<CharacterVersion1 | null>(null)
    const [character, setCharacter] = useState<CharacterVersion1 | null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const charactersCache: { [key: number]: CharacterCacheInfo } = useSelector((state: any) => state.charactersCache.characterCache)

    useEffect(() => {
        const [_, baseURL, characterID] = pathname.split('/')

        if (charactersCache[+characterID]) {
            charactersCache[+characterID].characterInfo.then(data => {
                setCharacterInfo(data)
            })
        } else {
            dispatch(cacheCharacter({
                id: +characterID,
                characterInfo: axios.get(viewURL + characterID).then(({ data }) => {
                    if (data.message) {
                        navigate('/')
                    } else {
                        setCharacterInfo(data)
                        return data
                    }
                })
            }))
        }
    }, [pathname])

    const [isDownloading, setIsDownloading] = useState(false)
    const [oldCharacter, setOldCharacter] = useState<CharacterVersion1 | null>(null)

    useEffect(() => {
        if (isDownloading) {
            processDownload()
        }
    }, [isDownloading])

    async function processDownload() {
        const pdf = new jsPDF("p", "mm", "letter");
        const widthAndHeight = getWidthAndHeight(pdf)

        if (character) {
            let promiseArray: any[] = [
                getPageImage('page-0'),
                getPageImage('page-1')
            ]

            if (!character?.generalNotes.isSecret || character.userInfo.ownsThisCharacter) {
                promiseArray.push(getPageImage('page-2'))
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
        setCharacterInfo(revertedCharacter)
    }

    function setCharacterInfo(updateCharacterInfo: CharacterVersion1 | null) {
        setCharacter(updateCharacterInfo)
        setRevertedCharacter(updateCharacterInfo)
    }

    async function saveCharacterToBackend() {
        if (character) {
            const characterToSend = { ...character }
            setCharacter(null)
            const { data } = await axios.post(editURL + characterToSend.id, characterToSend)
            setCharacterInfo(data)
        }
    }

    const [isQuickSaving, setIsQuickSaving] = useState(false)
    const [timeOutID, setTimeOutID] = useState<any | null>(null)

    async function quickBasicQuickSaving(quickEdit: string[], characterID: number, attribute: string, value: string | number | ArmorQuickEditModifiers | ShieldQuickEditModifiers | WeaponQuickEditModifiers) {
        if (!isEditing && quickEdit.includes(attribute)) {
            clearTimeout(timeOutID)
            setTimeOutID(setTimeout(() => {
                setIsQuickSaving(true)
                axios.post(quickEditURL, {
                    characterID,
                    attribute,
                    value
                }).then(_ => {
                    setIsQuickSaving(false)
                })
            }, 500))
        }
    }

    async function quickSavingWithAction(quickEdit: string[], characterID: number, attribute: string, value: Wound | GearObject, action: QuickEditActions): Promise<any> {
        if (!isEditing && quickEdit.includes(attribute)) {
            clearTimeout(timeOutID)

            return new Promise((resolve) => {
                setTimeOutID(setTimeout(() => {
                    setIsQuickSaving(true)
                    axios.post(quickEditURL, {
                        characterID,
                        attribute,
                        value,
                        action
                    }).then(result => {
                        resolve(result)
                        setIsQuickSaving(false)
                    })
                }, 500))
            })
        }
    }

    async function updateGeneralInfo(key: GeneralInfoKeys, value: string | number) {
        if (character) {
            const newCharacter = updateGeneralInfoUtility(character, key, value)
            setCharacterInfo(newCharacter)

            quickBasicQuickSaving(['crpUnspent', 'crpSpent'], character.id, key, value)

            const { id, pageOneInfo } = newCharacter
            const { name, ancestry, class: primaryClass, subclass, level } = pageOneInfo.generalInfo
            dispatch(updateCatalogInfo({ info: { id, name, ancestry, class: primaryClass, subclass, level }, index: 0 }))
        }
    }

    const [{ pageOneUpdateFunctions, pageTwoUpdateFunctions, updateNotes }, setPageOneUpdates] = useState(getV1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving))

    useEffect(() => {
        setPageOneUpdates(getV1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving))
    }, [character])

    return {
        character,
        isDownloading,
        downloadCharacter,
        isQuickSaving,
        updateFunctions: {
            revertCharacter,
            saveCharacterToBackend,
            pageOneUpdateFunctions: {
                updateGeneralInfo,
                ...pageOneUpdateFunctions
            },
            pageTwoUpdateFunctions,
            updateNotes
        }
    }
}