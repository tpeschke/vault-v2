import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../LeftColumn.css'

interface Props {   
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    adepts: number,
    int: number
}

export default function SkillSuitesDisplay({ skillSuites, nativeLanguage, adepts, int }: Props) {
    const { skill, cost, rank, mod} = nativeLanguage
    const nativeLanguageRank = rank ?? int

    return (
        <div className='skill-suites-display-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>Mod</h3>
            </span>
            {skillSuites.map((suite, index) => skillSuiteRow(suite, index, int, adepts))}
            <span>
                <h3>Native Lang.</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>Mod</h3>
            </span>
            <span className='skill-suite-row native-lang'>
                <p>{skill}</p>
                <p>{cost + (nativeLanguageRank * 2) - adepts}</p>
                <p>{nativeLanguageRank}</p>
                <p>{mod}</p>
            </span>
        </div>
    )
}

export function skillSuiteRow({ skill, cost, isTrained, rank, mod }: SkillObject, index: number, int: number, adepts: number) {
    return (
        <span className='skill-suite-row' key={index}>
            <strong>{skill}</strong>
            <p>{Math.ceil((cost - int + (rank * 10)) * (1 - (adepts * .10)))}</p>
            {isTrained ?
                <p>{rank}</p>
                :
                <p>U</p>
            }
            <p>{mod}</p>
        </span>
    )
}