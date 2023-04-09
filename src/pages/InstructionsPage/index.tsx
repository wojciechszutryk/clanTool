import { Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import instructionParameters from 'assets/images/instructions_Parameters.png'
import instructionChart from 'assets/images/instructions_Chart.png'
import {
    StyledHeader,
    StyledInstructionsWrapper,
    StyledSingleInstructionWrapper,
} from './styles'
import { chartInstructions } from './InstructionsTextContent/chartInstructions'
import { formInstructions } from './InstructionsTextContent/formInstructions'
import InstructionButton from './InstructionButton'

/**
 * This component is responsible for rendering instructions page. It contains two sections: Charts parameters and Chart.
 */
const InstructionsPage = () => {
    return (
        <StyledInstructionsWrapper>
            <div>
                <StyledHeader variant={'h2'}>
                    Charts Form & Parameters
                </StyledHeader>
                <StyledSingleInstructionWrapper>
                    <img
                        src={instructionParameters}
                        alt="instructions_Parameters"
                    />
                    {formInstructions.map((instruction) => (
                        <InstructionButton {...instruction} />
                    ))}
                </StyledSingleInstructionWrapper>
            </div>
            <div>
                <StyledHeader variant={'h2'}>
                    Charts Form & Parameters
                </StyledHeader>
                <StyledSingleInstructionWrapper>
                    <img src={instructionChart} alt="instructions_Chart" />
                    {chartInstructions.map((instruction) => (
                        <InstructionButton {...instruction} />
                    ))}
                </StyledSingleInstructionWrapper>
            </div>
        </StyledInstructionsWrapper>
    )
}

export default InstructionsPage
