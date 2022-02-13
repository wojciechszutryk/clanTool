import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

import 'react-toastify/dist/ReactToastify.css'
import {
    ChartsToShowSelect, DatePicker,
    DrawCharts, MADMultiplyInput,
    SatellitesAutocomplete,
    TauTypeSelect,
} from '../../components'
import { ChartsTypes } from '../../helpers/models'

function SatellitesPage() {
    return (
        <Grid container spacing={{ md: 3 }}>
            <Grid
                item
                xs={12}
                md={5}
                lg={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: 700,
                    '@media only screen and (min-width: 900px)': {
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        paddingTop: '0 !important',
                        boxShadow: '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
                    },
                }}
            >
                <Typography variant={'h2'} sx={{fontSize:30, color: '#25374a'}}>Parameters</Typography>
                <SatellitesAutocomplete/>
                <DatePicker startEnd={'start'} />
                <DatePicker startEnd={'end'} />
                <Box>
                    <TauTypeSelect/>
                    <MADMultiplyInput/>
                </Box>
                <ChartsToShowSelect />
            </Grid>
            <Grid
                item
                xs={12}
                md={7}
                lg={8}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    '@media only screen and (min-width: 900px)': {
                        paddingTop: '0 !important',
                    },
                }}
            >
                <DrawCharts chartType={ChartsTypes.Stations}/>
            </Grid>
        </Grid>
    )
}

export default SatellitesPage