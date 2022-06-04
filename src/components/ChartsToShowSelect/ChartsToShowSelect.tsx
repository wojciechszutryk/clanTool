import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { Charts } from 'state/constans/types'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { setChartsToShow } from '../../state/actions'

const availableCharts = [
    'Phase',
    'Frequency',
    'Frequency Drift',
    'ADEV',
    'MDEV',
    'ODEV',
    'HDEV',
] as Charts[]

const ChartsToShowSelect = (props: {disabled?: boolean}) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const dispatch = useAppDispatch()

    const handleChartCheck = useCallback(
        (chart) => {
            const chartsToShowCopy = [...chartsToShow]
            if (chartsToShowCopy.includes(chart)) {
                chartsToShowCopy.splice(chartsToShowCopy.indexOf(chart), 1)
                dispatch(setChartsToShow(chartsToShowCopy))
            } else {
                chartsToShowCopy.push(chart)
                dispatch(setChartsToShow(chartsToShowCopy))
            }
        },
        [chartsToShow, dispatch]
    )

    const checkboxes = useMemo(() => {
        return availableCharts.map((chart) => (
            <FormControlLabel
                key={chart}
                control={
                    <Checkbox
                        disabled={ props.disabled || false }
                        checked={chartsToShow.includes(chart)}
                        onChange={() => handleChartCheck(chart)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label={chart}
            />
        ))
    }, [chartsToShow, handleChartCheck, props.disabled])

    return <FormGroup sx={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    }}>
        <FormLabel component="legend" sx={{
            width: '100%',
            textAlign: 'center'
        }}>Select chart types</FormLabel>
        {checkboxes}
    </FormGroup>
}

export default ChartsToShowSelect
