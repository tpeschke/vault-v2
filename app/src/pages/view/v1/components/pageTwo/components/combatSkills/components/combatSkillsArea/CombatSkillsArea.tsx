import './CombatSkillsArea.css'
import CombatAdvSkills from './components/CombatAdvSkills'
import CombatSkillSuites from './components/CombatSkillSuites'
import StatsNMartialAdept from './components/StatsNMartialAdept'

interface Props {

}

export default function CombatSkillsArea({}: Props) {
    return (
        <div className='combat-skills-area-shell'>
            <div>
                <StatsNMartialAdept />
                {/* <CombatSkillSuites /> */}
            </div>
            {/* <CombatAdvSkills /> */}
        </div>
    )
}