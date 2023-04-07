import { memo } from 'react'
import {
    StyledLoaderHeader,
    StyledLoaderWrapper,
    StyledResourceName,
} from './styles'
import LinearProgressLoader from './LinearProgressLoader'
import { IDownloadProgress } from 'pages/ChartsPages/hooks/useGetChartsData/downloadProgress.model'
import DownloadCompletedInfo from './DownloadCompletedInfo'

interface Props {
    downloadPorgress: IDownloadProgress
}

const ChartsLoaders = ({ downloadPorgress }: Props): JSX.Element => {
    return (
        <StyledLoaderWrapper>
            <StyledLoaderHeader>Loading required data:</StyledLoaderHeader>
            {downloadPorgress &&
                Object.entries(downloadPorgress).map(
                    ([resourceName, progress]) => (
                        <div key={resourceName}>
                            <StyledResourceName>
                                {resourceName}
                            </StyledResourceName>
                            {progress.completed ? (
                                <DownloadCompletedInfo />
                            ) : (
                                <LinearProgressLoader
                                    value={Math.floor(
                                        (progress.downloaded / progress.total) *
                                            100
                                    )}
                                    resourceName={resourceName}
                                />
                            )}
                        </div>
                    )
                )}
        </StyledLoaderWrapper>
    )
}

export default memo(ChartsLoaders)
