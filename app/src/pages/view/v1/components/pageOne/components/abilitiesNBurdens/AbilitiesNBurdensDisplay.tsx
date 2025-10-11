import { AbilitiesNBurdensInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import DisplayTextArea from '../../../../../../../components/textArea/DisplayTextArea'
import './AbilitiesNBurdensDisplay.css'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { UpdateAbilitiesFunction } from '../../../../hooks/interfaces/pageOneInterfaces/UpdateRightColumnInterfaces'

interface Props {
    abilitiesNBurdensInfo: AbilitiesNBurdensInfo,
    updateAbilities: UpdateAbilitiesFunction
}

export default function AbilitiesNBurdensDisplay({ abilitiesNBurdensInfo, updateAbilities }: Props) {
    const isEditing = useContext(EditingContext)

    const { abilityOne, abilityTwo, burdens, removedAbility } = abilitiesNBurdensInfo

    const abilityLines = 9

    return (
        <div className='abilities-and-burdens-shell'>
            <div>
                <h2>Class/Ancestral Abilities & Trainings</h2>
                <div className='abilities-shell'>
                    <DisplayTextArea lines={abilityLines} value={abilityOne} onChange={(event: any) => updateAbilities('abilityOne', event.target.value)} />
                    <DisplayTextArea lines={abilityLines} value={abilityTwo} onChange={(event: any) => updateAbilities('abilityTwo', event.target.value)} />
                </div>
            </div>
            <div>
                <h2>Burdens, Injuries & Drawback</h2>
                <DisplayTextArea lines={8} value={burdens} onChange={(event: any) => updateAbilities('burdens', event.target.value)} />
                <span className='removed-shell'>
                    <strong>Removed Ability</strong>
                    {isEditing ?
                        <input value={removedAbility} onChange={(event: any) => updateAbilities('removedAbility', event.target.value)} />
                        :
                        <p>{removedAbility}</p>
                    }
                </span>
            </div>
        </div>
    )
}