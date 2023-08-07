import { ChartTypes } from 'models/inputData.model';

/**
 * This function is used to create unique key for each chart data
 */
export const getChartsDataMapKey = (resourceName: string, chart: ChartTypes) => {
  return `${resourceName}-${chart}`;
};
