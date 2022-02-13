import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { charts } from '../../../../state/constans/types'

const availableCharts = [
    'Phase',
    'Frequency',
    'Frequency Drift',
    'ADEV',
    'MDEV',
    'ODEV',
    'HDEV',
] as charts[]

const SatellitesChartsToShowSelect = ({
        setChartsSelectedToBeVisible,chartsSelectedToBeVisible
    }: {
        setChartsSelectedToBeVisible:  React.Dispatch<React.SetStateAction<charts[]>>, chartsSelectedToBeVisible: charts[]
    }) => {

    const handleChartCheck = useCallback(
        (chart) => {
            const chartsToShowCopy = [...chartsSelectedToBeVisible];
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
        return availableCharts.map((chart) => (
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
    }, [chartsSelectedToBeVisible, handleChartCheck])

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

export default SatellitesChartsToShowSelect
