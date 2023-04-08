import {
    lightningChart,
    Themes,
    SolidFill,
    ColorRGBA,
    AxisTickStrategies,
    NumericTickStrategy,
    ChartXY,
    PointMarker,
    UIBackground,
    PointSeries,
    PointShape,
} from '@arction/lcjs'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import { useEffect } from 'react'

/**
 * This hook initializes the chart and series for the data chart. It does all configuration for lightningCharts library and sets the data.
 */
const useInitializeDataChart = (
    id: string,
    chartRef: React.MutableRefObject<
        | {
              chart: ChartXY<PointMarker, UIBackground>
              series: PointSeries
          }
        | undefined
    >,
    xType?: 'Date' | 'Tau'
) => {
    useEffect(() => {
        const chart = lightningChart()
            .ChartXY({
                container: id,
                theme: Themes.light,
                defaultAxisX: {
                    type: 'logarithmic',
                    base: 10,
                },
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

        if (xType === 'Date')
            chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime)

        chart.getDefaultAxisY().formatValue(0.0)
        chart
            .getDefaultAxisY()
            .setTickStrategy(
                AxisTickStrategies.Numeric,
                (tickStrategy: NumericTickStrategy) =>
                    tickStrategy
                        .setMinorFormattingFunction((value, range) => {
                            return (value / CHART_ZOOM_FIX)
                                .toExponential(3)
                                .toString()
                        })
                        .setMajorTickStyle((tickStyle) =>
                            tickStyle.setLabelFont((font) =>
                                font.setWeight('bold')
                            )
                        )
                        .setMajorFormattingFunction((value, range) => {
                            return (value / CHART_ZOOM_FIX)
                                .toExponential(4)
                                .toString()
                        })
            )
        chart
            .getDefaultAxisY()
            .setTickStrategy(
                AxisTickStrategies.Numeric,
                (numericTicks) => numericTicks
            )

        const series = chart
            .addPointSeries({ pointShape: PointShape.Triangle })
            .setDataCleaning({ minDataPointCount: 1 })
            .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                return builder
                    .addRow(
                        xType === 'Date' ? xType + ': ' : 'τ: ',
                        xType === 'Date'
                            ? new Date(xValue).toLocaleString()
                            : xValue.toFixed(2).toString()
                    )
                    .addRow(
                        id + ': ',
                        (yValue / CHART_ZOOM_FIX).toExponential(7).toString()
                    )
            })
        chartRef.current = { chart, series }

        return () => {
            chart.dispose()
            chartRef.current = undefined
        }
    }, [])
}

export default useInitializeDataChart
