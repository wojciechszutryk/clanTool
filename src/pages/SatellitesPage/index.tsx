import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Charts } from '../../models/inputData.model'
import SatellitesCharts from './components/SatellitesCharts'
import { useAppSelector } from 'hooks/useAppSelector'
import SatelitesForm from './components/SatelitesForm'
import {
    StyledLoaderWrapper,
    StyledSatellitesChartsWrapper,
    StyledSatellitesFormWrapper,
} from './styles'
import useGetChartsData from 'hooks/useGetChartsData'
import { ClipLoader } from 'react-spinners'

function SatellitesPage() {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const { isLoading, downloadedPercentages, chartsData, createChartsData } =
        useGetChartsData()

    const handleSubmit = () => {
        const chartsDataToCreate =
            selectedSatelliteNames.length > 1
                ? chartsToShow.filter(
                      (chartToShow) =>
                          ![
                              Charts.Phase,
                              Charts.Frequency,
                              Charts.FrequencyDrift,
                          ].includes(chartToShow)
                  )
                : chartsToShow

        createChartsData(
            selectedSatelliteNames,
            startDate,
            endDate,
            chartsDataToCreate
        )
    }

    return (
        <Grid container spacing={{ md: 3 }}>
            <StyledSatellitesFormWrapper item xs={12} md={5} lg={4}>
                <SatelitesForm handleSubmit={handleSubmit} />
            </StyledSatellitesFormWrapper>
            <StyledSatellitesChartsWrapper item xs={12} md={7} lg={8}>
                {isLoading || !chartsData ? (
                    <StyledLoaderWrapper>
                        <ClipLoader loading={isLoading} size={150} />
                        {downloadedPercentages &&
                            Object.entries(downloadedPercentages).map(
                                ([name, percentage]) => (
                                    <Typography key={name}>
                                        {name}: {percentage}%
                                    </Typography>
                                )
                            )}
                        <Typography></Typography>
                    </StyledLoaderWrapper>
                ) : (
                    <SatellitesCharts chartsData={chartsData} />
                )}
            </StyledSatellitesChartsWrapper>
        </Grid>
    )
}

export default SatellitesPage
