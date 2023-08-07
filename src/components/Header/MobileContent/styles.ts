import styled from '@emotion/styled';
import { Drawer, ListItem } from '@mui/material';

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active, theme }) => ({
  backgroundColor: active ? '#25374a !important' : 'inherit',
  '& > a, & p': {
    width: '100%',
    color: active ? '#ebf7fd !important' : 'inherit',
    textAlign: 'left',
    textDecoration: 'none',
  },
}));

export const StyledDrawer = styled(Drawer)({
  '& > .MuiDrawer-paper': {
    backgroundColor: '#ebf7fd !important',
    width: '40vw',
  },
});
