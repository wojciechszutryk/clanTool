import {
    AxisTickStrategies,
    ColorRGBA,
    lightningChart,
    SolidFill,
    Themes,
} from '@arction/lcjs'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useRef, useEffect } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'

const useStyles = makeStyles({
    wrapper: { display: 'flex', flexDirection: 'column' },
    chart: { height: '50vh' },
})

const DataChart = ({
    data,
    id,
    xType = 'Tau',
}: {
    data: any
    id: string
    xType?: 'Date' | 'Tau'
}) => {
    const chartRef = useRef<any>(undefined)
    const classes = useStyles()
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)

    useEffect(() => {
        const chart = lightningChart()
            .ChartXY({
                container: id,
                theme: Themes.light,
            })
            .setTitle(id)
            // .setTitleFillStyle(
            //     new SolidFill({
            //         color: ColorRGBA(255, 255, 255),
            //     })
            // )
            // .setBackgroundFillStyle(
            //     new SolidFill({ color: ColorRGBA(255, 255, 255) })
            // )
            // .setSeriesBackgroundFillStyle(
            //     new SolidFill({ color: ColorRGBA(255, 255, 255) })
            // )
            // .setBackgroundStrokeStyle(
            //     new SolidLine({
            //         thickness: 2,
            //         fillStyle: new SolidFill({ color: ColorRGBA(0, 255, 0) }),
            //     })
            // )
            // .setTitleFillStyle(
            //     new SolidFill({
            //         color: ColorRGBA(0, 0, 0),
            //     })
            // )
            .setPadding({ left: 8, right: 50, top: 8, bottom: 8 })
            .setAutoCursor((autoCursor) =>
                autoCursor.setResultTable((resultTable) =>
                    resultTable.setTextFillStyle(
                        new SolidFill({ color: ColorRGBA(0, 0, 0) })
                    )
                )
            )

        if (xType === 'Date')
            chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime)

        const series = chart
            .addLineSeries()
            .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                return builder
                    .addRow(
                        xType === 'Date' ? xType + ': ' : 'τ: ',
                        xType === 'Date'
                            ? new Date(xValue).toLocaleString()
                            : xValue.toFixed().toString()
                    )
                    .addRow(id + ': ', yValue.toString())
            })
        //     .setStrokeStyle(
        //     new SolidLine({
        //         thickness: 1,
        //         fillStyle: new SolidFill({
        //             color: ColorRGBA(255, 0, 0),
        //         }),
        //     })
        // )
        chartRef.current = { chart, series }

        return () => {
            chart.dispose()
            chartRef.current = undefined
        }
    }, [id, xType])

    useEffect(() => {
        const components = chartRef.current
        if (!components) return

        const { series } = components
        series.clear().add(data)
    }, [data, chartRef])

    function handleChartSave() {
        const filename =
            id +
            '-' +
            new Date(startDate).toJSON().slice(0, 10).replaceAll('-', '.') +
            '-' +
            new Date(endDate).toJSON().slice(0, 10).replaceAll('-', '.')
        chartRef.current.chart.saveToFile(filename)
    }

    return (
        <Box className={classes.wrapper}>
            <div id={id} className={classes.chart} />
            <Button onClick={handleChartSave}>Save chart to file</Button>
        </Box>
    )
}

export default DataChart
