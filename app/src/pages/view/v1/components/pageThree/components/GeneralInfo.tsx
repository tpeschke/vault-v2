import { GeneralNotesInfo } from '@vault/common/interfaces/v1/pageThree/generalNotesInterfaces'
import TextArea from '../../../../../../components/textArea/TextArea'
import '../PageThree.css'

interface Props {
    generalNotes: GeneralNotesInfo
}

export default function GeneralInfoDisplay({ generalNotes }: Props) {
    const { notes } = generalNotes

    return (
        <>
            <h2>General Info</h2>
            <TextArea lines={53} value={notes} />
        </>
    )
}