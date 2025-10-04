import { ArmorInfo } from "@vault/common/interfaces/v1/pageTwo/combatInterfaces/armorInterfaces";
import { calculateArmorDefenseTotal, calculateArmorFatigueTotal, calculateArmorRecoveryOrInitiativeTotal } from "@vault/common/utilities/v1/armorUtilities";

export function formatArmor(rawArmor: any): ArmorInfo {
    const {
        armorid, armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbaserecovery, 
        armorbaseinit, armortrainingdef, armortrainrecovery, armortraininit, armormiscdef, armormiscrecovery, 
        armormiscinit, armorbasefatigue, armortrainfatigue, armormiscfatigue
    } = rawArmor

    return {
        id: armorid,
        name: armorname,
        dr: armordr,
        skillAdj: armorskilladj,
        bonus: armorbonus,
        modifiers: {
            def: {
                base: armorbasedef,
                skill: armortrainingdef,
                misc: armormiscdef,
                total: calculateArmorDefenseTotal(armorbasedef, armortrainingdef, armormiscdef)
            },
            fat: {
                base: armorbasefatigue,
                skill: armortrainfatigue,
                misc: armormiscfatigue,
                total: calculateArmorFatigueTotal(armorbasefatigue, armortrainfatigue, armormiscfatigue)
            },
            rec: {
                base: armorbaserecovery,
                skill: armortrainrecovery,
                misc: armormiscrecovery,
                total: calculateArmorRecoveryOrInitiativeTotal(armorbaserecovery, armortrainrecovery, armormiscrecovery)
            },
            init: {
                base: armorbaseinit,
                skill: armortraininit,
                misc: armormiscinit,
                total: calculateArmorRecoveryOrInitiativeTotal(armorbaseinit, armortraininit, armormiscinit)
            }
        }
    }
}