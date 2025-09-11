import './LeftColumn.css'
import CheckModsDisplay from './components/CheckMods'
import SkillSuitesDisplay from './components/SkillSuites'

interface Props {

}

export default function LeftColumn({}: Props) {
    return (
        <div className='skill-column skill-left-column-shell'>
            <CheckModsDisplay />
            <SkillSuitesDisplay />
        </div>
    )
}