import React, { memo, useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { modAllanDev } from '../../../../functions/allanVariance'
import { fetchDataFromPublicDir } from '../../../../functions/fetchDataFromPublicDir'
import freqToPhase from '../../../../functions/freqToPhase'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import phaseToFreq from '../../../../functions/phaseToFreq/phaseToFreq'
import { hadamardDev } from 'functions/hadamardVariance'
import DEVChart from 'components/Chart/DEVChart'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { Charts } from 'models/inputData.model'

const DrawStationDEVChart = () => {
    const [data, setData] = useState<
        { [key: string]: { x: number; y: number }[] }[]
    >([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const selectedName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const tauType = useAppSelector((state) => state.app.tauType)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const DEVs = useMemo(
        () => chartsToShow.filter((chart) => chart.includes('DEV')),
        [chartsToShow]
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        const DEVsObjects: { [key: string]: { x: number; y: number }[] }[] = []
        setLoading(true)
        const JSONData = await fetchDataFromPublicDir(selectedName)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )

        //outlier recognition - remove MAD in phaseToFreq
        const tau0 = (data[1].date - data[0].date) / 1000
        const rawPhases = data.map(
            (obj: { date: number; phase: number }) => obj.phase
        )
        const freq = phaseToFreq(rawPhases, tau0)
        const phases = freqToPhase({ data: freq, tau: tau0 })

        if (DEVs.includes(Charts.ADEV)) {
            const allanDevData = allanDev(phases, startDate, endDate)
            DEVsObjects.push({ ADEV: allanDevData })
        }
        if (DEVs.includes(Charts.MDEV)) {
            const modAllanDevData = modAllanDev(phases, startDate, endDate)
            DEVsObjects.push({ MDEV: modAllanDevData })
        }
        if (DEVs.includes(Charts.ODEV)) {
            const overAllanDevData = overAllanDev(phases, startDate, endDate)
            DEVsObjects.push({ ODEV: overAllanDevData })
        }
        setData(DEVsObjects)
        if (DEVs.includes(Charts.HDEV)) {
            const hadamardDevData = hadamardDev(phases, startDate, endDate)
            DEVsObjects.push({ HDEV: hadamardDevData })
        }
        setData(DEVsObjects)
        setLoading(false)
    }, [DEVs, dispatch, endDate, selectedName, startDate, MADMultiply, tauType])

    return (
        <Box
            sx={{
                m: '10px auto',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <ClipLoader loading={loading} size={150} />
                </Box>
            ) : (
                <DEVChart data={data} id={DEVs.join('-')} />
            )}
        </Box>
    )
}

export default memo(DrawStationDEVChart)
