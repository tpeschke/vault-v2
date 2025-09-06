import './View.css'
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import ViewVersionOne from "./v1/ViewVersionOne"

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
        <div className="home-shell">
            <ViewVersionOne />
        </div>
    )
}