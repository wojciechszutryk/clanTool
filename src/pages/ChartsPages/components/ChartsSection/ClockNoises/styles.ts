import { styled } from '@mui/system';

export enum SquaresColors {
  'LessThanMinusOne' = '#25374a',
  'LessThanMinusOneHover' = '#3b5878',
  'BetweenMinusOneAndZero' = '#3b5878',
  'BetweenMinusOneAndZeroHover' = '#4b77a6',
  'BetweenZeroAndOne' = '#4b77a6',
  'BetweenZeroAndOneHover' = '#91bceb',
  'MoreThanOne' = '#91bceb',
  'MoreThanOneHover' = '#a4cefc',
  'Border' = '#667586',
}

export const StyledTitle = styled('h2')({
  margin: '10px 0',
  flexBasis: '100%',
  textAlign: 'center',
  fontFamily: 'arial, sans-serif',
});

export const StyledClockNoisesWrapper = styled('div')({
  margin: '10px 20px 5px 10px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export const StyledRowHeader = styled('span')({
  marginRight: 10,
  lineHeight: '5vh',
  textAlign: 'center',
  fontFamily: 'monospace, sans-serif',
  whiteSpace: 'nowrap',
  fontWeight: 300,
});

export const StyledSingleRow = styled('div')({
  flexBasis: '100%',
  flexGrow: 1,
  display: 'flex',
  '& > div': {
    flexGrow: 1,
  },
});

export const StyledLessThanMinusOneSquare = styled('div')<{
  widthPercentage: number;
}>(({ widthPercentage }) => ({
  width: `${widthPercentage}%`,
  height: '5vh',
  backgroundColor: SquaresColors.LessThanMinusOne,
  border: `1px solid ${SquaresColors.Border}`,
  '&:hover': {
    backgroundColor: SquaresColors.LessThanMinusOneHover,
  },
}));

export const StyledBetweenMinusOneAndZeroSquare = styled('div')<{
  widthPercentage: number;
}>(({ widthPercentage }) => ({
  width: `${widthPercentage}%`,
  height: '5vh',
  backgroundColor: SquaresColors.BetweenMinusOneAndZero,
  border: `1px solid ${SquaresColors.Border}`,
  '&:hover': {
    backgroundColor: SquaresColors.BetweenMinusOneAndZeroHover,
  },
}));

export const StyledBetweenZeroAndOneSquare = styled('div')<{
  widthPercentage: number;
}>(({ widthPercentage }) => ({
  width: `${widthPercentage}%`,
  height: '5vh',
  backgroundColor: SquaresColors.BetweenZeroAndOne,
  border: `1px solid ${SquaresColors.Border}`,
  '&:hover': {
    backgroundColor: SquaresColors.BetweenZeroAndOneHover,
  },
}));

export const StyledMoreThanOneSquare = styled('div')<{
  widthPercentage: number;
}>(({ widthPercentage }) => ({
  width: `${widthPercentage}%`,
  height: '5vh',
  backgroundColor: SquaresColors.MoreThanOne,
  border: `1px solid ${SquaresColors.Border}`,
  '&:hover': {
    backgroundColor: SquaresColors.MoreThanOneHover,
  },
}));
