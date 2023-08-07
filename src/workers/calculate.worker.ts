// getData.ts

import { allanDev, modAllanDev, overAllanDev } from "functions/allanVariance";
import freqToPhase from "functions/freqToPhase";
import { hadamardDev } from "functions/hadamardVariance";
import phaseToFreq from "functions/phaseToFreq/phaseToFreq";
import phaseToFreqChartData from "functions/phaseToFreqChartData";
import phaseToFreqDriftChartData from "functions/phaseToFreqDriftChartData";
import { ChartData } from "models/data.model";
import { ChartTypes } from "models/inputData.model";
import { WorkerReqMessage } from "pages/ChartsPages/hooks/useGetChartsData";
import { getChartsDataMapKey } from "pages/ChartsPages/hooks/useGetChartsData/getChartsDataMapKey.helper";

const downloadedDataTimeDiff = 300000; // 5 minutes

self.onmessage = (e: MessageEvent<string>) => {
  console.log('message');
  
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
    chartsData:  resourcesMap
  }));
};

export {};
