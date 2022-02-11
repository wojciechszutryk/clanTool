import { Box, Container, Grid } from '@mui/material'
import React from 'react';
import { NavLink } from 'react-router-dom';

import { useStyles } from './styles';

export const Footer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.logo}>
        <NavLink to="/" className={classes.logoLink}>
          CLAN TOOL
        </NavLink>
      </Box>
      <Box className={classes.links}>
          <a className={classes.link} href="https://www.google.pl/">Akademia Górniczo-Hutnicza im. Stanisława Staszica w Krakowie</a>
          <a className={classes.link} href="https://geod.agh.edu.pl/index.php?lang=pl">Wydział Geodezji Górniczej i Inżynierii Środowiska</a>
          <a className={classes.link} href="https://home.agh.edu.pl/~zgk/">Katedra Geodezji Zintegrowanej i Kartografii</a>
      </Box>
      <Box className={classes.bottomSection}>
        <p>Designed by - <a className={classes.link} href="https://www.google.pl/">Wojciech Szutryk</a></p>
      </Box>
    </Box>
  );
};
