import { TextField } from '@mui/material'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { useCallback } from 'react'
import { setMADMultiply } from 'state/actions'

const MADMultiplyInput = () => {
    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const dispatch = useAppDispatch()

    const handleInputChange = useCallback(
        (e) => {
            dispatch(setMADMultiply(e.target.value))
        },
        [dispatch]
    )

    return (
        <TextField
            sx={{ width: 140 }}
            id="MADMultiplyInput"
            label="MAD multiply"
            type="number"
            value={MADMultiply}
            onChange={(e) => handleInputChange(e)}
            inputProps={{ min: 1 }}
        />
    )
}

export default MADMultiplyInput
