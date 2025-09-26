import { CombatStatModifiers } from '@vault/common/interfaces/v1/pageTwo/combatSkills'
import '../CombatSkillsArea.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'

interface Props {
    combatStatModifiers: CombatStatModifiers,
    martialAdepts: number
}

export default function StatsNMartialAdept({ combatStatModifiers, martialAdepts }: Props) {
    const isEditing = useContext(EditingContext)

    const { atk, def, dam, rec } = combatStatModifiers

    return (
        <div className='stats-and-martial-adept-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Atk</strong>
                    <p>{atk}</p>
                </span>
                <span>
                    <strong>Def</strong>
                    <p>{def}</p>
                </span>
                <span>
                    <strong>Dam</strong>
                    <p>{dam}</p>
                </span>
                <span>
                    <strong>Rec</strong>
                    <p>{rec}</p>
                </span>
            </div>
            <span>
                <strong>Martial Adept(s)</strong>
                {isEditing ?
                    <input value={martialAdepts} />
                    :
                    <p>{martialAdepts}</p>
                }
            </span>
        </div>
    )
}