import { memo } from 'react'
import { Box } from '@mui/material'
import { ChartsData } from 'models/data.model'
import DEVChart from 'pages/ChartsPages/components/Charts/Chart/DEVChart'
import { createDEVChartDataMap } from 'hooks/useGetChartsData/createDEVChartDataMap.helper'
import { StyledChartWrapper } from './styles'
import DataChart from 'pages/ChartsPages/components/Charts/Chart/DataChart'

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
        <Box>
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
        </Box>
    )
}

export default memo(Charts)