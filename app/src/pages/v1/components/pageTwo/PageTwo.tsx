import { PageTwoInfo } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import CombatInfoDisplay from './components/combatSkills/CombatInfo'
import GearDisplay from './components/gearDisplay/GearDisplay'
import SkillDisplay from './components/skills/SkillDisplay'
import './PageTwo.css'
import { PageTwoUpdates } from '../../hooks/interfaces/pageTwoInterfaces/UpdateExportInterfaces'

interface Props {
    pageTwoInfo: PageTwoInfo,
    int: number,
    pageTwoUpdateFunctions: PageTwoUpdates
}

export default function PageTwo({ pageTwoInfo, int, pageTwoUpdateFunctions }: Props) {
    const { gearInfo, skillInfo, combatWorkspaceInfo } = pageTwoInfo
    const { updateCash, updateGear, insertGear, updateSkillInfo, updateCombatInfo } = pageTwoUpdateFunctions

    return (
        <div className='page-shell page card page-two' id='page-1'>
            <GearDisplay gearInfo={gearInfo} updateCash={updateCash} updateGear={updateGear} insertGear={insertGear}/>
            <SkillDisplay skillInfo={skillInfo} int={int} updateSkillInfo={updateSkillInfo}/>
            <CombatInfoDisplay combatWorkspaceInfo={combatWorkspaceInfo} int={int} updateCombatInfo={updateCombatInfo}/>
        </div>
    )
}