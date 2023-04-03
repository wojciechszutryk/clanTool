import { useState } from 'react'
import axios from 'axios'
import { PhasePoint, ChartsData } from 'models/data.model'
import phaseToFreqDriftWithObjectOutput from 'functions/phaseToFreqDriftWithObjectOutput/phaseToFreqDriftWithObjectOutput'
import { Charts } from 'models/inputData.model'
import phaseToFreqWithObjectOutput from 'functions/phaseToFreqWithObjectOutput/phaseToFreqWithObjectOutput'
import { allanDev, modAllanDev, overAllanDev } from 'functions/allanVariance'
import freqToPhase from 'functions/freqToPhase'
import phaseToFreq from 'functions/phaseToFreq/phaseToFreq'
import { hadamardDev } from 'functions/hadamardVariance'
import { getChartsDataMapKey } from './getChartsDataMapKey.helper'
import { IDownloadProgress } from './downloadProgress.model'

const downloadFileSize = 100000000 // TODO: get this value from server

const useGetChartsData = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [downloadPorgress, setDownloadPorgress] =
        useState<IDownloadProgress>(undefined)
    const [chartsData, setChartsData] = useState<ChartsData | undefined>(
        undefined
    )

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
        startDate: number,
        endDate: number,
        chartsToCreate: Charts[]
    ) => {
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

            //create Phase, Frequency, FrequencyDrift charts only for single resource
            if (resourcesData.length === 1) {
                if (chartsToCreate.includes(Charts.Phase)) {
                    const phaseChartData = strippedPhaseData.map((data) => ({
                        x: data.date,
                        y: data.phase,
                    }))

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.Phase),
                        phaseChartData
                    )
                }

                if (chartsToCreate.includes(Charts.Frequency)) {
                    const frequencyChartData = phaseToFreqWithObjectOutput(
                        strippedPhaseData,
                        tau
                    )

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.Frequency),
                        frequencyChartData
                    )
                }

                if (chartsToCreate.includes(Charts.FrequencyDrift)) {
                    const frequencyDriftChartData =
                        phaseToFreqDriftWithObjectOutput(strippedPhaseData, tau)

                    resourcesMap.set(
                        getChartsDataMapKey(
                            resourceName,
                            Charts.FrequencyDrift
                        ),
                        frequencyDriftChartData
                    )
                }
            }

            if (
                chartsToCreate.includes(Charts.ADEV) ||
                chartsToCreate.includes(Charts.MDEV) ||
                chartsToCreate.includes(Charts.ODEV) ||
                chartsToCreate.includes(Charts.HDEV)
            ) {
                const rawPhases = strippedPhaseData.map((obj) => obj.phase)
                const freq = phaseToFreq(rawPhases, tau)
                const phases = freqToPhase({ data: freq, tau: tau })

                if (chartsToCreate.includes(Charts.ADEV)) {
                    const allanDevChartData = allanDev(phases)

                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.ADEV),
                        allanDevChartData
                    )
                }
                if (chartsToCreate.includes(Charts.MDEV)) {
                    const modAllanDevChartData = modAllanDev(phases)
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.MDEV),
                        modAllanDevChartData
                    )
                }
                if (chartsToCreate.includes(Charts.ODEV)) {
                    const overAllanDevChartData = overAllanDev(phases)
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.ODEV),
                        overAllanDevChartData
                    )
                }
                if (chartsToCreate.includes(Charts.HDEV)) {
                    const hadamardAllanDevChartData = hadamardDev(phases)
                    resourcesMap.set(
                        getChartsDataMapKey(resourceName, Charts.HDEV),
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
        isLoading,
        downloadPorgress,
        chartsData,
        createChartsData,
    }
}

export default useGetChartsData
