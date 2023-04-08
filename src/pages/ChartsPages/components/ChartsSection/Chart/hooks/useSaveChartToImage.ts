import React from 'react'

interface Args {
    filename: string
    chartRef: React.MutableRefObject<any>
}

/**
 * This hook is used create a function that saves the chart to an image
 */
const useSaveChartToImage = ({ filename, chartRef }: Args) => {
    function handleChartSaveToImage() {
        chartRef.current.chart.saveToFile(filename)
    }

    return handleChartSaveToImage
}

export default useSaveChartToImage
