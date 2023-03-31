import { Box, Grid, styled, Typography } from '@mui/material'

export const StyledSingleInstructionWrapper = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '@media only screen and (min-width: 900px)': {
        display: 'flex',
        flexDirection: 'row',
    },
})
export const StyledListWrapper = styled(Box)({ flexGrow: 1 })

export const StyledHeader = styled(Typography)({
    fontSize: 30,
    color: '#25374A',
    textAlign: 'center',
})

export const StyledList = styled('ul')({
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
})

export const StyledListItem = styled('li')({
    marginTop: ' 10px !important',
    textAlign: 'center',
})

export const StyledListNumber = styled('span')({
    color: '#25374a',
})
