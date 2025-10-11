import { useContext, useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import LoadingIndicator from '../../../components/loading/components/LoadingIndicator'
import { DownloadCharacterFunction, UpdateFunctions } from './hooks/interfaces/CharacterHookInterfaces'
import EditingContext from './contexts/EditingContext'

interface Props {
    character: CharacterVersion1,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean,
    updateFunctions: UpdateFunctions,
    toggleIsEditing: () => void,
    saveCharacter: () => void,
    revertCharacterToUnedited: () => void,
    isQuickSaving: boolean
}

export default function ViewVersionOne({
    character,
    downloadCharacter,
    isDownloading,
    updateFunctions,
    toggleIsEditing,
    saveCharacter,
    revertCharacterToUnedited,
    isQuickSaving
}: Props) {
    const isEditing = useContext(EditingContext)
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    function prepAndDownload(isPregen: boolean) {
        setViewQuickEdit(false)
        downloadCharacter(isPregen)
    }

    const { pageOneUpdateFunctions, pageTwoUpdateFunctions, updateNotes } = updateFunctions

    const { pageOneInfo, pageTwoInfo, generalNotes, userInfo } = character
    const { ownsThisCharacter } = userInfo

    const int = pageOneInfo?.leftColumnInfo.statInfo?.int

    const showNotes = !generalNotes.isSecret || ownsThisCharacter

    return (
        <>
            {isDownloading && (
                <div className='download-banner'>
                    <h1>Downloading</h1>
                    <LoadingIndicator stylings={''} secondary={true} />
                </div>
            )}
            <div className='version-one-shell'>
                <div className={`page-shell ${viewQuickEdit ? 'view-quick-edit' : ''} ${isEditing ? 'view-edit' : ''}`}>
                    <PageOne pageOneInfo={pageOneInfo} pageOneUpdateFunctions={pageOneUpdateFunctions} />
                    <PageTwo pageTwoInfo={pageTwoInfo} int={int} pageTwoUpdateFunctions={pageTwoUpdateFunctions} />
                    {showNotes && <PageThree generalNotes={generalNotes} updateNotes={updateNotes} isBlank={generalNotes.notes === undefined} />}
                </div>
                {!isDownloading &&
                    <Sidebar
                        toggleViewQuickEdit={toggleViewQuickEdit}
                        viewQuickEdit={viewQuickEdit}
                        prepAndDownload={prepAndDownload}
                        toggleIsEditing={toggleIsEditing}
                        saveCharacter={saveCharacter}
                        revertCharacterToUnedited={revertCharacterToUnedited}
                        ownsThisCharacter={ownsThisCharacter}
                        isQuickSaving={isQuickSaving}
                    />}
            </div>
        </>
    )
}