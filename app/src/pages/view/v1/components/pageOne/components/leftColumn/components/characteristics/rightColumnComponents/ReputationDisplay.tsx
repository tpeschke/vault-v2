interface Props {

}

export default function ReputationDisplay({ }: Props) {
    const reputation: string[] = [
        'Tall',
        'Unattached'
    ]

    return (
        <div className="reputation-shell">
            <h3>Reputation</h3>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[0]}</p>
            </span>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[1]}</p>
            </span>
            <span>
                <strong>I'm Know For</strong>
                <p>{reputation[2]}</p>
            </span>
        </div>
    )
}