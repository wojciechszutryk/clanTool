import { styled, Tooltip } from '@mui/material';

export const StyledInstructionButton = styled('div', {
  shouldForwardProp: (prop) => prop !== 'top' && prop !== 'left',
})<{ top: number; left: number; stopAnimation?: boolean }>(
  ({ top, left, stopAnimation, theme }) => ({
    position: 'absolute',
    width: 10,
    height: 10,
    border: `4px solid transparent`,
    outline: `2px solid white`,
    outlineOffset: -3,
    top: `${top}%`,
    left: `${left}%`,
    'box-shadow': `0 0 0 0 #f0f0f0, 0 0 0 0 rgb(37, 55, 73, 0.4)`,
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    animation: stopAnimation ? 'none' : 'pulse 2s infinite cubic-bezier(0.66, 0.33, 0, 1)',

    '&:hover': {
      boxShadow: 'none',
    },

    '@keyframes pulse': {
      to: {
        'box-shadow': '0 0 0 5px transparent, 0 0 0 12px rgba(227, 115, 14, 0)',
      },
    },
  }),
);

export const StyledTooltipContent = styled('div')({
  padding: 10,
  margin: 0,
  maxWidth: 300,
  borderRadius: '5%',
});

export const StyledTooltipTitle = styled('h3')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 15,
  textAlign: 'center',
  marginBottom: 5,
}));

export const StyledTooltipDescription = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  fontSize: 13,
}));
