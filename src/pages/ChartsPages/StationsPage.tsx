import { Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from 'hooks/useAppSelector'
import ChartsForm from './components/Form'
import {
    StyledChartsPageWarpper,
    StyledChartsWrapper,
    StyledFormWrapper,
} from './styles'
import useGetChartsData from 'pages/ChartsPages/hooks/useGetChartsData'
import ChartsSection from './components/ChartsSection'

function StationsPage() {
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const { createChartsData, ...rest } = useGetChartsData()

    const handleSubmit = () => {
        createChartsData([selectedStationName], chartsToShow)
    }

    return (
        <StyledChartsPageWarpper container spacing={{ md: 3 }}>
            <StyledFormWrapper item xs={12} md={5} lg={4} extendedHeight>
                <ChartsForm handleSubmit={handleSubmit} isStationPage />
            </StyledFormWrapper>
            <StyledChartsWrapper item xs={12} md={7} lg={8}>
                <ChartsSection {...rest} />
            </StyledChartsWrapper>
        </StyledChartsPageWarpper>
    )
}

export default StationsPage
