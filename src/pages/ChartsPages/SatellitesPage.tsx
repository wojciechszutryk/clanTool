import 'react-toastify/dist/ReactToastify.css'
import { ChartTypes } from '../../models/inputData.model'
import { useAppSelector } from 'hooks/useAppSelector'
import ChartsForm from './components/Form'
import {
    StyledChartsPageWarpper,
    StyledChartsWrapper,
    StyledFormWrapper,
} from './styles'
import useGetChartsData from 'pages/ChartsPages/hooks/useGetChartsData'
import ChartsSection from './components/ChartsSection'

/**
 * This page is used to display form and charts for selected satellites
 */
function SatellitesPage() {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const { createChartsData, ...rest } = useGetChartsData()

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

        createChartsData(selectedSatelliteNames, chartsDataToCreate)
    }

    return (
        <StyledChartsPageWarpper container spacing={{ md: 3 }}>
            <StyledFormWrapper item xs={12} md={5} lg={4}>
                <ChartsForm handleSubmit={handleSubmit} />
            </StyledFormWrapper>
            <StyledChartsWrapper item xs={12} md={7} lg={8}>
                <ChartsSection {...rest} />
            </StyledChartsWrapper>
        </StyledChartsPageWarpper>
    )
}

export default SatellitesPage
