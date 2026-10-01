import { SkillSuiteInfo } from "@vault/common/interfaces/v2/page1/characteristicsInfo"

interface Props {
    suiteName: string,
    socialSuite: SkillSuiteInfo
}

export default function SocialSuiteDisplay({ suiteName, socialSuite }: Props) {
    const { stat, rank, descriptions } = socialSuite

    return (
        <>
            <span className="suite-title">
                <em>{suiteName}</em>
                <p className="character-value">{stat}</p>
                <p className="character-value">{rank}</p>
            </span>
            {descriptions.map(({ id, value, rank }) => {
                return (
                    <span key={id} className="description-row">
                        <p className="character-value">{value}</p>
                        <p className="character-value">{rank}</p>
                    </span>
                )
            })}
            {[...Array(6 - descriptions.length)].map((_, index) => {
                return (
                    <span key={index} className="description-row">
                        <p className="character-value"></p>
                        <p className="character-value"></p>
                    </span>
                )
            })}
        </>
    )
}
