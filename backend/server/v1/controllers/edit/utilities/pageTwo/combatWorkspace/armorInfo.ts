import { ArmorInfo } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";
import query from "../../../../../../db/database";

const saveArmorInfoSQL = 'update cvarmor set armorname = $1, armordr = $2, armorskilladj = $3, armorbonus = $4 where armorid = $5'
const saveBaseModifierSQL = 'update cvarmor set armorbasedef = $1, armorbaserecovery = $2, armorbaseencumb = $3, armorbaseinit = $4 where armorid = $5'
const saveSkillModifierSQL = 'update cvarmor set armortrainingdef = $1, armortrainrecovery = $2, armortrainencumb = $3, armortraininit = $4 where armorid = $5'
const saveMiscModifierSQL = 'update cvarmor set armormiscdef = $1, armormiscrecovery = $2, armormiscencumb = $3, armormiscinit = $4 where armorid = $5'

export async function saveArmorInfo(armorInfo: ArmorInfo) {
    const { id, name, dr, skillAdj, bonus, modifiers } = armorInfo
    const { def, fat, rec, init } = modifiers

    let promiseArray: Promise<any>[] = []

    promiseArray.push(query(saveArmorInfoSQL, [name, dr, skillAdj, bonus, id]))
    promiseArray.push(query(saveBaseModifierSQL, [def.base, rec.base, fat.base, init.base, id]))
    promiseArray.push(query(saveSkillModifierSQL, [def.skill, rec.skill, fat.skill, init.skill, id]))
    promiseArray.push(query(saveMiscModifierSQL, [def.misc, rec.misc, fat.misc, init.misc, id]))

    return Promise.all(promiseArray)
}