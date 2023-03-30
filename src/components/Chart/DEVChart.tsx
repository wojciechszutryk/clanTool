import { memo, useMemo, useRef } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { CSVLink } from 'react-csv'
import { DEVsData } from 'models/data.model'
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

const DEVChart = ({ data, id }: { data: DEVsData; id: string }) => {
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

    useInitializeDEVChart(id, zoomFix, chartRef, data)

    const csvData = useMemo(() => {
        if (data.length === 0) return []
        const csvArray: (string | number)[][] = []
        const tauValues = Object.values(data[0])[0].map((xyData) => xyData.x)
        csvArray.push(['tau', ...tauValues])

        for (let i = 0; i < data.length; i++) {
            const devValues = Object.values(data[i])[0].map(
                (xyData) => xyData.y / zoomFix
            )
            csvArray.push([Object.keys(data[i])[0], ...devValues])
        }
        return csvArray
    }, [])

    return (
        <StyledWrapper>
            <StyledChartBox id={id} />
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
