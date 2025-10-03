import { SkillInfo } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import './LeftColumn.css'
import CheckModsDisplay from './components/CheckMods'
import SkillSuitesDisplay from './components/SkillSuites'
import { SkillLeftColumnUpdates } from '../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateGearInterfaces'

interface Props {
    skillInfo: SkillInfo,
    int: number,
    leftColumnUpdates: SkillLeftColumnUpdates
}

export default function LeftColumn({ skillInfo, int, leftColumnUpdates }: Props) {
    const { checkMods, adepts, skillSuites, nativeLanguage } = skillInfo
    const { updateSkillAdept, updateSkillSuite, updateNativeLanguage } = leftColumnUpdates

    return (
        <div className='skill-column skill-left-column-shell'>
            <CheckModsDisplay checkMods={checkMods} adepts={adepts} updateSkillAdept={updateSkillAdept} />
            <SkillSuitesDisplay
                skillSuites={skillSuites}
                nativeLanguage={nativeLanguage}
                adepts={adepts}
                int={int}
                updateSkillSuite={updateSkillSuite}
                updateNativeLanguage={updateNativeLanguage}
            />
        </div>
    )
}