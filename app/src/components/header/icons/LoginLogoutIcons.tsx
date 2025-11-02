import { useSelector } from 'react-redux'
import { signOutURL, signInURL } from '../../../frontend-config'
import { isUserLoggedOn } from '../../../redux/slices/userSlice'
import '../Header.css'

interface Props {
}

export default function LoginLogoutIcons({ }: Props) {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            {userIsLoggedIn ?
                <a href={signOutURL} data-tooltip-id="my-tooltip" data-tooltip-content="Log Out">
                    <i className="fa-solid fa-person-from-portal"></i>
                </a>
                :
                <a href={signInURL} data-tooltip-id="my-tooltip" data-tooltip-content="Log In">
                    <i className="fa-solid fa-person-to-portal"></i>
                </a>
            }
        </>
    )
}