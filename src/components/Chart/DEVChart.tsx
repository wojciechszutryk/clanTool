import {
    AxisTickStrategies,
    ColorPalettes,
    ColorRGBA,
    LegendBoxBuilders,
    lightningChart,
    NumericTickStrategy,
    SolidFill,
    SolidLine,
    Themes,
} from '@arction/lcjs'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'

const useStyles = makeStyles({
    wrapper: { display: 'flex', flexDirection: 'column' },
    chart: { height: '50vh' },
})

const DEVChart = ({
    data,
    id,
}: {
    data: {[key: string]: { x: number; y: number }[]}[]
    id: string
}) => {
    const zoomFix = useAppSelector((state) => state.app.zoomFix);
    const chartRef = useRef<any>(undefined)
    const classes = useStyles()

    useEffect(() => {
        const palette = ColorPalettes.arction(10)
        const colors = [6, 9, 0, 3, 11].map(palette)
        const axisYColors = [colors[0], colors[1], colors[2], colors[3], colors[4]]
        const axisYStyles = axisYColors.map((color) => new SolidFill({ color }))
        const seriesStrokeStyles = axisYStyles.map((fillStyle) => new SolidLine({ fillStyle, thickness: 2 }))
        const fittingRectangleStrokeStyle = new SolidLine({ fillStyle: new SolidFill({ color: ColorRGBA(255, 255, 255, 100) }), thickness: 2 })
        const zoomingRectangleFillStyle = new SolidFill({ color: colors[2].setA(100) })

        const chart = lightningChart()
            .ChartXY({
                container: id,
                theme: Themes.light,
                defaultAxisX: {
                    type: 'logarithmic',
                    base: 10,
                },
                defaultAxisY: {
                    type: 'logarithmic',
                    base: 10,
                }
            })
            .setTitle(id)
            .setPadding({ left: 8, right: 50, top: 8, bottom: 8 })
            .setAutoCursor((autoCursor) =>
                autoCursor.setResultTable((resultTable) =>
                    resultTable.setTextFillStyle(
                        new SolidFill({ color: ColorRGBA(0, 0, 0) })
                    )
                )
            )
            .setAnimationsEnabled(false)
            .setFittingRectangleStrokeStyle(fittingRectangleStrokeStyle)
            .setZoomingRectangleFillStyle(zoomingRectangleFillStyle)

        const axisY = chart.getDefaultAxisY()
        axisY.formatValue(0.0E+00);
        axisY.setTickStrategy(
            AxisTickStrategies.Numeric,
            ( tickStrategy: NumericTickStrategy ) => tickStrategy
                .setMinorFormattingFunction( ( value, range ) => {
                    return (value/zoomFix).toExponential(3).toString()
                })
                .setMajorTickStyle( ( tickStyle ) => tickStyle
                    .setLabelFont( ( font ) => font
                        .setWeight( 'bold' )
                    )
                )
                .setMajorFormattingFunction( ( value, range ) => {
                    return (value/zoomFix).toExponential(4).toString()
                })
        )
        axisY.setTickStrategy(AxisTickStrategies.Numeric, (numericTicks) => numericTicks)

        const series = data.map((dev, index) => {
            const devName = Object.keys(dev)[0];
            // const series = chart.addSplineSeries({
            const series = chart.addSplineSeries({
                xAxis: chart.getDefaultAxisX(),
                yAxis: axisY
            })
                    .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                        return builder
                            .addRow(
                                 'τ: ',
                                     xValue.toFixed(2).toString()
                            )
                            .addRow(devName + ': ', (yValue/zoomFix).toExponential(7).toString())
                    })
                .setName(devName)
                .setStrokeStyle(seriesStrokeStyles[index])
                .setPointFillStyle(() => seriesStrokeStyles[index].getFillStyle())
            series.add(Object.values(data[index])[0]);
            return series
        })

        const legend = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
            .setAutoDispose({
                type: 'max-width',
                maxWidth: 0.80,
            })

        legend.add(chart)

        // chart.getDefaultAxisX()
        //     .setChartInteractionFitByDrag(false)
        //     .setChartInteractionZoomByDrag(false)
        //     .setChartInteractionPanByDrag(false)
        //     .setChartInteractionZoomByWheel(false)

        chartRef.current = { chart, series }

        return () => {
            chart.dispose()
            chartRef.current = undefined
        }
    }, [data, id])

    function handleChartSave() {
        const filename =
            Object.keys(data.join('-'))
        chartRef.current.chart.saveToFile(filename)
    }

    return (
        <Box className={classes.wrapper}>
            <div id={id} className={classes.chart} />
            <Button onClick={handleChartSave}>Save chart to file</Button>
        </Box>
    )
}

export default DEVChart
