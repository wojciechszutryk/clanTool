import { Button, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledDesktopLogo = styled(Typography)({ textDecoration: 'none' });

export const StyledNavLink = styled(NavLink)({ textDecoration: 'none' });

export const StyledLink = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  display: 'block',
  marginTop: 10,
  marginBottom: 10,
  color: 'white',
  backgroundColor: active ? '#f4f6f76e !important' : '#25374a !important',
  '& a': {
    color: '#ebf7fd !important',
  },
}));
