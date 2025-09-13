import './CombatInfo.css'
import ArmorWorkspace from './components/armorWorkspace/ArmorWorkspace'
import CombatSkillsArea from './components/combatSkillsArea/CombatSkillsArea'
import ShieldWorkspace from './components/shieldWorkspace/ShieldWorkspace'
import WeaponWorkspace from './components/weaponWorkspace/WeaponWorkspace'

interface Props {

}

export default function CombatInfoDisplay({}: Props) {
    return (
        <div className='combat-skills-display-shell'>
            <div className='left'>
                <ArmorWorkspace />
                <ShieldWorkspace />
            </div>
            <div className='right'>
                <CombatSkillsArea />
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