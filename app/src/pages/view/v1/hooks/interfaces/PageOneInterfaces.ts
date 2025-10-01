import { IntegrityKeys, MovementKeys, StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";

export type UpdateGeneralInfoFunction = (key: GeneralInfoKeys, value: string | number) => void

export type UpdateStatFunction = (key: StatKeys, value: number) => void

export type UpdateMovementFunction = (key: MovementKeys, value: number) => void

export type UpdateIntegrityInfo = (key: IntegrityKeys, value: number) => void