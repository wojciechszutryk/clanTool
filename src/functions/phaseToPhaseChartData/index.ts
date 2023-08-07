import { medianOfArr } from 'functions/medianOfArray';
import { ChartData, PhaseData } from 'models/data.model';

export default function phaseToPhaseChartData(data: PhaseData, mad?: number) {
  let phaseChartData: ChartData = data.map((obj) => ({
    x: obj.date,
    y: obj.phase,
  }));

  const onlyPhaseArray = phaseChartData.map((obj: { x: number; y: number }) => obj.y);

  const medianOfNewData = medianOfArr(onlyPhaseArray);

  const madArrayValues = onlyPhaseArray.map((e) => Math.abs((e - medianOfNewData) / 0.6745));

  const madValue = medianOfArr(madArrayValues);
  const MADMultiply = mad || 3;
  const multipliedMadValue = madValue * MADMultiply;

  phaseChartData = phaseChartData.filter(
    (chartData) =>
      chartData.y < medianOfNewData + multipliedMadValue &&
      chartData.y > medianOfNewData - multipliedMadValue,
  );

  return phaseChartData;
}
