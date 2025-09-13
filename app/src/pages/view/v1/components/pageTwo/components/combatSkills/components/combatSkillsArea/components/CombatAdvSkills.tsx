import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatSkills';
import '../CombatSkillsArea.css'

interface Props {

}

export default function CombatAdvSkills({ }: Props) {
    const martialAdept = 1;
    const advancedCombatSkills: CombatSkillObject[] = [
        {
            skill: 'Investiture',
            cost: 12,
            rank: 8,
        },
        {
            skill: 'Occultism',
            cost: 12,
            rank: 8,
        },
        {
            skill: 'Sortilege',
            cost: 12,
            rank: 7,
        }
    ]

    const leftOver = 18 - advancedCombatSkills.length

    return (
        <div className='combat-adv-skills-shell'>
            <div>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                </span>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                </span>
            </div>
            <div className='combat-advanced-skill-shell'>
                {advancedCombatSkills.map((skill, index) => skillRow(skill, index, martialAdept))}
                {[...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function skillRow({ skill, cost, rank }: CombatSkillObject, index: number, martialAdept: number) {
    return (
        <span key={index} className='combat-advanced-skill-row'>
            <p>{skill}</p>
            <p>{cost + (rank * 2) - martialAdept}</p>
            <p>{rank}</p>
        </span>
    )
}

export function nullSkillRow(index: number) {
    return (
        <span key={index} className='combat-advanced-skill-row null-advanced-combat-skill-row'>
            <p></p>
            <p></p>
            <p></p>
        </span>
    )
}