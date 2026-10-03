import './GeneralInfo.css'
import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces";
import { useContext } from 'react'
import EditingContext from '../../../../contexts/EditingContext'
import { PageType1Updates } from '../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    generalInfo: GeneralInfo
    pageID: number
    updates: PageType1Updates
}

export default function GeneralInfoDisplay({ generalInfo, pageID, updates }: Props) {
    const isEditing = useContext(EditingContext)
    const { name, ancestry, class: primaryClass, subclass, level, crp } = generalInfo
    const { unspent, spent, toLvl } = crp

    return (
        <div className="general-info-v2">
            <span>
                <strong>Name</strong>
                {isEditing ?
                    <input className="border character-value" placeholder=" " value={name} onChange={event => updates.updateGeneralInfoField(pageID, 'name', event.target.value)} />
                    :
                    <p className="border character-value">{name}</p>
                }
            </span>
            <span>
                <strong>Ancestry</strong>
                {isEditing ?
                    <input className="border character-value" placeholder=" " value={ancestry} onChange={event => updates.updateGeneralInfoField(pageID, 'ancestry', event.target.value)} />
                    :
                    <p className="border character-value">{ancestry}</p>
                }
            </span>
            <div className='multi-item-line'>
                <span>
                    <strong>Class</strong>
                    {isEditing ?
                        <input className="border character-value" placeholder=" " value={primaryClass} onChange={event => updates.updateGeneralInfoField(pageID, 'class', event.target.value)} />
                        :
                        <p className="border character-value">{primaryClass}</p>
                    }
                </span>
                <span>
                    <strong>Subclass</strong>
                    {isEditing ?
                        <input className="border character-value" placeholder=" " value={subclass} onChange={event => updates.updateGeneralInfoField(pageID, 'subclass', event.target.value)} />
                        :
                        <p className="border character-value">{subclass}</p>
                    }
                </span>
                <span>
                    <strong>Lvl</strong>
                    {isEditing ?
                        <input className="border center-text character-value" type="number" placeholder=" " value={level} onChange={event => updates.updateGeneralInfoField(pageID, 'level', +event.target.value)} />
                        :
                        <p className="border center-text character-value">{level}</p>
                    }
                </span>
            </div>
            <div className='multi-item-line'>
                <strong>CrP</strong>
                <span>
                    <em>Unspent</em>
                    <input className='border center-text character-value' type="number" placeholder=" " value={unspent} onChange={event => updates.updateCrP(pageID, 'unspent', +event.target.value)} onBlur={event => updates.persistViewField(pageID, 'unspent', +event.target.value)} />
                </span>
                <span>
                    <em>Spent</em>
                    {isEditing ?
                        <input className='border center-text character-value' type="number" placeholder=" " value={spent} onChange={event => updates.updateCrP(pageID, 'spent', +event.target.value)} />
                        :
                        <p className='border center-text character-value'>{spent}</p>
                    }
                </span>
                <span>
                    <em>Spent to lvl</em>
                    <p className='border center-text character-value'>{toLvl}</p>
                </span>
            </div>
        </div>
    )
}
