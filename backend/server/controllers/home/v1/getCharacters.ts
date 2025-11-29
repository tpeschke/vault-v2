import query from "../../../db/database";
import homeSQL from '../../../v1/queries/home'

export default async function getV1Characters(userID: number) {
    return query(homeSQL.allUsersCharacters, userID)
}