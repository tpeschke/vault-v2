import DisplayArray from "../../../../../../../../../../components/displayArray/DisplayArray"

interface Props {

}

export default function FlawsDisplay({ }: Props) {
    const flaws = [
        'Cautious',
        'Boundary Tester',
        'Whiny Bitch'
    ]

    return (
        <div className="flaws-shell">
            <h3>Flaws</h3>
            <DisplayArray max={6} arrayToDisplay={flaws} />
        </div>
    )
}