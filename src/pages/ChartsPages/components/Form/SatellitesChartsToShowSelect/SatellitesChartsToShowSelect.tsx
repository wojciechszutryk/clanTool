import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useCallback } from 'react'
import { setChartsToShow } from 'state/actions'
import { ChartTypes } from '../../../../../models/inputData.model'

const availableCharts = [
    'Phase',
    'Frequency',
    'Frequency Drift',
    'ADEV',
    'MDEV',
    'ODEV',
    'HDEV',
] as ChartTypes[]

const SatellitesChartsToShowSelect = () => {
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const dispatch = useAppDispatch()

    const handleChartCheck = useCallback(
        (chart) => {
            if (chartsToShow.includes(chart)) {
                const chartsToShowCopy = [...chartsToShow]
                chartsToShowCopy.splice(chartsToShow.indexOf(chart), 1)
                dispatch(setChartsToShow(chartsToShowCopy))
            } else {
                dispatch(setChartsToShow([...chartsToShow, chart]))
            }
        },
        [dispatch, chartsToShow]
    )

    const chartsThatCanBeDisplayed =
        selectedNames.length > 1
            ? [
                  ChartTypes.ADEV,
                  ChartTypes.MDEV,
                  ChartTypes.ODEV,
                  ChartTypes.HDEV,
              ]
            : availableCharts

    return (
        <FormGroup
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                paddingLeft: 10,
                paddingRight: 10,
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <FormLabel
                component="legend"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                Select chart types
            </FormLabel>
            {chartsThatCanBeDisplayed.map((chart) => (
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
        </FormGroup>
    )
}

export default SatellitesChartsToShowSelect
