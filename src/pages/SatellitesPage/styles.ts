import { Grid, styled } from '@mui/material'

export const StyledSatellitesFormWrapper = styled(Grid)({
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
})

export const StyledSatellitesChartsWrapper = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '@media only screen and (min-width: 900px)': {
        paddingTop: '0 !important',
    },
})

export const StyledLoaderWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
})
