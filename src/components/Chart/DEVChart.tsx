import { memo, useEffect, useMemo, useRef } from 'react'
import { CSVLink } from 'react-csv'
import { ChartPoint, ChartsData } from 'models/data.model'
import {
    StyledChartActionsWrapper,
    StyledChartBox,
    StyledSaveToCSVButton,
    StyledSaveToImageButton,
    StyledWrapper,
} from './styles'
import useChartFileName from './hooks/useChartFileName'
import useSaveChartToImage from './hooks/useSaveChartToImage'
import useInitializeDEVChart from './hooks/useInitializeDEVChart'
import {
    ChartXY,
    PointMarker,
    UIBackground,
    PointLineSeries,
} from '@arction/lcjs'
import ClockNoises from 'components/ClockNoises'
import { useAppSelector } from 'hooks/useAppSelector'

const DEVChart = ({ data, id }: { data: ChartsData; id: string }) => {
    const zoomFix = useAppSelector((state) => state.app.zoomFix)
    const filename = useChartFileName({ id })
    const chartRef = useRef<
        | {
              chart: ChartXY<PointMarker, UIBackground>
              series: PointLineSeries[]
          }
        | undefined
    >(undefined)
    const handleChartSaveToImage = useSaveChartToImage({ filename, chartRef })

    console.log(data)

    useInitializeDEVChart(id, zoomFix, chartRef, data)

    const csvData = useMemo(() => {
        if (data.size === 0) return []
        const csvArray: (string | number)[][] = []
        const tauValues = data
            .entries()
            .next()
            .value.map((chartData: ChartPoint) => chartData.x)
        csvArray.push(['tau', ...tauValues])

        data.forEach((chartData, key) => {
            const devValues = chartData.map(
                (chartData) => chartData.y / zoomFix
            )
            csvArray.push([key, ...devValues])
        })

        return csvArray
    }, [data, zoomFix])

    return (
        <StyledWrapper>
            <StyledChartBox id={id} />
            <div id={id}></div>
            <ClockNoises data={data} />
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

export default memo(DEVChart)
