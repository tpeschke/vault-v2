import { Damage } from "@vault/common/interfaces/v2/page1/vitals"
import query from "../../../../../../../../db/database"

interface DamageReturn {
    id: number,
    dieindex: number,
    knockback: number,
    damage: number,
    threshold: number
}

const getDamageSQL = `select * from v2Damage where characterID = $1`

export default async function getDamage(characterID: number): Promise<Damage> {
    const [info]: DamageReturn[] = await query(getDamageSQL, characterID)

    if (info) {
        const { dieindex: dieIndex, threshold, knockback, damage } = info
        return {
            dieIndex, threshold, knockback, damage
        }
    }

    return {
        dieIndex: 0,
        knockback: 0,
        damage: 0,
        threshold: 0
    }
}