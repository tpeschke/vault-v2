import './PageType1.css'
import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import DoubleColumn from "../components/doubleColumn/DoubleColumn";
import GeneralInfoDisplay from './components/GeneralInfo/GeneralInfo';
import StatsDisplay from './components/Stats/Stats';
import CharacteristicsDisplay from './components/Characteristics/Characteristics';

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo, stats, characteristicsInfo } = pageInfo

    // Left Column
    //  Movement
    // Right Column
    //  Logo
    //  Vitals
    //  Favor
    //  Defenses
    //  Attacks

    return (
        <div className='page-shell page card page-type-one' id={'page-' + index}>
            <DoubleColumn>
                <>
                    <GeneralInfoDisplay generalInfo={generalInfo} />
                    <StatsDisplay stats={stats} />
                    <CharacteristicsDisplay characteristicsInfo={characteristicsInfo} />
                </>
                <>
                    Right
                </>
            </DoubleColumn>
        </div>
    )
}