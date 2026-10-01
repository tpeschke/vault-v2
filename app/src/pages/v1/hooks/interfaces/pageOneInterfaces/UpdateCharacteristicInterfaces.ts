import { StatKeys, MovementKeys, IntegrityKeys, CharacteristicPairObjectsKeys, PairObject, CharacteristicStringKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces"
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces"

export interface CharacteristicUpdateFunctions {
    updateIntegrityInfo: UpdateIntegrityInfo,
    insertCharacteristic: InsertGenericCharacteristicFunction,
    updateCharacteristic: UpdateGenericCharacteristicFunction,
    updateCharacteristicString: UpdateCharacteristicStringFunction
}

export type UpdateGeneralInfoFunction = (key: GeneralInfoKeys, value: string | number) => void

export type UpdateStatFunction = (key: StatKeys, value: number) => void

export type UpdateMovementFunction = (key: MovementKeys, value: number) => void

export type UpdateIntegrityInfo = (key: IntegrityKeys, value: number) => void

export type InsertGenericCharacteristicFunction = (characteristic: CharacteristicPairObjectsKeys) => InsertCharacteristicFunction

export type InsertCharacteristicFunction = (newObject: PairObject) => void

export type UpdateGenericCharacteristicFunction = (characteristic: CharacteristicPairObjectsKeys) => UpdateCharacteristicFunction

export type UpdateCharacteristicFunction = (changedIndex: number, newObject: PairObject) => void

export type UpdateCharacteristicStringFunction = (key: CharacteristicStringKeys, value: string) => void