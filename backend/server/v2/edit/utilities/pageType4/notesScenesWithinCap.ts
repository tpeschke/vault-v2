import { NOTES_SCENE_MAX_BYTES } from "@vault/common/interfaces/v2/page4/notesScene"
import { PageV2 } from "@vault/common/interfaces/v2/pageTypes"

export default function notesScenesWithinCap(pages: PageV2[]): boolean {
    for (const page of pages) {
        if (page.type !== 4) {
            continue
        }
        const scene = page.scene
        if (typeof scene !== 'string') {
            return false
        }
        if (Buffer.byteLength(scene, 'utf8') > NOTES_SCENE_MAX_BYTES) {
            return false
        }
        if (scene === '') {
            continue
        }
        let parsed: unknown
        try {
            parsed = JSON.parse(scene)
        } catch {
            return false
        }
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            return false
        }
        if (!Array.isArray((parsed as { elements?: unknown }).elements)) {
            return false
        }
    }
    return true
}
