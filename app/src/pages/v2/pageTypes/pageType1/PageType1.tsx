import './PageType1.css'
import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import DoubleColumn from "../components/doubleColumn/DoubleColumn";
import GeneralInfoDisplay from './components/GeneralInfo/GeneralInfo';
import StatsDisplay from './components/Stats/Stats';
import CharacteristicsDisplay from './components/Characteristics/Characteristics';
import PositionsDisplay from './components/Positions/Positions';
import VitalsDisplay from './components/Vitals/Vitals';
import DefensesDisplay from './components/Defenses/Defenses';
import AttacksDisplay from './components/Attacks/Attacks';
import FavorDisplay from './components/Favor/Favor';
import wordmark from '../../../../assets/images/bonfire-wordmark.png'

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo, stats, characteristicsInfo, vitalsInfo, favor, combatInfo } = pageInfo

    return (
        <div className='page-shell page card page-type-one' id={'page-' + index}>
            <DoubleColumn>
                <>
                    <GeneralInfoDisplay generalInfo={generalInfo} />
                    <StatsDisplay stats={stats} />
                    <CharacteristicsDisplay characteristicsInfo={characteristicsInfo} />
                    <FavorDisplay favor={favor} />
                </>
                <>
                    <img className="page-type-one-wordmark" src={wordmark} alt="Bonfire The Roleplaying Game" />
                    <PositionsDisplay />
                    <VitalsDisplay vitals={vitalsInfo} />
                    <DefensesDisplay defenses={combatInfo.defenses} />
                    <AttacksDisplay attacks={combatInfo.attacks} />
                </>
            </DoubleColumn>
        </div>
    )
}
