import { ShieldInfo } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces";
import query from "../../../../../../db/database";

const saveShieldInfoSQL = 'update cvshield set shieldname = $1, shielddr = $2, shieldsize = $3, shieldcover = $4, shieldflanks = $5, shieldbonus = $6 where shieldid = $7'
const saveBaseModifierSQL = 'update cvshield set shieldbasedef = $1, shieldbaseparry = $2, shieldbaseencumb = $3, shieldbasebreak = $4 where shieldid = $5'
const saveSkillModifierSQL = 'update cvshield set shieldtraindef = $1, shieldtrainparry = $2, shieldtrainencumb = $3, shieldtrainbreak = $4 where shieldid = $5'
const saveMiscModifierSQL = 'update cvshield set shieldmiscdef = $1, shieldmiscparry = $2, shieldmiscencumb = $3, shieldmiscbreak = $4 where shieldid = $5'

export async function saveShieldInfo(shieldInfo: ShieldInfo) {
    const { id, name, dr, size, cover, flanks, bonus, modifiers } = shieldInfo
    const { def, fat, pry, brk } = modifiers

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveShieldInfoSQL, [name, dr, size, cover, flanks, bonus, id]))
    promiseArray.push(query(saveBaseModifierSQL, [def.base, pry.base, fat.base, brk.base, id]))
    promiseArray.push(query(saveSkillModifierSQL, [def.skill, pry.skill, fat.skill, brk.skill, id]))
    promiseArray.push(query(saveMiscModifierSQL, [def.misc, pry.misc, fat.misc, brk.misc, id]))

    return Promise.all(promiseArray)
}