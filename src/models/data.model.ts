/**
 * data fetched from json file
 */
export interface PhasePoint {
    date: number
    phase: number
}

/**
 * data with phase for single station/satellite
 */
export type PhaseData = PhasePoint[]

/**
 * data with phase for single station/satellite
 */
export type PhasesData = Map<string, PhaseData>

/**
 * single point on chart
 */
export interface ChartPoint {
    x: number
    y: number
}

/**
 * chart data for single station/satellite chart
 */
export type ChartData = ChartPoint[]

/**
 * map of chart data for many stations/satellites
 */
export type ChartsData = Map<string, ChartData>
