import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import { Link } from "react-router-dom"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function Home({ setLoading }: Props) {
    useEffect(() => {
        if (setLoading) {
            setLoading(true)
        }
    }, [])

    return (
        <div className="home-shell card">
            <h1>Home</h1>
            <Link to={'/view/5'}>
                <p>To View</p>
            </Link>
        </div>
    )
}