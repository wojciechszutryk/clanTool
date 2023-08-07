import { Tooltip } from '@mui/material';
import { memo } from 'react';
import { Instruction } from '../InstructionsTextContent/instruction.model';
import {
  StyledInstructionButton,
  StyledTooltipContent,
  StyledTooltipDescription,
  StyledTooltipTitle,
} from './styles';

const InstructionButton = ({ title, description, top, left }: Instruction): JSX.Element => {
  return (
    <Tooltip
      componentsProps={{
        popper: {
          sx: {
            background: 'transparent',
            '& div': {
              background: 'white',
            },
          },
        },
      }}
      title={
        <StyledTooltipContent>
          <StyledTooltipTitle>{title}</StyledTooltipTitle>
          <StyledTooltipDescription>{description}</StyledTooltipDescription>
        </StyledTooltipContent>
      }
    >
      <StyledInstructionButton top={top} left={left} />
    </Tooltip>
  );
};

export default memo(InstructionButton);
