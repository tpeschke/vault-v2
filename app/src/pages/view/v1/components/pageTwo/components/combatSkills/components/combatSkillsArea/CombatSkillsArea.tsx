import './CombatSkillsArea.css'
import CombatAdvSkills from './components/CombatAdvSkills'
import CombatSkillSuites from './components/CombatSkillSuites'
import StatsNMartialAdept from './components/StatsNMartialAdept'
import { CombatSkillUpdates } from '../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'
import { CombatSkillsInfo } from '@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills'

interface Props {
    combatSkillInfo: CombatSkillsInfo,
    int?: number,
    combatSkillUpdates: CombatSkillUpdates
}

export default function CombatSkillsArea({ combatSkillInfo, int, combatSkillUpdates }: Props) {
    const { combatStatModifiers, martialAdepts, combatSkillSuites, combatAdvSkills} = combatSkillInfo
    const { updateMartialAdept, updateCombatSkillSuite, insertCombatSkill, updateCombatSkill } = combatSkillUpdates

    return (
        <div className='combat-skills-area-shell'>
            <div>
                <StatsNMartialAdept combatStatModifiers={combatStatModifiers} martialAdepts={martialAdepts} updateMartialAdept={updateMartialAdept}/>
                <CombatSkillSuites combatSkillSuites={combatSkillSuites} martialAdepts={martialAdepts} int={int} updateCombatSkillSuite={updateCombatSkillSuite}/>
            </div>
            <CombatAdvSkills combatAdvSkills={combatAdvSkills} martialAdepts={martialAdepts} insertCombatSkill={insertCombatSkill} updateCombatSkill={updateCombatSkill}/>
        </div>
    )
}