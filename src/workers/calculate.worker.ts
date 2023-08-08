import { ChartData, PhaseData } from "models/data.model";
import { ChartTypes } from "models/inputData.model";
import { WorkerReqMessage } from "pages/ChartsPages/hooks/useGetChartsData";
import { getChartsDataMapKey } from "pages/ChartsPages/hooks/useGetChartsData/getChartsDataMapKey.helper";
const downloadedDataTimeDiff = 300000; // 5 minutes
import { CHART_ZOOM_FIX } from 'models/chartZoom.const';
import { TauTypes } from 'models/inputData.model';

const SMALLEST_SIZE_VALUE = 3;

/**
 * This function is used to generate an array of tau values
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateLogTauData(tauType: TauTypes | undefined, a: number, b: number, _n?: number) {
  const arr: number[] = [];

  switch (tauType) {
    case TauTypes.logarithmLike: {
      return [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600,
        700, 800, 900, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 30000,
        40000, 50000, 60000, 70000, 80000, 90000, 100000,
      ];
    }
    case TauTypes.powerOfTen: {
      for (let i = a; i < b; i = i * 10) {
        arr.push(i);
      }
      break;
    }
    default: {
      for (let i = a; i < b; i = i * 2) {
        arr.push(i);
      }
      break;
    }
  }
  return arr;
}

/**
 * This is a helper function for calculating the Allan variance.
 */
function calculateHadamardPhase(data: number[], m: number, tau: number, overlap = true) {
  let size = 0;
  let sigma = 0;
  const stride = overlap ? 1 : m;
  for (let i = 0; i < data.length - 3 * m; i += stride) {
    sigma += (data[i + 3 * m] - 3 * data[i + 2 * m] + 3 * data[i + m] - data[i]) ** 2;
    size++;
  }

  if (size < SMALLEST_SIZE_VALUE) {
    return 0;
  }

  const mult = 6 * tau ** 2 * size;
  return Math.sqrt(sigma / mult);
}

/**
 * This function calculates the Hadamard variance.
 */
function hadamardDev(
  data: number[],
  tauType?: TauTypes,
  rate = 1,
  tau_data = 300,
  zoomFix = CHART_ZOOM_FIX,
) {
  const tauLogData = generateLogTauData(tauType, 1, Math.floor(data.length / 5), Number(tau_data));

  const tau0 = 1 / rate;
  const result: { x: number; y: number }[] = [];

  for (const m of tauLogData) {
    const tau = m * tau0;
    const dev = calculateHadamardPhase(data, m, tau, false) * zoomFix;
    if (dev !== null) {
      result.push({ x: tau, y: dev });
    }
  }

  return result;
}

/**
 * This is a helper function for calculating the Allan variance.
 */
function calculateAllanPhase(data: number[], m: number, tau: number, overlap = true) {
  let size = 0;
  let sigma = 0;
  const stride = overlap ? 1 : m;
  for (let i = 0; i < data.length - 2 * m; i += stride) {
    sigma += (data[i + 2 * m] - 2 * data[i + m] + data[i]) ** 2;
    size++;
  }

  if (size < SMALLEST_SIZE_VALUE) {
    return 0;
  }

  const mult = 2 * size * tau ** 2;
  return Math.sqrt(sigma / mult);
}

/**
 * This function calculates the standard Allan variance for a given data set.
 */
function allanDev(
  data: number[],
  tauType?: TauTypes,
  rate = 1,
  tau_data = 300,
  zoomFix = CHART_ZOOM_FIX,
) {
  const tauLogData = generateLogTauData(tauType, 1, Math.floor(data.length / 5), Number(tau_data));

  const tau0 = 1 / rate;
  const result: ChartData = [];

  for (const m of tauLogData) {
    const tau = m * tau0;
    const dev = calculateAllanPhase(data, m, tau, false) * zoomFix;
    if (dev !== null) {
      result.push({ x: tau, y: dev });
    }
  }

  return result;
}

/**
 * This function calculates the overlapped Allan variance for a given data set.
 */
