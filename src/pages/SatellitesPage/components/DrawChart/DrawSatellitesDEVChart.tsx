import { Box } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { ClipLoader } from 'react-spinners'
import { DEVChart } from '../../../../components'
import { modAllanDev } from '../../../../functions/allanVariance/allanVariance'
import freqToPhase from '../../../../functions/freqToPhase/freqToPhase'
import { useAppDispatch } from '../../../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import phaseToFreq from '../../../../functions/phaseToFreq/phaseToFreq'
import { hadamardDev } from 'functions/hadamardVariance'


const DrawSatellitesDEVChart = () => {
    const [data, setData] = useState<{[key: string]: { x: number; y: number }[]}[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteNames
            ? state.app.selectedSatelliteNames
            : state.app.selectedStationName
    )
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const tauType = useAppSelector((state) => state.app.tauType)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const DEVs = useMemo(() => chartsToShow.filter(chart => (chart.includes('DEV'))), [chartsToShow])

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        const DEVsObjects: {[key: string]: { x: number; y: number }[]}[] = []
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )

        //outlier recognition - remove MAD in phaseToFreq
        const tau0 = (data[1].date - data[0].date) / 1000;
        const rawPhases = data.map((obj: { date: number; phase: number }) => obj.phase);
        const freq = phaseToFreq(
            rawPhases,  tau0
        )
        const phases = freqToPhase({data: freq, tau: tau0})

        if (DEVs.includes('ADEV')){
            const allanDevData = allanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'ADEV': allanDevData })
        }
        if (DEVs.includes('MDEV')){
            const modAllanDevData = modAllanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'MDEV': modAllanDevData })
        }
        if (DEVs.includes('ODEV')){
            const overAllanDevData = overAllanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'ODEV': overAllanDevData })
        }
        if (DEVs.includes('HDEV')){
            const hadamardDevData = hadamardDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'HDEV': hadamardDevData })
        }
        setData(DEVsObjects)
        await setLoading(false)
    }, [DEVs, dispatch, endDate, selectedName, startDate, MADMultiply, tauType])

    console.log(data);

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

export default DrawSatellitesDEVChart
