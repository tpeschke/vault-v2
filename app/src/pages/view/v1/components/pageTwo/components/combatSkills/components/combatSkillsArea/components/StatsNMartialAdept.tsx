import '../CombatSkillsArea.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'
import { UpdateMartialAdeptFunction } from '../../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces'
import { CombatStatModifiers } from '@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills'

interface Props {
    combatStatModifiers?: CombatStatModifiers,
    martialAdepts?: number,
    updateMartialAdept: UpdateMartialAdeptFunction
}

export default function StatsNMartialAdept({ combatStatModifiers, martialAdepts, updateMartialAdept }: Props) {
    const isEditing = useContext(EditingContext)

    if (combatStatModifiers) {
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
                        <input type='number' onChange={(event: any) => updateMartialAdept(+event.target.value)} value={martialAdepts} />
                        :
                        <p>{martialAdepts}</p>
                    }
                </span>
            </div>
        )
    }

    return (
        <div className='stats-and-martial-adept-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Atk</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Def</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Dam</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Rec</strong>
                    <p> </p>
                </span>
            </div>
            <span>
                <strong>Martial Adept(s)</strong>
                <p> </p>
            </span>
        </div>
    )
}