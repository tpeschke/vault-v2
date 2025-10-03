import { SkillInfo } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import AdvancedSkillDisplay from './components/AdvancedSkillDisplay'
import LeftColumn from './components/leftColumn/LeftColumn'
import './SkillDisplay.css'
import { SkillUpdates } from '../../../../hooks/interfaces/pageTwoInterfaces/UpdateSkillInterfaces'

interface Props {
    skillInfo: SkillInfo,
    int: number,
    updateSkillInfo: SkillUpdates
}

export default function SkillDisplay({ skillInfo, int, updateSkillInfo }: Props) {
    const { advancedSkills, adepts } = skillInfo
    const { leftColumnUpdates, insertSkill, updateSkill } = updateSkillInfo

    return (
        <div className='skill-display-shell'>
            <h2>Skills</h2>
            <div>
                <LeftColumn skillInfo={skillInfo} int={int} leftColumnUpdates={leftColumnUpdates}/>
                <AdvancedSkillDisplay advancedSkills={advancedSkills} adepts={adepts} insertSkill={insertSkill} updateSkill={updateSkill} />
            </div>
        </div>
    )
}