import { cloneElement, JSX, useState } from 'react'
import './Loading.css'
import LoadingIndicator from './components/LoadingIndicator'

export type SetLoadingFunction = (showPageCondition: boolean) => void

interface Props {
    children: JSX.Element,
    secondary?: boolean
}

export default function Loading({ children, secondary = false }: Props) {
    const [isLoading, setIsLoading] = useState(true)

    const setLoading = (showPageCondition: boolean) => {
        setIsLoading(!showPageCondition)
    }

    return (
        <>
            <LoadingIndicator stylings={isLoading ? '' : 'display-none'} secondary={secondary} />
            <div className={isLoading ? 'display-none' : ''}>
                {cloneElement(children, { setLoading })}
            </div>
        </>
    )
}