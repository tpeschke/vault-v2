import { PairObject } from "@vault/common/interfaces/characterInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {

}

export default function ConvictionsDisplay({ }: Props) {
    const convictions: PairObject[] = [
        {
            title: 'Keep it chill',
            value: 2
        },
        {
            title: null,
            value: 1
        },
        {
            title: 'Best Offense is Defense',
            value: 1
        },
        {
            title: null,
            value: 1
        }
    ]

    return (
        <div className="convictions-shell">
            <h3>Convictions</h3>
            <DisplayArray max={8} arrayToDisplay={convictions} />
        </div>
    )
}