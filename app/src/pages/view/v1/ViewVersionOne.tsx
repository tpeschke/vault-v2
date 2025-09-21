import { useState } from 'react'
import PageOne from './components/pageOne/PageOne'
import PageThree from './components/pageThree/PageThree'
import PageTwo from './components/pageTwo/PageTwo'
import Sidebar from './components/sidebar/Sidebar'
import './ViewVersionOne.css'
import { CharacterVersion1 } from '@vault/common/interfaces/characterInterfaces'
import Loading from '../../../components/loading/Loading'
import LoadingIndicator from '../../../components/loading/components/LoadingIndicator'

interface Props {
    character: CharacterVersion1,
    downloadCharacter: () => void,
    isDownloading: boolean
}

export default function ViewVersionOne({ character, downloadCharacter, isDownloading }: Props) {
    const [viewQuickEdit, setViewQuickEdit] = useState(false)

    const toggleViewQuickEdit = () => {
        setViewQuickEdit(!viewQuickEdit)
    }

    function prepAndDownload() {
        setViewQuickEdit(false)
        downloadCharacter()
    }

    const { pageOneInfo, pageTwoInfo, generalNotes } = character

    const { int } = pageOneInfo.leftColumnInfo.statInfo

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
                    {!generalNotes.isSecret && <PageThree generalNotes={generalNotes} />}
                </div>
                {!isDownloading && <Sidebar toggleViewQuickEdit={toggleViewQuickEdit} viewQuickEdit={viewQuickEdit} prepAndDownload={prepAndDownload} />}
            </div>
        </>
    )
}