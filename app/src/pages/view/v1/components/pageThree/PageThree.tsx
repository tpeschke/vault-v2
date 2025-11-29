import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import GeneralInfoDisplay from './components/GeneralInfo'
import './PageThree.css'
import { UpdateNotes } from '../../hooks/interfaces/pageThreeInterfaces/generalNotesInterfaces'

interface Props {
    generalNotes: GeneralNotesInfo,
    updateNotes: UpdateNotes,
    canEdit?: boolean
}

export default function PageThree({ generalNotes, updateNotes, canEdit }: Props) {
    return (
        <div className='page-shell page card page-three' id='page-2'>
            <GeneralInfoDisplay generalNotes={generalNotes} updateNotes={updateNotes} canEdit={canEdit}/>
        </div>
    )
}