import AdvancedSkillDisplay from './components/AdvancedSkillDisplay'
import LeftColumn from './components/leftColumn/LeftColumn'
import './SkillDisplay.css'

interface Props {

}

export default function SkillDisplay({}: Props) {
    return (
        <div className='skill-display-shell'>
            <h2>Skills</h2>
            <div>
                <LeftColumn />
                <AdvancedSkillDisplay />
            </div>
        </div>
    )
}