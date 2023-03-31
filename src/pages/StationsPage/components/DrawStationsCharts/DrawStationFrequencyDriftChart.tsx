import React, { memo, useMemo, useState } from 'react'
import { fetchDataFromPublicDir } from '../../../../functions/fetchDataFromPublicDir'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import phaseToFreqDriftWithObjectOutput from 'functions/phaseToFreqDriftWithObjectOutput/phaseToFreqDriftWithObjectOutput'
import DataChart from 'components/Chart/DataChart'
import { useAppSelector } from 'hooks/useAppSelector'

const DrawStationFrequencyDriftChart = () => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedName = useAppSelector(
        (state) => state.app.selectedStationName
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await fetchDataFromPublicDir(selectedName)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        const chartData = phaseToFreqDriftWithObjectOutput(
            data,
            (data[1].date - data[0].date) / 1000
        )
        setData(chartData)
        await setLoading(false)
    }, [endDate, selectedName, startDate])

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
                <DataChart data={data} id={'Frequency Drift'} xType={'Date'} />
            )}
        </Box>
    )
}

export default memo(DrawStationFrequencyDriftChart)
