import { Charts } from 'models/inputData.model'

export const getChartsDataMapKey = (resourceName: string, chart: Charts) => {
    return `${resourceName}-${chart}`
}
