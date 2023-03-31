import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import { useAppSelector } from 'hooks/useAppSelector'
import React, { useCallback, useMemo } from 'react'
import { Charts } from '../../../../models/inputData.model'

const availableCharts = [
    'Phase',
    'Frequency',
    'Frequency Drift',
    'ADEV',
    'MDEV',
    'ODEV',
    'HDEV',
] as Charts[]

const SatellitesChartsToShowSelect = ({
    setChartsSelectedToBeVisible,
    chartsSelectedToBeVisible,
}: {
    setChartsSelectedToBeVisible: React.Dispatch<React.SetStateAction<Charts[]>>
    chartsSelectedToBeVisible: Charts[]
}) => {
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    const handleChartCheck = useCallback(
        (chart) => {
            const chartsToShowCopy = [...chartsSelectedToBeVisible]
            if (chartsToShowCopy.includes(chart)) {
                chartsToShowCopy.splice(chartsToShowCopy.indexOf(chart), 1)
                setChartsSelectedToBeVisible(chartsToShowCopy)
            } else {
                chartsToShowCopy.push(chart)
                setChartsSelectedToBeVisible(chartsToShowCopy)
            }
        },
        [chartsSelectedToBeVisible, setChartsSelectedToBeVisible]
    )

    const checkboxes = useMemo(() => {
        const chartsThatCanBeDisplayed =
            selectedNames.length > 1
                ? (['ADEV', 'MDEV', 'ODEV', 'HDEV'] as Charts[])
                : availableCharts

        return chartsThatCanBeDisplayed.map((chart) => (
            <FormControlLabel
                key={chart}
                control={
                    <Checkbox
                        checked={chartsSelectedToBeVisible.includes(chart)}
                        onChange={() => handleChartCheck(chart)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label={chart}
            />
        ))
    }, [chartsSelectedToBeVisible, handleChartCheck, selectedNames.length])

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
            {checkboxes}
        </FormGroup>
    )
}

export default SatellitesChartsToShowSelect
