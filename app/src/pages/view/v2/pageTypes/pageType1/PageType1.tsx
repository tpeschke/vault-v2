import './PageType1.css'
import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import DoubleColumn from "../components/doubleColumn/DoubleColumn";
import GeneralInfoDisplay from './components/GeneralInfo';

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo } = pageInfo

    // Left Column
    //  Stats
    //  Characteristics
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
                </>
                <>
                    Right
                </>
            </DoubleColumn>
        </div>
    )
}