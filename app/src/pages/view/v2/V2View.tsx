import '../View.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../components/loading/Loading"
import characterHook from './hooks/characterHook'
import PageType1 from './pageTypes/pageType1/PageType1'

interface Props {
    setLoading?: SetLoadingFunction,
    pathname: string
}

export default function V2View({ setLoading, pathname }: Props) {
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    const { character } = characterHook(pathname)

    useEffect(() => {
        if (character && isInitialLoad) {
            const { name } = character
            document.title = `${name ? name : 'Blank'} - Bonfire Character Vault`
            window.scrollTo(0, 0)
            setIsInitialLoad(false)
        }

        if (setLoading) {
            setLoading(!!character)
        }
    }, [character])

    return (
        <div className="home-shell">
            <div className='page-shell'>
                {character && character.pages.map((page, index) => {
                    switch (page.type) {
                        case 1:
                            return <PageType1 key={page.pageID} pageInfo={page} index={index} />
                        default:
                            return <></>
                    }
                })}
            </div>
            {/* Sidebar */}
        </div>
    )
}