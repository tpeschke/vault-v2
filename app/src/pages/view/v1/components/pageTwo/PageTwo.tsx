import CombatInfoDisplay from './components/combatSkills/CombatInfo'
import GearDisplay from './components/gearDisplay/GearDisplay'
import SkillDisplay from './components/skills/SkillDisplay'
import './PageTwo.css'

interface Props {

}

export default function PageTwo({}: Props) {
    return (
        <div className='page-shell page card page-two'>
            <GearDisplay />
            <SkillDisplay />
            <CombatInfoDisplay />
        </div>
    )
}