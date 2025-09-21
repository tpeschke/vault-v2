import { CombatWorkspaceInfo } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import './CombatInfo.css'
import ArmorWorkspace from './components/armorWorkspace/ArmorWorkspace'
import CombatSkillsArea from './components/combatSkillsArea/CombatSkillsArea'
import ShieldWorkspace from './components/shieldWorkspace/ShieldWorkspace'
import WeaponWorkspace from './components/weaponWorkspace/WeaponWorkspace'

interface Props {
    combatWorkspaceInfo: CombatWorkspaceInfo,
    int: number
}

export default function CombatInfoDisplay({ combatWorkspaceInfo, int }: Props) {
    const { armorInfo, shieldInfo, weaponInfo, combatSkillInfo } = combatWorkspaceInfo

    return (
        <div className='combat-skills-display-shell'>
            <div className='left'>
                <ArmorWorkspace armorInfo={armorInfo}/>
                <ShieldWorkspace shieldInfo={shieldInfo}/>
            </div>
            <div className='right'>
                <CombatSkillsArea combatSkillInfo={combatSkillInfo} int={int}/>
                <h3>Weapon Workspaces</h3>
                <div>
                    <WeaponWorkspace />
                    <WeaponWorkspace />
                    <WeaponWorkspace />
                    <WeaponWorkspace />
                </div>
            </div>
        </div>
    )
}