import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatSkills';
import '../CombatSkillsArea.css'
import { useContext } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';

interface Props {
    combatSkillSuites: CombatSkillObject[],
    martialAdepts: number,
    int: number
}

export default function CombatSkillSuites({ combatSkillSuites, martialAdepts, int }: Props) {
    const isEditing = useContext(EditingContext)

    function skillSuiteRow({ skill, cost, isTrained, rank }: CombatSkillObject, index: number, int: number, martialAdepts: number) {
        return (
            <span className='skill-suite-row' key={index}>
                <strong>{skill}</strong>
                <p>{(cost - int + (rank * 10)) * (1 - (martialAdepts * .10))}</p>
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
                {isEditing && <span>
                    {isTrained ?
                        <i className="fa-solid fa-check"></i>
                        :
                        <i className="fa-solid fa-x"></i>
                    }
                </span>}
            </span>
        )
    }

    return (
        <div className='combat-skill-suites-shell'>
            <span>
                <h3>Skill Suites</h3>
                <h3>Cost</h3>
                <h3>Rank</h3>
                {isEditing && <h3>Train</h3>}
            </span>
            {combatSkillSuites.map((suite, index) => skillSuiteRow(suite, index, int, martialAdepts))}
        </div>
    )
}