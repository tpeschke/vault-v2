import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../LeftColumn.css'
import { useContext } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';

interface Props {
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    adepts: number,
    int: number
}

export default function SkillSuitesDisplay({ skillSuites, nativeLanguage, adepts, int }: Props) {
    const isEditing = useContext(EditingContext)

    const { skill, cost, rank, mod } = nativeLanguage
    const nativeLanguageRank = rank ?? int

    function skillSuiteRow({ skill, cost, isTrained, rank, mod }: SkillObject, index: number, int: number, adepts: number) {
        return (
            <span className='skill-suite-row' key={index}>
                <strong>{skill}</strong>
                <p>{Math.ceil((cost - int + (rank * 10)) * (1 - (adepts * .10)))}</p>
                {isTrained ?
                    <>
                        {isEditing ?
                            <input value={rank} />
                            :
                            <p>{rank}</p>
                        }
                    </>
                    :
                    <p>U</p>
                }
                {isEditing ?
                    <span>
                        {isTrained ?
                            <i className="fa-solid fa-check"></i>
                            :
                            <i className="fa-solid fa-x"></i>
                        }
                    </span>
                    :
                    <p>{mod}</p>
                }
            </span>
        )
    }

    const nativeLanguageTotalCost = cost + (nativeLanguageRank * 2) - adepts

    return (
        <div className='skill-suites-display-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>{isEditing ? 'Train' : 'Mod'}</h3>
            </span>
            {skillSuites.map((suite, index) => skillSuiteRow(suite, index, int, adepts))}
            <span>
                <h3>Native Lang.</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                <h3>Mod</h3>
            </span>
            <span className='skill-suite-row native-lang'>
                {isEditing ?
                    <>
                        <input value={skill} />
                        <input data-tooltip-id="my-tooltip" data-tooltip-content={`Current Total Cost: ${nativeLanguageTotalCost} (Cost - Adepts + Rank * 2)`} value={cost} />
                        <input value={nativeLanguageRank} />
                        <input value={mod} />
                    </>
                    :
                    <>
                        <p>{skill}</p>
                        <p>{nativeLanguageTotalCost}</p>
                        <p>{nativeLanguageRank}</p>
                        <p>{mod}</p>
                    </>
                }
            </span>
        </div>
    )
}