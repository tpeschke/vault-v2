import { Page1 } from "@vault/common/interfaces/v2/pageTypes";

interface Props {
    pageInfo: Page1,
}

export default function PageType1({ pageInfo }: Props) {
    const { generalInfo } = pageInfo

    return (
        <div className='page-shell page card' id='page-0'>
            Name: {generalInfo.name}
        </div>
    )
}