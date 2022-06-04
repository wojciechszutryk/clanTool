export type Charts =
    | 'Phase'
    | 'Frequency'
    | 'Frequency Drift'
    | 'ADEV'
    | 'MDEV'
    | 'ODEV'
    | 'HDEV'

export enum TauType {
    powerOfTwo = 'POWER_OF_TWO',
    powerOfTen = 'POWER_OF_TEN',
    logarithmLike = 'LOGARITHM_LIKE',
}
