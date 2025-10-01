import { CharacteristicPairObjectsKeys, IntegrityKeys, MovementKeys, PairObject, StatKeys } from "@vault/common/interfaces/v1/pageOne/leftColumnInterfaces";
import { GeneralInfoKeys } from "@vault/common/interfaces/v1/pageOne/pageOneInterfaces";

export type UpdateGeneralInfoFunction = (key: GeneralInfoKeys, value: string | number) => void

export type UpdateStatFunction = (key: StatKeys, value: number) => void

export type UpdateMovementFunction = (key: MovementKeys, value: number) => void

export type UpdateIntegrityInfo = (key: IntegrityKeys, value: number) => void

export type InsertGenericCharacteristicFunction = (characteristic: CharacteristicPairObjectsKeys) => InsertCharacteristicFunction

export type InsertCharacteristicFunction = (newObject: PairObject) => void

export type UpdateGenericCharacteristicFunction = (characteristic: CharacteristicPairObjectsKeys) => UpdateCharacteristicFunction

export type UpdateCharacteristicFunction = (changedIndex: number, newObject: PairObject) => void