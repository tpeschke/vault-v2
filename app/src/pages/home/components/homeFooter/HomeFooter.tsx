import { useSelector } from 'react-redux'
import { getUserPatreon, isOwner } from '../../../../redux/slices/userSlice'
import './HomeFooter.css'

interface Props {
    numberOfCharacters: number | undefined
}

export default function HomeFooter({ numberOfCharacters = 0 }: Props) {
    const usersPatreon = useSelector(getUserPatreon)
    const userIsOwner = useSelector(isOwner)

    const limit = (usersPatreon * 20) + 10
    const userIsAtLimit = !userIsOwner && numberOfCharacters >= limit

    return (
        <div className="home-footer-shell">
            {!userIsAtLimit && (
                <button className='secondary' data-tooltip-id="my-tooltip" data-tooltip-content='Add New Character'>
                    <i className="fa-solid fa-user-plus"></i>
                </button>
            )}
            {userIsAtLimit && (
                <button className='disabled' data-tooltip-id="my-tooltip" data-tooltip-content="You're unable to add a new Character. Upgrade Your Patreon For More.">
                    <i className="fa-solid fa-user-plus"></i>
                </button>
            )}
            <h2 data-tooltip-id="my-tooltip" data-tooltip-content='Character Limit. Upgrade Your Patreon For More.'>{numberOfCharacters}/{userIsOwner ? '∞' : limit}</h2>
        </div>
    )
}