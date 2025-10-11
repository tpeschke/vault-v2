import { SkillObject, SkillObjectKeys } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../SkillDisplay.css'
import { useContext, useEffect, useState } from 'react';
import EditingContext from '../../../../../contexts/EditingContext';
import { InsertSkillFunction, UpdateSkillFunction } from '../../../../../hooks/interfaces/pageTwoInterfaces/UpdateSkillInterfaces';
import makeTempID from '../../../../../../../../utilities/makeTempId';

interface Props {
    advancedSkills: SkillObject[],
    adepts?: number,
    insertSkill: InsertSkillFunction,
    updateSkill: UpdateSkillFunction
}

export default function AdvancedSkillDisplay({ advancedSkills, adepts = 0, insertSkill, updateSkill }: Props) {
    const isEditing = useContext(EditingContext)

    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        setLeftOver(28 - advancedSkills.length - (isEditing ? 1 : 0))
    }, [advancedSkills, isEditing])

    function skillRow({ id, skill, cost, rank, mod, key }: SkillObject, index: number, adepts: number, isEditing: boolean) {
        const totalCost = cost + (rank * 2) - adepts

        return (
            <span key={id ?? key} className='advanced-skill-row'>
                {isEditing ?
                    <>
                        <input onChange={(event: any) => updateSkill(index, { id, skill: event.target.value, cost, rank, mod })} value={skill} />
                        <input type='number' onChange={(event: any) => updateSkill(index, { id, skill, cost: +event.target.value, rank, mod })} value={cost} data-tooltip-id="my-tooltip" data-tooltip-content={`Current Total Cost: ${totalCost} (Cost - Adepts + Rank * 2)`} />
                        <input type='number' onChange={(event: any) => updateSkill(index, { id, skill, cost, rank: +event.target.value, mod })} value={rank} />
                        <input type='number' onChange={(event: any) => updateSkill(index, { id, skill, cost, rank, mod: +event.target.value })} value={mod} />
                    </>
                    :
                    <>
                        <p>{skill}</p>
                        <p>{totalCost}</p>
                        <p>{rank}</p>
                        <p>{mod}</p>
                    </>
                }
            </span>
        )
    }

    function insertRow(key: SkillObjectKeys, event: any) {
        const { value } = event.target

        const tempSkill: SkillObject = {
            key: makeTempID(),
            skill: '',
            cost: 0,
            rank: 0,
            mod: 0,
            [key]: key === 'skill' ? value : +value
        }

        const isValidObject = tempSkill.skill !== '' || tempSkill.cost !== 0 || tempSkill.rank !== 0 || tempSkill.mod !== 0

        if (isValidObject) {
            insertSkill(tempSkill)
            event.target.value = null
        }
    }

    const showEditInputs = isEditing && leftOver > -1

    return (
        <div className='advanced-skill-display'>
            <div>
                <span>
                    <h3>Adv Skill</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
                <span>
                    <h3>Adv Skill</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
            </div>
            <div className='advanced-skill-shell'>
                {advancedSkills.map((skill, index) => skillRow(skill, index, adepts, isEditing))}
                {showEditInputs &&
                    <span className='advanced-skill-row'>
                        <input onBlur={(event: any) => insertRow('skill', event)} />
                        <input type='number' onBlur={(event: any) => insertRow('cost', event)} />
                        <input type='number' onBlur={(event: any) => insertRow('rank', event)} />
                        <input type='number' onBlur={(event: any) => insertRow('mod', event)} />
                    </span>}
                {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
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