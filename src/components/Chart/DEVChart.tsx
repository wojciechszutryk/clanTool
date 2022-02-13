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
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import {CSVLink, CSVDownload} from 'react-csv';

const DEVChart = ({
    data,
    id,
}: {
    data: {[key: string]: { x: number; y: number }[]}[]
    id: string
}) => {
    const zoomFix = useAppSelector((state) => state.app.zoomFix);
    const chartRef = useRef<any>(undefined)

    useEffect(() => {
        const palette = ColorPalettes.arction(10)
        const colors = [ 7, 24, 14, 19, 4, 9, 17, 18, 3, 22, 25, 5, 12, 16, 11, 10, 21, 23, 15, 13, 1, 8, 6, 2, 20].map(palette)
        const axisYColors = colors.map((color,index) => colors[index]);
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
            const series = chart.addPointLineSeries({
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
    }, [data, id])

    function handleChartSaveToImage() {
        const filename =
            Object.keys(data.join('-'))
        chartRef.current.chart.saveToFile(filename)
    }

    function handleChartSaveToCSV() {

// const csvData =[
//   ['firstname', 'lastname', 'email'] ,
//   ['John', 'Doe' , 'john.doe@xyz.com'] ,
//   ['Jane', 'Doe' , 'jane.doe@xyz.com']
// ];
// <CSVLink data={csvData} >Download me</CSVLink>
// // or
// <CSVDownload data={csvData} target="_blank" />
    }

    return (
        <Box sx={{
            '@media only screen and (min-width: 900px)': {
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                borderRadius: 2,
                paddingTop: 2,
                boxShadow: '1px -4px 9px 1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important',
            },
        }}>
            <Box id={id} sx={{height: '50vh'}} />
            <Button onClick={handleChartSaveToImage}>Save chart to .png file</Button>
            <Button onClick={handleChartSaveToCSV}>Save chart to .csv file</Button>
        </Box>
    )
}

export default DEVChart
