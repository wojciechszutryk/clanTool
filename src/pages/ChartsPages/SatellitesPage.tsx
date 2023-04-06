import { Alert, Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import { ChartTypes } from '../../models/inputData.model'
import Charts from './components/Charts'
import { useAppSelector } from 'hooks/useAppSelector'
import ChartsForm from './components/Form'
import { StyledAlert, StyledChartsWrapper, StyledFormWrapper } from './styles'
import useGetChartsData from 'hooks/useGetChartsData'
import ChartsLoaders from './components/Charts/ChartsLoaders'

function SatellitesPage() {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const {
        isLoading,
        error,
        warning,
        downloadPorgress,
        chartsData,
        createChartsData,
    } = useGetChartsData()

    const handleSubmit = () => {
        const chartsDataToCreate =
            selectedSatelliteNames.length > 1
                ? chartsToShow.filter(
                      (chartToShow) =>
                          ![
                              ChartTypes.Phase,
                              ChartTypes.Frequency,
                              ChartTypes.FrequencyDrift,
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

    let chatsSectionContent = null
    if (error)
        chatsSectionContent = (
            <StyledAlert severity="error">{error}</StyledAlert>
        )
    else if (isLoading)
        chatsSectionContent = (
            <ChartsLoaders downloadPorgress={downloadPorgress} />
        )
    else if (chartsData)
        chatsSectionContent = (
            <>
                {warning && <StyledAlert severity="warning">{warning}</StyledAlert>}
                <Charts chartsData={chartsData} />
            </>
        )

    return (
        <Grid container spacing={{ md: 3 }}>
            <StyledFormWrapper item xs={12} md={5} lg={4}>
                <ChartsForm handleSubmit={handleSubmit} />
            </StyledFormWrapper>
            <StyledChartsWrapper item xs={12} md={7} lg={8}>
                {chatsSectionContent}
            </StyledChartsWrapper>
        </Grid>
    )
}

export default SatellitesPage
