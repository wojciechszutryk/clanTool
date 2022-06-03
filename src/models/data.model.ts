// data fetched from json file
export interface PhasePoint {
    date: number
    phase: number
}

export type PhaseData = PhasePoint[]

// single point on chart
export interface ChartPoint {
    x: number
    y: number
}

export type ChartData = ChartPoint[]

// chart data of single deviation
export type DEVData = { [key: string]: ChartData }

export type DEVsData = DEVData[]
