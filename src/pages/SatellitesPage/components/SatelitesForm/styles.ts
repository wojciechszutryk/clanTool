import { Box, Button, Grid, styled, Typography } from '@mui/material'

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

export const StyledSatellitesFormHeader = styled(Typography)({
    fontSize: 30,
    color: '#25374a',
})

export const StyledSatellitesFormSubmitButton = styled(Button)({
    backgroundColor: '#25374a',
    width: 300,
    '&:hover': { backgroundColor: '#7E8995' },
})