function overAllanDev(
  data: number[],
  tauType?: TauTypes,
  rate = 1,
  tau_data = 300,
  zoomFix = CHART_ZOOM_FIX,
) {
  const tauLogData = generateLogTauData(tauType, 1, Math.floor(data.length / 5), Number(tau_data));

  const tau0 = 1 / rate;
  const result: ChartData = [];

  for (const m of tauLogData) {
    const tau = m * tau0;
    const dev = calculateAllanPhase(data, m, tau, true) * zoomFix;
    if (dev !== null) {
      result.push({ x: tau, y: dev });
    }
  }

  return result;
}

/**
 * This function calculates the modified Allan variance for a given data set.
 */
function modAllanDev(
  data: number[],
  tauType?: TauTypes,
  rate = 1,
  tau_data = 300,
  zoomFix = CHART_ZOOM_FIX,
) {
  const tauLogData = generateLogTauData(tauType, 1, Math.floor(data.length / 5), Number(tau_data));

  const tau0 = 1 / rate;
  const result: ChartData = [];

  for (const m of tauLogData) {
    const tau = m * tau0;
    let sigma = 0;
    let s = 0;

    for (let i = 0; i < m && i < data.length - 2 * m; i++) {
      s += data[i + 2 * m] - 2 * data[i + m] + data[i];
    }
    sigma += s ** 2;

    for (let i = 1; i < data.length - 3 * m + 1; i++) {
      s += data[i + 3 * m - 1] - 3 * data[i + 2 * m - 1] + 3 * data[i + m - 1] - data[i - 1];
      sigma += s ** 2;
    }
    const size = data.length - 3 * m + 1;
    const mult = 2 * size * m ** 2 * tau ** 2;

    if (size >= SMALLEST_SIZE_VALUE) result.push({ x: tau, y: Math.sqrt(sigma / mult) * zoomFix });
  }
  return result;
}

function medianOfArr(arr: number[]) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

const madFilter = (data: number[]) => {
  const medianOfNewData = medianOfArr(data);

  const madArrayValues = data.map((e) => Math.abs((e - medianOfNewData) / 0.6745));

  const madValue = medianOfArr(madArrayValues);
  // const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3; TODO: fix
  const MADMultiply = 3
  const multipliedMadValue = madValue * MADMultiply;

  return data.filter(
    (e) => e < medianOfNewData + multipliedMadValue && e > medianOfNewData - multipliedMadValue,
  );
};

/**
 * This function converts phase data to frequency data
 */
function phaseToFreq(data: number[], tau: number) {
  const newData = [];
  for (let i = 0; i < data.length - 1; i++) {
    newData.push((data[i + 1] - data[i]) / tau);
  }

  return madFilter(newData);
}

function freqToPhase({ data, tau }: { data: number[]; tau: number }) {
  const newData = [0];
  for (let i = 1; i < data.length; i++) {
    newData.push(data[i - 1] * tau + newData[i - 1]);
  }
  return newData;
}

