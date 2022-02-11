import { Grid } from '@mui/material'
import React from 'react'

import 'react-toastify/dist/ReactToastify.css'
import {
    ChartsToShowSelect, DatePicker,
    DrawCharts,
    MyMaps,
    SatellitesAutocomplete,
    StationSelect,
    TauTypeSelect,
} from '../../components'

function SatellitesPage() {
    console.log('satelites')
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
                <SatellitesAutocomplete/>
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
                <TauTypeSelect/>
                <DrawCharts />
            </Grid>
        </Grid>
    )
}

export default SatellitesPage
