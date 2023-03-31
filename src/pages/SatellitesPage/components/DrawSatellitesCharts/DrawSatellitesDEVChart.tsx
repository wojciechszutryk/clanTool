import React, { memo, useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { modAllanDev } from '../../../../functions/allanVariance'
import freqToPhase from '../../../../functions/freqToPhase'
import { Box } from '@mui/material'
import phaseToFreq from '../../../../functions/phaseToFreq/phaseToFreq'
import { hadamardDev } from 'functions/hadamardVariance'
import { ChartData, PhasesData } from 'models/data.model'
import DEVChart from 'components/Chart/DEVChart'
import { useAppSelector } from 'hooks/useAppSelector'
import { Charts } from 'models/inputData.model'

const DrawSatellitesDEVCharts = ({
    rerender,
    phasesData,
}: {
    rerender: boolean
    phasesData: PhasesData
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

    useMemo(async () => {
        let SatellitesDEVsObjects: {
            [key: string]: ChartData
        }[] = []

        for (let selectedName of selectedNames) {
            const tau0 =
                (phasesData[selectedName][1].date -
                    phasesData[selectedName][0].date) /
                1000
            const rawPhases = phasesData[selectedName].map(
                (obj: { date: number; phase: number }) => obj.phase
            )
            const freq = phaseToFreq(rawPhases, tau0)
            const phases = freqToPhase({ data: freq, tau: tau0 })

            if (DEVs.includes(Charts.ADEV)) {
                const allanDevData = allanDev(phases, startDate, endDate)
                const obj = {} as {
                    [key: string]: { x: number; y: number }[]
                }
                obj[`${selectedName}-ADEV`] = allanDevData
                SatellitesDEVsObjects.push(obj)
            }
            if (DEVs.includes(Charts.MDEV)) {
                const modAllanDevData = modAllanDev(phases, startDate, endDate)
                const obj = {} as {
                    [key: string]: { x: number; y: number }[]
                }
                obj[`${selectedName}-MDEV`] = modAllanDevData
                SatellitesDEVsObjects.push(obj)
            }
            if (DEVs.includes(Charts.ODEV)) {
                const overAllanDevData = overAllanDev(
                    phases,
                    startDate,
                    endDate
                )
                const obj = {} as {
                    [key: string]: { x: number; y: number }[]
                }
                obj[`${selectedName}-ODEV`] = overAllanDevData
                SatellitesDEVsObjects.push(obj)
            }
            if (DEVs.includes(Charts.HDEV)) {
                const hadamardDevData = hadamardDev(phases, startDate, endDate)
                const obj = {} as {
                    [key: string]: { x: number; y: number }[]
                }
                obj[`${selectedName}-HDEV`] = hadamardDevData
                SatellitesDEVsObjects.push(obj)
            }
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

export default memo(DrawSatellitesDEVCharts)
