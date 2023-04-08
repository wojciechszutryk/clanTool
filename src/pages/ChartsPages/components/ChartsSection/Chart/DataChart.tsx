import { ChartXY, PointMarker, UIBackground, PointSeries } from '@arction/lcjs'
import { useAppSelector } from 'hooks/useAppSelector'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import { ChartData } from 'models/data.model'
import { useRef, useEffect, useMemo, memo } from 'react'
import { CSVLink } from 'react-csv'
import useChartFileName from './hooks/useChartFileName'
import useInitializeDataChart from './hooks/useInitializeDataChart'
import useSaveChartToImage from './hooks/useSaveChartToImage'
import {
    StyledChartActionsWrapper,
    StyledChartBox,
    StyledSaveToCSVButton,
    StyledSaveToImageButton,
    StyledWrapper,
} from './styles'

interface Props {
    data: ChartData
    id: string
    xType?: 'Date' | 'Tau'
}

/**
 * This component is responsible for rendering single 'data' (Frequency, Frequency or FrequencyDrift) chart.
 */
const DataChart = ({ data, id, xType = 'Tau' }: Props) => {
    const chartRef = useRef<
        | {
              chart: ChartXY<PointMarker, UIBackground>
              series: PointSeries
          }
        | undefined
    >(undefined)

    const filename = useChartFileName({ id })
    const handleChartSaveToImage = useSaveChartToImage({ filename, chartRef })

    useInitializeDataChart(id, chartRef, xType)

    useEffect(() => {
        const components = chartRef.current
        if (!components) return

        const { series } = components
        series.clear().add(data)
    }, [data])

    const csvData = useMemo(() => {
        if (data.length === 0) return []
        const csvArray: (string | number | Date)[][] = []
        csvArray.push(['Date', id])
        for (let i = 0; i < data.length; i++) {
            csvArray.push([
                new Date(data[i].x).toLocaleString(),
                data[i].y / CHART_ZOOM_FIX,
            ])
        }
        return csvArray
    }, [data, id])

    return (
        <StyledWrapper>
            <StyledChartBox id={id} />
            <StyledChartActionsWrapper>
                <StyledSaveToImageButton
                    variant={'outlined'}
                    onClick={handleChartSaveToImage}
                >
                    Save chart to .png file
                </StyledSaveToImageButton>
                <StyledSaveToCSVButton variant={'outlined'}>
                    <CSVLink
                        data={csvData}
                        filename={filename + '.csv'}
                        target="_blank"
                    >
                        Save chart to .CSV file
                    </CSVLink>
                </StyledSaveToCSVButton>
            </StyledChartActionsWrapper>
        </StyledWrapper>
    )
}

export default memo(DataChart)
