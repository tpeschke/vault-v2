import './StrengthNDiscount.css'

interface Props {
    culturalStrength: string,
    socialSkillDiscount: number
}

export default function StrengthNDiscount({ culturalStrength, socialSkillDiscount }: Props) {
    return (
        <div className="strength-and-discount-v2">
            <span className='cultural-strength'>
                <h2>Cultural Strength</h2>
                <p>{culturalStrength}</p>
            </span>
            <span className='social-skill-discount'>
                <h2>Social Skill Discount</h2>
                <p>{socialSkillDiscount}</p>
            </span>
        </div>
    )
}