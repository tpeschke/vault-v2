import './Attacks.css'
import { AttacksArray } from "@vault/common/interfaces/v2/page1/combatInfo"

interface Props {
    attacks: AttacksArray
}

export default function AttacksDisplay({ attacks }: Props) {
    return (
        <div className="attacks-v2">
            <h1>Attacks</h1>
            <span className='attacks-header'>
                <h2>Name</h2>
                <h2>Meas</h2>
                <h2>Atk</h2>
                <h2>Dmg</h2>
                <h2>Type</h2>
                <h2>Rec</h2>
                <h2>Notes</h2>
            </span>
            {attacks.map((attackRow) => {
                const { index, name, measure, attack, damage, type, recovery, notes } = attackRow
                return (
                    <span key={index}>
                        <p>{name}</p>
                        <p>{measure}</p>
                        <p>{attack}</p>
                        <p>{damage}</p>
                        <p>{type}</p>
                        <p>{recovery}</p>
                        <p>{notes}</p>
                    </span>
                )
            })}
            {[...Array(Math.max(0, 4 - attacks.length))].map((_, index) => {
                return (
                    <span key={`empty-${index}`}>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </span>
                )
            })}
        </div>
    )
}
