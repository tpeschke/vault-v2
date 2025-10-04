import { GeneralNotesInfoKeys } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces";

export type UpdateNotes = (key: GeneralNotesInfoKeys, value: string | boolean) => void