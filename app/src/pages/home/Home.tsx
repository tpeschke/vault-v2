import "./Home.css"
import { useEffect } from "react"
import { SetLoadingFunction } from "../../components/loading/Loading"
import { Link } from "react-router-dom"
import UsersCharactersHook from "../../hooks/UsersCharactersHook"

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function Home({ setLoading, pathname }: Props) {
    const { usersCharacters } = UsersCharactersHook(pathname)

    useEffect(() => {
        if (setLoading) {
            setLoading(!!usersCharacters)
        }
    }, [])

    return (
        <div className="home-shell card">
            <div className="home-shell-heading">
                <i className="fa-solid fa-users"></i>
                <h1>Your Characters</h1>
            </div>
            <div>
                {usersCharacters?.map(({ id, name }, index) => {
                    return (
                        <Link to={`/view/${id}`} key={index}>
                            <p>{name}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}