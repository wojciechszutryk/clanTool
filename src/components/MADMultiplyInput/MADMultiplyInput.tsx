import { TextField } from '@mui/material'
import React, { useCallback } from 'react'
import { useAppSelector } from 'functions/hooks/useAppSelector'
import { useAppDispatch } from 'functions/hooks/useAppDispach'
import { setMADMultiply } from '../../state/actions'

const MADMultiplyInput = () => {
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const dispatch = useAppDispatch()

    const handleInputChange = useCallback(
        (e) => {
            dispatch(setMADMultiply(e.target.value))
        },
        [dispatch]
    )

    return <TextField
        disabled={true} //mad temp removed
        sx={{width: 140}}
        id="MADMultiplyInput"
        label="MAD multiply"
        type="number"
        value={MADMultiply}
        onChange={(e) => handleInputChange(e)}
        inputProps={{min:1}}
    />
}

export default MADMultiplyInput
