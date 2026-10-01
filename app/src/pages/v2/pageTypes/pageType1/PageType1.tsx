import './PageType1.css'
import { Page1 } from "@vault/common/interfaces/v2/pageTypes";
import DoubleColumn from "../components/doubleColumn/DoubleColumn";
import GeneralInfoDisplay from './components/GeneralInfo/GeneralInfo';
import StatsDisplay from './components/Stats/Stats';
import CharacteristicsDisplay from './components/Characteristics/Characteristics';
import MovementDisplay from './components/Characteristics/components/movement/MovementDisplay';
import LogoDisplay from './components/Logo/Logo';
import VitalsDisplay from './components/Vitals/Vitals';
import FavorDisplay from './components/Favor/Favor';
import DefensesDisplay from './components/Defenses/Defenses';
import AttacksDisplay from './components/Attacks/Attacks';

interface Props {
    pageInfo: Page1,
    index: number
}

export default function PageType1({ pageInfo, index }: Props) {
    const { generalInfo, stats, characteristicsInfo, movement, vitalsInfo, favor, combatInfo } = pageInfo
    const { defenses, attacks } = combatInfo

    return (
        <div className='page-shell page card page-type-one' id={'page-' + index}>
            <DoubleColumn>
                <>
                    <GeneralInfoDisplay generalInfo={generalInfo} />
                    <StatsDisplay stats={stats} />
                    <CharacteristicsDisplay characteristicsInfo={characteristicsInfo} />
                    <MovementDisplay movement={movement} />
                </>
                <>
                    <LogoDisplay />
                    <VitalsDisplay vitalsInfo={vitalsInfo} />
                    <FavorDisplay favor={favor} />
                    <DefensesDisplay defenses={defenses} />
                    <AttacksDisplay attacks={attacks} />
                </>
            </DoubleColumn>
        </div>
    )
}