function phaseToFreqChartData(data: PhaseData, tau: number, mad?: number) {
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

/**
 * This function converts phase data to frequency drift ChartData
 */
function phaseToFreqDriftChartData(data: PhaseData, tau: number, mad?: number) {
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


if('function' === typeof self.importScripts) {
  self.addEventListener('error', (e) => {
    console.log('Error while loading scripts', e);
  })

  const onMessage = (e: MessageEvent<string>) => {
  
    const {resourcesData, startDate, endDate, chartsToCreate, madMultiply, tauType} = JSON.parse(e.data) as WorkerReqMessage;
  
    const resourcesMap: Record<string, ChartData> = {}
  
    self.postMessage(JSON.stringify({
        calculating: true,
        warning: undefined,
        error: undefined,
        chartsData:  undefined
      }));
  
    resourcesData.forEach((resource) => {
  
      const resourceName = Object.keys(resource)[0];
      const downloadedPhaseData = Object.values(resource)[0];
      const tau = (downloadedPhaseData[1].date - downloadedPhaseData[0].date) / 1000;
  
      const strippedPhaseData =
        endDate && startDate
          ? downloadedPhaseData.filter((obj) => obj.date <= endDate && obj.date >= startDate)
          : downloadedPhaseData;
  
      if (strippedPhaseData.length === 0) {
          self.postMessage(JSON.stringify({
              calculating: false,
              warning: undefined,
              chartsData:  undefined,
              error: `No data for ${resourceName} in selected time range. Available data from ${new Date(
              downloadedPhaseData[0].date,
            ).toLocaleString()} to ${new Date(
              downloadedPhaseData[downloadedPhaseData.length - 1].date,
            )}`}))
      }
  
      if (strippedPhaseData.length < (endDate - startDate) / downloadedDataTimeDiff) {
          self.postMessage(JSON.stringify({    
              calculating: false,
              error: undefined,
              chartsData:  undefined,
              warning: `Loaded data for resource ${resourceName} does not contain all points in time range from ${new Date(
              startDate,
            ).toLocaleString()} to ${new Date(endDate)}. Found ${
              strippedPhaseData.length
            } points, expected ${
              (endDate - startDate) / downloadedDataTimeDiff
            } points. Please report this issue to the administrator.`}))
  
      }
  
      //create Phase, Frequency, FrequencyDrift charts only for single resource
      if (resourcesData.length === 1) {
        if (chartsToCreate.includes(ChartTypes.Phase)) {
          const phaseChartData = strippedPhaseData.map((data) => ({
            x: data.date,
            y: data.phase,
          }));
  
          resourcesMap[getChartsDataMapKey(resourceName, ChartTypes.Phase)] = phaseChartData;
        }
  
        if (chartsToCreate.includes(ChartTypes.Frequency)) {
          const frequencyChartData = phaseToFreqChartData(strippedPhaseData, tau, madMultiply);
  
          resourcesMap[
            getChartsDataMapKey(resourceName, ChartTypes.Frequency)] =
            frequencyChartData
        }
  
        if (chartsToCreate.includes(ChartTypes.FrequencyDrift)) {
          const frequencyDriftChartData = phaseToFreqDriftChartData(
            strippedPhaseData,
            tau,
            madMultiply,
          );
  
          resourcesMap[
            getChartsDataMapKey(resourceName, ChartTypes.FrequencyDrift)] = 
            frequencyDriftChartData
        }
      }
  
      if (
        chartsToCreate.includes(ChartTypes.ADEV) ||
        chartsToCreate.includes(ChartTypes.MDEV) ||
        chartsToCreate.includes(ChartTypes.ODEV) ||
        chartsToCreate.includes(ChartTypes.HDEV)
      ) {
        const rawPhases = strippedPhaseData.map((obj) => obj.phase);
        const freq = phaseToFreq(rawPhases, tau);
        const phases = freqToPhase({ data: freq, tau: tau });
  
        if (chartsToCreate.includes(ChartTypes.ADEV)) {
          const allanDevChartData = allanDev(phases, tauType);
  
          resourcesMap[getChartsDataMapKey(resourceName, ChartTypes.ADEV)] = allanDevChartData;
        }
        if (chartsToCreate.includes(ChartTypes.MDEV)) {
          const modAllanDevChartData = modAllanDev(phases, tauType);
          resourcesMap[
            getChartsDataMapKey(resourceName, ChartTypes.MDEV)] = 
            modAllanDevChartData
        }
        if (chartsToCreate.includes(ChartTypes.ODEV)) {
          const overAllanDevChartData = overAllanDev(phases, tauType);
          resourcesMap[
            getChartsDataMapKey(resourceName, ChartTypes.ODEV)] =
            overAllanDevChartData
        }
        if (chartsToCreate.includes(ChartTypes.HDEV)) {
          const hadamardAllanDevChartData = hadamardDev(phases, tauType);
          resourcesMap[
            getChartsDataMapKey(resourceName, ChartTypes.HDEV)] = 
            hadamardAllanDevChartData
        }
      }
    });
  
    self.postMessage(JSON.stringify({
      calculating: false,
      warning: undefined,
      error: undefined,
      chartsData: resourcesMap
    }));
  };   

  addEventListener('message', onMessage);
}


export {};
