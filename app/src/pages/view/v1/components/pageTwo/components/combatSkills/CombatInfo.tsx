import { CombatWorkspaceInfo } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import './CombatInfo.css'
import ArmorWorkspace from './components/armorWorkspace/ArmorWorkspace'
import CombatSkillsArea from './components/combatSkillsArea/CombatSkillsArea'
import ShieldWorkspace from './components/shieldWorkspace/ShieldWorkspace'
import WeaponWorkspace from './components/weaponWorkspace/WeaponWorkspace'
import { CombatUpdates } from '../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'

interface Props {
    combatWorkspaceInfo: CombatWorkspaceInfo,
    int: number,
    updateCombatInfo: CombatUpdates
}

export default function CombatInfoDisplay({ combatWorkspaceInfo, int, updateCombatInfo }: Props) {
    const { armorInfo, shieldInfo, weaponInfo, combatSkillInfo } = combatWorkspaceInfo
    const { combatSkillUpdates } = updateCombatInfo
    
    const [weapon1, weapon2, weapon3, weapon4] = weaponInfo

    return (
        <div className='combat-skills-display-shell'>
            <div className='left'>
                <ArmorWorkspace armorInfo={armorInfo} />
                <ShieldWorkspace shieldInfo={shieldInfo} />
            </div>
            <div className='right'>
                <CombatSkillsArea combatSkillInfo={combatSkillInfo} int={int} combatSkillUpdates={combatSkillUpdates} />
                <h3>Weapon Workspaces</h3>
                <div>
                    <WeaponWorkspace weaponInfo={weapon1} />
                    <WeaponWorkspace weaponInfo={weapon2} />
                    <WeaponWorkspace weaponInfo={weapon3} />
                    <WeaponWorkspace weaponInfo={weapon4} isRanged={true}/>
                </div>
            </div>
        </div>
    )
}