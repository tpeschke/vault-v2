import './PageType3.css'
import { Page3 } from "@vault/common/interfaces/v2/pageTypes"
import DoubleColumn from "../components/doubleColumn/DoubleColumn"
import { PageType3Updates } from '../../hooks/interfaces/UpdateInterfaces'
import Contacts from './components/Contacts/Contacts'
import Relationships from './components/Relationships/Relationships'
import Gear from './components/Gear/Gear'

interface Props {
    pageInfo: Page3
    updates: PageType3Updates
}

export default function PageType3({ pageInfo, updates }: Props) {
    const { pageID } = pageInfo

    return (
        <div className="page-shell page card page-type-three">
            <DoubleColumn>
                <Contacts contacts={pageInfo.contacts} pageID={pageID} updates={updates} />
                <Relationships relationships={pageInfo.relationships} pageID={pageID} updates={updates} />
            </DoubleColumn>
            <Gear page={pageInfo} pageID={pageID} updates={updates} />
        </div>
    )
}
