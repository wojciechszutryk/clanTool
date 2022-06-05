import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { DataChart } from 'components'
import { ChartData, PhasesData, PhasePoint, DEVsData } from 'models/data.model'

const DrawSatellitesPhaseChart = ({
    rerender,
    phasesData,
}: {
    rerender: boolean
    phasesData: PhasesData
}) => {
    const [data, setData] = useState<DEVsData>([])

    useMemo(async () => {
        const dataToSet: DEVsData = []
        console.log(Object.keys(phasesData)[0])

        Object.values(phasesData).forEach((phase, index) => {
            const chartData = phase.map((point: PhasePoint) => ({
                x: point.date,
                y: point.phase,
            }))
            const key = Object.keys(phasesData)[index]
            dataToSet.push({ key: chartData })
            // dataToSet[Object.keys(phasesData)[index]] = chartData
        })
        console.log(dataToSet);
        
        setData(dataToSet)
        // }, [dispatch, selectedName, startDate, endDate])
    }, [rerender])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <DataChart data={data} id={'Phase'} xType={'Date'} />
        </Box>
    )
}

export default DrawSatellitesPhaseChart
