import { CharacterVersion1 } from "@vault/common/interfaces/characterInterfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { editURL, quickEditURL, viewURL } from "../../../../frontend-config";
import { AbilitiesNBurdensInfoKeys, GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import { CharacterHookReturn } from "./interfaces/CharacterHookInterfaces";
import { MovementKeys, StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { updateGeneralInfoUtility } from "./utilities/updateUtilities/pageOneUtilities/upperSectionUtilities";
import { GearInfoObjectsKeys, GearObject } from "@vault/common/interfaces/v1/pageTwo/gearInterfaces";
import { insertGearUtility, updateCashUtility, updateGearUtility, updateGearWithID } from "./utilities/updateUtilities/pageTwoUtilities/gearUtilities";
import { insertSkillUtility, updateNativeLanguageUtility, updateSkillAdeptUtility, updateSkillSuiteUtility, updateSkillUtility } from "./utilities/updateUtilities/pageTwoUtilities/skillUtilities";
import { SkillObject } from "@vault/common/interfaces/v1/pageTwo/skillInterfaces";
import { insertCombatSkillUtility, updateCombatSkillSuiteUtility, updateCombatSkillUtility, updateMartialAdeptUtility } from "./utilities/updateUtilities/pageTwoUtilities/combatUtilities/combatSkillUtilities";
import { CombatSkillObject } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills";
import { ArmorInfoObjectKeys, ArmorModifiersInfoKeys, ArmorModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";
import { updateArmorModifierUtility, updateBasicArmorInfoUtility } from "./utilities/updateUtilities/pageTwoUtilities/combatUtilities/armorUtilities";
import { ShieldInfoObjectKeys, ShieldModifiersInfoKeys, ShieldModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces";
import { updateBasicShieldInfoUtility, updateShieldModifierUtility } from "./utilities/updateUtilities/pageTwoUtilities/combatUtilities/shieldUtilities";
import { WeaponInfoObjectKeys, WeaponModifiersInfoKeys, WeaponModifiersObjectKeys } from "@vault/common/interfaces/v1/pageTwo/weaponInterfaces";
import { updateBasicWeaponInfoUtility, updateWeaponModifierUtility } from "./utilities/updateUtilities/pageTwoUtilities/combatUtilities/weaponUtilities";
import { GeneralNotesInfoKeys } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces";
import { ArmorQuickEditModifiers, QuickEditActions, ShieldQuickEditModifiers, WeaponQuickEditModifiers } from '@vault/common/interfaces/v1/quickEdit'
import { updateNotesUtility } from "./utilities/updateUtilities/noteUtilities";
import { useDispatch, useSelector } from "react-redux";
import { updateCatalogInfo } from "../../../../redux/slices/usersCharactersSlice";
import { useNavigate } from "react-router-dom";
import { cacheCharacter, CharacterCacheInfo } from "../../../../redux/slices/characterCacheSlice";
import jsPDF from "jspdf";
import { getWidthAndHeight, getPageImage, getFileName, getPregen } from "./utilities/downloadUtilities";
import getV1Updates from "./v1Updates/getV1Updates";
import { Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

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
            axios.get(viewURL + characterID).then(({ data }) => {
                if (data.message) {
                    navigate('/')
                } else {
                    setCharacterInfo(data)
                    dispatch(cacheCharacter(data))
                }
            })
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

    // ---------------------------------------------------- \\
    // ---------------------- Updates --------------------- \\
    // ---------------------------------------------------- \\


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

    const [{ pageOneUpdateFunctions }, setPageOneUpdates] = useState(getV1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving))

    useEffect(() => {
        setPageOneUpdates(getV1Updates(character, setCharacterInfo, quickSavingWithAction, quickBasicQuickSaving))
    }, [character])

    // ---------------------------------------------------- \\
    // ----------------- Page Two Updates ----------------- \\
    // ---------------------------------------------------- \\

    function updateCash(key: GearInfoObjectsKeys, value: number) {
        if (character) {
            setCharacterInfo(updateCashUtility(character, key, value))

            quickBasicQuickSaving(['copper', 'silver', 'gold', 'platinum'], character.id, key, value)
        }
    }

    function updateGear(changedIndex: number, newGear: GearObject) {
        if (character) {
            setCharacterInfo(updateGearUtility(character, changedIndex, newGear))

            const action: QuickEditActions = newGear.item || newGear.size ? 'update' : 'delete'
            quickSavingWithAction(['equipment'], character.id, 'equipment', newGear, action)
        }
    }

    async function insertGear(newGear: GearObject) {
        if (character) {
            const newCharacter = insertGearUtility(character, newGear)
            setCharacterInfo(newCharacter)

            const { data } = await quickSavingWithAction(['equipment'], newCharacter.id, 'equipment', newGear, 'add')
            setCharacterInfo(updateGearWithID(newCharacter, data))
        }
    }

    function updateSkillAdept(value: number) {
        if (character) {
            setCharacterInfo(updateSkillAdeptUtility(character, value))
        }
    }

    function updateSkillSuite(changedIndex: number, newSkillSuite: SkillObject) {
        if (character) {
            setCharacterInfo(updateSkillSuiteUtility(character, changedIndex, newSkillSuite))
        }
    }

    function updateNativeLanguage(nativeLanguage: SkillObject) {
        if (character) {
            setCharacterInfo(updateNativeLanguageUtility(character, nativeLanguage))
        }
    }

    function insertSkill(newSkill: SkillObject) {
        if (character) {
            setCharacterInfo(insertSkillUtility(character, newSkill))
        }
    }

    function updateSkill(changedIndex: number, newSkill: SkillObject) {
        if (character) {
            setCharacterInfo(updateSkillUtility(character, changedIndex, newSkill))
        }
    }

    function updateMartialAdept(value: number) {
        if (character) {
            setCharacterInfo(updateMartialAdeptUtility(character, value))
        }
    }

    function updateCombatSkillSuite(changedIndex: number, alteredCombatSuite: CombatSkillObject) {
        if (character) {
            setCharacterInfo(updateCombatSkillSuiteUtility(character, changedIndex, alteredCombatSuite))
        }
    }

    function insertCombatSkill(newCombatSkill: CombatSkillObject) {
        if (character) {
            setCharacterInfo(insertCombatSkillUtility(character, newCombatSkill))
        }
    }

    function updateCombatSkill(changedIndex: number, newCombatSkill: CombatSkillObject) {
        if (character) {
            setCharacterInfo(updateCombatSkillUtility(character, changedIndex, newCombatSkill))
        }
    }

    function updateBasicArmorInfo(key: ArmorInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicArmorInfoUtility(character, key, value))
        }
    }

    function updateArmorModifier(modifier: ArmorModifiersInfoKeys, key: ArmorModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateArmorModifierUtility(character, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { def, fat, rec, init } = newCharacter.pageTwoInfo.combatWorkspaceInfo.armorInfo.modifiers
                quickBasicQuickSaving(['armor'], character.id, 'armor', {
                    armorID: newCharacter.pageTwoInfo.combatWorkspaceInfo.armorInfo.id,
                    def: def.misc,
                    fat: fat.misc,
                    rec: rec.misc,
                    init: init.misc,
                    [modifier]: value
                })
            }
        }
    }

    function updateBasicShieldInfo(key: ShieldInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicShieldInfoUtility(character, key, value))
        }
    }

    function updateShieldModifier(modifier: ShieldModifiersInfoKeys, key: ShieldModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateShieldModifierUtility(character, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { def, fat, pry, brk } = newCharacter.pageTwoInfo.combatWorkspaceInfo.shieldInfo.modifiers
                quickBasicQuickSaving(['shield'], character.id, 'shield', {
                    shieldID: newCharacter.pageTwoInfo.combatWorkspaceInfo.shieldInfo.id,
                    def: def.misc,
                    fat: fat.misc,
                    pry: pry.misc,
                    brk: brk.misc,
                    [modifier]: value
                })
            }
        }
    }

    function updateBasicWeaponInfo(changedIndex: number, key: WeaponInfoObjectKeys, value: string | number) {
        if (character) {
            setCharacterInfo(updateBasicWeaponInfoUtility(character, changedIndex, key, value))
        }
    }

    function updateWeaponModifier(changedIndex: number, modifier: WeaponModifiersInfoKeys, key: WeaponModifiersObjectKeys, value: number) {
        if (character) {
            const newCharacter = updateWeaponModifierUtility(character, changedIndex, modifier, key, value)
            setCharacterInfo(newCharacter)

            if (key === 'misc') {
                const { atk, rec, pry, dam } = newCharacter.pageTwoInfo.combatWorkspaceInfo.weaponInfo[changedIndex].modifiers
                quickBasicQuickSaving(['weapon'], character.id, 'weapon', {
                    weaponID: newCharacter.pageTwoInfo.combatWorkspaceInfo.weaponInfo[changedIndex].id,
                    position: changedIndex,
                    atk: atk.misc,
                    rec: rec.misc,
                    pry: pry.misc,
                    dam: dam.misc,
                    [modifier]: value
                })
            }
        }
    }

    // ---------------------------------------------------- \\
    // ---------------- Page Three Updates ---------------- \\
    // ---------------------------------------------------- \\

    function updateNotes(key: GeneralNotesInfoKeys, value: string | boolean) {
        if (character) {
            setCharacterInfo(updateNotesUtility(character, key, value))

            if (typeof value === 'string') {
                quickBasicQuickSaving(['notes'], character.id, key, value)
            }
        }
    }

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
            pageTwoUpdateFunctions: {
                updateCash,
                updateGear,
                insertGear,
                updateSkillInfo: {
                    leftColumnUpdates: {
                        updateSkillAdept,
                        updateSkillSuite,
                        updateNativeLanguage,
                    },
                    insertSkill,
                    updateSkill
                },
                updateCombatInfo: {
                    combatSkillUpdates: {
                        updateMartialAdept,
                        updateCombatSkillSuite,
                        insertCombatSkill,
                        updateCombatSkill
                    },
                    armorUpdates: {
                        updateBasicArmorInfo,
                        updateArmorModifier
                    },
                    shieldUpdates: {
                        updateBasicShieldInfo,
                        updateShieldModifier
                    },
                    weaponUpdates: {
                        updateBasicWeaponInfo,
                        updateWeaponModifier
                    }
                }
            },
            updateNotes
        }
    }
}