import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../SkillDisplay.css'
import { useContext, useEffect, useState } from 'react';
import EditingContext from '../../../../../contexts/EditingContext';

interface Props {
    advancedSkills: SkillObject[],
    adepts: number
}

export default function AdvancedSkillDisplay({ advancedSkills, adepts }: Props) {
    const isEditing = useContext(EditingContext)

    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        setLeftOver(28 - advancedSkills.length - (isEditing ? 1 : 0))
    }, [advancedSkills, isEditing])

    return (
        <div className='advanced-skill-display'>
            <div>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
                <span>
                    <h3>Skill Suites</h3>
                    <h3>Cost</h3>
                    <h3>Rank</h3>
                    <h3>Mod</h3>
                </span>
            </div>
            <div className='advanced-skill-shell'>
                {advancedSkills.map((skill, index) => skillRow(skill, index, adepts, isEditing))}
                {isEditing &&
                    <span className='advanced-skill-row'>
                        <input />
                        <input />
                        <input />
                        <input />
                    </span>}
                {[...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function skillRow({ skill, cost, rank, mod }: SkillObject, index: number, adepts: number, isEditing: boolean) {
    const totalCost = cost + (rank * 2) - adepts
    
    return (
        <span key={index} className='advanced-skill-row'>
            {isEditing ?
                <>
                    <input value={skill} />
                    <input value={cost} data-tooltip-id="my-tooltip" data-tooltip-content={`Current Total Cost: ${totalCost} (Cost - Adepts + Rank * 2)`}/>
                    <input value={rank} />
                    <input value={mod} />
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