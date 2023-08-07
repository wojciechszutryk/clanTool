import { Box, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledWrapper = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 99,
  height: 300,
  width: '100%',
  backgroundColor: '#25374a !important',
  boxShadow:
    '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
  '@media only screen and (min-width: 1200px)': {
    height: 200,
  },
});

export const StyledLogo = styled(Box)({
  width: '100%',
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `1px solid #ebf7fd`,
});

export const StyledLogoLink = styled(NavLink)({
  color: '#ebf7fd !important',
  textDecoration: 'none !important',
  fontSize: '1.25rem',
  fontFamily: 'Roboto , Helvetica , Arial , sans-serif',
  fontWeight: 500,
});

export const StyledLinks = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  gap: 24,
  '@media only screen and (min-width: 1200px)': {
    flexDirection: 'row',
  },
});

export const StyledLink = styled('a')({
  color: '#ebf7fd !important',
  textDecoration: 'none !important',
});

export const StyledBottomSection = styled(Box)({
  height: 45,
  lineHeight: '45px',
  width: '100%',
  textAlign: 'center',
  '& p': {
    marginTop: 0,
    marginBottom: 0,
    color: 'white',
  },
});
