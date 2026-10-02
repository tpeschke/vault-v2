import { Description } from "@vault/common/interfaces/v2/page1/characteristicsInfo"
import query from "../../../../../../../db/database"

const deleteSQL = `delete from v2descriptions where pageID = $1 and not (id = any($2))`
const updateSQL = `update v2descriptions set label = $1, attackEmotion = $2, defenseEmotion = $3, rank = $4 where id = $5`
const insertSQL = `insert into v2descriptions (pageID, label, attackEmotion, defenseEmotion, rank) values ($1, $2, $3, $4, $5)`

function rankParam(rank: Description['rank']) {
    return rank === '' ? null : rank
}

function hasContent({ label, attackEmotion, defenseEmotion, rank }: Description) {
    return label !== '' || attackEmotion !== '' || defenseEmotion !== '' || rank !== ''
}

export default async function saveDescriptions(pageID: number, descriptions: Description[]) {
    await query(deleteSQL, [pageID, [0, ...descriptions.map(description => description.id)]])
    return Promise.all(descriptions.map((description) => {
        const { id, label, attackEmotion, defenseEmotion, rank } = description
        if (id) {
            return query(updateSQL, [label, attackEmotion, defenseEmotion, rankParam(rank), id])
        }
        if (hasContent(description)) {
            return query(insertSQL, [pageID, label, attackEmotion, defenseEmotion, rankParam(rank)])
        }
        return Promise.resolve()
    }))
}
