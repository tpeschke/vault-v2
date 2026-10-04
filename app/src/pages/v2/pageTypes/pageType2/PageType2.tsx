import './PageType2.css'
import { Page2 } from "@vault/common/interfaces/v2/pageTypes"
import DoubleColumn from "../components/doubleColumn/DoubleColumn"
import { PageType2Updates } from '../../hooks/interfaces/UpdateInterfaces'
import GeneralSkills from './components/GeneralSkills/GeneralSkills'
import CombatSkills from './components/CombatSkills/CombatSkills'
import NotesPanes from './components/NotesPanes/NotesPanes'

interface Props {
    pageInfo: Page2
    updates: PageType2Updates
}

export default function PageType2({ pageInfo, updates }: Props) {
    const { pageID } = pageInfo

    return (
        <div className="page-shell page card page-type-two">
            <GeneralSkills page={pageInfo} pageID={pageID} updates={updates} />
            <CombatSkills page={pageInfo} pageID={pageID} updates={updates} />
            <DoubleColumn>
                <NotesPanes
                    heading="Abilities"
                    value={pageInfo.abilities}
                    pageID={pageID}
                    updates={updates}
                    field="abilities"
                />
                <NotesPanes
                    heading="Burdens & Injuries"
                    value={pageInfo.burdens}
                    pageID={pageID}
                    updates={updates}
                    field="burdens"
                />
            </DoubleColumn>
        </div>
    )
}
