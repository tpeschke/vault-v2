import '../CombatSkillsArea.css'

interface Props {

}

export default function StatsNMartialAdept({ }: Props) {
    return (
        <div className='stats-and-martial-adept-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Atk</strong>
                    <p>-2</p>
                </span>
                <span>
                    <strong>Def</strong>
                    <p>-2</p>
                </span>
                <span>
                    <strong>Dam</strong>
                    <p>-6</p>
                </span>
                <span>
                    <strong>Rec</strong>
                    <p>2</p>
                </span>
            </div>
            <span>
                <strong>Martial Adept(s)</strong>
                <p>0</p>
            </span>
        </div>
    )
}