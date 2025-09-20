import { PageOneInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import AbilitiesNBurdensDisplay from './components/abilitiesNBurdens/AbilitiesNBurdensDisplay'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import LeftColumn from './components/leftColumn/LeftColumn'
import RightColumn from './components/rightColumn/RightColumn'
import './PageOne.css'

interface Props {
    pageOneInfo: PageOneInfo
}

export default function PageOne({ pageOneInfo }: Props) {
    const { generalInfo, leftColumnInfo, rightColumnInfo, abilitiesNBurdensInfo } = pageOneInfo

    return (
        <div className='page-shell page card page-one'>
            <GeneralInfo generalInfo={generalInfo} />
            <div className='page-one-columns'>
                <LeftColumn leftColumnInfo={leftColumnInfo} />
                <RightColumn rightColumnInfo={rightColumnInfo} />
            </div>
            <AbilitiesNBurdensDisplay />
        </div>
    )
}