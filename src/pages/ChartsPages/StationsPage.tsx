import { Alert, Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import Charts from './components/Charts'
import { useAppSelector } from 'hooks/useAppSelector'
import ChartsForm from './components/Form'
import { StyledAlert, StyledChartsWrapper, StyledFormWrapper } from './styles'
import useGetChartsData from 'pages/ChartsPages/hooks/useGetChartsData'
import ChartsLoaders from './components/Charts/ChartsLoaders'

function StationsPage() {
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const {
        isLoading,
        downloadPorgress,
        error,
        warning,
        chartsData,
        createChartsData,
    } = useGetChartsData()

    const handleSubmit = () => {
        createChartsData(
            [selectedStationName],
            startDate,
            endDate,
            chartsToShow
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
                {warning && (
                    <StyledAlert severity="warning">{warning}</StyledAlert>
                )}
                <Charts chartsData={chartsData} />
            </>
        ) //TODO: move to separate component

    return (
        <Grid container spacing={{ md: 3 }}>
            <StyledFormWrapper item xs={12} md={5} lg={4} extendedHeight>
                <ChartsForm handleSubmit={handleSubmit} isStationPage />
            </StyledFormWrapper>
            <StyledChartsWrapper item xs={12} md={7} lg={8}>
                {chatsSectionContent}
            </StyledChartsWrapper>
        </Grid>
    )
}

export default StationsPage
