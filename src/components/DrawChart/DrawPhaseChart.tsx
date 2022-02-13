import React, { useMemo, useState } from 'react'
import { useAppSelector } from 'functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'

const DrawPhaseChart = ({
    startDate,
    endDate,
}: {
    startDate: number
    endDate: number
}) => {
    const [data, setData] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteNames[0]
            ? state.app.selectedSatelliteNames[0]
            : state.app.selectedStationName
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const stationSatelliteData = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        const chartData = stationSatelliteData.map((point: any) => ({
            x: point.date,
            y: point.phase,
        }))
        setData(chartData)
        await setLoading(false)
    }, [dispatch, selectedName, startDate, endDate])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
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
                <DataChart data={data} id={'Phase'} xType={'Date'} />
            )}
        </Box>
    )
}

export default DrawPhaseChart
