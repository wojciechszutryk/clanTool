export {} 
// import React, { useEffect, useMemo } from 'react'
// import { useAppDispatch } from '../../functions/hooks/useAppDispach'
// import { useAppSelector } from '../../functions/hooks/useAppSelector'
// import {
//     setSelectedSatelliteName,
//     setSatellitesNames,
// } from '../../state/actions'
// import {
//     Box,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     SelectChangeEvent,
// } from '@mui/material'
// import SatelliteBase from 'assets/SatelliteBase'

// const systems = {
//     G: 'GPS',
//     R: 'GLONASS',
//     C: "Beidou",
//     E: 'Galieo',
//     J: 'QZSS'
// } as const

// interface Props {
//     system : 'G' | 'R' | 'C' | 'E' | 'J'
// }

// const SatelliteSelect = ({ system }: Props) => {
//     const dispatch = useAppDispatch()
//     const satellitesNames = useAppSelector((state) => state.app.satellitesNames.filter(name => (name[0] === system)))
//     const selectedSatelliteName = useAppSelector(
//         (state) => state.app.selectedSatelliteName
//     )
//     useEffect(() => {
//         dispatch(setSatellitesNames(SatelliteBase))
//     }, [dispatch])
//     const selectNameOptions = useMemo(() => {
//         return satellitesNames.map((name: string) => (
//             <MenuItem key={name} value={name}>
//                 {name}
//             </MenuItem>
//         ))
//     }, [satellitesNames])

//     const handleChange = (event: SelectChangeEvent) => {
//         dispatch(setSelectedSatelliteName(event.target.value as string))
//     }
//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
//             <FormControl sx={{ minWidth: '220px' }}>
//                 <InputLabel id="demo-simple-select-label">{systems[system] + " Satellite"}</InputLabel>
//                 <Select
//                     labelId="select station"
//                     id="demo-simple-select"
//                     value={selectedSatelliteName}
//                     label={systems[system] + "Satellite"}
//                     onChange={handleChange}
//                 >
//                     {selectNameOptions}
//                 </Select>
//             </FormControl>
//         </Box>
//     )
// }

// export default SatelliteSelect
