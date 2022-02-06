import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import {
    setSatellitesNames, setSelectedSatelliteNames,
} from '../../state/actions'
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import SatelliteBase from 'assets/SatelliteBase'

const SatellitesAutocomplete = () => {
    const dispatch = useAppDispatch()
    const satellitesNames = useAppSelector((state) => state.app.satellitesNames);
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    useEffect(() => {
        dispatch(setSatellitesNames(SatelliteBase))
    }, [dispatch])
    const selectNameOptions = useMemo(() => {
        return satellitesNames.map((name: string) => (
            <MenuItem key={name} value={name}>
                {name}
            </MenuItem>
        ))
    }, [satellitesNames])

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSelectedSatelliteNames(event.target.value as string[]))
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ minWidth: '220px' }}>
                <InputLabel id="setallites-autocomplete-label">Satellites</InputLabel>
                <Select
                    labelId="setallites-autocomplete-label"
                    id="setallites-autocomplete"
                    value={selectedSatelliteNames}
                    onChange={handleChange}
                >
                    {selectNameOptions}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SatellitesAutocomplete
