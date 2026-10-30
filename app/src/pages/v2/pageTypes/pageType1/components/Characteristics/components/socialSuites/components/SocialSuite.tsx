import { SkillSuiteInfo, SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'
import BlankContext, { blankInk } from '../../../../../../../contexts/BlankContext'
import { PageType1Updates } from '../../../../../../../hooks/interfaces/UpdateInterfaces'
import DisplayPairArray from '../../../../../../../components/displayArray/DisplayPairArray'

interface Props {
    suiteName: string,
    suiteKey: keyof SocialSkillSuites,
    socialSuite: SkillSuiteInfo
    pageID: number
    updates: PageType1Updates
}

export default function SocialSuiteDisplay({ suiteName, suiteKey, socialSuite, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const isBlank = useContext(BlankContext)
    const { stat, rank, descriptions } = socialSuite
    const rows = descriptions ?? []

    return (
        <>
            <span className="suite-title">
                <em>{suiteName}</em>
                {isEditing ?
                    <input className="character-value" type="number" placeholder=" " value={blankInk(isBlank, stat)} onChange={event => updates.updateSocialSuiteField(pageID, suiteKey, 'stat', +event.target.value)} />
                    :
                    <p className="character-value">{blankInk(isBlank, stat)}</p>
                }
                {isEditing ?
                    <input className="character-value" type="number" placeholder=" " value={blankInk(isBlank, rank)} onChange={event => updates.updateSocialSuiteField(pageID, suiteKey, 'rank', +event.target.value)} />
                    :
                    <p className="character-value">{blankInk(isBlank, rank)}</p>
                }
            </span>
            <DisplayPairArray
                max={6}
                items={rows}
                insert={row => updates.insertSocialSuiteDescription(pageID, suiteKey, {
                    key: row.key,
                    value: row.value,
                    rank: row.rank === '' ? '' : +row.rank
                })}
                update={(index, next) => updates.updateSocialSuiteDescription(pageID, suiteKey, index, {
                    id: next.id ?? 0,
                    key: next.key,
                    value: next.value,
                    rank: next.rank === '' ? '' : +next.rank
                })}
                renderRow={(item, _index, onChange) => (
                    <span className="description-row">
                        {isEditing ?
                            <input className="character-value" placeholder=" " value={blankInk(isBlank, item.value)} onChange={event => onChange({ ...item, value: event.target.value })} />
                            :
                            <p className="character-value">{blankInk(isBlank, item.value)}</p>
                        }
                        {isEditing ?
                            <input
                                className="character-value"
                                type="number"
                                placeholder=" "
                                value={blankInk(isBlank, item.rank)}
                                onChange={event => onChange({
                                    ...item,
                                    rank: event.target.value === '' ? '' : +event.target.value
                                })}
                            />
                            :
                            <p className="character-value">{blankInk(isBlank, item.rank)}</p>
                        }
                    </span>
                )}
                renderInsert={(onBlurValue, onBlurRank) => (
                    <span className="description-row">
                        <input className="character-value" placeholder=" " readOnly={isBlank} onBlur={onBlurValue} />
                        <input className="character-value" type="number" placeholder=" " readOnly={isBlank} onBlur={onBlurRank} />
                    </span>
                )}
                renderLeftover={() => (
                    <span className="description-row">
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                )}
            />
        </>
    )
}
