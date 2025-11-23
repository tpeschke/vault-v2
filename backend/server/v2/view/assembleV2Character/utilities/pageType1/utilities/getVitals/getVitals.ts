import { Vitals } from "@vault/common/interfaces/v2/page1/vitals"

export default async function getVitals(characterID: number): Promise<Vitals> {
    let vitalsInfo: Vitals = {
            selfDoubt: {
                dieIndex: 0,
                threshold: 0,
                diePenalty: 0
            },
            damage: {
                dieIndex: 0,
                knockback: 0,
                damage: 0,
                threshold: 0
            },
            stress: {
                dieIndex: 0,
                stress: 0,
                threshold: 0
            }
        }

    await Promise.all([
    ])
    
    return vitalsInfo
}