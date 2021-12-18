import React, { useMemo, useState } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import phaseToFreqWithObjectOutput from 'functions/phaseToFreqWithObjectOutput/phaseToFreqWithObjectOutput'
import { setGlobalLoader } from '../../state/actions'

const DrawFrequencyChart = ({
    startDate,
    endDate,
}: {
    startDate: number
    endDate: number
}) => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
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
        await dispatch(setGlobalLoader(false))
    }, [dispatch, endDate, selectedName, startDate, MADMultiply])

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
                <DataChart data={data} id={'Frequency'} xType={'Date'} />
            )}
        </Box>
    )
}

export default DrawFrequencyChart
