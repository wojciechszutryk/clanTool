import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import stationsBaseToNames from '../../functions/stationsBaseToNames/stationsBaseToNames'
import { setSelectedStationName, setStationsNames } from '../../state/actions'

const StationSelect = () => {
    const dispatch = useAppDispatch()
    const stationsNames = useAppSelector((state) => state.app.stationsNames)
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    useEffect(() => {
        stationsBaseToNames().then((r) => dispatch(setStationsNames(r)))
    }, [dispatch])
    const selectNameOptions = useMemo(() => {
        return stationsNames.map((name: string) => (
            <MenuItem key={name} value={name}>
                {name}
            </MenuItem>
        ))
    }, [stationsNames])

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSelectedStationName(event.target.value as string))
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
            <FormControl sx={{ width: '300px' }}>
                <InputLabel id="station-select-label">Station</InputLabel>
                <Select
                    labelId="select station"
                    id="station-select"
                    value={selectedStationName}
                    label="Station"
                    onChange={handleChange}
                >
                    {selectNameOptions}
                </Select>
            </FormControl>
        </Box>
    )
}

export default StationSelect
