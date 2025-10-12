import { SkillObject, SkillObjectKeys } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../LeftColumn.css'
import { useContext } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';
import { UpdateNativeLanguageFunction, UpdateSkillSuiteFunction } from '../../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateSkillInterfaces';
import IsBlankContext from '../../../../../../../contexts/IsBlankContext';

interface Props {
    skillSuites: SkillObject[],
    nativeLanguage: SkillObject,
    adepts: number,
    int: number,
    updateSkillSuite: UpdateSkillSuiteFunction,
    updateNativeLanguage: UpdateNativeLanguageFunction
}

export default function SkillSuitesDisplay({ skillSuites, nativeLanguage, adepts = 0, int, updateSkillSuite, updateNativeLanguage }: Props) {
    const isBlank = useContext(IsBlankContext)
    const isEditing = useContext(EditingContext)

    function skillSuiteRow({ id, skill, cost, isTrained, rank, mod }: SkillObject, index: number, int: number = 0, adepts: number) {
        return (
            <span className='skill-suite-row' key={index}>
                <strong>{skill}</strong>
                {!isBlank ? <p>{Math.ceil((cost - int + (rank * 10)) * (1 - (adepts * .10)))}</p> : <p>{cost}</p>}
                {isTrained ?
                    <>
                        {isEditing ?
                            <input type='number' onChange={(event: any) => updateSkillSuite(index, { id, skill, cost, isTrained, rank: +event.target.value, mod })} value={rank} />
                            :
                            <p>{!isBlank ? rank : ''}</p>
                        }
                    </>
                    :
                    <p>U</p>
                }
                {isEditing ?
                    <span onClick={_ => updateSkillSuite(index, { id, skill, cost, isTrained: !isTrained, rank, mod })}>
                        {isTrained ?
                            <i className="fa-solid fa-check"></i>
                            :
                            <i className="fa-solid fa-x"></i>
                        }
                    </span>
                    :
                    <p>{!isBlank ? mod : ''}</p>
                }
            </span>
        )
    }

    const { id, skill, cost, rank, mod } = nativeLanguage
    const nativeLanguageRank = rank ?? int
    let nativeLanguageTotalCost;
    if (cost && nativeLanguageRank) {
        nativeLanguageTotalCost = cost + (nativeLanguageRank * 2) - adepts
    }

    function updateNativeLanguageOnChange(event: any, key: SkillObjectKeys) {
        const {value} = event.target

        updateNativeLanguage({
            id,
            skill,
            cost,
            rank,
            mod,
            [key]: key=== 'skill' ? value : +value
        })
    }

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
                        <input onChange={(event: any) => updateNativeLanguageOnChange(event, 'skill')} value={skill} />
                        <input type='number' onChange={(event: any) => updateNativeLanguageOnChange(event, 'cost')} data-tooltip-id="my-tooltip" data-tooltip-content={`Current Total Cost: ${nativeLanguageTotalCost} (Cost - Adepts + Rank * 2)`} value={cost} />
                        <input type='number' onChange={(event: any) => updateNativeLanguageOnChange(event, 'rank')} value={nativeLanguageRank} />
                        <p>{mod}</p>
                    </>
                    :
                    <>
                        <p>{skill}</p>
                        <p>{!isBlank ? nativeLanguageTotalCost : ''}</p>
                        <p>{!isBlank ? nativeLanguageRank : ''}</p>
                        <p>{!isBlank ? mod : ''}</p>
                    </>
                }
            </span>
        </div>
    )
}