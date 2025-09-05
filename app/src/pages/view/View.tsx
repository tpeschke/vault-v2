import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function View({ setLoading }: Props) {
    useEffect(() => {
        if (setLoading) {
            setLoading(true)
        }
    }, [])

    return (
        <div className="home-shell card">
            <h1>View</h1>
        </div>
    )
}