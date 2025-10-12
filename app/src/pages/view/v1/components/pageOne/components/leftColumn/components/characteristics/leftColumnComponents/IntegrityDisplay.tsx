import { IntegrityInfo } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { useContext, useEffect, useState } from "react"
import { UpdateIntegrityInfo } from "../../../../../../../hooks/interfaces/pageOneInterfaces/UpdateCharacteristicInterfaces"
import IsBlankContext from "../../../../../../../contexts/IsBlankContext"

interface Props {
    integrityInfo: IntegrityInfo,
    updateIntegrityInfo: UpdateIntegrityInfo
}

export default function IntegrityDisplay({ integrityInfo, updateIntegrityInfo }: Props) {
    const isBlank = useContext(IsBlankContext)

    if (!isBlank) {
        const { integrity, gritDie } = integrityInfo

        const [leftPosition, setLeftPosition] = useState(21)

        useEffect(() => {
            setLeftPosition(getLeftPosition(integrity))
        }, [integrity])

        function getLeftPosition(integrity: number): number {
            if (integrity <= 5) {
                return 21
            } else if (integrity <= 10) {
                return 76
            } else if (integrity <= 15) {
                return 135
            } else if (integrity <= 20) {
                return 194
            } else if (integrity <= 25) {
                return 258
            } else {
                return 21
            }
        }

        return (
            <div className="integrity-shell">
                <span>
                    <input type="number" onChange={(event: any) => updateIntegrityInfo('integrity', +event.target.value)} defaultValue={integrity} />
                    <strong>Integrity</strong>
                </span>
                <div>
                    <div className="circle" style={{ left: `${leftPosition}px` }}></div>
                    <p>0-5 N/A</p>
                    <p>6-10 d4!</p>
                    <p>11-15 d6!</p>
                    <p>16-20 d8!</p>
                    <p>21-25 d10!</p>
                </div>
                <span>
                    <strong>Grit Dice</strong>
                    <input type="number" onChange={(event: any) => updateIntegrityInfo('gritDie', +event.target.value)} defaultValue={gritDie} />
                </span>
            </div>
        )
    }

    return (
        <div className="integrity-shell">
            <span>
                <p> </p>
                <strong>Integrity</strong>
            </span>
            <div>
                <p>0-5 N/A</p>
                <p>6-10 d4!</p>
                <p>11-15 d6!</p>
                <p>16-20 d8!</p>
                <p>21-25 d10!</p>
            </div>
            <span>
                <strong>Grit Dice</strong>
                <p> </p>
            </span>
        </div>
    )
}