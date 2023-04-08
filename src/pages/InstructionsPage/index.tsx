import { Grid } from '@mui/material'
import instructionParameters from 'assets/images/instructions_Parameters.png'
import instructionChart from 'assets/images/instructions_Chart.png'
import 'react-toastify/dist/ReactToastify.css'
import {
    StyledHeader,
    StyledList,
    StyledListItem,
    StyledListNumber,
    StyledListWrapper,
    StyledSingleInstructionWrapper,
} from './styles'

/**
 * This component is responsible for rendering instructions page. It contains two sections: Charts parameters and Chart.
 */
const InstructionsPage = () => {
    return (
        <Grid container spacing={{ md: 3 }}>
            <StyledSingleInstructionWrapper item>
                <img
                    src={instructionParameters}
                    alt="instructions_Parameters"
                />
                <StyledListWrapper>
                    <StyledHeader variant={'h2'}>
                        Charts parameters
                    </StyledHeader>
                    <StyledList>
                        {[
                            'wybór satelit/stacji',
                            'wybór dat - zakres',
                            'wybór typu tau',
                            'wybór typu mad',
                            'wybór typów wykresów - opis każdego',
                        ].map((text, index) => (
                            <StyledListItem>
                                <StyledListNumber>{index}</StyledListNumber>-{' '}
                                {text} ....
                            </StyledListItem>
                        ))}
                    </StyledList>
                </StyledListWrapper>
            </StyledSingleInstructionWrapper>
            <StyledSingleInstructionWrapper item>
                <StyledListWrapper>
                    <StyledHeader variant={'h2'}>Chart</StyledHeader>
                    <StyledList>
                        {[
                            'tytuł',
                            'legenda',
                            'przybliżanie oddalanie',
                            'przewijanie',
                            'osie',
                            'szumy',
                            'zapis png',
                            'zapis csv',
                        ].map((text, index) => (
                            <StyledListItem>
                                <StyledListNumber>{index}</StyledListNumber>-{' '}
                                {text} ....
                            </StyledListItem>
                        ))}
                    </StyledList>
                </StyledListWrapper>
                <img src={instructionChart} alt="instructions_Chart" />
            </StyledSingleInstructionWrapper>
        </Grid>
    )
}

export default InstructionsPage
