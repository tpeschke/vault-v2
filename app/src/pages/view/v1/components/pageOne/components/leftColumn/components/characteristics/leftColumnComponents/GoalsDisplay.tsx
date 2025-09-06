import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {

}

export default function GoalsDisplay({ }: Props) {
    const goals = ['BECOME POWERFUL']

    return (
        <div className="goals-shell">
            <h3>Goals</h3>
            <DisplayArray max={3} arrayToDisplay={goals} />
        </div>
    )
}