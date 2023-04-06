import { Box } from '@mui/material'
import ChartsToShowSelect from 'pages/ChartsPages/components/Form/ChartsToShowSelect'
import DatePicker from 'pages/ChartsPages/components/DatePicker'
import MADMultiplyInput from 'pages/ChartsPages/components/MADMultiplyInput'
import OpenStreetMap from 'pages/ChartsPages/components/OpenStreetMap'
import TauTypeSelect from 'pages/ChartsPages/components/TauTypeSelect'
import { useAppSelector } from 'hooks/useAppSelector'
import { StyledFormHeader } from 'pages/ChartsPages/components/Form/styles'
import { memo } from 'react'
import StationsSelect from '../../../components/Form/StationsSelect'
import { StyledStationsFormMapWrapper } from './styles'

interface Props {
    handleSubmit: () => void
}

const StationsForm = ({ handleSubmit }: Props): JSX.Element => {
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedStationName
    )

    return (
        <>
            <StyledFormHeader variant={'h2'}>Parameters</StyledFormHeader>
            <StyledStationsFormMapWrapper>
                <OpenStreetMap />
            </StyledStationsFormMapWrapper>
            <StationsSelect />
            <DatePicker isStartDate />
            <DatePicker />
            <Box>
                <TauTypeSelect />
                <MADMultiplyInput />
            </Box>
            <ChartsToShowSelect
                disabled={selectedSatelliteNames.length === 0}
            />
        </>
    )
}

export default memo(StationsForm)
