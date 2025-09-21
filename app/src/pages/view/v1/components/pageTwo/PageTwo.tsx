import { PageTwoInfo } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import CombatInfoDisplay from './components/combatSkills/CombatInfo'
import GearDisplay from './components/gearDisplay/GearDisplay'
import SkillDisplay from './components/skills/SkillDisplay'
import './PageTwo.css'

interface Props {
    pageTwoInfo: PageTwoInfo
}

export default function PageTwo({ pageTwoInfo }: Props) {
    const { gearInfo, skillInfo, combatWorkspaceInfo } = pageTwoInfo

    return (
        <div className='page-shell page card page-two'>
            <GearDisplay gearInfo={gearInfo}/>
            <SkillDisplay skillInfo={skillInfo}/>
            <CombatInfoDisplay />
        </div>
    )
}