import IntegrityDisplay from "./components/IntegrityDisplay";

interface Props {

}

export default function CharacteristicsDisplay({ }: Props) {
    return (
        <div className="characteristics-shell">
            <h2>Characteristics</h2>
            <IntegrityDisplay />
        </div>
    )
}