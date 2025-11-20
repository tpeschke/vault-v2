import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces";
import query from "../../../../../../db/database";

interface RawGeneralInfo {
    id: number,
    characterid: number,
    name: string,
    ancestry: string,
    class: string,
    subclass: string,
    level: number,
    unspent: number,
    spent: number
}

const getGeneralInfoSQL = `select * from v2generalinfo where characterID = $1`

export default async function getGeneralInfo(characterID: number): Promise<GeneralInfo> {
    const [info]: RawGeneralInfo[] = await query(getGeneralInfoSQL, characterID)

    if (info) {
        const { name, ancestry, class: primeClass, subclass, level, unspent, spent } = info

        return {
            name, ancestry,
            class: primeClass,
            subclass, level,
            crp: {
                unspent,
                spent,
                toLvl: getToLvl(level)
            }
        }
    }

    return {
        name: '',
        ancestry: '',
        class: '',
        subclass: '',
        level: 0,
        crp: {
            unspent: 0,
            spent: 0,
            toLvl: 0
        }
    }
}

function getToLvl(level: number): number {
    if (level < 1 || level > 9) { return 0 }

    const spentCrPToLevel = [ 0, 40, 80, 120, 190, 260, 330, 420, 520 , 630]

    return spentCrPToLevel[level]
}