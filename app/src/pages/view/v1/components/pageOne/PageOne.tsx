import { PageOneInfo } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import AbilitiesNBurdensDisplay from './components/abilitiesNBurdens/AbilitiesNBurdensDisplay'
import GeneralInfo from './components/generalInfo/GeneralInfo'
import LeftColumn from './components/leftColumn/LeftColumn'
import RightColumn from './components/rightColumn/RightColumn'
import './PageOne.css'
import { PageOneUpdates } from '../../hooks/interfaces/CharacterHookInterfaces'

interface Props {
    pageOneInfo: PageOneInfo,
    pageOneUpdateFunction: PageOneUpdates
}

export default function PageOne({ pageOneInfo, pageOneUpdateFunction }: Props) {
    const { generalInfo, leftColumnInfo, rightColumnInfo, abilitiesNBurdensInfo } = pageOneInfo
    const { updateGeneralInfo } = pageOneUpdateFunction

    return (
        <div className='page-shell page card page-one' id='page-one'>
            <GeneralInfo generalInfo={generalInfo} updateGeneralInfo={updateGeneralInfo} />
            <div className='page-one-columns'>
                <LeftColumn leftColumnInfo={leftColumnInfo} />
                <RightColumn rightColumnInfo={rightColumnInfo} />
            </div>
            <AbilitiesNBurdensDisplay abilitiesNBurdensInfo={abilitiesNBurdensInfo}/>
        </div>
    )
}