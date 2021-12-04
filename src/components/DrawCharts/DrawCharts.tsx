import React, { useMemo } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { DrawDEVChart, DrawPhaseChart, DrawFrequencyChart } from '../DrawChart';


const DrawCharts = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)

    const DEVs = useMemo(() => chartsToShow.filter(chart => (chart.includes('DEV'))), [chartsToShow])

    return (
        <Box>
            {chartsToShow.includes('Phase') && (
                <DrawPhaseChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('Frequency') && (
                <DrawFrequencyChart startDate={startDate} endDate={endDate} />
            )}
            {(chartsToShow.includes('ADEV') ||
            chartsToShow.includes('MDEV') ||
            chartsToShow.includes('ODEV')) && (
                <DrawDEVChart startDate={startDate} endDate={endDate} DEVs={DEVs}/>
            )}
        </Box>
    )
}

export default DrawCharts
