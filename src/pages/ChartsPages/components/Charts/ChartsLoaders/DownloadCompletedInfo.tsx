import { memo } from 'react'
import { StyledDownloadedCompleted } from './styles'

const DownloadCompletedInfo = (): JSX.Element => {
    return (
        <StyledDownloadedCompleted>
            <p>{'Download completed. Calculating results. '}</p>
            <span>{' It might take a while on slow CPU'}</span>
        </StyledDownloadedCompleted>
    )
}

export default memo(DownloadCompletedInfo)
