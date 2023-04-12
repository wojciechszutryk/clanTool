import 'react-toastify/dist/ReactToastify.css'
import instructionParameters from 'assets/images/instructions_Parameters.png'
import instructionChart from 'assets/images/instructions_Chart.png'
import {
    StyledHeader,
    StyledInstructionsWrapper,
    StyledSingleInstructionWrapper,
    StyledVideoWrapper,
} from './styles'
import { chartInstructions } from './InstructionsTextContent/chartInstructions'
import { formInstructions } from './InstructionsTextContent/formInstructions'
import InstructionButton from './InstructionButton'

/**
 * This component is responsible for rendering instructions page. It contains two sections: Charts parameters and Chart.
 */
const InstructionsPage = () => {
    return (
        <>
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
            <StyledHeader>Demo video</StyledHeader>
            <StyledVideoWrapper>
                <video controls>
                    <source
                        src="
https://user-images.githubusercontent.com/72247608/231422303-53cf99da-8ebb-4d7f-96c3-8a0d258329c5.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support HTML video.
                </video>
            </StyledVideoWrapper>
        </>
    )
}

export default InstructionsPage
