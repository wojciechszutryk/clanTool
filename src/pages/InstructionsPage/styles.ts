import { styled, Typography } from '@mui/material'

export const StyledInstructionsWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    '@media only screen and (min-width: 900px)': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export const StyledSingleInstructionWrapper = styled('div')({
    width: 'min-content',
    position: 'relative',
    margin: '0 auto',
    '& > img': {
        maxWidth: '95vw',
        height: 'auto',
    },
})

export const StyledHeader = styled(Typography)({
    fontSize: 30,
    color: '#25374A',
    textAlign: 'center',
})

export const StyledIntructionsButtonWrapper = styled('div')({
    position: 'relative',
})

// export const StyledInstructionImg = styled('img')({
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
// })
