import "./Home.css"
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
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <Link to={'/view/5'}>
                <p>To View</p>
            </Link>
        </div>
    )
}