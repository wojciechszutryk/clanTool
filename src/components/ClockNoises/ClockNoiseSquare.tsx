import { Tooltip } from '@mui/material'
import { memo } from 'react'
import {
    LessThanMinusOneSquare,
    BetweenMinusOneAndZeroSquare,
    BetweenZeroAndOneSquare,
    MoreThanOneSquare,
} from './styles'

interface Props {
    rageStart: number
    rageEnd: number
    aParameter: number
    xyValueArrayLengthMinusOne: number
    index: number
}

const ClockNoiseSquare = ({
    rageStart,
    rageEnd,
    aParameter,
    index,
    xyValueArrayLengthMinusOne,
}: Props): JSX.Element => {
    let renderSquare = null
    if (aParameter < -1)
        renderSquare = (
            <LessThanMinusOneSquare
                widthPercentage={xyValueArrayLengthMinusOne}
            />
        )
    else if (aParameter > -1 && aParameter < 0)
        renderSquare = (
            <BetweenMinusOneAndZeroSquare
                widthPercentage={xyValueArrayLengthMinusOne}
            />
        )
    else if (aParameter > -1 && aParameter < 0)
        renderSquare = (
            <BetweenZeroAndOneSquare
                widthPercentage={xyValueArrayLengthMinusOne}
            />
        )
    else
        renderSquare = (
            <MoreThanOneSquare widthPercentage={xyValueArrayLengthMinusOne} />
        )

    return (
        <Tooltip
            key={index}
            title={`
        range: ${rageStart} - ${rageEnd}
        value: ${aParameter}
    `}
            placement="top-start"
        >
            {renderSquare}
        </Tooltip>
    )
}

export default memo(ClockNoiseSquare)
