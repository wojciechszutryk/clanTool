import React, { useEffect, useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import {
    setSatellitesNames, setSelectedSatelliteNames,
} from '../../state/actions'
import {
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps,
} from '@mui/material'
import SatelliteBase from 'assets/SatelliteBase'

type system = "G" | "R" | "C" | "E" | "J"

const systems = {
    G: 'GPS',
    R: 'GLONASS',
    C: "Beidou",
    E: 'Galieo',
    J: 'QZSS'
} as const

const SatellitesAutocomplete = () => {
    const dispatch = useAppDispatch()
    const satellitesNames = useAppSelector((state) => state.app.satellitesNames);
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    console.log(selectedSatelliteNames)

    useEffect(() => {
        dispatch(setSatellitesNames(SatelliteBase))
    }, [dispatch])
    
    const selectNameOptions = useMemo(() => {
        return satellitesNames.map((name: string) => {
            const systemMark = name[0] as system;
            return{
                system: systems[systemMark],
                name
            }
        })
    }, [satellitesNames]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, value: {
        system: "GPS" | "GLONASS" | "Beidou" | "Galieo" | "QZSS";
        name: string;
    }[] ) => {
        dispatch(setSelectedSatelliteNames(value.map(val => val.name)))
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ minWidth: '220px' }}>
                <Autocomplete
                    id="grouped-demo"
                    options={selectNameOptions.sort((a, b) => -b.system.localeCompare(a.system))}
                    groupBy={(option) => option.system}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    multiple
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} label="Satellites" />}
                />
            </FormControl>
        </Box>
    )
}

export default SatellitesAutocomplete
