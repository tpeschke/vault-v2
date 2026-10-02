import { SelfDoubt } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../db/database"

const saveSelfDoubtSQL = `update v2SelfDoubt set dieIndex = $1, threshold = $2, diePenalty = $3 where pageID = $4`

export default async function saveSelfDoubt(pageID: number, selfDoubt: SelfDoubt) {
    const { dieIndex, threshold, diePenalty } = selfDoubt
    return query(saveSelfDoubtSQL, [dieIndex, threshold, diePenalty, pageID])
}
