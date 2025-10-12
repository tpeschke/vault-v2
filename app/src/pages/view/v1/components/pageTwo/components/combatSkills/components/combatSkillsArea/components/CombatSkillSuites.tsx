import '../CombatSkillsArea.css'
import { useContext } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';
import { UpdateCombatSkillSuite } from '../../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces';
import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills';
import IsBlankContext from '../../../../../../../contexts/IsBlankContext';

interface Props {
    combatSkillSuites: CombatSkillObject[],
    martialAdepts: number,
    int: number,
    updateCombatSkillSuite: UpdateCombatSkillSuite
}

export default function CombatSkillSuites({ combatSkillSuites, martialAdepts = 0, int, updateCombatSkillSuite }: Props) {
    const isBlank = useContext(IsBlankContext)
    const isEditing = useContext(EditingContext)

    function skillSuiteRow({ id, skill, cost, isTrained, rank }: CombatSkillObject, index: number, int: number = 0, martialAdepts: number) {
        return (
            <span className='skill-suite-row' key={index}>
                <strong>{skill}</strong>
                {!isBlank ? <p>{Math.ceil((cost - int + (rank * 10)) * (1 - (martialAdepts * .10)))}</p> : <p>{cost}</p>}
                {isTrained ?
                    <>
                        {isEditing ?
                            <input type='number' onChange={(event: any) => updateCombatSkillSuite(index, { id, skill, cost, isTrained, rank: +event.target.value })} value={rank} />
                            :
                            <p>{!isBlank ? rank : ''}</p>
                        }
                    </>
                    :
                    <p>U</p>
                }
                {isEditing && <span>
                    {isTrained ?
                        <i onClick={(event: any) => updateCombatSkillSuite(index, { id, skill, cost, isTrained: false, rank })} className="fa-solid fa-check"></i>
                        :
                        <i onClick={(event: any) => updateCombatSkillSuite(index, { id, skill, cost, isTrained: true, rank })} className="fa-solid fa-x"></i>
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