import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatSkills';
import '../CombatSkillsArea.css'

interface Props {
    combatSkillSuites: CombatSkillObject[],
    martialAdepts: number,
    int: number
}

export default function CombatSkillSuites({ combatSkillSuites, martialAdepts, int }: Props) {
    return (
        <div className='combat-skill-suites-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
            </span>
            {combatSkillSuites.map((suite, index) => skillSuiteRow(suite, index, int, martialAdepts))}
        </div>
    )
}

function skillSuiteRow({ skill, cost, isTrained, rank }: CombatSkillObject, index: number, int: number, martialAdepts: number) {
    return (
        <span className='skill-suite-row' key={index}>
            <strong>{skill}</strong>
            <p>{(cost - int + (rank * 10)) * (1 - (martialAdepts * .10))}</p>
            {isTrained ?
                <p>{rank}</p>
                :
                <p>U</p>
            }
        </span>
    )
}