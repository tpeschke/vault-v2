import { AbilitiesNBurdensInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import DisplayTextArea from '../../../../../../../components/textArea/DisplayTextArea'
import './AbilitiesNBurdensDisplay.css'

interface Props {
    abilitiesNBurdensInfo: AbilitiesNBurdensInfo
}

export default function AbilitiesNBurdensDisplay({ abilitiesNBurdensInfo }: Props) {
    const { abilityOne, abilityTwo, burdens, removedAbility } = abilitiesNBurdensInfo

    const abilityLines = 9

    const value = `- When resisting a spell, you, and any ally 
    within 5 ft, gain an automatic -1 to the Order. 
    - When Shaping a spell on yourself, or ally within 5 ft, gain an automatic +1 to the Order. 
    - Half Stress from Weirdcraft Skills.`

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
                <DisplayTextArea lines={8} value={burdens}/>
                <span className='removed-shell'>
                    <strong>Removed Ability</strong>
                    <p>{removedAbility}</p>
                </span>
            </div>
        </div>
    )
}