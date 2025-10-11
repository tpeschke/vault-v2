import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import GeneralInfoDisplay from './components/GeneralInfo'
import './PageThree.css'
import { UpdateNotes } from '../../hooks/interfaces/pageThreeInterfaces/generalNotesInterfaces'

interface Props {
    generalNotes: GeneralNotesInfo,
    updateNotes: UpdateNotes,
    isBlank?: boolean
}

export default function PageThree({ generalNotes, updateNotes, isBlank }: Props) {
    return (
        <div className='page-shell page card page-three' id='page-three'>
            <GeneralInfoDisplay generalNotes={generalNotes} updateNotes={updateNotes} isBlank={isBlank}/>
        </div>
    )
}