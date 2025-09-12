import './CombatSkills.css'
import ArmorWorkspace from './components/armorWorkspace/ArmorWorkspace'
import ShieldWorkspace from './components/shieldWorkspace/ShieldWorkspace'
import WeaponWorkspace from './components/weaponWorkspace/WeaponWorkspace'

interface Props {

}

export default function CombatSkillsDisplay({}: Props) {
    return (
        <div className='combat-skills-display-shell'>
            <div className='left'>
                <ArmorWorkspace />
                <ShieldWorkspace />
            </div>
            <div className='right'>
                <CombatSkillsDisplay />
                <div>
                    {/* <WeaponWorkspace />
                    <WeaponWorkspace />
                    <WeaponWorkspace />
                    <WeaponWorkspace /> */}
                </div>
            </div>
        </div>
    )
}