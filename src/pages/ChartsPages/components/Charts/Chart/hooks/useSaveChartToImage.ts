import React from 'react'

interface Args {
    filename: string
    chartRef: React.MutableRefObject<any>
}

const useSaveChartToImage = ({ filename, chartRef }: Args) => {
    function handleChartSaveToImage() {
        chartRef.current.chart.saveToFile(filename)
    }

    return handleChartSaveToImage
}

export default useSaveChartToImage
