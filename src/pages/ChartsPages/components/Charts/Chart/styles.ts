import { Box, Button, styled } from '@mui/material'

export const StyledWrapper = styled(Box)({
    width: '100%',
    padding: 10,
    '@media only screen and (min-width: 900px)': {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 2,
        paddingTop: 2,
        boxShadow:
            '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
    },
})

export const StyledChartBox = styled(Box)({ height: '50vh' })

export const StyledChartActionsWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

export const StyledSaveToImageButton = styled(Button)({
    width: '50%',
    margin: 2,
})

export const StyledSaveToCSVButton = styled(StyledSaveToImageButton)({
    width: '50%',
    margin: 2,
    '& a': { color: '#25374a', textDecoration: 'none' },
})
