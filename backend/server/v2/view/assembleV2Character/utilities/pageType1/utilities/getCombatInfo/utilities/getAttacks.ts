import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo";
import query from "../../../../../../../../db/database";

const getAttacksSQL = `select * from v2Attacks where pageID = $1 order by index`

export default async function getAttacks(pageID: number): Promise<AttacksArray> {
    const info = await query(getAttacksSQL, pageID) as AttacksArray

    if (info) {
        return info
    }

    return [
        {
            index: 0,
            name: '',
            measure: 0,
            attack: 0,
            damage: '',
            type: '',
            recovery: 0,
            notes: '',
        },
        {
            index: 1,
            name: '',
            measure: 0,
            attack: 0,
            damage: '',
            type: '',
            recovery: 0,
            notes: '',
        },
        {
            index: 2,
            name: '',
            measure: 0,
            attack: 0,
            damage: '',
            type: '',
            recovery: 0,
            notes: '',
        },
        {
            index: 3,
            name: '',
            measure: 0,
            attack: 0,
            damage: '',
            type: '',
            recovery: 0,
            notes: '',
        }
    ]
}