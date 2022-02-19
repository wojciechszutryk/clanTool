import { styled } from '@mui/system'

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

export const Title = styled('h2')({
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'arial, sans-serif',
})

export const Header = styled('p')({
    marginRight: 10,
    lineHeight: '5vh',
    textAlign: 'center',
    fontFamily: 'monospace, sans-serif',
    whiteSpace: 'nowrap',
    fontWeight: 300,
})

export const Wrapper = styled('div')({
    margin: '10px 20px 5px 10px',
    display: 'flex',
    '& > div': {
        flexGrow: 1,
    },
})

export const LessThanMinusOneSquare = styled('div')<{
    widthPercentage: number
}>(({ widthPercentage }) => ({
    width: `${widthPercentage}%`,
    height: '5vh',
    backgroundColor: SquaresColors.LessThanMinusOne,
    border: `1px solid ${SquaresColors.Border}`,
    '&:hvover': {
        backgroundColor: SquaresColors.LessThanMinusOneHover,
    },
}))

export const BetweenMinusOneAndZeroSquare = styled('div')<{
    widthPercentage: number
}>(({ widthPercentage }) => ({
    width: `${widthPercentage}%`,
    height: '5vh',
    backgroundColor: SquaresColors.BetweenMinusOneAndZero,
    border: `1px solid ${SquaresColors.Border}`,
    '&:hvover': {
        backgroundColor: SquaresColors.BetweenMinusOneAndZeroHover,
    },
}))

export const BetweenZeroAndOneSquare = styled('div')<{
    widthPercentage: number
}>(({ widthPercentage }) => ({
    width: `${widthPercentage}%`,
    height: '5vh',
    backgroundColor: SquaresColors.BetweenZeroAndOne,
    border: `1px solid ${SquaresColors.Border}`,
    '&:hvover': {
        backgroundColor: SquaresColors.BetweenZeroAndOneHover,
    },
}))

export const MoreThanOneSquare = styled('div')<{
    widthPercentage: number
}>(({ widthPercentage }) => ({
    width: `${widthPercentage}%`,
    height: '5vh',
    backgroundColor: SquaresColors.MoreThanOne,
    border: `1px solid ${SquaresColors.Border}`,
    '&:hvover': {
        backgroundColor: SquaresColors.MoreThanOneHover,
    },
}))
