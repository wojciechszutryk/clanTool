import { Box } from '@mui/material'
import { useAppSelector } from 'hooks/useAppSelector'
import { Charts } from 'models/inputData.model'
import { memo } from 'react'

const DrawStationCharts = () => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)

    return (
        <Box>
            {/* {(chartsToShow.includes(Charts.ADEV) ||
                chartsToShow.includes(Charts.MDEV) ||
                chartsToShow.includes(Charts.ODEV)) && <DrawStationDEVChart />}
            {chartsToShow.includes(Charts.Phase) && <DrawPhaseChart />}
            {chartsToShow.includes(Charts.Frequency) && <DrawFrequencyChart />}
            {chartsToShow.includes(Charts.FrequencyDrift) && (
                <DrawFrequencyDriftChart />
            )} */}
        </Box>
    )
}

export default memo(DrawStationCharts)
