import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { setChartsToShow } from '../../state/actions'
import { charts } from '../../state/constans/types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    wrapper: { display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', maxWidth: '90%', margin: '0 auto' },
    item: { margin: '0 10px' }
})

const availableCharts = [
    'Phase',
    'Frequency',
    'Frequency Drift',
    'ADEV',
    'MDEV',
    'ODEV',
    'HDEV',
] as charts[]

const ChartsToShowSelect = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const dispatch = useAppDispatch()
    const classes = useStyles();

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
                className={classes.item}
                control={
                    <Checkbox
                        checked={chartsToShow.includes(chart)}
                        onChange={() => handleChartCheck(chart)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label={chart}
            />
        ))
    }, [chartsToShow, handleChartCheck])

    return <FormGroup className={classes.wrapper}>{checkboxes}</FormGroup>
}

export default ChartsToShowSelect
