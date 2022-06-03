import React, { useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { modAllanDev } from '../../../../functions/allanVariance/allanVariance'
import freqToPhase from '../../../../functions/freqToPhase/freqToPhase'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import phaseToFreq from '../../../../functions/phaseToFreq/phaseToFreq'
import { DEVChart } from '../../../../components/Chart'
import { hadamardDev } from 'functions/hadamardVariance'
import { ChartData, PhaseData } from 'models/data.model'

const DrawSatellitesDEVCharts = ({
    rerender,
    phaseData,
}: {
    rerender: boolean
    phaseData: PhaseData
}) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const [data, setData] = useState<{ [key: string]: ChartData }[]>([])
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const DEVs = useMemo(
        () => chartsToShow.filter((chart) => chart.includes('DEV')),
        [chartsToShow]
    )

    const getDEVsDataForSatellite = (selectedName: string) => {
        const DEVsObjects: { [key: string]: { x: number; y: number }[] }[] = []

        //outlier recognition - remove MAD in phaseToFreq
        const tau0 = (phaseData[1].date - phaseData[0].date) / 1000
        const rawPhases = phaseData.map(
            (obj: { date: number; phase: number }) => obj.phase
        )
        const freq = phaseToFreq(rawPhases, tau0)
        const phases = freqToPhase({ data: freq, tau: tau0 })

        if (DEVs.includes('ADEV')) {
            const allanDevData = allanDev(phases, startDate, endDate)
            const obj = {} as { [key: string]: { x: number; y: number }[] }
            obj[`${selectedName}-ADEV`] = allanDevData
            DEVsObjects.push(obj)
        }
        if (DEVs.includes('MDEV')) {
            const modAllanDevData = modAllanDev(phases, startDate, endDate)
            const obj = {} as { [key: string]: { x: number; y: number }[] }
            obj[`${selectedName}-MDEV`] = modAllanDevData
            DEVsObjects.push(obj)
        }
        if (DEVs.includes('ODEV')) {
            const overAllanDevData = overAllanDev(phases, startDate, endDate)
            const obj = {} as { [key: string]: { x: number; y: number }[] }
            obj[`${selectedName}-ODEV`] = overAllanDevData
            DEVsObjects.push(obj)
        }
        if (DEVs.includes('HDEV')) {
            const hadamardDevData = hadamardDev(phases, startDate, endDate)
            const obj = {} as { [key: string]: { x: number; y: number }[] }
            obj[`${selectedName}-HDEV`] = hadamardDevData
            DEVsObjects.push(obj)
        }
        return DEVsObjects
    }

    useMemo(async () => {
        let SatellitesDEVsObjects: {
            [key: string]: ChartData
        }[] = []

        for (let selectedName of selectedNames) {
            const data = getDEVsDataForSatellite(selectedName)
            if (data)
                SatellitesDEVsObjects = [...SatellitesDEVsObjects, ...data]
        }
        setData(SatellitesDEVsObjects)
    }, [rerender])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <DEVChart data={data} id={DEVs.join('-')} />
        </Box>
    )
}

export default DrawSatellitesDEVCharts
