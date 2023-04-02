// import React, { memo, useMemo, useState } from 'react'
// import { Box } from '@mui/material'
// import { ClipLoader } from 'react-spinners'
// import { fetchDataFromPublicDir } from '../../../../functions/fetchDataFromPublicDir'
// import DataChart from 'components/Chart/DataChart'
// import { useAppDispatch } from 'hooks/useAppDispach'
// import { useAppSelector } from 'hooks/useAppSelector'

// const DrawStationPhaseChart = () => {
//     const [data, setData] = useState<{ x: number; y: number }[]>([])
//     const [loading, setLoading] = useState(true)
//     const startDate = useAppSelector((state) => state.app.startDate)
//     const endDate = useAppSelector((state) => state.app.endDate)
//     const dispatch = useAppDispatch()
//     const selectedName = useAppSelector(
//         (state) => state.app.selectedStationName
//     )

//     useMemo(async () => {
//         if (!selectedName) {
//             setLoading(false)
//             return
//         }
//         setLoading(true)
//         const JSONData = await fetchDataFromPublicDir(selectedName)
//         const stationSatelliteData = await JSONData.data.filter(
//             (obj: { date: number; phase: number }) =>
//                 obj.date <= endDate && obj.date >= startDate
//         )
//         const chartData = stationSatelliteData.map((point: any) => ({
//             x: point.date,
//             y: point.phase,
//         }))
//         setData(chartData)
//         await setLoading(false)
//     }, [dispatch, selectedName, startDate, endDate])

//     return (
//         <Box
//             sx={{
//                 m: '0px auto 30px',
//                 display: 'flex',
//                 justifyContent: 'center',
//             }}
//         >
//             {loading ? (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         height: '50vh',
//                     }}
//                 >
//                     <ClipLoader loading={loading} size={150} />
//                 </Box>
//             ) : (
//                 <DataChart data={data} id={'Phase'} xType={'Date'} />
//             )}
//         </Box>
//     )
// }

// export default memo(DrawStationPhaseChart)
export {}
