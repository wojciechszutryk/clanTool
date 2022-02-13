import React, { useMemo } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ChartsTypes } from '../../helpers/models'
import { DrawStationsDEVChart } from '../../pages/StationsPage/components/DrawStationsDEVChart'
import { DrawPhaseChart, DrawFrequencyChart } from '../DrawChart';
import DrawSatellitesDEVChart from '../../pages/SatellitesPage/components/DrawSatellitesCharts/DrawSatellitesDEVChart'
import DrawFrequencyDriftChart from '../DrawChart/DrawFrequencyDriftChart'

const DrawCharts = (props : { chartType: ChartsTypes }) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)

    const DEVs = useMemo(() => chartsToShow.filter(chart => (chart.includes('DEV'))), [chartsToShow])

    return (
        <Box>
            {(chartsToShow.includes('ADEV') ||
                chartsToShow.includes('MDEV') ||
                chartsToShow.includes('ODEV')) && (
                props.chartType === ChartsTypes.Satellites ?
                    <DrawSatellitesDEVChart startDate={startDate} endDate={endDate} DEVs={DEVs}/>
                    : <DrawStationsDEVChart startDate={startDate} endDate={endDate} DEVs={DEVs}/>

            )}
            {chartsToShow.includes('Phase') && (
                <DrawPhaseChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('Frequency') && (
                <DrawFrequencyChart startDate={startDate} endDate={endDate} />
            )}
            {chartsToShow.includes('Frequency Drift') && (
                <DrawFrequencyDriftChart startDate={startDate} endDate={endDate} />
            )}
        </Box>
    )
}

export default DrawCharts
