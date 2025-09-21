import { CombatSkillsInfo } from '@vault/common/interfaces/v1/pageTwo/combatSkills'
import './CombatSkillsArea.css'
import CombatAdvSkills from './components/CombatAdvSkills'
import CombatSkillSuites from './components/CombatSkillSuites'
import StatsNMartialAdept from './components/StatsNMartialAdept'

interface Props {
    combatSkillInfo: CombatSkillsInfo,
    int: number
}

export default function CombatSkillsArea({ combatSkillInfo, int }: Props) {
    const { combatStatModifiers, martialAdepts, combatSkillSuites, combatAdvSkills} = combatSkillInfo

    return (
        <div className='combat-skills-area-shell'>
            <div>
                <StatsNMartialAdept combatStatModifiers={combatStatModifiers} martialAdepts={martialAdepts}/>
                <CombatSkillSuites combatSkillSuites={combatSkillSuites} martialAdepts={martialAdepts} int={int}/>
            </div>
            <CombatAdvSkills combatAdvSkills={combatAdvSkills} martialAdepts={martialAdepts}/>
        </div>
    )
}