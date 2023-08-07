import { memo } from 'react';
import {
  StyledLoaderHeader,
  StyledLoaderWrapper,
  StyledResourceName,
  StyledSingleLoaderWrapper,
} from './styles';
import LinearProgressLoader from './LinearProgressLoader';
import { IDownloadProgress } from 'pages/ChartsPages/hooks/useGetChartsData/downloadProgress.model';
import DownloadCompletedInfo from './DownloadCompletedInfo';

interface Props {
  downloadPorgress: IDownloadProgress;
}

/**
 * This component is responsible for displaying loaders (while fetching or calculating) for charts data
 */
const ChartsLoaders = ({ downloadPorgress }: Props): JSX.Element => {
  return (
    <StyledLoaderWrapper>
      <StyledLoaderHeader>Loading required data:</StyledLoaderHeader>
      {downloadPorgress &&
        Object.entries(downloadPorgress).map(([resourceName, progress]) => (
          <StyledSingleLoaderWrapper key={resourceName}>
            <StyledResourceName>{resourceName}</StyledResourceName>
            {progress.completed ? (
              <DownloadCompletedInfo />
            ) : (
              <LinearProgressLoader
                value={Math.floor((progress.downloaded / progress.total) * 100)}
                resourceName={resourceName}
              />
            )}
          </StyledSingleLoaderWrapper>
        ))}
    </StyledLoaderWrapper>
  );
};

export default memo(ChartsLoaders);
