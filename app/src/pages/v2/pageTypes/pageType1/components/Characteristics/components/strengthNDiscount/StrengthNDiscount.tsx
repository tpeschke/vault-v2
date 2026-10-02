import './StrengthNDiscount.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    culturalStrength: string,
    socialSkillDiscount: number
    pageID: number
    updates: PageType1Updates
}

export default function StrengthNDiscount({ culturalStrength, socialSkillDiscount, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)

    return (
        <div className="strength-and-discount-v2">
            <span className='cultural-strength'>
                <h2>Cultural Strength</h2>
                {isEditing ?
                    <input className="character-value" value={culturalStrength} onChange={event => updates.updateCulturalStrength(pageID, event.target.value)} />
                    :
                    <p className="character-value">{culturalStrength}</p>
                }
            </span>
            <span className='social-skill-discount'>
                <h2>Social Skill Discount</h2>
                {isEditing ?
                    <input className="character-value" type="number" value={socialSkillDiscount} onChange={event => updates.updateSocialSkillDiscount(pageID, +event.target.value)} />
                    :
                    <p className="character-value">{socialSkillDiscount}</p>
                }
            </span>
        </div>
    )
}
