import SocialSuiteDisplay from './components/SocialSuite'
import './SocialSuites.css'
import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"

interface Props {
    socialSuites: SocialSkillSuites
}

export default function SocialSuitesDisplay({ socialSuites }: Props) {
    const { empathize, lecture, intimidate, tempt } = socialSuites

    return (
        <div className="social-suites-v2">
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Influence' socialSuite={empathize} />
                <SocialSuiteDisplay suiteName='Inform' socialSuite={lecture} />
            </div>
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Inspire' socialSuite={tempt} />
                <SocialSuiteDisplay suiteName='Intimidate' socialSuite={intimidate} />
            </div>

        </div>
    )
}