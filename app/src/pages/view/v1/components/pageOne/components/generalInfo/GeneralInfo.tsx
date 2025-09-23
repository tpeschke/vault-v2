import './GeneralInfo.css'
import logo from '../../../../../../../assets/images/logo-black.png'
import { GeneralInfo as GeneralInfoDisplay } from '@vault/common/interfaces/v1/pageOne/pageOneInterfaces'
import EditingContext from '../../../../contexts/EditingContext'
import { useContext } from 'react'

interface Props {
    generalInfo: GeneralInfoDisplay
}

export default function GeneralInfo({ generalInfo }: Props) {
    const isEditing = useContext(EditingContext)

    const { name, ancestry, class: primaryClass, subclass, level, crpUnspent, crpSpent, crpToNextLevel } = generalInfo

    function placeholderFunction() {

    }

    return (
        <div className='general-info-shell'>
            <div className='info-shell'>
                <div>
                    <span className='name-info'>
                        <strong>Name</strong>
                        {isEditing ?
                            <input onClick={placeholderFunction} defaultValue={name} />
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
                            <input onClick={placeholderFunction} defaultValue={ancestry} />
                            :
                            <p>{ancestry}</p>
                        }
                    </span>
                    <span className='class-info'>
                        <strong>Class / Subclass</strong>
                        {isEditing ?
                            <input onClick={placeholderFunction} defaultValue={primaryClass} />
                            :
                            <p>{primaryClass}</p>
                        }
                        <strong>/</strong>
                        {isEditing ?
                            <input onClick={placeholderFunction} defaultValue={subclass} />
                            :
                            <p>{subclass}</p>
                        }
                    </span>
                    <span className='level-info'>
                        <strong>LvL</strong>
                        {isEditing ?
                            <input onClick={placeholderFunction} defaultValue={level} />
                            :
                            <p>{level}</p>
                        }
                    </span>
                </div>
                <div className='crp-shell'>
                    <strong>CrP</strong>
                    <span className='unspent-crp-info'>
                        <strong>Unspent</strong>
                        <input onClick={placeholderFunction} defaultValue={crpUnspent} />
                    </span>
                    <span className='spent-crp-info'>
                        <strong>Spent</strong>
                        <input onClick={placeholderFunction} defaultValue={crpSpent} />
                    </span>
                    <span className='to-next-level-info'>
                        <strong>Spent to Next LvL</strong>
                        {isEditing ?
                            <input onClick={placeholderFunction} defaultValue={crpToNextLevel} />
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