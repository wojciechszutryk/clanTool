import { Typography, Box, IconButton, List } from '@mui/material'
import { memo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { pages } from '..'
import MenuIcon from '@mui/icons-material/Menu'
import { StyledDrawer } from './styles'
import { StyledListItem } from './styles'

const MobileContent = (): JSX.Element => {
    let location = useLocation()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                CLAN TOOL
            </Typography>

            <Box
                sx={{
                    flexGrow: 1,
                    display: { xs: 'flex', md: 'none' },
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <StyledDrawer
                    id="menu-appbar"
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    <List>
                        {pages.map((page) => (
                            <StyledListItem
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                active={location.pathname.includes(page.url)}
                            >
                                <NavLink
                                    to={page.url}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-green-500 font-bold'
                                            : 'bg-red-500 font-thin'
                                    }
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </NavLink>
                            </StyledListItem>
                        ))}
                    </List>
                </StyledDrawer>
            </Box>
        </>
    )
}

export default memo(MobileContent)
