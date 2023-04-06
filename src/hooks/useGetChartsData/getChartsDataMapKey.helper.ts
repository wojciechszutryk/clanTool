import { ChartTypes } from 'models/inputData.model'

export const getChartsDataMapKey = (
    resourceName: string,
    chart: ChartTypes
) => {
    return `${resourceName}-${chart}`
}
