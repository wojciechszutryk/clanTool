import { Checkbox, FormControlLabel } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { setChartsToShow } from '../../../../../state/actions'
import { StyledCheckboxesWrapper, StyledLabel } from './styles'
import { ChartTypes } from 'models/inputData.model'

const availableCharts = Object.values(ChartTypes)

const ChartsToShowSelect = (props: { disabled?: boolean }) => {
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
                        disabled={props.disabled || false}
                        checked={chartsToShow.includes(chart)}
                        onChange={() => handleChartCheck(chart)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label={chart}
            />
        ))
    }, [chartsToShow, handleChartCheck, props.disabled])

    return (
        <StyledCheckboxesWrapper>
            <StyledLabel>Select chart types</StyledLabel>
            {checkboxes}
        </StyledCheckboxesWrapper>
    )
}

export default ChartsToShowSelect
