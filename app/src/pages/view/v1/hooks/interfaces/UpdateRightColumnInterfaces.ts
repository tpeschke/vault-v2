import { FavorInfoKeys, NerveAndVitalityObjectKeys, VitalityNNerveCalcInfoKeys, Wound } from "@vault/common/interfaces/v1/pageOne/rightColumnInterfaces";

export type UpdateFavorInfoFunction = (key: FavorInfoKeys, value: number | boolean) => void

export type UpdateVitalityNNerveFunction = (key: VitalityNNerveCalcInfoKeys, value: number | string) => void

export type UpdateMaxRangeFunction = (value: number) => void

export type UpdateNerveAndVitalityInfoFunction = (key: NerveAndVitalityObjectKeys, value: number) => void

export type InsertWoundFunction = (newWound: Wound) => void

export type UpdateWoundFunction = (changedIndex: number, newWound: Wound) => void
