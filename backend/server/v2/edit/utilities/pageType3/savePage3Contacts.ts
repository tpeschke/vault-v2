import { Page3Contact } from "@vault/common/interfaces/v2/page3/page3Interfaces"
import query from "../../../../db/database"

const deleteSQL = `delete from v2Page3Contacts where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2Page3Contacts set value = $1, index = $2 where id = $3`
const insertSQL = `insert into v2Page3Contacts (pageID, value, index) values ($1, $2, $3) returning id`

export default async function savePage3Contacts(pageID: number, contacts: Page3Contact[]): Promise<Page3Contact[]> {
    await query(deleteSQL, [pageID, [0, ...contacts.map(contact => contact.id)]])
    const saved = await Promise.all(contacts.map(async ({ id, value }, index): Promise<Page3Contact | null> => {
        if (id) {
            await query(updateSQL, [value, index, id])
            return { id, value }
        }
        if (value) {
            const rows = await query(insertSQL, [pageID, value, index])
            const nextId = rows[0]?.id
            return { id: typeof nextId === 'number' ? nextId : 0, value }
        }
        return null
    }))
    return saved.filter((row): row is Page3Contact => row !== null)
}
