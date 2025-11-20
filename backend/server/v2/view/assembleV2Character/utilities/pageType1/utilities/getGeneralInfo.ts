import { GeneralInfo } from "@vault/common/interfaces/v2/page1/generalInfoInterfaces";

export default async function getGeneralInfo(characterID: number): Promise<GeneralInfo> {
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