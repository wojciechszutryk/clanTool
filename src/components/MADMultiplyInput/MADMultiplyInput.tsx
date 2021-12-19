import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useCallback } from 'react'
import { useAppSelector } from 'functions/hooks/useAppSelector'
import { useAppDispatch } from 'functions/hooks/useAppDispach'
import { setMADMultiply } from '../../state/actions'

const useStyles = makeStyles({
    input: { maxWidth: 100 },
})

const MADMultiplyInput = () => {
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const dispatch = useAppDispatch()
    const classes = useStyles()

    const handleInputChange = useCallback(
        (e) => {
            dispatch(setMADMultiply(e.target.value))
        },
        [dispatch]
    )

    return <TextField
        id="MADMultiplyInput"
        label="MAD multiply"
        type="number"
        value={MADMultiply}
        size="small"
        onChange={(e) => handleInputChange(e)}
        inputProps={{min:1}}
        className={classes.input}
    />
}

export default MADMultiplyInput
