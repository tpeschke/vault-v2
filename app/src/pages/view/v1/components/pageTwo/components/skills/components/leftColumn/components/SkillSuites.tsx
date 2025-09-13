import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../LeftColumn.css'

interface Props {

}

export default function SkillSuitesDisplay({ }: Props) {
    const int = 10;
    const skillAdept = 1
    const skillSuites: SkillObject[] = [
        {
            skill: 'Athletics',
            cost: 30,
            isTrained: false,
            rank: 0,
            mod: -6
        },
        {
            skill: 'Lore',
            cost: 30,
            isTrained: true,
            rank: 1,
            mod: 2
        },
        {
            skill: 'Streetwise',
            cost: 30,
            isTrained: false,
            rank: 0,
            mod: 1
        },
        {
            skill: 'Survival',
            cost: 30,
            isTrained: false,
            rank: 0,
            mod: -6
        },
        {
            skill: 'Strategy',
            cost: 30,
            isTrained: false,
            rank: 0,
            mod: 1
        },
        {
            skill: 'Weirdcraft',
            cost: 30,
            isTrained: true,
            rank: 6,
            mod: 1
        }
    ]

    return (
        <div className='skill-suites-display-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>Mod</h3>
            </span>
            {skillSuites.map((suite, index) => skillSuiteRow(suite, index, int, skillAdept))}
            <span>
                <h3>Native Lang.</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>Mod</h3>
            </span>
            <span className='skill-suite-row native-lang'>
                <p> </p>
                <p> </p>
                <p> </p>
                <p> </p>
            </span>
        </div>
    )
}

export function skillSuiteRow({ skill, cost, isTrained, rank, mod }: SkillObject, index: number, int: number, skillAdept: number) {
    return (
        <span className='skill-suite-row' key={index}>
            <strong>{skill}</strong>
            <p>{(cost - int + (rank * 10)) * (1 - (skillAdept * .10))}</p>
            {isTrained ?
                <p>{rank}</p>
                :
                <p>U</p>
            }
            <p>{mod}</p>
        </span>
    )
}