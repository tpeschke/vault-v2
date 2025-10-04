import '../CombatSkillsArea.css'
import { useContext, useEffect, useState } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';
import { InsertCombatSkillFunction, UpdateCombatSkillFunction } from '../../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateCombatInterfaces';
import { CombatSkillObject, CombatSkillObjectKeys } from '@vault/common/interfaces/v1/pageTwo/combatInterfaces/combatSkills';

interface Props {
    combatAdvSkills: CombatSkillObject[],
    martialAdepts: number,
    insertCombatSkill: InsertCombatSkillFunction,
    updateCombatSkill: UpdateCombatSkillFunction
}

export default function CombatAdvSkills({ combatAdvSkills, martialAdepts, insertCombatSkill, updateCombatSkill }: Props) {
    const isEditing = useContext(EditingContext)

    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        setLeftOver(18 - combatAdvSkills.length)
    }, [combatAdvSkills])

    const showEditInputs = isEditing && leftOver > - 1

    function skillRow({ skill, cost, rank }: CombatSkillObject, index: number, martialAdepts: number) {
        const totalCost = cost + (rank * 2) - martialAdepts

        if (isEditing) {
            return (
                <span key={index} className='combat-advanced-skill-row'>
                    <input onChange={(event: any) => updateCombatSkill(index, {skill: event.target.value, cost, rank})} value={skill} />
                    <input onChange={(event: any) => updateCombatSkill(index, {skill, cost: +event.target.value, rank})} value={cost} data-tooltip-id="my-tooltip" data-tooltip-content={`Current Total Cost: ${totalCost} (Cost - Martial Adepts + Rank * 2)`} />
                    <input onChange={(event: any) => updateCombatSkill(index, {skill, cost, rank: +event.target.value})} value={rank} />
                </span>
            )
        }

        return (
            <span key={index} className='combat-advanced-skill-row'>
                <p>{skill}</p>
                <p>{totalCost}</p>
                <p>{rank}</p>
            </span>
        )
    }

    function insertRow(key: CombatSkillObjectKeys, event: any) {
        const { value } = event.target

        const tempSkill: CombatSkillObject = {
            skill: '',
            cost: 0,
            rank: 0,
            [key]: key === 'skill' ? value : +value
        }

        const isValidObject = tempSkill.skill !== '' || tempSkill.cost !== 0 || tempSkill.rank !== 0

        if (isValidObject) {
            insertCombatSkill(tempSkill)
            event.target.value = null
        }
    }

    return (
        <div className='combat-adv-skills-shell'>
            <div>
                <span>
                    <h3>Adv Skill</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                </span>
                <span>
                    <h3>Adv Skill</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                </span>
            </div>
            <div className='combat-advanced-skill-shell'>
                {combatAdvSkills.map((skill, index) => skillRow(skill, index, martialAdepts))}
                {showEditInputs &&
                    <span className='combat-advanced-skill-row'>
                        <input onChange={(event: any) => insertRow('skill', event)} />
                        <input onChange={(event: any) => insertRow('cost', event)} />
                        <input onChange={(event: any) => insertRow('rank', event)} />
                    </span>}
                {leftOver > -1 && [...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function nullSkillRow(index: number) {
    return (
        <span key={index} className='combat-advanced-skill-row null-advanced-combat-skill-row'>
            <p></p>
            <p></p>
            <p></p>
        </span>
    )
}