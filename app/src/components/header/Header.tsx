import './Header.css'
import logo from '../../assets/images/logo-white.png'
import { Link } from 'react-router-dom'
import LoginLogoutIcons from './icons/LoginLogoutIcons'

interface Props {
}

export default function Header({ }: Props) {
    return (
        <div className="header-shell">
            <div>
                <Link to={'/'}>
                    <img src={logo} />
                    <h1>Bonfire Character Vault</h1>
                </Link>
            </div>
            <div className='icon-shell'>
                <LoginLogoutIcons />
                <Link to={'/view/blank'} data-tooltip-id="my-tooltip" data-tooltip-content="View Blank Character Sheet">
                    <i className="fa-solid fa-cards-blank"></i>
                </Link>
                <Link to={'/'}>
                    <i className="fa-solid fa-house"></i>
                </Link>
            </div>
        </div>
    )
}