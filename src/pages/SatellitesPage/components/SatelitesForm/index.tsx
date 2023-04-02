import { Box } from '@mui/material'
import DatePicker from 'components/DatePicker'
import MADMultiplyInput from 'components/MADMultiplyInput'
import TauTypeSelect from 'components/TauTypeSelect'
import { useAppSelector } from 'hooks/useAppSelector'
import { memo } from 'react'
import SatellitesAutocomplete from './SatellitesAutocomplete'
import SatellitesChartsToShowSelect from './SatellitesChartsToShowSelect/SatellitesChartsToShowSelect'
import {
    StyledSatellitesFormHeader,
    StyledSatellitesFormSubmitButton,
} from './styles'

interface Props {
    handleSubmit: () => void
}

const SatelitesForm = ({ handleSubmit }: Props): JSX.Element => {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    return (
        <>
            <StyledSatellitesFormHeader variant={'h2'}>
                Parameters
            </StyledSatellitesFormHeader>
            <SatellitesAutocomplete />
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
                disabled={selectedSatelliteNames.length === 0}
            >
                Calculate
            </StyledSatellitesFormSubmitButton>
        </>
    )
}

export default memo(SatelitesForm)
