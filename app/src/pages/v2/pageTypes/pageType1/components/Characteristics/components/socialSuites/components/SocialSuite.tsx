import { SkillSuiteInfo, SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    suiteName: string,
    suiteKey: keyof SocialSkillSuites,
    socialSuite: SkillSuiteInfo
    pageID: number
    updates: PageType1Updates
}

export default function SocialSuiteDisplay({ suiteName, suiteKey, socialSuite, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { stat, rank, descriptions } = socialSuite
    const rows = descriptions ?? []

    return (
        <>
            <span className="suite-title">
                <em>{suiteName}</em>
                {isEditing ?
                    <input className="character-value" type="number" placeholder=" " value={stat} onChange={event => updates.updateSocialSuiteField(pageID, suiteKey, 'stat', +event.target.value)} />
                    :
                    <p className="character-value">{stat}</p>
                }
                {isEditing ?
                    <input className="character-value" type="number" placeholder=" " value={rank} onChange={event => updates.updateSocialSuiteField(pageID, suiteKey, 'rank', +event.target.value)} />
                    :
                    <p className="character-value">{rank}</p>
                }
            </span>
            {[...Array(6)].map((_, index) => {
                const row = rows[index]
                return (
                    <span key={row?.id ?? index} className="description-row">
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={row?.value ?? ''} onChange={event => updates.updateSocialSuiteDescription(pageID, suiteKey, index, 'value', event.target.value)} />
                            :
                            <p className="character-value">{row?.value ?? ''}</p>
                        }
                        {isEditing ?
                            <input className="character-value" type="number" placeholder=" " value={row?.rank ?? ''} onChange={event => updates.updateSocialSuiteDescription(pageID, suiteKey, index, 'rank', +event.target.value)} />
                            :
                            <p className="character-value">{row?.rank}</p>
                        }
                    </span>
                )
            })}
        </>
    )
}
