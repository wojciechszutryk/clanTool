import { Grid } from '@mui/material'
import React from 'react'
import './App.css'
import {
    ChartsToShowSelect,
    DatePicker,
    DrawCharts,
    MyGoogleMaps,
    SatelliteSelect,
    StationSelect,
} from './components'
import { toast, ToastContainer } from 'react-toastify/dist'
import InfoIcon from '@mui/icons-material/Info'
import 'react-toastify/dist/ReactToastify.css'

// import convertRinexDataIntoJSON from './functions/convertRinexDataIntoJSON/convertRinexDataIntoJSON'
// convertRinexDataIntoJSON('G12').then(r=> console.log(r))

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
                <MyGoogleMaps />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            >
                <DatePicker startEnd={'start'} />
                <DatePicker startEnd={'end'} />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <ChartsToShowSelect />
            </Grid>
            <Grid item xs={12}>
                <DrawCharts />
                <ToastContainer icon={<InfoIcon color="primary" />} />
            </Grid>
        </Grid>
    )
}

export default App
