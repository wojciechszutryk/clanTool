import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { DrawPhaseChart, DrawFrequencyChart } from '../DrawChart';
import DrawSatellitesFrequencyDriftChart from '../DrawChart/DrawSatellitesFrequencyDriftChart'
import { DrawSatellitesDEVChart } from '../DrawSatellitesDEVCharts'

const DrawSatellitesCharts = (props : { recalculate: boolean }) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)

    return (
        <Box>
            {(chartsToShow.includes('ADEV') ||
                chartsToShow.includes('MDEV') ||
                chartsToShow.includes('ODEV')) && (
                // props.chartType === ChartsTypes.Satellites ?
                    <DrawSatellitesDEVChart rerender={props.recalculate}/>
                    // : <DrawStationsDEVChart startDate={startDate} endDate={endDate} DEVs={DEVs} />

            )}
            {chartsToShow.includes('Phase') && (
                <DrawPhaseChart rerender={props.recalculate || false}/>
            )}
            {chartsToShow.includes('Frequency') && (
                <DrawFrequencyChart rerender={props.recalculate || false}/>
            )}
            {chartsToShow.includes('Frequency Drift') && (
                <DrawSatellitesFrequencyDriftChart rerender={props.recalculate || false}/>
            )}
        </Box>
    )
}

export default DrawSatellitesCharts
