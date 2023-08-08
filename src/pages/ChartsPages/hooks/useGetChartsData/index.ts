import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { PhasePoint, ChartsData, ChartData } from 'models/data.model';
import { ChartTypes, TauTypes } from 'models/inputData.model';
import { IDownloadProgress } from './downloadProgress.model';
import { useAppSelector } from 'hooks/useAppSelector';

const downloadFileSize = 100000000; // TODO: get this value from server

export interface WorkerReqMessage {
  resourcesData: {
    [x: string]: PhasePoint[];
  }[];
  startDate: number;
  endDate: number;
  chartsToCreate: ChartTypes[];
  madMultiply: number;
  tauType: TauTypes ;
}
export interface WorkerResMessage {
    calculating: boolean;
    warning: string | undefined;
    error: string | undefined;
    chartsData: Record<string, ChartData> | undefined;
  }

export interface WorkerState extends Omit<WorkerResMessage, 'chartsData'> {chartsData: ChartsData | undefined}
/**
 * This hook is responsible for fetching data from json files and calculating charts data
 */
const useGetChartsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadPorgress, setDownloadPorgress] = useState<IDownloadProgress>(undefined);
  const startDate = useAppSelector((state) => state.app.startDate);
  const endDate = useAppSelector((state) => state.app.endDate);
  const madMultiply = useAppSelector((state) => state.app.MADMultiply);
  const tauType = useAppSelector((state) => state.app.tauType);

  const [workerState, setWorkerState] = useState<WorkerState>({
    calculating: false,
    warning: undefined,
    error: undefined,
    chartsData: undefined
  });

  const calculateWorker: Worker = useMemo( () => new Worker(new URL('workers/calculate.worker.ts', import.meta.url)), []);

  const fetchSinglePhasesData = async (resourceName: string) => {
    const data = await axios
      .get<{ data: PhasePoint[] }>(`${process.env.PUBLIC_URL}/data/${resourceName}.json`, {
        onDownloadProgress: (progressEvent) => {
          setDownloadPorgress((prev) => ({
            ...prev,
            [resourceName]: {
              completed: false,
              downloaded: progressEvent.loaded,
              total: downloadFileSize,
            },
          }));
        },
      })
      .then((res) => {
        setDownloadPorgress((prev) => ({
          ...prev,
          [resourceName]: {
            completed: true,
            downloaded: downloadFileSize,
            total: downloadFileSize,
          },
        }));
        return res.data;
      });

    return { [resourceName]: data.data };
  };

  const createChartsData = async (resourcesNames: string[], chartsToCreate: ChartTypes[]) => {
    setWorkerState((prev) => ({...prev, error: undefined, warning: undefined }))
    setIsLoading(true);

    const resourcesData = await Promise.all(
      resourcesNames.map((name) => fetchSinglePhasesData(name)),
    );

    calculateWorker.postMessage(JSON.stringify({ resourcesData, startDate, chartsToCreate, endDate, tauType, madMultiply }));

    setIsLoading(false);
    setDownloadPorgress(undefined);
  };

  useEffect(() => {
    calculateWorker.onmessage = (event: MessageEvent<string>) => {
      const response = JSON.parse(event.data) as unknown as WorkerResMessage;
      
      setWorkerState(
        {...response, chartsData: response.chartsData ? new Map(Object.entries(response.chartsData)) : undefined}
      )
    };
  }, [calculateWorker])

  return {
    isLoading,
    downloadPorgress,
    createChartsData,
    ...workerState
  };
};

export default useGetChartsData;
