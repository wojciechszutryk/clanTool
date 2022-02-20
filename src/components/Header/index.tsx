import {
  AppBar,
  Box,
  Button,
  Container, Drawer,
  IconButton, List, ListItem,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useStyles } from './styles'

const pages = [
  { url: 'satellites', name: 'Satellites' },
  { url: 'stations', name: 'Stations' },
  { url: 'instructions', name: 'Instructions' },
  { url: 'about', name: 'About' },
];

export const Header = (): JSX.Element => {
  let location = useLocation();
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
      <AppBar classes={{ root: classes.navBar }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              CLAN TOOL
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              <Drawer
                  id="menu-appbar"
                  classes={{paper: classes.drawer}}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
              >
                <List>
                {pages.map((page) => (
                    <ListItem button key={page.name} onClick={handleCloseNavMenu} className={location.pathname.includes(page.url) ? classes.drawerLinkActive : classes.drawerLink}>
                      <NavLink to={page.url}   className={({ isActive }) =>
                          isActive ? 'bg-green-500 font-bold' : 'bg-red-500 font-thin'
                      }>
                        <Typography textAlign="center" >{page.name}</Typography>
                      </NavLink>
                    </ListItem>
                ))}
                </List>
              </Drawer>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                  <NavLink
                      key={page.name}
                      to={page.url}
                      style={{textDecoration: 'none'}}
                  >
                    <Button
                        className={location.pathname.includes(page.url) ? classes.linkActive : classes.link}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}

