import { Box, Button, Grid, Typography } from '@mui/material'
import DatePicker from 'components/DatePicker'
import MADMultiplyInput from 'components/MADMultiplyInput'
import TauTypeSelect from 'components/TauTypeSelect'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { setChartsToShow } from '../../state/actions'
import { Charts } from '../../models/inputData.model'
import DrawSatellitesCharts from './components/DrawSatellitesCharts'
import SatellitesAutocomplete from './components/SatellitesAutocomplete'
import SatellitesChartsToShowSelect from './components/SatellitesChartsToShowSelect/SatellitesChartsToShowSelect'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'

function SatellitesPage() {
    const [recalculate, setRecalculate] = useState(false) //used to rerender chars components on button click
    const dispatch = useAppDispatch()
    const [chartsSelectedToBeVisible, setChartsSelectedToBeVisible] = useState<
        Charts[]
    >([])
    const selectedSatelliteNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    const handleDrawCharts = () => {
        setRecalculate(!recalculate)

        const chartsToDispach =
            selectedSatelliteNames.length > 1
                ? chartsSelectedToBeVisible.filter(
                      (chartToShow) =>
                          !['Phase', 'Frequency', 'Frequency Drift'].includes(
                              chartToShow
                          )
                  )
                : chartsSelectedToBeVisible
        dispatch(setChartsToShow(chartsToDispach))
    }

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
                    height: 700,
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
                <SatellitesAutocomplete />
                <DatePicker isStartDate />
                <DatePicker />
                <Box>
                    <TauTypeSelect />
                    <MADMultiplyInput />
                </Box>
                <SatellitesChartsToShowSelect
                    setChartsSelectedToBeVisible={setChartsSelectedToBeVisible}
                    chartsSelectedToBeVisible={chartsSelectedToBeVisible}
                />
                <Button
                    variant={'contained'}
                    sx={{
                        backgroundColor: '#25374a',
                        width: 300,
                        '&:hover': { backgroundColor: '#7E8995' },
                    }}
                    onClick={handleDrawCharts}
                    disabled={selectedSatelliteNames.length === 0}
                >
                    Calculate
                </Button>
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
                <DrawSatellitesCharts recalculate={recalculate} />
            </Grid>
        </Grid>
    )
}

export default SatellitesPage
