import { SkillObject } from "../../interfaces/v1/pageTwo/skillInterfaces"

export function findInitiativeSkillMod(strategySuite: SkillObject, advancedSkills: SkillObject[]): number {
    const initiativeSkill = advancedSkills.find(({skill}) => skill.toUpperCase() === 'INITIATIVE')

    if (initiativeSkill) {
        return initiativeSkill.rank + initiativeSkill.mod
    }
    return strategySuite.isTrained ? strategySuite.rank + strategySuite.mod : 0
}

export function findCarryFromQuarterMastering(strategySuite: SkillObject, advancedSkills: SkillObject[]): number {
    const quarterMasteringSkill = advancedSkills.find(({skill}) => skill.toUpperCase() === 'QUARTERMASTERING' || skill.toUpperCase() === 'QUARTER MASTERING')

    if (quarterMasteringSkill) {
        return quarterMasteringSkill.rank + quarterMasteringSkill.mod
    }

    return strategySuite.isTrained ? strategySuite.rank + strategySuite.mod : 0
}