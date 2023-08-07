/**
 * available chart types
 */
export enum ChartTypes {
  Phase = 'Phase',
  Frequency = 'Frequency',
  FrequencyDrift = 'Frequency Drift',
  ADEV = 'ADEV',
  MDEV = 'MDEV',
  ODEV = 'ODEV',
  HDEV = 'HDEV',
}

/**
 * available tau types
 */
export enum TauTypes {
  powerOfTwo = 'POWER_OF_TWO',
  powerOfTen = 'POWER_OF_TEN',
  logarithmLike = 'LOGARITHM_LIKE',
}
