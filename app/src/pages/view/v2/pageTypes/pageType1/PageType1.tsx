import { Page1 } from "@vault/common/interfaces/v2/pageTypes";

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo } = pageInfo

    return (
        <div className='page-shell page card' id={'page-' + index}>
            Name: {generalInfo.name}
        </div>
    )
}