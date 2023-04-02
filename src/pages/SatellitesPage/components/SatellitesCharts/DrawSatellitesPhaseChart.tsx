export {}
// import React, { useMemo, useState } from 'react'
// import { Box } from '@mui/material'
// import { ChartData, PhaseData, PhasePoint } from 'models/data.model'
// import DataChart from 'components/Chart/DataChart'

// const DrawSatellitesPhaseChart = ({
//     rerender,
//     phaseData,
// }: {
//     rerender: boolean
//     phaseData: PhaseData
// }) => {
//     const [data, setData] = useState<ChartData>([])

//     useMemo(async () => {
//         const chartData = phaseData.map((point: PhasePoint) => ({
//             x: point.date,
//             y: point.phase,
//         }))
//         setData(chartData)
//         // }, [dispatch, selectedName, startDate, endDate])
//     }, [rerender])

//     return (
//         <Box
//             sx={{
//                 m: '0px auto 30px',
//                 display: 'flex',
//                 justifyContent: 'center',
//             }}
//         >
//             <DataChart data={data} id={'Phase'} xType={'Date'} />
//         </Box>
//     )
// }

// export default DrawSatellitesPhaseChart
