import './Logo.css'
import logo from '../../../../../../assets/images/logo-black.png'

export default function LogoDisplay() {
    return (
        <div className="logo-v2">
            <span>
                <img src={logo} />
                <h1>Bonfire</h1>
            </span>
            <h2>The Roleplaying Game</h2>
        </div>
    )
}
