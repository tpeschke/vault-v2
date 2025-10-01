import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";

export type UpdateGeneralInfoFunction = (key: GeneralInfoKeys, value: string | number) => void