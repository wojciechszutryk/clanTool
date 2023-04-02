import { memo, useMemo } from 'react'
import { Box } from '@mui/material'
import { ChartsData } from 'models/data.model'
import { useAppSelector } from 'hooks/useAppSelector'
import DEVChart from 'components/Chart/DEVChart'
import { createDEVChartDataMap } from 'hooks/useFetchPhasesData/createDEVChartDataMap.helper'
import { StyledChartWrapper } from './styles'
import DataChart from 'components/Chart/DataChart'

interface Props {
    chartsData: ChartsData
}

const SatellitesCharts = ({ chartsData }: Props) => {
    const devChartsData = createDEVChartDataMap(chartsData)
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const DEVs = useMemo(
        () =>
            chartsToShow.filter((chart) => {
                return chart.includes('DEV')
            }),
        [chartsToShow]
    )
    const dataChartsKeys = Array.from(chartsData.keys()).filter(
        (key) => !key.includes('DEV')
    )

    return (
        <Box>
            {DEVs.length > 0 && (
                <StyledChartWrapper>
                    <DEVChart data={devChartsData} id={DEVs.join('-')} />
                </StyledChartWrapper>
            )}
            {dataChartsKeys.map((key) => {
                const data = chartsData.get(key)
                return (
                    <StyledChartWrapper>
                        <DataChart data={data!} id={key} xType={'Date'} />
                    </StyledChartWrapper>
                )
            })}
        </Box>
    )
}

export default memo(SatellitesCharts)
