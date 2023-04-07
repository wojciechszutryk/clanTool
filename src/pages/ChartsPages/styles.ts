import { Grid, styled } from '@mui/material'


export const StyledChartsPageWarpper = styled(Grid)({
    paddingLeft: 40,
    paddingRight: 20
})

export const StyledFormWrapper = styled(Grid, {
    shouldForwardProp: (prop) => prop !== 'extendedHeight',
})<{ extendedHeight?: boolean }>(({ extendedHeight }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: extendedHeight ? 1100 : 700,
    '@media only screen and (min-width: 900px)': {
        backgroundColor: '#fff',
        borderRadius: 2,
        paddingTop: '0 !important',
        paddingLeft: '0 !important',
        boxShadow:
            '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
    },
}))

export const StyledChartsWrapper = styled(Grid)({
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    '@media only screen and (min-width: 900px)': {
        paddingTop: '0 !important',
    },
})
