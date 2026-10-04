import './Contacts.css'
import { Page3Contact } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import DisplaySingleArray from '../../../../components/displayArray/DisplaySingleArray'
import { PageType3Updates } from '../../../../hooks/interfaces/UpdateInterfaces'
import { PAGE3_CONTACT_CAP } from '../../../../hooks/updates/pageType3Updates'

interface Props {
    contacts: Page3Contact[]
    pageID: number
    updates: PageType3Updates
}

export default function Contacts({ contacts, pageID, updates }: Props) {
    const rows = contacts ?? []

    return (
        <div className="page3-contacts">
            <h1>Contacts, Allies, Mentors, & Enemies</h1>
            <div className="page3-contacts-list">
                <DisplaySingleArray
                    max={PAGE3_CONTACT_CAP}
                    showInsert={true}
                    items={rows}
                    insert={row => updates.insertContact(pageID, row)}
                    update={(index, next) => updates.updateContact(pageID, index, next.value)}
                    renderRow={(item, index, onChange) => (
                        <span>
                            <input
                                className="character-value"
                                placeholder=" "
                                value={item.value}
                                onChange={event => onChange({ ...item, value: event.target.value })}
                                onBlur={event => {
                                    const value = event.target.value
                                    if (value === '') {
                                        return
                                    }
                                    const nextRows = rows.map((row, rowIndex) => rowIndex === index ? { ...row, value } : row)
                                    updates.persistPage3Contacts(pageID, nextRows, { index, value })
                                }}
                            />
                        </span>
                    )}
                    renderInsert={onBlur => (
                        <span>
                            <input className="character-value" placeholder=" " onBlur={onBlur} />
                        </span>
                    )}
                    renderLeftover={() => (
                        <span>
                            <p className="character-value"></p>
                        </span>
                    )}
                />
            </div>
        </div>
    )
}
