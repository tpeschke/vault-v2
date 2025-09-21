import { useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import Loading from '../../../components/loading/Loading'
import LoadingIndicator from '../../../components/loading/components/LoadingIndicator'
import { DownloadCharacterFunction } from './hooks/characterHook'

interface Props {
    character: CharacterVersion1,
    downloadCharacter: DownloadCharacterFunction,
    isDownloading: boolean
}

export default function ViewVersionOne({ character, downloadCharacter, isDownloading }: Props) {
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    function prepAndDownload(isPregen: boolean) {
        setViewQuickEdit(false)
        downloadCharacter(isPregen)
    }

    const { pageOneInfo, pageTwoInfo, generalNotes, userInfo } = character
    const { ownsThisCharacter } = userInfo

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
            <div className='version-one-shell'>
                <div className={viewQuickEdit ? 'page-shell view-quick-edit' : 'page-shell'}>
                    <PageOne pageOneInfo={pageOneInfo} />
                    <PageTwo pageTwoInfo={pageTwoInfo} int={int} />
                    {/* TODO Make sure it shows up for owning user */}
                    {showNotes && <PageThree generalNotes={generalNotes} />}
                </div>
                {!isDownloading && <Sidebar toggleViewQuickEdit={toggleViewQuickEdit} viewQuickEdit={viewQuickEdit} prepAndDownload={prepAndDownload} />}
            </div>
        </>
    )
}