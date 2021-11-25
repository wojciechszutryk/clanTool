import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import { phaseToFreq } from 'functions/phaseToFreq'

const DrawFrequencyChart = () => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteName
            ? state.app.selectedSatelliteName
            : state.app.selectedStationName
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data
        const freq = phaseToFreq({
            data: data.map((obj: { date: number; phase: number }) => obj.phase),
            tau: (data[1].date - data[0].date) / 1000,
        })
        const chartData: { x: number; y: number }[] = []
        freq.forEach((fr, index) => {
            chartData.push({
                x: data[index].date,
                y: fr,
            })
        })
        setData(chartData)
        await setLoading(false)
    }, [selectedName])

    return (
        <Box
            sx={{
                m: '10px auto',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {loading ? (
                <ClipLoader loading={loading} size={150} />
            ) : (
                <DataChart data={data} id={'Frequency'} />
            )}
        </Box>
    )
}

export default DrawFrequencyChart
