import './GeneralInfo.css'
import logo from '../../../../../../../assets/images/logo-black.png'

interface Props {

}

export default function GeneralInfo({ }: Props) {

    function placeholderFunction() {

    }

    return (
        <div className='general-info-shell'>
            <div className='info-shell'>
                <div>
                    <span className='name-info'>
                        <strong>Name</strong>
                        <p>Weak Phineas</p>
                    </span>
                    <span className='player-info'>
                        <strong>Player</strong>
                        <p>?</p>
                    </span>
                </div>
                <div>
                    <span className='ancestry-info'>
                        <strong>Ancestry</strong>
                        <p>Elf</p>
                    </span>
                    <span className='class-info'>
                        <strong>Class / Subclass</strong>
                        <p>Weird-Adept</p>
                        <strong>/</strong>
                        <p>Weird-Adept</p>
                    </span>
                    <span className='level-info'>
                        <strong>LvL</strong>
                        <p>1</p>
                    </span>
                </div>
                <div className='crp-shell'>
                    <strong>CrP</strong>
                    <span className='unspent-crp-info'>
                        <strong>Unspent</strong>
                        <input onClick={placeholderFunction} defaultValue={0} />
                    </span>
                    <span className='spent-crp-info'>
                        <strong>Spent</strong>
                        <input onClick={placeholderFunction} defaultValue={0} />
                    </span>
                    <span className='to-next-level-info'>
                        <strong>Spent to Next LvL</strong>
                        <p>53</p>
                    </span>
                </div>
            </div>
            <div className='logo-shell'>
                <span>
                    <img src={logo} />
                    <h1>Bonfire</h1>
                </span>
                <h2>The Roleplaying Game</h2>
            </div>
        </div>
    )
}