import { AbilitiesNBurdensInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import DisplayTextArea from '../../../../../../../components/textArea/DisplayTextArea'
import './AbilitiesNBurdensDisplay.css'
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import TextArea from '../../../../../../../components/textArea/TextArea'

interface Props {
    abilitiesNBurdensInfo: AbilitiesNBurdensInfo
}

export default function AbilitiesNBurdensDisplay({ abilitiesNBurdensInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { abilityOne, abilityTwo, burdens, removedAbility } = abilitiesNBurdensInfo

    const abilityLines = 9

    return (
        <div className='abilities-and-burdens-shell'>
            <div>
                <h2>Class/Ancestral Abilities & Trainings</h2>
                <div className='abilities-shell'>
                    <DisplayTextArea lines={abilityLines} value={abilityOne} />
                    <DisplayTextArea lines={abilityLines} value={abilityTwo} />
                </div>
            </div>
            <div>
                <h2>Burdens, Injuries & Drawback</h2>
                <DisplayTextArea lines={8} value={burdens} />
                <span className='removed-shell'>
                    <strong>Removed Ability</strong>
                    {isEditing ?
                        <input value={removedAbility} />
                        :
                        <p>{removedAbility}</p>
                    }
                </span>
            </div>
        </div>
    )
}