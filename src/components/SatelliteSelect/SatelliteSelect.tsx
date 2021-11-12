import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { satelliteStationsBaseToNames } from '../../functions/stationsBaseToNames'
import {
    setSelectedSatelliteName,
    setSatellitesNames,
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

const SatelliteSelect = () => {
    const dispatch = useAppDispatch()
    const satellitesNames = useAppSelector((state) => state.app.satellitesNames)
    const selectedSatelliteName = useAppSelector(
        (state) => state.app.selectedSatelliteName
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
        dispatch(setSelectedSatelliteName(event.target.value as string))
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
            <FormControl sx={{ width: '300px' }}>
                <InputLabel id="demo-simple-select-label">Satellite</InputLabel>
                <Select
                    labelId="select station"
                    id="demo-simple-select"
                    value={selectedSatelliteName}
                    label="Satellite"
                    onChange={handleChange}
                >
                    {selectNameOptions}
                </Select>
            </FormControl>
        </Box>
    )
}

export default SatelliteSelect
