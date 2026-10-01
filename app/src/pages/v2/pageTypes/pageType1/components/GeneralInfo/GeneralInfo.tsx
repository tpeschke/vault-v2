import './GeneralInfo.css'
import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces";

interface Props {
    generalInfo: GeneralInfo
}

export default function GeneralInfoDisplay({ generalInfo }: Props) {
    const { name, ancestry, class: primaryClass, subclass, level, crp } = generalInfo
    const { unspent, spent, toLvl } = crp

    return (
        <div className="general-info-v2">
            <span>
                <strong>Name</strong>
                <p className="border character-value">{name}</p>
            </span>
            <span>
                <strong>Ancestry</strong>
                <p className="border character-value">{ancestry}</p>
            </span>
            <div className='multi-item-line'>
                <span>
                    <strong>Class</strong>
                    <p className="border character-value">{primaryClass}</p>
                </span>
                <span>
                    <strong>Subclass</strong>
                    <p className="border character-value">{subclass}</p>
                </span>
                <span>
                    <strong>Lvl</strong>
                    <p className="border center-text character-value">{level}</p>
                </span>
            </div>
            <div className='multi-item-line'>
                <strong>CrP</strong>
                <span>
                    <em>Unspent</em>
                    <p className='border center-text character-value'>{unspent}</p>
                </span>
                <span>
                    <em>Spent</em>
                    <p className='border center-text character-value'>{spent}</p>
                </span>
                <span>
                    <em>Spent to lvl</em>
                    <p className='border center-text character-value'>{toLvl}</p>
                </span>
            </div>
        </div>
    )
}