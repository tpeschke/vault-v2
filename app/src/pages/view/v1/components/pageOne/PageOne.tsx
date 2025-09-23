import { PageOneInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import AbilitiesNBurdensDisplay from './components/abilitiesNBurdens/AbilitiesNBurdensDisplay'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import LeftColumn from './components/leftColumn/LeftColumn'
import RightColumn from './components/rightColumn/RightColumn'
import './PageOne.css'

interface Props {
    pageOneInfo: PageOneInfo,
    isEditing: boolean
}

export default function PageOne({ pageOneInfo, isEditing }: Props) {
    const { generalInfo, leftColumnInfo, rightColumnInfo, abilitiesNBurdensInfo } = pageOneInfo

    return (
        <div className='page-shell page card page-one' id='page-one'>
            <GeneralInfo generalInfo={generalInfo} isEditing={isEditing} />
            <div className='page-one-columns'>
                <LeftColumn leftColumnInfo={leftColumnInfo} isEditing={isEditing} />
                <RightColumn rightColumnInfo={rightColumnInfo} />
            </div>
            <AbilitiesNBurdensDisplay abilitiesNBurdensInfo={abilitiesNBurdensInfo}/>
        </div>
    )
}