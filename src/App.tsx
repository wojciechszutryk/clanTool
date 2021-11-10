import React, { useEffect, useMemo } from 'react'
import './App.css'
import { satelliteStationsBaseToNames } from './functions/sateliteStationsBaseToNames'
import { useAppSelector } from './functions/hooks/useAppSelector'
import { useAppDispatch } from './functions/hooks/useAppDispach'
import {
    setSelectedStationsSatellitesName,
    setStationsSatellitesNames,
} from './state/actions'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'

function App() {
    const dispatch = useAppDispatch()
    const names = useAppSelector((state) => state.app.stationsSatellitesNames)
    const selectedName = useAppSelector(
        (state) => state.app.selectedStationsSatellitesName
    )
    useEffect(() => {
        satelliteStationsBaseToNames().then((r) =>
            dispatch(setStationsSatellitesNames(r))
        )
    }, [dispatch])
    const selectNameOptions = useMemo(() => {
        return names.map((name: string) => (
            <MenuItem key={name} value={name}>
                {name}
            </MenuItem>
        ))
    }, [names])

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(
            setSelectedStationsSatellitesName(event.target.value as string)
        )
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                Station or Satellite
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedName}
                label="Age"
                onChange={handleChange}
            >
                {selectNameOptions}
            </Select>
        </FormControl>
    )
}

export default App
