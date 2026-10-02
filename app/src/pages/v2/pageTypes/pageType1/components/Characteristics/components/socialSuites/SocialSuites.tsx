import SocialSuiteDisplay from './components/SocialSuite'
import './SocialSuites.css'
import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"

interface Props {
    socialSuites: SocialSkillSuites
}

export default function SocialSuitesDisplay({ socialSuites }: Props) {
    const { influence, inform, intimidate, inspire } = socialSuites

    return (
        <div className="social-suites-v2">
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Influence' socialSuite={influence} />
                <SocialSuiteDisplay suiteName='Inform' socialSuite={inform} />
            </div>
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Inspire' socialSuite={inspire} />
                <SocialSuiteDisplay suiteName='Intimidate' socialSuite={intimidate} />
            </div>

        </div>
    )
}