import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { setChartsToShow } from '../../state/actions'
import 'react-toastify/dist/ReactToastify.css'
import DrawStationCharts from './components/DrawCharts'
import { useAppDispatch } from 'functions/hooks/useAppDispach'
import { useAppSelector } from 'functions/hooks/useAppSelector'
import ChartsToShowSelect from 'components/ChartsToShowSelect'
import MADMultiplyInput from 'components/MADMultiplyInput'
import OpenStreetMap from 'components/OpenStreetMap'
import TauTypeSelect from 'components/TauTypeSelect'
import StationSelect from './components/StationSelect'
import DatePicker from 'components/DatePicker'

function StationsPage() {
    const selectedStationName = useAppSelector(
        (state) => state.app.selectedStationName
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setChartsToShow([]))
        }
    }, [dispatch])

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
                    height: 1100,
                    '@media only screen and (min-width: 900px)': {
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        paddingTop: '0 !important',
                        paddingLeft: '0 !important',
                        boxShadow:
                            '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
                    },
                }}
            >
                <Typography
                    variant={'h2'}
                    sx={{ fontSize: 30, color: '#25374a' }}
                >
                    Parameters
                </Typography>
                <Box sx={{ minWidth: 310, width: '95%' }}>
                    <OpenStreetMap />
                </Box>
                <StationSelect />
                <DatePicker startEnd={'start'} />
                <DatePicker startEnd={'end'} />
                <Box>
                    <TauTypeSelect />
                    <MADMultiplyInput />
                </Box>
                <ChartsToShowSelect
                    disabled={selectedStationName.length === 0}
                />
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
                <DrawStationCharts />
            </Grid>
        </Grid>
    )
}

export default StationsPage
