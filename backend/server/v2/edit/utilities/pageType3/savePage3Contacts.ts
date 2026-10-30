import { textareaCaps, textareaCharCount, TextareaLimitError } from "@vault/common/textareaLimits"
import query from "../../../../db/database"

const upsertSQL = `insert into v2Page3Basics (pageID, contacts) values ($1, $2)
on conflict (pageID) do update set contacts = excluded.contacts`

export default async function savePage3Contacts(pageID: number, contacts: string): Promise<void> {
    if (textareaCharCount(contacts ?? '') > textareaCaps.page3Contacts) {
        throw new TextareaLimitError()
    }
    await query(upsertSQL, [pageID, contacts])
}
