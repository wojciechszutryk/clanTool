import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import { pages } from '..'
import { StyledLink, StyledNavLink } from './styles'

/**
 * This component is responsible for rendering desktop content of the header.
 */
const DesktopContent = (): JSX.Element => {
    const location = useLocation()
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    flexGrow: 1,
                    display: { xs: 'flex', md: 'none' },
                }}
            >
                LOGO
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'flex-end',
                }}
            >
                {pages.map((page) => (
                    <StyledNavLink key={page.name} to={page.url}>
                        <StyledLink
                            active={location.pathname.includes(page.url)}
                        >
                            {page.name}
                        </StyledLink>
                    </StyledNavLink>
                ))}
            </Box>
        </>
    )
}

export default memo(DesktopContent)
