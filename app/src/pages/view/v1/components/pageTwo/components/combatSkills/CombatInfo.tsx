import { CombatWorkspaceInfo } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import './CombatInfo.css'
import ArmorWorkspace from './components/armorWorkspace/ArmorWorkspace'
import CombatSkillsArea from './components/combatSkillsArea/CombatSkillsArea'
import ShieldWorkspace from './components/shieldWorkspace/ShieldWorkspace'
import WeaponWorkspace from './components/weaponWorkspace/WeaponWorkspace'
import { CombatUpdates } from '../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'

interface Props {
    combatWorkspaceInfo: CombatWorkspaceInfo,
    int?: number,
    updateCombatInfo: CombatUpdates
}

export default function CombatInfoDisplay({ combatWorkspaceInfo, int, updateCombatInfo }: Props) {
    const { armorInfo, shieldInfo, weaponInfo, combatSkillInfo } = combatWorkspaceInfo
    const { combatSkillUpdates, armorUpdates, shieldUpdates, weaponUpdates } = updateCombatInfo
    
    const [weapon1, weapon2, weapon3, weapon4] = weaponInfo

    return (
        <div className='combat-skills-display-shell'>
            <div className='left'>
                <ArmorWorkspace armorInfo={armorInfo} armorUpdates={armorUpdates}/>
                <ShieldWorkspace shieldInfo={shieldInfo} shieldUpdates={shieldUpdates} />
            </div>
            <div className='right'>
                <CombatSkillsArea combatSkillInfo={combatSkillInfo} int={int} combatSkillUpdates={combatSkillUpdates} />
                <h3>Weapon Workspaces</h3>
                <div>
                    <WeaponWorkspace weaponInfo={weapon1} index={0} weaponUpdates={weaponUpdates}/>
                    <WeaponWorkspace weaponInfo={weapon2} index={1} weaponUpdates={weaponUpdates}/>
                    <WeaponWorkspace weaponInfo={weapon3} index={2} weaponUpdates={weaponUpdates}/>
                    <WeaponWorkspace weaponInfo={weapon4} index={3} isRanged={true} weaponUpdates={weaponUpdates}/>
                </div>
            </div>
        </div>
    )
}