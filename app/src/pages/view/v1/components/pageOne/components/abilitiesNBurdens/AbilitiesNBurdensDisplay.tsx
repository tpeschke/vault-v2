import DisplayTextArea from '../../../../../../../components/textArea/DisplayTextArea'
import './AbilitiesNBurdensDisplay.css'

interface Props {

}

export default function AbilitiesNBurdensDisplay({ }: Props) {
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
                    <DisplayTextArea lines={abilityLines} value={value} />
                    <DisplayTextArea lines={abilityLines} />
                </div>
            </div>
            <div>
                <h2>Burdens, Injuries & Drawback</h2>
                <DisplayTextArea lines={8} />
                <span className='removed-shell'>
                    <strong>Removed Ability</strong>
                    <p>:)</p>
                </span>
            </div>
        </div>
    )
}