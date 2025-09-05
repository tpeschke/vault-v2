import { checkForContentTypeBeforeSending } from "../../../controllers/common/sendingFunctions"
import query from "../../../db/database"
import homeSQL from "../../queries/home"
import { Request, Response } from '../../../interfaces/apiInterfaces'

export function viewUsersCharacters(request: Request, response: Response) {
    const userID = request.user?.id
    query(homeSQL.allUsersCharacters, userID).then(data => {
        checkForContentTypeBeforeSending(response, data)
    })
}