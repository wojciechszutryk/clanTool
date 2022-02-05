import React, { useMemo } from 'react'
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
import { setTauType } from '../../state/actions'
import { TauType } from 'state/constans/types'

const TauTypeSelect = () => {
    const dispatch = useAppDispatch()
    const tauType = useAppSelector(
        (state) => state.app.tauType
    )

    const selectTauOptions = useMemo(() => {
        return Object.keys(TauType).map((name: string) => (
            <MenuItem key={name} value={name}>
                {name}
            </MenuItem>
        ))
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TauType
        dispatch(setTauType(type))
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ minWidth: '220px' }}>
                <InputLabel id="station-select-label">Station</InputLabel>
                <Select
                    labelId="select tau"
                    id="tau-select"
                    value={tauType}
                    label="Tau Type"
                    onChange={handleChange}
                >
                    {selectTauOptions}
                </Select>
            </FormControl>
        </Box>
    )
}

export default TauTypeSelect
