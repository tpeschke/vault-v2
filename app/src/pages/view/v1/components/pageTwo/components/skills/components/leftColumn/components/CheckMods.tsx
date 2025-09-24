import { CheckModsObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import '../LeftColumn.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'

interface Props {
    checkMods: CheckModsObject,
    adepts: number
}

export default function CheckModsDisplay({ checkMods, adepts }: Props) {
    const isEditing = useContext(EditingContext)

    const { str, dex, con, int, will, pre } = checkMods

    return (
        <div className='check-mods-display-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Str</strong>
                    <p>{str}</p>
                </span>
                <span>
                    <strong>Dex</strong>
                    <p>{dex}</p>
                </span>
                <span>
                    <strong>Con</strong>
                    <p>{con}</p>
                </span>
                <span>
                    <strong>Int</strong>
                    <p>{int}</p>
                </span>
                <span>
                    <strong>Will</strong>
                    <p>{will}</p>
                </span>
                <span>
                    <strong>Pre</strong>
                    <p>{pre}</p>
                </span>
            </div>
            <span>
                <strong>Skill Adept(s)</strong>
                {isEditing ?
                    <input value={adepts} />
                    :
                    <p>{adepts}</p>
                }
            </span>
        </div>
    )
}