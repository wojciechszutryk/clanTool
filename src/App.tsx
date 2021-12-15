import { Grid, Box } from '@mui/material'
import React from 'react'
import './App.css'
import {
    ChartsToShowSelect,
    DatePicker,
    DrawCharts,
    MyMaps,
    SatelliteSelect,
    StationSelect,
    MADMultiplyInput
} from './components'
import { toast, ToastContainer } from 'react-toastify/dist'
import InfoIcon from '@mui/icons-material/Info'
import 'react-toastify/dist/ReactToastify.css'

// import convertRinexDataIntoJSON from './functions/convertRinexDataIntoJSON/convertRinexDataIntoJSON'
// convertRinexDataIntoJSON('R20').then((r) => console.log(r))

function App() {
    toast.configure()
    return (
        <Grid container spacing={2}>
            <Grid
                item
                md={6}
                lg={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <SatelliteSelect system={'G'} />
                <SatelliteSelect system={'R'} />
                <SatelliteSelect system={'C'} />
                <SatelliteSelect system={'E'} />
                <SatelliteSelect system={'J'} />
                <StationSelect />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <MyMaps />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <DatePicker startEnd={'start'} />
                <DatePicker startEnd={'end'} />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <ChartsToShowSelect />
                <DrawCharts />
            </Grid>
            <ToastContainer icon={<InfoIcon color="primary" />} />
        </Grid>
    )
}

export default App
