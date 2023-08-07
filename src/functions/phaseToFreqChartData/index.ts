import { medianOfArr } from 'functions/medianOfArray';
import { ChartData, PhaseData } from 'models/data.model';

/**
 * This function takes phase data and tau value and returns frequency ChartData
 */
export default function phaseToFreqChartData(data: PhaseData, tau: number, mad?: number) {
  let freqData: ChartData = [];

  for (let i = 0; i < data.length - 1; i++) {
    freqData.push({
      y: (data[i + 1].phase - data[i].phase) / tau,
      x: data[i].date,
    });
  }

  const onlyFreqArray = freqData.map((obj: { x: number; y: number }) => obj.y);
  const medianOfNewData = medianOfArr(onlyFreqArray);

  const madArrayValues = onlyFreqArray.map((e) => Math.abs((e - medianOfNewData) / 0.6745));

  const madValue = medianOfArr(madArrayValues);
  const MADMultiply = mad || 3;
  const multipliedMadValue = madValue * MADMultiply;

  freqData = freqData.filter(
    (dateAndFreqObj) =>
      dateAndFreqObj.y < medianOfNewData + multipliedMadValue &&
      dateAndFreqObj.y > medianOfNewData - multipliedMadValue,
  );

  return freqData;
}
