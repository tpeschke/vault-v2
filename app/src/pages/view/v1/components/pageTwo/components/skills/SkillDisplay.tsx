import { SkillInfo } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import AdvancedSkillDisplay from './components/AdvancedSkillDisplay'
import LeftColumn from './components/leftColumn/LeftColumn'
import './SkillDisplay.css'

interface Props {
    skillInfo: SkillInfo,
    int: number
}

export default function SkillDisplay({ skillInfo, int }: Props) {
    const { advancedSkills, adepts } = skillInfo

    return (
        <div className='skill-display-shell'>
            <h2>Skills</h2>
            <div>
                <LeftColumn skillInfo={skillInfo} int={int}/>
                <AdvancedSkillDisplay advancedSkills={advancedSkills} adepts={adepts}/>
            </div>
        </div>
    )
}