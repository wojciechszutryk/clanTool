import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'

const DrawChart = () => {
    const [data, setData] = useState<number[]>([])
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
        const stationSatelliteData = await JSONData.data
        const chartData = stationSatelliteData.map((point: any) => ({
            x: point.date,
            y: point.phase,
        }))
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
                <DataChart data={data} id={'Phase'} />
            )}
        </Box>
    )
}

export default DrawChart
