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
import React, { useEffect, useMemo, useRef } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { CSVLink } from 'react-csv'
import { ClockNoises } from 'components'
import { DEVsData } from 'models/data.model'

const TAU_VALUE = 300 //current tau value, set to multiply x axis values | to be changed when data sets changes

const DEVChart = ({ data, id }: { data: DEVsData; id: string }) => {
    const zoomFix = useAppSelector((state) => state.app.zoomFix)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const chartRef = useRef<any>(undefined)
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    useEffect(() => {
        const palette = ColorPalettes.arction(10)
        const colors = [
            7, 24, 14, 19, 4, 9, 17, 18, 3, 22, 25, 5, 12, 16, 11, 10, 21, 23,
            15, 13, 1, 8, 6, 2, 20,
        ].map(palette)
        const axisYColors = colors.map((color, index) => colors[index])
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
        axisY.formatValue(0.0)
        axisY.setTickStrategy(
            AxisTickStrategies.Numeric,
            (tickStrategy: NumericTickStrategy) =>
                tickStrategy
                    .setMinorFormattingFunction((value, range) => {
                        return (value / zoomFix).toExponential(3).toString()
                    })
                    .setMajorTickStyle((tickStyle) =>
                        tickStyle.setLabelFont((font) => font.setWeight('bold'))
                    )
                    .setMajorFormattingFunction((value, range) => {
                        return (value / zoomFix).toExponential(4).toString()
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

        const series = data.map((dev, index) => {
            const devName = Object.keys(dev)[0]
            // const series = chart.addSplineSeries({
            const series = chart
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
                            (yValue / zoomFix).toExponential(7).toString()
                        )
                })
                .setName(devName)
                .setStrokeStyle(seriesStrokeStyles[index])
                .setPointFillStyle(() =>
                    seriesStrokeStyles[index].getFillStyle()
                )
            series.add(Object.values(data[index])[0])
            return series
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
            chartRef.current = undefined
        }
    }, [])

    function handleChartSaveToImage() {
        const filename =
            id +
            '-' +
            selectedNames.join('-') +
            '-' +
            new Date(startDate).toJSON().slice(0, 10).replaceAll('-', '.') +
            '-' +
            new Date(endDate).toJSON().slice(0, 10).replaceAll('-', '.')
        chartRef.current.chart.saveToFile(filename)
    }

    const csvData = useMemo(() => {
        if (data.length === 0) return []
        const csvArray: (string | number)[][] = []
        const tauValues = Object.values(data[0])[0].map((xyData) => xyData.x)
        csvArray.push(['tau', ...tauValues])

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
            <ClockNoises data={data} />
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
                            selectedNames.join('-') +
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

export default DEVChart
