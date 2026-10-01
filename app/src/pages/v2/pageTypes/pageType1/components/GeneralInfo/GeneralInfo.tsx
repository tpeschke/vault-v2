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
                <p className="border">{name}</p>
            </span>
            <span>
                <strong>Ancestry</strong>
                <p className="border">{ancestry}</p>
            </span>
            <div className='multi-item-line'>
                <span>
                    <strong>Class</strong>
                    <p className="border">{primaryClass}</p>
                </span>
                <span>
                    <strong>Subclass</strong>
                    <p className="border">{subclass}</p>
                </span>
                <span>
                    <strong>lvl</strong>
                    <p className="border center-text">{level}</p>
                </span>
            </div>
            <div className='multi-item-line'>
                <strong>CrP</strong>
                <span>
                    <em>Unspent</em>
                    <p className='border center-text'>{unspent}</p>
                </span>
                <span>
                    <em>Spent</em>
                    <p className='border center-text'>{spent}</p>
                </span>
                <span>
                    <em>Spent to Level</em>
                    <p className='border center-text'>{toLvl}</p>
                </span>
            </div>
        </div>
    )
}