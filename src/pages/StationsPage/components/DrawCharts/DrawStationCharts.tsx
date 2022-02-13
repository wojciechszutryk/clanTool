import React from 'react'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { DrawPhaseChart, DrawFrequencyChart } from '../DrawChart';
import DrawStationDEVChart from '../DrawChart/DrawStationDEVChart'
import DrawFrequencyDriftChart from '../DrawChart/DrawStationFrequencyDriftChart'

const DrawStationCharts = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    return (
        <Box>
            {(chartsToShow.includes('ADEV') ||
                chartsToShow.includes('MDEV') ||
                chartsToShow.includes('ODEV')) && (
                <DrawStationDEVChart />
                )}
            {chartsToShow.includes('Phase') && (
                <DrawPhaseChart />
            )}
            {chartsToShow.includes('Frequency') && (
                <DrawFrequencyChart />
            )}
            {chartsToShow.includes('Frequency Drift') && (
                <DrawFrequencyDriftChart />
            )}
        </Box>
    )
}

export default DrawStationCharts
