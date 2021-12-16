import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import phaseToFreqDrift from 'functions/phaseToFreqDrift/phaseToFreqDrift'

const DrawFrequencyDriftChart = ({
    startDate,
    endDate,
}: {
    startDate: number
    endDate: number
}) => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteName
            ? state.app.selectedSatelliteName
            : state.app.selectedStationName
    )
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        const freqDrift = phaseToFreqDrift(
            data.map((obj: { date: number; phase: number }) => obj.phase),
            (data[1].date - data[0].date) / 1000
        );
        const chartData: { x: number; y: number }[] = []
        freqDrift.forEach((fr, index) => {
            chartData.push({
                x: data[index].date,
                y: fr,
            })
        })
        setData(chartData)
        await setLoading(false)
    }, [endDate, selectedName, startDate, MADMultiply])

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
                <DataChart data={data} id={'Frequency Drift'} xType={'Date'} />
            )}
        </Box>
    )
}

export default DrawFrequencyDriftChart
