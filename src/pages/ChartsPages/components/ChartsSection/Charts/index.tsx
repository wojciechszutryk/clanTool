import { memo } from 'react'
import { Box } from '@mui/material'
import { ChartsData } from 'models/data.model'
import DEVChart from 'pages/ChartsPages/components/ChartsSection/Chart/DEVChart'
import { createDEVChartDataMap } from 'pages/ChartsPages/hooks/useGetChartsData/createDEVChartDataMap.helper'
import { StyledChartWrapper } from './styles'
import DataChart from 'pages/ChartsPages/components/ChartsSection/Chart/DataChart'

interface Props {
    chartsData: ChartsData
}

const Charts = ({ chartsData }: Props) => {
    const devChartsData = createDEVChartDataMap(chartsData)

    const dataChartsKeys = Array.from(chartsData.keys()).filter(
        (key) => !key.includes('DEV')
    )
    const devChartsKeys = Array.from(devChartsData.keys())

    return (
        <div>
            {devChartsKeys.length > 0 && (
                <StyledChartWrapper>
                    <DEVChart
                        data={devChartsData}
                        id={devChartsKeys.join(' ')}
                    />
                </StyledChartWrapper>
            )}
            {dataChartsKeys.map((key) => {
                const data = chartsData.get(key)
                return (
                    <StyledChartWrapper key={key}>
                        <DataChart data={data!} id={key} xType={'Date'} />
                    </StyledChartWrapper>
                )
            })}
        </div>
    )
}

export default memo(Charts)
