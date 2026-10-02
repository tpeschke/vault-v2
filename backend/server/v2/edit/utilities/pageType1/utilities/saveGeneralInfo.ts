import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces"
import query from "../../../../../db/database"

const saveGeneralInfoSQL = `update v2GeneralInfo set name = $1, ancestry = $2, class = $3, subclass = $4, level = $5, unspent = $6, spent = $7 where pageID = $8`

export default async function saveGeneralInfo(pageID: number, generalInfo: GeneralInfo) {
    const { name, ancestry, class: primaryClass, subclass, level, crp } = generalInfo
    const persistedName = name?.trim() ? name : 'New Character'
    return query(saveGeneralInfoSQL, [persistedName, ancestry, primaryClass, subclass, level, crp.unspent, crp.spent, pageID])
}
