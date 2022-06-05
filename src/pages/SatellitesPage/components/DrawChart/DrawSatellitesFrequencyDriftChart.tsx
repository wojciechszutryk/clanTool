import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { DataChart } from 'components'
import phaseToFreqDriftWithObjectOutput from 'functions/phaseToFreqDriftWithObjectOutput/phaseToFreqDriftWithObjectOutput'
import { ChartData, PhaseData } from 'models/data.model'

const DrawSatellitesFrequencyDriftChart = ({
    rerender,
    phaseData,
}: {
    rerender: boolean
    phaseData: PhaseData
}) => {
    const [data, setData] = useState<ChartData>([])

    useMemo(async () => {
        const chartData = phaseToFreqDriftWithObjectOutput(
            phaseData,
            (phaseData[1].date - phaseData[0].date) / 1000
        )
        setData(chartData)
        // }, [endDate, selectedName, startDate])
    }, [rerender])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {/* <DataChart data={data} id={'Frequency Drift'} xType={'Date'} /> */}
            null
        </Box>
    )
}

export default DrawSatellitesFrequencyDriftChart
