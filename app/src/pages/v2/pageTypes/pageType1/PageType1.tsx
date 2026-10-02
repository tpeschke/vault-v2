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
import { PageType1Updates } from '../../hooks/interfaces/UpdateInterfaces';

interface Props {
    pageInfo: Page1,
    index: number,
    updates: PageType1Updates
}

export default function PageType1({ pageInfo, index, updates }: Props) {
    const { pageID, generalInfo, stats, characteristicsInfo, vitalsInfo, favor, combatInfo } = pageInfo

    return (
        <div className='page-shell page card page-type-one' id={'page-' + index}>
            <DoubleColumn>
                <>
                    <GeneralInfoDisplay generalInfo={generalInfo} pageID={pageID} updates={updates} />
                    <StatsDisplay stats={stats} pageID={pageID} updates={updates} />
                    <CharacteristicsDisplay characteristicsInfo={characteristicsInfo} pageID={pageID} updates={updates} />
                    <FavorDisplay favor={favor} pageID={pageID} updates={updates} />
                </>
                <>
                    <img className="page-type-one-wordmark" src={wordmark} alt="Bonfire The Roleplaying Game" />
                    <PositionsDisplay />
                    <VitalsDisplay vitals={vitalsInfo} pageID={pageID} updates={updates} />
                    <DefensesDisplay defenses={combatInfo.defenses} pageID={pageID} updates={updates} />
                    <AttacksDisplay attacks={combatInfo.attacks} pageID={pageID} updates={updates} />
                </>
            </DoubleColumn>
        </div>
    )
}
