import React, { memo, useMemo, useState } from 'react'
import { fetchDataFromPublicDir } from '../../../../functions/fetchDataFromPublicDir'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import phaseToFreqWithObjectOutput from 'functions/phaseToFreqWithObjectOutput/phaseToFreqWithObjectOutput'
import DataChart from 'components/Chart/DataChart'

const DrawStationFrequencyChart = () => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)

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
        const chartData = phaseToFreqWithObjectOutput(
            data,
            (data[1].date - data[0].date) / 1000,
            true
        )
        setData(chartData)
        await setLoading(false)
    }, [dispatch, endDate, selectedName, startDate, MADMultiply])

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
                <DataChart data={data} id={'Frequency'} xType={'Date'} />
            )}
        </Box>
    )
}

export default memo(DrawStationFrequencyChart)
