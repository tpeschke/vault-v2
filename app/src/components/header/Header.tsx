import './Header.css'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

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
                <Link to={'/'}>
                    <i className="fa-solid fa-house"></i>
                </Link>
            </div>
        </div>
    )
}