import './GeneralInfo.css'
import logo from '../../../../../../../assets/images/logo-black.png'
import { GeneralInfo as GeneralInfoDisplay } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import EditingContext from '../../../../contexts/EditingContext'
import { useContext } from 'react'
import { UpdateGeneralInfoFunction } from '../../../../hooks/interfaces/PageOneInterfaces'

interface Props {
    generalInfo: GeneralInfoDisplay,
    updateGeneralInfo: UpdateGeneralInfoFunction
}

export default function GeneralInfo({ generalInfo, updateGeneralInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, ancestry, class: primaryClass, subclass, level, crpUnspent, crpSpent, crpToNextLevel } = generalInfo

    return (
        <div className='general-info-shell'>
            <div className='info-shell'>
                <div>
                    <span className='name-info'>
                        <strong>Name</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('name', event.target.value)} defaultValue={name} />
                            :
                            <p>{name}</p>
                        }
                    </span>
                    <span className='player-info'>
                        <strong>Player</strong>
                        <p> </p>
                    </span>
                </div>
                <div>
                    <span className='ancestry-info'>
                        <strong>Ancestry</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('ancestry', event.target.value)} defaultValue={ancestry} />
                            :
                            <p>{ancestry}</p>
                        }
                    </span>
                    <span className='class-info'>
                        <strong>Class / Subclass</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('class', event.target.value)} defaultValue={primaryClass} />
                            :
                            <p>{primaryClass}</p>
                        }
                        <strong>/</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('subclass', event.target.value)} defaultValue={subclass} />
                            :
                            <p>{subclass}</p>
                        }
                    </span>
                    <span className='level-info'>
                        <strong>LvL</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('level', +event.target.value)} defaultValue={level} />
                            :
                            <p>{level}</p>
                        }
                    </span>
                </div>
                <div className='crp-shell'>
                    <strong>CrP</strong>
                    <span className='unspent-crp-info'>
                        <strong>Unspent</strong>
                        <input onChange={(event: any) => updateGeneralInfo('crpUnspent', +event.target.value)} defaultValue={crpUnspent} />
                    </span>
                    <span className='spent-crp-info'>
                        <strong>Spent</strong>
                        <input onChange={(event: any) => updateGeneralInfo('crpSpent', +event.target.value)} defaultValue={crpSpent} />
                    </span>
                    <span className='to-next-level-info'>
                        <strong>Spent to Next LvL</strong>
                        {isEditing ?
                            <input onChange={(event: any) => updateGeneralInfo('crpToNextLevel', +event.target.value)} defaultValue={crpToNextLevel} />
                            :
                            <p>{crpToNextLevel}</p>
                        }
                    </span>
                </div>
            </div>
            <div className='logo-shell'>
                <span>
                    <img src={logo} />
                    <h1>Bonfire</h1>
                </span>
                <h2>The Roleplaying Game</h2>
            </div>
        </div>
    )
}