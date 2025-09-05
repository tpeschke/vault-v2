import './LoadingIndicator.css'

interface Props {
    stylings: string,
    secondary: boolean
}

export default function LoadingIndicator({ stylings, secondary = false }: Props) {
    let classString = 'loader'
    secondary ? classString += ' secondaryColor' : ''

    !secondary ? stylings += ' full-height' : ''

    return (
        <div className={`${stylings} loading-indicator-shell`}>
            <span className={classString}></span>
        </div>
    )
}