import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import GeneralInfoDisplay from './components/GeneralInfo'
import './PageThree.css'

interface Props {
    generalNotes: GeneralNotesInfo
}

export default function PageThree({ generalNotes}: Props) {
    return (
        <div className='page-shell page card page-three' id='page-three'>
            <GeneralInfoDisplay generalNotes={generalNotes}/>
        </div>
    )
}