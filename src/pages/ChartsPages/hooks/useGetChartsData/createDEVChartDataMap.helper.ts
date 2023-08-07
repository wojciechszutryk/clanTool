import { ChartsData } from 'models/data.model';

/**
 * This function creates a map of charts data for DEV charts.
 */
export const createDEVChartDataMap = (chartsData: ChartsData) => {
  return new Map(
    Array.from(chartsData).filter(([key, _value]) => {
      if (key.includes('DEV')) {
        return true;
      }

      return false;
    }),
  );
};
