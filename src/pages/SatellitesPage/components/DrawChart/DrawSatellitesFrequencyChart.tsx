import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import phaseToFreqWithObjectOutput from 'functions/phaseToFreqWithObjectOutput/phaseToFreqWithObjectOutput'
import { ChartData, PhaseData } from 'models/data.model'
import DataChart from 'components/Chart/DataChart'

const DrawSatellitesFrequencyChart = ({
    rerender,
    phaseData,
}: {
    rerender: boolean
    phaseData: PhaseData
}) => {
    const [data, setData] = useState<ChartData>([])

    useMemo(async () => {
        const chartData = phaseToFreqWithObjectOutput(
            phaseData,
            (phaseData[1].date - phaseData[0].date) / 1000,
            true
        )
        setData(chartData)
        // }, [dispatch, endDate, selectedName, startDate, MADMultiply])
    }, [rerender])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <DataChart data={data} id={'Frequency'} xType={'Date'} />
        </Box>
    )
}

export default DrawSatellitesFrequencyChart
