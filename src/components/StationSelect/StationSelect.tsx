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
import { setGlobalLoader, setSelectedStationName, setStationsNames } from '../../state/actions'
import stations from 'assets/StationsBase.json'

const StationSelect = () => {
    const dispatch = useAppDispatch()
    const stationsNames = useAppSelector((state) => state.app.stationsNames)
    const mapRef = useAppSelector((state) => state.app.mapReference)
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    useEffect(() => {
        const names = Object.keys(stations)
        dispatch(setStationsNames(names))
    }, [dispatch])
    const selectNameOptions = useMemo(() => {
        return stationsNames.map((name: string) => (
            <MenuItem key={name} value={name}>
                {name}
            </MenuItem>
        ))
    }, [stationsNames])
    const panTo = React.useCallback(
        (name: string) => {
            // @ts-ignore
            const lat = stations[name].Latitude as number
            // @ts-ignore
            const lng = stations[name].Longitude as number
            console.log(mapRef)
            mapRef.panTo({ lat, lng })
            mapRef.setZoom(14)
        },
        [mapRef]
    )

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setGlobalLoader(true))
        const name = event.target.value as string
        dispatch(setSelectedStationName(name))
        panTo(name)
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ minWidth: '220px' }}>
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
