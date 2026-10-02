import SocialSuiteDisplay from './components/SocialSuite'
import './SocialSuites.css'
import { SocialSkillSuites } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import { PageType1Updates } from '../../../../../../hooks/interfaces/UpdateInterfaces'

interface Props {
    socialSuites: SocialSkillSuites
    pageID: number
    updates: PageType1Updates
}

export default function SocialSuitesDisplay({ socialSuites, pageID, updates }: Props) {
    const { influence, inform, intimidate, inspire } = socialSuites

    return (
        <div className="social-suites-v2">
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Influence' suiteKey='influence' socialSuite={influence} pageID={pageID} updates={updates} />
                <SocialSuiteDisplay suiteName='Inform' suiteKey='inform' socialSuite={inform} pageID={pageID} updates={updates} />
            </div>
            <div>
                <span>
                    <h2>Social Suites</h2>
                    <h2>Stat</h2>
                    <h2>Rank</h2>
                </span>
                <SocialSuiteDisplay suiteName='Inspire' suiteKey='inspire' socialSuite={inspire} pageID={pageID} updates={updates} />
                <SocialSuiteDisplay suiteName='Intimidate' suiteKey='intimidate' socialSuite={intimidate} pageID={pageID} updates={updates} />
            </div>

        </div>
    )
}
