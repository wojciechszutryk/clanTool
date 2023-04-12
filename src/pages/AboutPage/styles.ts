import { Grid, styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const StyledAboutPageWrapper = styled(Grid)(({ theme }) => ({
    padding: '20px 50px',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
        padding: '40px 120px',
    },
}))

export const StyledLogo = styled(Link)(({ theme }) => ({
    display: 'block',
    color: theme.palette.primary.main,
    textAlign: 'center',
    fontFamily: 'Roboto , Helvetica , Arial,sans-serif',
    fontSize: '1.5rem',
    textDecoration: 'none',
}))

export const StyledImageWrapper = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '& img': {
        maxWidth: '100%',
    },
})
