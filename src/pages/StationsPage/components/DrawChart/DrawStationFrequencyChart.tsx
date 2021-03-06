import React, { useMemo, useState } from 'react'
import { fetchAndConcatByDateDataFromPublicDir } from '../../../../functions/fetchDataFromPublicDir/fetchAndConcatByDateDataFromPublicDir'
import { useAppDispatch } from '../../../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import phaseToFreqWithObjectOutput from 'functions/phaseToFreqWithObjectOutput/phaseToFreqWithObjectOutput'

const DrawStationFrequencyChart = () => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedName = useAppSelector((state) =>state.app.selectedStationName)
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await fetchAndConcatByDateDataFromPublicDir(selectedName);
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        // const freq = phaseToFreq(
        //     data.map((obj: { date: number; phase: number }) => obj.phase),
        //     (data[1].date - data[0].date) / 1000,
        //     true
        // );
        // const chartData: { x: number; y: number }[] = []
        // freq.forEach((fr, index) => {
        //     chartData.push({
        //         x: data[index].date,
        //         y: fr,
        //     })
        // })
        //
        const chartData = phaseToFreqWithObjectOutput(
            data,
            (data[1].date - data[0].date) / 1000,
            true
        );
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

export default DrawStationFrequencyChart
