import { useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import LoadingIndicator from '../../../components/loading/components/LoadingIndicator'
import EditingContext from './contexts/EditingContext'
import { DownloadCharacterFunction, UpdateFunctions } from './hooks/interfaces/CharacterHookInterfaces'

interface Props {
    character: CharacterVersion1,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean,
    updateFunctions: UpdateFunctions
}

export default function ViewVersionOne({ character, downloadCharacter, isDownloading, updateFunctions }: Props) {
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    const [isEditing, setIsEditing] = useState(true)

    const toggleIsEditing = () => {
        setIsEditing(!isEditing)
    }

    function prepAndDownload(isPregen: boolean) {
        setViewQuickEdit(false)
        downloadCharacter(isPregen)
    }

    const { pageOneInfo, pageTwoInfo, generalNotes, userInfo } = character
    const { ownsThisCharacter } = userInfo

    const { pageOneUpdateFunction } = updateFunctions

    const { int } = pageOneInfo.leftColumnInfo.statInfo

    const showNotes = !generalNotes.isSecret || ownsThisCharacter

    return (
        <>
            {isDownloading && (
                <div className='download-banner'>
                    <h1>Downloading</h1>
                    <LoadingIndicator stylings={''} secondary={true} />
                </div>
            )}
            <EditingContext value={isEditing}>
                <div className='version-one-shell'>
                    <div className={`page-shell ${viewQuickEdit ? 'view-quick-edit' : ''} ${isEditing ? 'view-edit' : ''}`}>
                        <PageOne pageOneInfo={pageOneInfo} pageOneUpdateFunction={pageOneUpdateFunction}/>
                        <PageTwo pageTwoInfo={pageTwoInfo} int={int} />
                        {showNotes && <PageThree generalNotes={generalNotes} />}
                    </div>
                    {!isDownloading &&
                        <Sidebar
                            toggleViewQuickEdit={toggleViewQuickEdit}
                            viewQuickEdit={viewQuickEdit}
                            prepAndDownload={prepAndDownload}
                            toggleIsEditing={toggleIsEditing}
                            ownsThisCharacter={ownsThisCharacter}
                        />}
                </div>
            </EditingContext>
        </>
    )
}