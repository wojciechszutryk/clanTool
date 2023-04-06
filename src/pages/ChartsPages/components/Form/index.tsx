import { Box } from '@mui/material'
import { useAppSelector } from 'hooks/useAppSelector'
import { memo } from 'react'
import SatellitesAutocomplete from './SatellitesAutocomplete'
import SatellitesChartsToShowSelect from './SatellitesChartsToShowSelect/SatellitesChartsToShowSelect'
import { StyledFormHeader, StyledSatellitesFormSubmitButton } from './styles'
import StationsSelect from './StationsSelect'
import { StyledStationsFormMapWrapper } from 'pages/ChartsPages/StationsPage/StationsForm/styles'
import OpenStreetMap from './OpenStreetMap'
import MADMultiplyInput from './MADMultiplyInput'
import TauTypeSelect from './TauTypeSelect'
import DatePicker from './DatePicker'

interface Props {
    handleSubmit: () => void
    isStationPage?: boolean
}

const ChartsForm = ({ handleSubmit, isStationPage }: Props): JSX.Element => {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )

    return (
        <>
            <StyledFormHeader variant={'h2'}>Parameters</StyledFormHeader>
            {isStationPage ? (
                <>
                    <StyledStationsFormMapWrapper>
                        <OpenStreetMap />
                    </StyledStationsFormMapWrapper>
                    <StationsSelect />
                </>
            ) : (
                <SatellitesAutocomplete />
            )}
            <DatePicker isStartDate />
            <DatePicker />
            <Box>
                <TauTypeSelect />
                <MADMultiplyInput />
            </Box>
            <SatellitesChartsToShowSelect />
            <StyledSatellitesFormSubmitButton
                variant={'contained'}
                onClick={handleSubmit}
                disabled={
                    isStationPage
                        ? !selectedStationName
                        : selectedSatelliteNames.length === 0
                }
            >
                Calculate
            </StyledSatellitesFormSubmitButton>
        </>
    )
}

export default memo(ChartsForm)
