import { styled, Typography } from '@mui/material'

export const StyledLoaderWrapper = styled('div')({
    display: 'flex',
    height: '50vh',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
})

export const StyledSingleLoaderWrapper = styled('div')({
    width: '100%',
})

export const StyledLoaderContentWrapper = styled('div')({
    height: '100px',
})

export const StyledLoaderHeader = styled(Typography)({
    marginBottom: 30,
    fontSize: 20,
    color: '#25374a',
})

export const StyledDownloadedCompleted = styled('div')({
    width: '100%',
    height: 30,
    lineHeight: 1.2,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    textAlign: 'center',
    '& *': {
        display: 'block',
    },
    '& span': {
        fontStyle: 'italic',
    },
})

export const StyledProgressContentWrapper = styled('div')({
    width: '90%',
    height: 30,
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
})

export const StyledLinearProgressBarWrapper = styled('div')({
    flexGrow: 1,
    marginRight: 10,
})

export const StyledResourceName = styled(Typography)({
    marginTop: 10,
    textAlign: 'center',
})
