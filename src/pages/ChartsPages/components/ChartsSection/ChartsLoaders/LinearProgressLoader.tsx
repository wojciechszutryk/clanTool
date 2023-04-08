import { LinearProgress } from '@mui/material'
import { memo } from 'react'
import {
    StyledProgressContentWrapper,
    StyledLinearProgressBarWrapper,
} from './styles'

interface Props {
    value: number
    resourceName: string
}

/**
 * This component is responsible for displaying progress bar of fetched data with percentage value
 */
const LinearProgressBar = ({ value, resourceName }: Props): JSX.Element => {
    return (
        <StyledProgressContentWrapper key={resourceName}>
            <StyledLinearProgressBarWrapper>
                <LinearProgress variant="determinate" value={value} />
            </StyledLinearProgressBarWrapper>
            <p>{value} %</p>
        </StyledProgressContentWrapper>
    )
}

export default memo(LinearProgressBar)
