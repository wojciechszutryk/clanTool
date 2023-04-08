import {
    lightningChart,
    Themes,
    SolidFill,
    ColorRGBA,
    AxisTickStrategies,
    NumericTickStrategy,
    ColorPalettes,
    SolidLine,
    ChartXY,
    PointLineSeries,
    PointMarker,
    UIBackground,
} from '@arction/lcjs'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import { ChartsData } from 'models/data.model'
import { useEffect } from 'react'

const TAU_VALUE = 300 //current tau value, set to multiply x axis values | to be changed when data sets changes

/**
 * This hook initializes the chart and series for the DEV chart. It does all configuration for lightningCharts library and sets the data.
 */
const useInitializeDEVChart = (
    id: string,
    chartRef: React.MutableRefObject<
        | {
              chart: ChartXY<PointMarker, UIBackground>
              series: PointLineSeries[]
          }
        | undefined
    >,
    data: ChartsData
) => {
    useEffect(() => {
        const palette = ColorPalettes.arction(10)
        const colors = [
            7, 24, 14, 19, 4, 9, 17, 18, 3, 22, 25, 5, 12, 16, 11, 10, 21, 23,
            15, 13, 1, 8, 6, 2, 20,
        ].map(palette)
        const axisYColors = colors.map((_, index) => colors[index])
        const axisYStyles = axisYColors.map((color) => new SolidFill({ color }))
        const seriesStrokeStyles = axisYStyles.map(
            (fillStyle) => new SolidLine({ fillStyle, thickness: 2 })
        )
        const fittingRectangleStrokeStyle = new SolidLine({
            fillStyle: new SolidFill({ color: ColorRGBA(255, 255, 255, 100) }),
            thickness: 2,
        })
        const zoomingRectangleFillStyle = new SolidFill({
            color: colors[2].setA(100),
        })

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
                },
            })
            .setTitle(id)
            .setPadding({ left: 10, right: 10, top: 8, bottom: 8 })
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
        axisY.formatValue(0.0)
        axisY.setTickStrategy(
            AxisTickStrategies.Numeric,
            (tickStrategy: NumericTickStrategy) =>
                tickStrategy
                    .setMinorFormattingFunction((value, range) => {
                        return (value / CHART_ZOOM_FIX)
                            .toExponential(3)
                            .toString()
                    })
                    .setMajorTickStyle((tickStyle) =>
                        tickStyle.setLabelFont((font) => font.setWeight('bold'))
                    )
                    .setMajorFormattingFunction((value, range) => {
                        return (value / CHART_ZOOM_FIX)
                            .toExponential(4)
                            .toString()
                    })
        )
        axisY.setTickStrategy(
            AxisTickStrategies.Numeric,
            (numericTicks) => numericTicks
        )

        const axisX = chart.getDefaultAxisX()
        axisX.setTickStrategy(
            AxisTickStrategies.Numeric,
            (tickStrategy: NumericTickStrategy) =>
                tickStrategy
                    .setMinorFormattingFunction((value, range) => {
                        return (value * TAU_VALUE).toString()
                    })
                    .setMajorFormattingFunction((value, range) => {
                        return (value * TAU_VALUE).toString()
                    })
        )

        const series: PointLineSeries[] = []

        let index = 0
        data.forEach((chartPoints, devName) => {
            const pointSeries = chart
                .addPointLineSeries({
                    xAxis: axisX,
                    yAxis: axisY,
                })
                .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                    return builder
                        .addRow(
                            'τ: ',
                            (xValue * TAU_VALUE).toFixed(2).toString()
                        )
                        .addRow(
                            devName + ': ',
                            (yValue / CHART_ZOOM_FIX)
                                .toExponential(7)
                                .toString()
                        )
                })
                .setName(devName)
                .setStrokeStyle(seriesStrokeStyles[index])
                .setPointFillStyle(() =>
                    seriesStrokeStyles[index].getFillStyle()
                )
            index++

            pointSeries.add(chartPoints)
            series.push(pointSeries)
        })

        const legend = chart.addLegendBox()
        // const legend = chart.addLegendBox(LegendBoxBuilders.HorizontalLegendBox.setAlignment("vertical"))
        // .setAutoDispose({
        //     // type: 'max-width',
        //     // maxWidth: 0.80,
        // })

        legend.add(chart)

        // chart.getDefaultAxisX()
        //     .setChartInteractionFitByDrag(false)
        //     .setChartInteractionZoomByDrag(false)
        //     .setChartInteractionPanByDrag(false)
        //     .setChartInteractionZoomByWheel(false)

        chartRef.current = { chart, series }

        return () => {
            chart.dispose()
            // chartRef.current = undefined
        }
    }, [chartRef, data, id])
}

export default useInitializeDEVChart
