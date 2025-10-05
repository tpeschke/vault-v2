import { AbilitiesNBurdensInfo } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces"
import query from "../../../../../../../../db/database"

const saveAbilitiesNBurdensSQL = 'update cvcharactermain set abilitiesone = $1, abilitiestwo = $2, removedability = $3, abilitiesthree = $4 where id = $5'

export async function saveAbilitiesNBurdens(characterID: number, abilitiesNBurdens: AbilitiesNBurdensInfo) {
    const { abilityOne, abilityTwo, removedAbility, burdens } = abilitiesNBurdens

    return query(saveAbilitiesNBurdensSQL, [abilityOne, abilityTwo, removedAbility, burdens, characterID])
}