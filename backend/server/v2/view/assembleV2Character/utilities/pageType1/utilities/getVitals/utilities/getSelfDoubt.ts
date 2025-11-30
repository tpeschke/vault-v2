import { SelfDoubt } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../../db/database"

interface SelfDoubtReturn {
    id: number,
    pageid: number,
    dieindex: number,
    threshold: number,
    diepenalty: number
}

const getSelfDoubtSQL = `select * from v2SelfDoubt where pageID = $1`

export default async function getSelfDoubt(pageID: number): Promise<SelfDoubt> {
    const [info]: SelfDoubtReturn[] = await query(getSelfDoubtSQL, pageID)

    if (info) {
        const { dieindex: dieIndex, threshold, diepenalty: diePenalty } = info
        return {
            dieIndex, threshold, diePenalty
        }
    }

    return {
        dieIndex: 0,
        threshold: 0,
        diePenalty: 0
    }
}