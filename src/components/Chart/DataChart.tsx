import {
    AxisTickStrategies,
    ColorRGBA,
    lightningChart, NumericTickStrategy,
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
                defaultAxisX: {
                    type: 'logarithmic',
                    base: 10,
                },
                // defaultAxisY: {
                //     type: 'logarithmic',
                //     base: 10,
                // }
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

        chart.getDefaultAxisY().formatValue(0.0E+00);
        chart.getDefaultAxisY().setTickStrategy(
            AxisTickStrategies.Numeric,
            ( tickStrategy: NumericTickStrategy ) => tickStrategy
                .setMinorFormattingFunction( ( value, range ) => {
                    return value.toExponential(3).toString()
                })
                .setMajorTickStyle( ( tickStyle ) => tickStyle
                    .setLabelFont( ( font ) => font
                        .setWeight( 'bold' )
                    )
                )
                .setMajorFormattingFunction( ( value, range ) => {
                    return value.toExponential(4).toString()
                })
        )
        chart.getDefaultAxisY().setTickStrategy(AxisTickStrategies.Numeric, (numericTicks) => numericTicks)

        const series = chart
            .addLineSeries()
            .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
                return builder
                    .addRow(
                        xType === 'Date' ? xType + ': ' : 'τ: ',
                        xType === 'Date'
                            ? new Date(xValue).toLocaleString()
                            : xValue.toFixed(2).toString()
                    )
                    .addRow(id + ': ', yValue.toExponential(7).toString())
            })
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
