import React from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import DrawADEVChart from '../DrawChart/DrawADEVChart'
import DrawFrequencyChart from '../DrawChart/DrawFrequencyChart'
import DrawODEVChart from '../DrawChart/DrawODEVChart'
import { DrawChart } from '../index'

const DrawCharts = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)

    return (
        <Box>
            {chartsToShow.includes('Phase') && <DrawChart />}
            {chartsToShow.includes('Frequency') && <DrawFrequencyChart />}
            {chartsToShow.includes('ADEV') && <DrawADEVChart />}
            {chartsToShow.includes('ODEV') && <DrawODEVChart />}
        </Box>
    )
}

export default DrawCharts
