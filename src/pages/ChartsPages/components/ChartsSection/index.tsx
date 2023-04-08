import { ChartsData } from 'models/data.model'
import { IDownloadProgress } from 'pages/ChartsPages/hooks/useGetChartsData/downloadProgress.model'
import { memo } from 'react'
import Charts from './Charts'
import ChartsLoaders from './ChartsLoaders'
import { StyledAlert } from './styles'

interface Props {
    error: string | undefined
    warning: string | undefined
    isLoading: boolean
    downloadPorgress: IDownloadProgress
    chartsData: ChartsData | undefined
}

/**
 * This component is responsible for displaying charts or loaders or error message
 */
const ChartsSection = ({
    error,
    warning,
    isLoading,
    downloadPorgress,
    chartsData,
}: Props): JSX.Element => {
    if (error) return <StyledAlert severity="error">{error}</StyledAlert>
    else if (isLoading)
        return <ChartsLoaders downloadPorgress={downloadPorgress} />
    else if (chartsData)
        return (
            <>
                {warning && (
                    <StyledAlert severity="warning">{warning}</StyledAlert>
                )}
                <Charts chartsData={chartsData} />
            </>
        )
    return <></>
}

export default memo(ChartsSection)
