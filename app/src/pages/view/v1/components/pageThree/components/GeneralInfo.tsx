import TextArea from '../../../../../../components/textArea/TextArea'
import '../PageThree.css'

interface Props {

}

export default function GeneralInfoDisplay({ }: Props) {
    const value = `Test Value
testing line2
test
st
ets
tes
tes
t
es`

    return (
        <>
            <h2>General Info</h2>
            <TextArea lines={53} value={value} />
        </>
    )
}