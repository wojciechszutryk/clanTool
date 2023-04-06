import { Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import { Charts } from '../../models/inputData.model'
import SatellitesCharts from './components/Charts'
import { useAppSelector } from 'hooks/useAppSelector'
import ChartsForm from './components/Form'
import {
    StyledSatellitesChartsWrapper,
    StyledSatellitesFormWrapper,
} from './styles'
import useGetChartsData from 'hooks/useGetChartsData'
import ChartsLoaders from './components/Charts/ChartsLoaders'

function SatellitesPage() {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const { isLoading, downloadPorgress, chartsData, createChartsData } =
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
                <ChartsForm handleSubmit={handleSubmit} />
            </StyledSatellitesFormWrapper>
            <StyledSatellitesChartsWrapper item xs={12} md={7} lg={8}>
                {isLoading ? (
                    <ChartsLoaders downloadPorgress={downloadPorgress} />
                ) : (
                    chartsData && <SatellitesCharts chartsData={chartsData} />
                )}
            </StyledSatellitesChartsWrapper>
        </Grid>
    )
}

export default SatellitesPage
