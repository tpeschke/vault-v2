import { GeneralNotesInfoKeys } from "@vault/common/interfaces/v1/pageThree/generalNotesInterfaces";

export type UpdateNotesFunction = (key: GeneralNotesInfoKeys, value: string | boolean) => void