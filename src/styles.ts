import { Container } from '@mui/material'
import { styled } from '@mui/styles'

export const StyledAppWrapper = styled('div')({
    backgroundColor: '#ebf7fd',
    minHeight: '100vh',
})

export const StyledAppContent = styled(Container)({
    marginTop: '56px',
    maxWidth: '1600px',
    padding: '50px 0',
})
