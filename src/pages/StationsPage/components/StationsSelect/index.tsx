import { useEffect, useMemo } from 'react'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import {
    setSelectedStationName,
    setStationsNames,
} from '../../../../state/actions'
import stations from 'assets/StationsBase.json'

const StationsSelect = () => {
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

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.value as string
        dispatch(setSelectedStationName(name))
    }

    return (
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
    )
}

export default StationsSelect
