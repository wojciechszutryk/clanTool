import { Button, styled, Typography } from '@mui/material';

export const StyledFormHeader = styled(Typography)({
  fontSize: 30,
  color: '#25374a',
});

export const StyledSatellitesFormSubmitButton = styled(Button)({
  backgroundColor: '#25374a',
  width: 300,
  '&:hover': { backgroundColor: '#7E8995' },
});
