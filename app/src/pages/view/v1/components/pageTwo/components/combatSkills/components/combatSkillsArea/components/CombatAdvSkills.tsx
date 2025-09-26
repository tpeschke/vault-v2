import { CombatSkillObject } from '@vault/common/interfaces/v1/pageTwo/combatSkills';
import '../CombatSkillsArea.css'
import { useContext, useEffect, useState } from 'react';
import EditingContext from '../../../../../../../contexts/EditingContext';

interface Props {
    combatAdvSkills: CombatSkillObject[],
    martialAdepts: number
}

export default function CombatAdvSkills({ combatAdvSkills, martialAdepts }: Props) {    
    const isEditing = useContext(EditingContext)
    
    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        setLeftOver(18 - combatAdvSkills.length - (isEditing ? 1 : 0))
    }, [combatAdvSkills])

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
                {isEditing &&
                    <span className='combat-advanced-skill-row'>
                        <input />
                        <input />
                        <input />
                    </span>}
                {[...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function skillRow({ skill, cost, rank }: CombatSkillObject, index: number, martialAdepts: number) {
    return (
        <span key={index} className='combat-advanced-skill-row'>
            <p>{skill}</p>
            <p>{cost + (rank * 2) - martialAdepts}</p>
            <p>{rank}</p>
        </span>
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