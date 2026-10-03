import { useContext } from 'react'
import './Sidebar.css'
import EditingContext from '../../contexts/EditingContext'
import LoadingIndicator from '../../../../components/loading/components/LoadingIndicator'

interface Props {
    saveCharacter: () => void,
    revertCharacterToUnedited: () => void,
    toggleIsEditing: () => void,
    ownsThisCharacter: boolean
    isViewSaving: boolean
}

export default function Sidebar({
    saveCharacter,
    revertCharacterToUnedited,
    toggleIsEditing,
    ownsThisCharacter,
    isViewSaving
}: Props) {
    const isEditing = useContext(EditingContext)

    if (isViewSaving) {
        return (
            <div className='sidebar-shell'>
                <LoadingIndicator stylings='' secondary={true} />
            </div>
        )
    }

    return (
        <div className='sidebar-shell'>
            {isEditing &&
                <>
                    <button onClick={saveCharacter}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                    <button onClick={revertCharacterToUnedited}><i className="fa-solid fa-arrow-rotate-left"></i> Revert</button>
                </>
            }
            {!isEditing &&
                <>
                    {ownsThisCharacter && <button onClick={toggleIsEditing}><i className="fa-solid fa-pen-nib"></i> Edit</button>}
                </>
            }
        </div>
    )
}
