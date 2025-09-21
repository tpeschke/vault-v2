import { SkillObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces';
import '../SkillDisplay.css'
import { useEffect, useState } from 'react';

interface Props {
    advancedSkills: SkillObject[],
    adepts: number
}

export default function AdvancedSkillDisplay({ advancedSkills, adepts }: Props) {
    const [leftOver, setLeftOver] = useState(0)

    useEffect(() => {
        setLeftOver(28 - advancedSkills.length)
    }, advancedSkills)

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
                {advancedSkills.map((skill, index) => skillRow(skill, index, adepts))}
                {[...Array(leftOver).keys()].map((_, index) => nullSkillRow(index))}
            </div>
        </div>
    )
}

export function skillRow({ skill, cost, rank, mod }: SkillObject, index: number, adepts: number) {
    return (
        <span key={index} className='advanced-skill-row'>
            <p>{skill}</p>
            <p>{cost + (rank * 2) - adepts}</p>
            <p>{rank}</p>
            <p>{mod}</p>
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