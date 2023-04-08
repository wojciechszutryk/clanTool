import { memo } from 'react'
import { StyledDownloadedCompleted } from './styles'

/**
 * This component is used to show the user that the download is completed and the results are being calculated
 */
const DownloadCompletedInfo = (): JSX.Element => {
    return (
        <StyledDownloadedCompleted>
            <p>{'Download completed. Calculating results. '}</p>
            <span>{' It might take a while on slow CPU'}</span>
        </StyledDownloadedCompleted>
    )
}

export default memo(DownloadCompletedInfo)
