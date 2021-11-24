import React, { useMemo } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'


const DrawCharts = () => {
    const chartsToShow = useAppSelector((state) =>
        state.app.chartsToShow
    )

    const charts = useMemo(() => {
        chartsToShow.map(chart => (

        ))
    },[])

    return (
        <Box>

        </Box>
    )
}

export default DrawCharts
