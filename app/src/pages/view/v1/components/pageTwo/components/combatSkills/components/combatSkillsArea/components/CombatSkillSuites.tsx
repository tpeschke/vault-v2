import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatSkills';
import '../CombatSkillsArea.css'

interface Props {

}

export default function CombatSkillSuites({ }: Props) {
    const int = 10;
    const martialAdept = 1
    const combatSkillSuites: CombatSkillObject[] = [
        {
            skill: 'Athletics',
            cost: 40,
            isTrained: false,
            rank: 0
        },
        {
            skill: 'Melee',
            cost: 40,
            isTrained: true,
            rank: 4
        },
        {
            skill: 'Ranged',
            cost: 40,
            isTrained: true,
            rank: 0
        },
        {
            skill: 'Shields',
            cost: 40,
            isTrained: false,
            rank: 7
        },
        {
            skill: 'Unarmed',
            cost: 40,
            isTrained: true,
            rank: 1
        },
    ]

    return (
        <div className='combat-skill-suites-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
            </span>
            {combatSkillSuites.map((suite, index) => skillSuiteRow(suite, index, int, martialAdept))}
        </div>
    )
}

export function skillSuiteRow({ skill, cost, isTrained, rank }: CombatSkillObject, index: number, int: number, martialAdept: number) {
    return (
        <span className='skill-suite-row' key={index}>
            <strong>{skill}</strong>
            <p>{(cost - int + (rank * 10)) * (1 - (martialAdept * .10))}</p>
            {isTrained ?
                <p>{rank}</p>
                :
                <p>U</p>
            }
        </span>
    )
}