import {
    AxisTickStrategies,
    ColorRGBA,
    lightningChart,
    SolidFill,
    Themes,
} from '@arction/lcjs'
import { Button } from '@mui/material'
import React, { useRef, useEffect } from 'react'

const DataChart = ({ data, id }: { data: any; id: string }) => {
    const chartRef = useRef<any>(undefined)

    useEffect(() => {
        console.log('create chart')
        const chart = lightningChart()
            .ChartXY({
                container: id,
                theme: Themes.light,
            })
            .setTitle('Phase')
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
        chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime)
        const series = chart
            .addLineSeries()
            .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                return builder
                    .addRow('Date:', '', new Date(xValue).toLocaleString())
                    .addRow('Phase:', undefined, yValue.toString())
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
    }, [id])

    useEffect(() => {
        const components = chartRef.current
        if (!components) return

        const { series } = components
        console.log('set chart data', data)
        series.clear().add(data)
    }, [data, chartRef])

    function handleChartSave() {
        chartRef.current.chart.saveToFile('chart')
    }

    return (
        <>
            <div id={id} className="chart" />
            <Button onClick={handleChartSave}>Save chart to file</Button>
        </>
    )
}

export default DataChart
