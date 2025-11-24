import { Defense } from "@vault/common/interfaces/v2/page1/combatInfo";
import query from "../../../../../../../../db/database";

interface DefenseReturn {
    name: string,
    initiative: number,
    defense: number,
    parry: number,
    flanks: number,
    cover: string,
    parrydr: string,
    dr: string,
    notes: ''
}

const getDefenseSQL = `select * From v2Defenses where characterID = $1`

export default async function getDefenses(characterID: number): Promise<Defense> {
    const [info]: DefenseReturn[] = await query(getDefenseSQL, characterID)

    if (info) {
        const { name, initiative, defense, parry, flanks, cover, parrydr: parryDR, dr, notes } = info

        return {
            name, initiative, defense, parry, flanks, cover, parryDR, dr, notes
        }
    }

    return {
        name: '',
        initiative: 0,
        defense: 0,
        parry: 0,
        flanks: 0,
        cover: '',
        parryDR: '',
        dr: '',
        notes: ''
    }
}