import { CheckModsObject } from '@vault/common/interfaces/v1/pageTwo/skillInterfaces'
import '../LeftColumn.css'
import { useContext } from 'react'
import EditingContext from '../../../../../../../contexts/EditingContext'
import { UpdateSkillAdept } from '../../../../../../../hooks/interfaces/pageTwoInterfaces/UpdateSkillInterfaces'
import IsBlankContext from '../../../../../../../contexts/IsBlankContext'

interface Props {
    checkMods: CheckModsObject,
    adepts: number,
    updateSkillAdept: UpdateSkillAdept,
}

export default function CheckModsDisplay({ checkMods, adepts, updateSkillAdept }: Props) {
    const isBlank = useContext(IsBlankContext)
    const isEditing = useContext(EditingContext)
    
    if (!isBlank) {
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
                        <input type='number' onChange={(event: any) => updateSkillAdept(+event.target.value)} value={adepts} />
                        :
                        <p>{adepts}</p>
                    }
                </span>
            </div>
        )
    }

    return (
        <div className='check-mods-display-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Str</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Dex</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Con</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Int</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Will</strong>
                    <p> </p>
                </span>
                <span>
                    <strong>Pre</strong>
                    <p> </p>
                </span>
            </div>
            <span>
                <strong>Skill Adept(s)</strong>
                <p> </p>
            </span>
        </div>
    )
}