import { useState } from 'react'
import axios from 'axios'
import { PhasePoint, ChartsData } from 'models/data.model'
import { ChartTypes } from 'models/inputData.model'
import { allanDev, modAllanDev, overAllanDev } from 'functions/allanVariance'
import freqToPhase from 'functions/freqToPhase'
import { hadamardDev } from 'functions/hadamardVariance'
import { getChartsDataMapKey } from './getChartsDataMapKey.helper'
import { IDownloadProgress } from './downloadProgress.model'
import phaseToFreqDriftChartData from 'functions/phaseToFreqDriftChartData'
import phaseToFreq from 'functions/phaseToFreq/phaseToFreq'
import phaseToFreqChartData from 'functions/phaseToFreqChartData'
import { useAppSelector } from 'hooks/useAppSelector'

const downloadFileSize = 100000000 // TODO: get this value from server
const downloadedDataTimeDiff = 300000 // 5 minutes

/**
 * This hook is responsible for fetching data from json files and calculating charts data
 */
const useGetChartsData = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [warning, setWarning] = useState<string | undefined>(undefined)
    const [downloadPorgress, setDownloadPorgress] =
        useState<IDownloadProgress>(undefined)
    const [chartsData, setChartsData] = useState<ChartsData | undefined>(
        undefined
    )

    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const madMultiply = useAppSelector((state) => state.app.MADMultiply)
    const tauType = useAppSelector((state) => state.app.tauType)

    const fetchSinglePhasesData = async (resourceName: string) => {
        const data = await axios
            .get<{ data: PhasePoint[] }>(
                `${process.env.PUBLIC_URL}/data/${resourceName}.json`,
                {
                    onDownloadProgress: (progressEvent) => {
                        setDownloadPorgress((prev) => ({
                            ...prev,
                            [resourceName]: {
                                completed: false,
                                downloaded: progressEvent.loaded,
                                total: downloadFileSize,
                            },
                        }))
                    },
                }
            )
            .then((res) => {
                setDownloadPorgress((prev) => ({
                    ...prev,
                    [resourceName]: {
                        completed: true,
                        downloaded: downloadFileSize,
                        total: downloadFileSize,
                    },
                }))
                return res.data
            })

        return { [resourceName]: data.data }
    }

    const createChartsData = async (
        resourcesNames: string[],
        chartsToCreate: ChartTypes[]
    ) => {
        setError(undefined)
        setWarning(undefined)
        setIsLoading(true)

        const resourcesData = await Promise.all(
            resourcesNames.map((name) => fetchSinglePhasesData(name))
        )

        const resourcesMap: ChartsData = new Map()

        resourcesData.forEach((resource) => {
            const resourceName = Object.keys(resource)[0]
            const downloadedPhaseData = Object.values(resource)[0]
            const tau =
                (downloadedPhaseData[1].date - downloadedPhaseData[0].date) /
                1000

            const strippedPhaseData =
                endDate && startDate
                    ? downloadedPhaseData.filter(
                          (obj) => obj.date <= endDate && obj.date >= startDate
                      )
                    : downloadedPhaseData

            console.log('strippedPhaseData', strippedPhaseData)

            if (strippedPhaseData.length === 0) {
                setError(
                    `No data for ${resourceName} in selected time range. Available data from ${new Date(
                        downloadedPhaseData[0].date
                    ).toLocaleString()} to ${new Date(
                        downloadedPhaseData[downloadedPhaseData.length - 1].date
                    )}`
                )
                return
            }

            if (
                strippedPhaseData.length <
                (endDate - startDate) / downloadedDataTimeDiff
            ) {
                setWarning(
                    `Loaded data for resource ${resourceName} does not contain all points in time range from ${new Date(
                        downloadedPhaseData[0].date
                    ).toLocaleString()} to ${new Date(
                        downloadedPhaseData[downloadedPhaseData.length - 1].date
                    )}. Found ${strippedPhaseData.length} points, expected ${
                        (endDate - startDate) / downloadedDataTimeDiff
                    } points. Please report this issue to the administrator.`
                )
            }

            //create Phase, Frequency, FrequencyDrift charts only for single resource
            if (resourcesData.length === 1) {
                if (chartsToCreate.includes(ChartTypes.Phase)) {
                    const phaseChartData = strippedPhaseData.map((data) => ({
                        x: data.date,
                        y: data.phase,
                    }))

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.Phase),
                        phaseChartData
                    )
                }

                if (chartsToCreate.includes(ChartTypes.Frequency)) {
                    const frequencyChartData = phaseToFreqChartData(
                        strippedPhaseData,
                        tau,
                        madMultiply
                    )

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.Frequency),
                        frequencyChartData
                    )
                }

                if (chartsToCreate.includes(ChartTypes.FrequencyDrift)) {
                    const frequencyDriftChartData = phaseToFreqDriftChartData(
                        strippedPhaseData,
                        tau,
                        madMultiply
                    )

                    resourcesMap.set(
                        getChartsDataMapKey(
                            resourceName,
                            ChartTypes.FrequencyDrift
                        ),
                        frequencyDriftChartData
                    )
                }
            }

            if (
                chartsToCreate.includes(ChartTypes.ADEV) ||
                chartsToCreate.includes(ChartTypes.MDEV) ||
                chartsToCreate.includes(ChartTypes.ODEV) ||
                chartsToCreate.includes(ChartTypes.HDEV)
            ) {
                const rawPhases = strippedPhaseData.map((obj) => obj.phase)
                const freq = phaseToFreq(rawPhases, tau)
                const phases = freqToPhase({ data: freq, tau: tau })

                if (chartsToCreate.includes(ChartTypes.ADEV)) {
                    const allanDevChartData = allanDev(phases, tauType)

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.ADEV),
                        allanDevChartData
                    )
                }
                if (chartsToCreate.includes(ChartTypes.MDEV)) {
                    const modAllanDevChartData = modAllanDev(phases, tauType)
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.MDEV),
                        modAllanDevChartData
                    )
                }
                if (chartsToCreate.includes(ChartTypes.ODEV)) {
                    const overAllanDevChartData = overAllanDev(phases, tauType)
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.ODEV),
                        overAllanDevChartData
                    )
                }
                if (chartsToCreate.includes(ChartTypes.HDEV)) {
                    const hadamardAllanDevChartData = hadamardDev(
                        phases,
                        tauType
                    )
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, ChartTypes.HDEV),
                        hadamardAllanDevChartData
                    )
                }
            }
        })

        setChartsData(resourcesMap)
        setIsLoading(false)
        setDownloadPorgress(undefined)
    }

    return {
        error,
        warning,
        isLoading,
        downloadPorgress,
        chartsData,
        createChartsData,
    }
}

export default useGetChartsData
