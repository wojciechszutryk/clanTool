import {
    AxisTickStrategies,
    ColorRGBA,
    lightningChart, NumericTickStrategy,
    SolidFill,
    Themes,
} from '@arction/lcjs'
import { Box, Button } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'

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
    const zoomFix = useAppSelector((state) => state.app.zoomFix);
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
                    .addRow(id + ': ', (yValue/zoomFix).toExponential(7).toString())
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
        <Box
             sx={{
                 '@media only screen and (min-width: 900px)': {
                     display: 'flex',
                     flexDirection: 'column',
                     backgroundColor: '#fff',
                     borderRadius: 2,
                     paddingTop: 2,
                     boxShadow: '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
                 },
             }}>
            <Box id={id} sx={{ height: '50vh' }} />
            <Button onClick={handleChartSave}>Save chart to file</Button>
        </Box>
    )
}

export default DataChart
