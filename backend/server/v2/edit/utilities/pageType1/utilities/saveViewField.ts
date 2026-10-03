import { ViewPersistAttribute } from "@vault/common/interfaces/v2/page1/viewPersist"
import query from "../../../../../db/database"

const saveUnspentSQL = `update v2GeneralInfo set unspent = $1 where pageID = $2`
const saveCurrentFavorSQL = `update v2Favor set current = $1 where pageID = $2`
const saveDiePenaltySQL = `update v2SelfDoubt set diePenalty = $1 where pageID = $2`
const saveDamageSQL = `update v2Damage set damage = $1 where pageID = $2`
const saveStressSQL = `update v2Stress set stress = $1 where pageID = $2`

export default async function saveViewField(pageID: number, attribute: ViewPersistAttribute, value: number) {
    switch (attribute) {
        case 'unspent':
            return query(saveUnspentSQL, [value, pageID])
        case 'currentFavor':
            return query(saveCurrentFavorSQL, [value, pageID])
        case 'diePenalty':
            return query(saveDiePenaltySQL, [value, pageID])
        case 'damage':
            return query(saveDamageSQL, [value, pageID])
        case 'stress':
            return query(saveStressSQL, [value, pageID])
    }
}
