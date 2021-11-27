import React from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import DrawADEVChart from '../DrawChart/DrawADEVChart'
import DrawFrequencyChart from '../DrawChart/DrawFrequencyChart'
import DrawODEVChart from '../DrawChart/DrawODEVChart'
import { DrawPhaseChart } from '../index'
import { DrawMDEVChart } from '../DrawChart'

const DrawCharts = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)

    return (
        <Box>
            {chartsToShow.includes('Phase') && (
                <DrawPhaseChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('Frequency') && (
                <DrawFrequencyChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('ADEV') && (
                <DrawADEVChart startDate={startDate} endDate={endDate} />
            )}

            {chartsToShow.includes('MDEV') && (
                <DrawMDEVChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('ODEV') && (
                <DrawODEVChart startDate={startDate} endDate={endDate} />
            )}
        </Box>
    )
}

export default DrawCharts
