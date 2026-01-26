import './PageType1.css'
import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import DoubleColumn from "../components/doubleColumn/DoubleColumn";

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo } = pageInfo

    // Left Column
    //  General Info
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
                    Name: {generalInfo.name}
                </>
                <>
                    Right
                </>
            </DoubleColumn>
        </div>
    )
}