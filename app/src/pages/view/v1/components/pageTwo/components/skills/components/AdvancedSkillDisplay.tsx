import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/pageTwoInterfaces'
import '../SkillDisplay.css'

interface Props {

}

export default function AdvancedSkillDisplay({ }: Props) {
    const skillAdept = 1;
    const advancedSkills: SkillObject[] = [
        {
            skill: 'Investiture',
            cost: 12,
            rank: 8,
            mod: 1
        },
        {
            skill: 'Occultism',
            cost: 12,
            rank: 8,
            mod: 1
        },
        {
            skill: 'Sortilege',
            cost: 12,
            rank: 7,
            mod: 1
        }
    ]

    const leftOver = 26 - advancedSkills.length

    return (
        <div className='advanced-skill-display'>
            <div>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
            </div>
            <div className='advanced-skill-shell'>
                {advancedSkills.map((skill, index) => skillRow(skill, index, skillAdept))}
                {[...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function skillRow({ skill, cost, rank, mod }: SkillObject, index: number, skillAdept: number) {
    return (
        <span key={index} className='advanced-skill-row'>
            <p>{skill}</p>
            <p>{cost + (rank * 2) - skillAdept}</p>
            <p>{rank}</p>
            <p>{mod}</p>
        </span>
    )
}

export function nullSkillRow(index: number) {
    return (
        <span key={index} className='advanced-skill-row null-advanced-skill-row'>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </span>
    )
}