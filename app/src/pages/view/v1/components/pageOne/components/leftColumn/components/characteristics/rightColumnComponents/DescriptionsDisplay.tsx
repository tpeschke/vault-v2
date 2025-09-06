import { PairObject } from "@vault/common/interfaces/characterInterfaces"
import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {

}

export default function DescriptionsDisplay({ }: Props) {
    const descriptions: PairObject[] = [
        {
            title: 'Tall',
            value: 4
        },
        {
            title: null,
            value: 2
        },
        {
            title: 'Unattached',
            value: 2
        }
    ]

    return (
        <div className="descriptions-shell">
            <h3>Descriptions</h3>
            <DisplayArray max={5} arrayToDisplay={descriptions} />
        </div>
    )
}