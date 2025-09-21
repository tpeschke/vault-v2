import { SkillInfo } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import './LeftColumn.css'
import CheckModsDisplay from './components/CheckMods'
import SkillSuitesDisplay from './components/SkillSuites'

interface Props {
    skillInfo: SkillInfo,
    int: number
}

export default function LeftColumn({ skillInfo, int }: Props) {
    const { checkMods, adepts, skillSuites, nativeLanguage} = skillInfo

    return (
        <div className='skill-column skill-left-column-shell'>
            <CheckModsDisplay checkMods={checkMods} adepts={adepts}/>
            <SkillSuitesDisplay skillSuites={skillSuites} nativeLanguage={nativeLanguage} adepts={adepts} int={int}/>
        </div>
    )
}