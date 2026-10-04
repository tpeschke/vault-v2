import { Page2 } from "@vault/common/interfaces/v2/pageTypes"
import { emptyCombatSuites, emptyGeneralSuites } from "@vault/common/interfaces/v2/page2/page2Interfaces"

export default function emptyPageType2(pageID: number): Page2 {
    return {
        type: 2,
        pageID,
        generalSuites: emptyGeneralSuites(),
        nativeLanguage: {
            name: '',
            stat: '',
            rank: ''
        },
        armorSkillAdj: 0,
        genSkillDiscount: 0,
        combatSkillDiscount: 0,
        generalSkillNotes: '',
        combatSkillNotes: '',
        advancedGeneralSkills: [],
        combatSuites: emptyCombatSuites(),
        advancedCombatSkills: [],
        abilities: '',
        burdens: ''
    }
}
