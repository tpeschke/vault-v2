import { ownerId, jeremyId } from "../../server-config"

export function isOwner(userId : number | undefined) : boolean {
    return userId === ownerId || userId === jeremyId
}

export function isJustMainOwner(userId : number | null | undefined) : boolean {
    if (!userId) { false }

    return userId === ownerId
}