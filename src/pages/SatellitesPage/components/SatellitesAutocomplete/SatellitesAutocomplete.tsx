import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
    setSatellitesNames,
    setSelectedSatelliteNames,
} from '../../../../state/actions'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import SatelliteBase from 'assets/SatelliteBase'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'

type System = 'G' | 'R' | 'C' | 'E' | 'J'

const Systems = {
    G: 'GPS',
    R: 'GLONASS',
    C: 'Beidou',
    E: 'Galieo',
    J: 'QZSS',
} as const

const SatellitesAutocomplete = () => {
    const dispatch = useAppDispatch()
    const satellitesNames = useAppSelector((state) => state.app.satellitesNames)
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const [limitReached, setLimitReached] = useState(false)

    const checkDisable = useCallback(
        (option) => limitReached && selectedSatelliteNames.length > 4,
        [limitReached, selectedSatelliteNames]
    )

    useEffect(() => {
        dispatch(setSatellitesNames(SatelliteBase))
    }, [dispatch])

    const selectNameOptions = useMemo(() => {
        return satellitesNames.map((name: string) => {
            const systemMark = name[0] as System
            return {
                system: Systems[systemMark],
                name,
            }
        })
    }, [satellitesNames])

    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: {
            system: 'GPS' | 'GLONASS' | 'Beidou' | 'Galieo' | 'QZSS'
            name: string
        }[]
    ) => {
        dispatch(setSelectedSatelliteNames(value.map((val) => val.name)))
        setLimitReached(selectedSatelliteNames.length >= 4)
    }

    return (
        <FormControl>
            <Autocomplete
                id="grouped-demo"
                getOptionDisabled={checkDisable}
                options={selectNameOptions.sort(
                    (a, b) => -b.system.localeCompare(a.system)
                )}
                disableCloseOnSelect
                groupBy={(option) => option.system}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                multiple
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField {...params} label="Satellites" />
                )}
            />
        </FormControl>
    )
}

export default SatellitesAutocomplete
