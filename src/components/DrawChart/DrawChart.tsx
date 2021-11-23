import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Chart, Line } from 'react-chartjs-2'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import zoom from 'chartjs-plugin-zoom'

const DrawChart = () => {
    const [data, setData] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteName
            ? state.app.selectedSatelliteName
            : state.app.selectedStationName
    )
    useEffect(() => {
        Chart.register(zoom)
    })

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return;
        }
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`);
        const stationSatelliteData = await JSONData.data;
        console.log(stationSatelliteData)
        setData(stationSatelliteData);
        // const r = await getStationSatelliteDataFromFile(selectedName)
        // await setData(r)

        // else { // @ts-ignore
        //     setData(jsonData[selectedName].data)
        // }
        await setLoading(false)
    }, [selectedName])

    const chartsData = {
        labels: data,
        datasets: [
            {
                spanGaps: true,
                label: 'value',
                data: data,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(9,0,248)',
            },
        ],
    }

    const options = {
        animation: {
            duration: 0,
        },
        scales: {
            y: {
                beginAtZero: false,
            },
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        datasets: {
            line: {
                pointRadius: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy' as 'xy' | 'x' | 'y',
                },
            },
        },
    }

    return (
        <Box
            sx={{
                maxWidth: '50vw',
                maxHeight: '50vh',
                m: '10px auto',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {loading ? (
                <ClipLoader loading={loading} size={150} />
            ) : (
                <Line data={chartsData} options={options} />
            )}
        </Box>
    )
}

export default DrawChart
