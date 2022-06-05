import {
    AxisTickStrategies,
    ColorPalettes,
    ColorRGBA,
    lightningChart,
    NumericTickStrategy,
    SolidFill,
    SolidLine,
    Themes,
} from '@arction/lcjs'
import { Box, Button } from '@mui/material'
import { DEVsData } from 'models/data.model'
import React, { useRef, useEffect, useMemo } from 'react'
import { CSVLink } from 'react-csv'
import { useAppSelector } from '../../functions/hooks/useAppSelector'

const DataChart = ({
    data,
    id,
    xType = 'Tau',
}: {
    data: DEVsData
    id: string
    xType?: 'Date' | 'Tau'
}) => {
    const chartRef = useRef<any>(undefined)
    let zoomFix = useAppSelector((state) => state.app.zoomFix)
    if (id === 'Phase') zoomFix = 1
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)

    useEffect(() => {
        const palette = ColorPalettes.arction(10)
        const colors = [7, 24, 14, 19, 4].map(palette)
        const axisYColors = colors.map((color, index) => colors[index])
        const axisYStyles = axisYColors.map((color) => new SolidFill({ color }))
        const seriesStrokeStyles = axisYStyles.map(
            (fillStyle) => new SolidLine({ fillStyle, thickness: 2 })
        )

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

        chart.getDefaultAxisY().formatValue(0.0)
        chart
            .getDefaultAxisY()
            .setTickStrategy(
                AxisTickStrategies.Numeric,
                (tickStrategy: NumericTickStrategy) =>
                    tickStrategy
                        .setMinorFormattingFunction((value, range) => {
                            return (value / zoomFix).toExponential(3).toString()
                        })
                        .setMajorTickStyle((tickStyle) =>
                            tickStyle.setLabelFont((font) =>
                                font.setWeight('bold')
                            )
                        )
                        .setMajorFormattingFunction((value, range) => {
                            return (value / zoomFix).toExponential(4).toString()
                        })
            )
        chart
            .getDefaultAxisY()
            .setTickStrategy(
                AxisTickStrategies.Numeric,
                (numericTicks) => numericTicks
            )

        // const series = chart
        //     .addLineSeries()
        //     .setCursorResultTableFormatter((builder, _, xValue, yValue) => {
        //         return builder
        //             .addRow(
        //                 xType === 'Date' ? xType + ': ' : 'τ: ',
        //                 xType === 'Date'
        //                     ? new Date(xValue).toLocaleString()
        //                     : xValue.toFixed(2).toString()
        //             )
        //             .addRow(id + ': ', (yValue/zoomFix).toExponential(7).toString())
        //     })
        const series = data.map((dev, index) => {
            const devName = Object.keys(dev)[0]
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
                        .addRow(
                            id + ': ',
                            (yValue / zoomFix).toExponential(7).toString()
                        )
                })
                .setName(devName)
                .setStrokeStyle(seriesStrokeStyles[index])
            series.add(Object.values(data[index])[0])
            return series
        })
        chartRef.current = { chart, series }

        return () => {
            chart.dispose()
            chartRef.current = undefined
        }
    }, [])

    // useEffect(() => {
    //     const components = chartRef.current
    //     if (!components) return

    //     const { series } = components
    //     series.clear().add(data)
    // }, [])

    function handleChartSaveToImage() {
        const filename =
            id +
            '-' +
            new Date(startDate).toJSON().slice(0, 10).replaceAll('-', '.') +
            '-' +
            new Date(endDate).toJSON().slice(0, 10).replaceAll('-', '.')
        chartRef.current.chart.saveToFile(filename)
    }

    // const csvData = useMemo(() => {
    //     if (data.length === 0) return []
    //     const csvArray: (string | number | Date)[][] = []
    //     csvArray.push(['Date', id])
    //     for (let i = 0; i < data.length; i++) {
    //         csvArray.push([
    //             new Date(data[i].x).toLocaleString(),
    //             data[i].y / zoomFix,
    //         ])
    //     }
    //     return csvArray
    // }, [])
    const csvData = useMemo(() => {
        if (data.length === 0) return []
        const csvArray: (string | number)[][] = []
        const selectedName = Object.values(data[0])[0].map((xyData) => xyData.x)
        csvArray.push(['tau', ...selectedName])

        for (let i = 0; i < data.length; i++) {
            const devValues = Object.values(data[i])[0].map(
                (xyData) => xyData.y / zoomFix
            )
            csvArray.push([Object.keys(data[i])[0], ...devValues])
        }
        return csvArray
    }, [])

    return (
        <Box
            sx={{
                '@media only screen and (min-width: 900px)': {
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    paddingTop: 2,
                    boxShadow:
                        '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
                },
            }}
        >
            <Box id={id} sx={{ height: '50vh' }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant={'outlined'}
                    onClick={handleChartSaveToImage}
                    sx={{
                        width: '50%',
                        margin: 2,
                    }}
                >
                    Save chart to .png file
                </Button>
                <Button
                    variant={'outlined'}
                    sx={{
                        width: '50%',
                        margin: 2,
                        '& a': { color: '#25374a', textDecoration: 'none' },
                    }}
                >
                    <CSVLink
                        data={csvData}
                        filename={
                            id +
                            '-' +
                            new Date(startDate)
                                .toJSON()
                                .slice(0, 10)
                                .replaceAll('-', '.') +
                            '-' +
                            new Date(endDate)
                                .toJSON()
                                .slice(0, 10)
                                .replaceAll('-', '.') +
                            '.csv'
                        }
                        target="_blank"
                    >
                        Save chart to .CSV file
                    </CSVLink>
                </Button>
            </Box>
        </Box>
    )
}

export default DataChart
