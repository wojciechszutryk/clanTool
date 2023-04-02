import { ChartsData } from 'models/data.model'

export const createDEVChartDataMap = (chartsData: ChartsData) => {
    return new Map(
        Array.from(chartsData).filter(([key, _value]) => {
            if (key.includes('DEV')) {
                return true
            }

            return false
        })
    )
}
