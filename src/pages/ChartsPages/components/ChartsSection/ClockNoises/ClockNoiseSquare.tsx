import { Tooltip } from '@mui/material';
import { memo } from 'react';
import {
  StyledLessThanMinusOneSquare,
  StyledBetweenMinusOneAndZeroSquare,
  StyledBetweenZeroAndOneSquare,
  StyledMoreThanOneSquare,
} from './styles';

interface Props {
  rageStart: number;
  rageEnd: number;
  aParameter: number;
  xyValueArrayLengthMinusOne: number;
  index: number;
}

const ClockNoiseSquare = ({
  rageStart,
  rageEnd,
  aParameter,
  index,
  xyValueArrayLengthMinusOne,
}: Props): JSX.Element => {
  let renderSquare = null;
  if (aParameter < -1)
    renderSquare = <StyledLessThanMinusOneSquare widthPercentage={xyValueArrayLengthMinusOne} />;
  else if (aParameter > -1 && aParameter < 0)
    renderSquare = (
      <StyledBetweenMinusOneAndZeroSquare widthPercentage={xyValueArrayLengthMinusOne} />
    );
  else if (aParameter > -1 && aParameter < 0)
    renderSquare = <StyledBetweenZeroAndOneSquare widthPercentage={xyValueArrayLengthMinusOne} />;
  else renderSquare = <StyledMoreThanOneSquare widthPercentage={xyValueArrayLengthMinusOne} />;

  return (
    <Tooltip
      key={index}
      title={`
        range: ${rageStart} - ${rageEnd}
        value: ${aParameter}
    `}
      placement='top-start'
    >
      {renderSquare}
    </Tooltip>
  );
};

export default memo(ClockNoiseSquare);
