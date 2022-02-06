import React, { useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { makeStyles } from '@mui/styles'
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

const useStyles = makeStyles({
    powerOf: {
        position: 'relative',
        '& span': {
            position: 'absolute',
            fontSize: '60%',
            transform: 'translateY(-30%)',
        },
    },
})

const TauTypeSelect = () => {
    const dispatch = useAppDispatch()
    const tauType = useAppSelector(
        (state) => state.app.tauType
    )
    const classes = useStyles();

    const tauDisplayOptions: {[key:string] : JSX.Element} = {}
    tauDisplayOptions[TauType.powerOfTwo] = <div className={classes.powerOf}>2<span>n</span></div> 
    tauDisplayOptions[TauType.powerOfTen] = <div className={classes.powerOf}>10<span>n</span></div> 
    tauDisplayOptions[TauType.logarithmLike] = <div>10,20,30...100,200... - nazwa robocza</div> 
    

    const selectTauOptions = useMemo(() => {
        return Object.values(TauType).map((name: string) => (
            <MenuItem key={name} value={name}>
                {tauDisplayOptions[name]}
            </MenuItem>
        ))
    }, [tauDisplayOptions])

    const handleChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TauType
        dispatch(setTauType(type))
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ minWidth: '220px' }}>
                <InputLabel id="station-select-label">Tau types</InputLabel>
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
