import '../LeftColumn.css'

interface Props {

}

export default function CheckModsDisplay({ }: Props) {
    return (
        <div className='check-mods-display-shell'>
            <h3>Check Mods & Skill Adepts</h3>
            <div>
                <span>
                    <strong>Str</strong>
                    <p>-2</p>
                </span>
                <span>
                    <strong>Dex</strong>
                    <p>-2</p>
                </span>
                <span>
                    <strong>Con</strong>
                    <p>-6</p>
                </span>
                <span>
                    <strong>Int</strong>
                    <p>2</p>
                </span>
                <span>
                    <strong>Will</strong>
                    <p>1</p>
                </span>
                <span>
                    <strong>Pre</strong>
                    <p>1</p>
                </span>
            </div>
            <span>
                <strong>Skill Adept(s)</strong>
                <p>0</p>
            </span>
        </div>
    )
}