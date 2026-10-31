import { useContext } from 'react'
import './Sidebar.css'
import EditingContext from '../../contexts/EditingContext'
import BlankContext from '../../contexts/BlankContext'
import LoadingIndicator from '../../../../components/loading/components/LoadingIndicator'

interface Props {
    saveCharacter: () => void,
    revertCharacterToUnedited: () => void,
    toggleIsEditing: () => void,
    toggleViewQuickEdit: () => void,
    viewQuickEdit: boolean,
    ownsThisCharacter: boolean
    isViewSaving: boolean,
    onDownload: () => void,
    isDownloading: boolean
}

export default function Sidebar({
    saveCharacter,
    revertCharacterToUnedited,
    toggleIsEditing,
    toggleViewQuickEdit,
    viewQuickEdit,
    ownsThisCharacter,
    isViewSaving,
    onDownload,
    isDownloading
}: Props) {
    const isEditing = useContext(EditingContext)
    const isBlank = useContext(BlankContext)

    if (isViewSaving) {
        return (
            <div className='sidebar-shell'>
                <LoadingIndicator stylings='' secondary={true} />
            </div>
        )
    }

    return (
        <div className='sidebar-shell'>
            {!isBlank && isEditing &&
                <>
                    <button onClick={saveCharacter}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                    <button onClick={revertCharacterToUnedited}><i className="fa-solid fa-arrow-rotate-left"></i> Revert</button>
                </>
            }
            {!isEditing &&
                <>
                    {!isBlank && ownsThisCharacter && <button onClick={toggleIsEditing} disabled={isDownloading}><i className="fa-solid fa-pen-nib"></i> Edit</button>}
                    <button onClick={onDownload} disabled={isDownloading}><i className="fa-solid fa-download"></i> Download</button>
                    {!isBlank && (viewQuickEdit ?
                        <button onClick={toggleViewQuickEdit} disabled={isDownloading}><i className="fa-solid fa-eye-slash"></i> Hide Quick Edit Locations</button>
                        :
                        <button onClick={toggleViewQuickEdit} disabled={isDownloading}><i className="fa-solid fa-eye"></i> Show Quick Edit Locations</button>
                    )}
                </>
            }
        </div>
    )
}
