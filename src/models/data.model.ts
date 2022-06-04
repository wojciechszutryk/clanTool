// data fetched from json file
export interface PhasePoint {
    date: number
    phase: number
}

//data with phase for single station/satellite
export type PhaseData = PhasePoint[]


//data with phases for many stations/satellites
export type PhasesData = { [key: string]: PhaseData }

// single point on chart
export interface ChartPoint {
    x: number
    y: number
}

export type ChartData = ChartPoint[]

// chart data of single deviation
export type DEVData = { [key: string]: ChartData }

export type DEVsData = DEVData[]
