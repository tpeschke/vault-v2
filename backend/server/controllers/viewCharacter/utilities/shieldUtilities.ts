import { ShieldInfo } from "@vault/common/interfaces/v1/pageTwo/shieldInterfaces";
import { calculateShieldDefense, calculateShieldFatigue, calculateShieldParry, calculateShieldBreakage } from '@vault/common/utilities/v1/shieldUtilities'

export function formatShield(rawShield: any): ShieldInfo {
    const {
        shieldid, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, 
        shieldbasebreak, shieldtrainparry, shieldtrainbreak, 
        shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldtrainfatigue, 
        shieldmiscfatigue, shieldbasefatigue, shieldflanks
    } = rawShield

    return {
        id: shieldid,
        name: shieldname,
        dr: shielddr,
        size: shieldsize,
        cover: shieldcover,
        flanks: shieldflanks,
        bonus: shieldbonus,
        modifiers: {
            def: {
                base: shieldbasedef,
                skill: 0,
                misc: shieldmiscdef,
                total: calculateShieldDefense(shieldbasedef, shieldmiscdef)
            },
            fat: {
                base: shieldbasefatigue,
                skill: shieldtrainfatigue,
                misc: shieldmiscfatigue,
                total: calculateShieldFatigue(shieldbasefatigue, shieldtrainfatigue, shieldmiscfatigue)
            },
            pry: {
                base: shieldbaseparry,
                skill: shieldtrainparry,
                misc: shieldmiscparry,
                total: calculateShieldParry(shieldbaseparry, shieldtrainparry, shieldmiscparry)
            },
            brk: {
                base: shieldbasebreak,
                skill: shieldtrainbreak,
                misc: shieldmiscbreak,
                total: calculateShieldBreakage(shieldbasebreak, shieldtrainbreak, shieldmiscbreak)
            }
        }
    }
}