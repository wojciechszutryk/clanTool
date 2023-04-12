import { Checkbox, FormControlLabel } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { setChartsToShow } from '../../../../../state/actions'
import { StyledCheckboxesWrapper, StyledLabel } from './styles'
import { ChartTypes } from 'models/inputData.model'

interface Props {
    hideDataOptions?: boolean
}

/**
 * This component is responsible for rendering checkboxes for selecting charts to show.
 */
const ChartsToShowSelect = ({ hideDataOptions }: Props) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const dispatch = useAppDispatch()
    const availableCharts = hideDataOptions
        ? Object.values(ChartTypes).filter((chart) => chart.includes('DEV'))
        : Object.values(ChartTypes)

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

    return (
        <StyledCheckboxesWrapper>
            <StyledLabel>Select chart types</StyledLabel>
            {availableCharts.map((chart) => (
                <FormControlLabel
                    key={chart}
                    control={
                        <Checkbox
                            checked={chartsToShow.includes(chart)}
                            onChange={() => handleChartCheck(chart)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                    label={chart}
                />
            ))}
        </StyledCheckboxesWrapper>
    )
}

export default ChartsToShowSelect
