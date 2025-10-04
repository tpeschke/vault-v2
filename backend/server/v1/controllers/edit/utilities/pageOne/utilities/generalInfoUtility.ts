import { GeneralInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";
import query from "../../../../../../db/database";

const saveGeneralInfoSQL = 'update cvcharactermain set name = $1, race = $2, primarya = $3, secondarya = $4, level = $5, crp = $6, excurrent = $7 where id = $8'

export async function saveGeneralInfo(characterID: number, generalInfo: GeneralInfo) {
    const { name, ancestry, class: primaryClass, subclass, level, crpUnspent, crpSpent } = generalInfo

    return query(saveGeneralInfoSQL, [name, ancestry, primaryClass, subclass, level, crpUnspent, crpSpent, characterID])
}