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
                    <h2>Social Suite</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Empathize' socialSuite={empathize} />
                <SocialSuiteDisplay suiteName='Lecture' socialSuite={lecture} />
            </div>
            <div>
                <span>
                    <h2>Social Suite</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Intimidate' socialSuite={intimidate} />
                <SocialSuiteDisplay suiteName='Tempt' socialSuite={tempt} />
            </div>

        </div>
    )
}