import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { DrawPhaseChart, DrawFrequencyChart, DrawDEVChart } from '../DrawChart'
import DrawSatellitesFrequencyDriftChart from '../DrawChart/DrawSatellitesFrequencyDriftChart'
import { fetchAndConcatByDateDataFromPublicDir } from 'functions/fetchDataFromPublicDir/fetchAndConcatByDateDataFromPublicDir'
import { ClipLoader } from 'react-spinners'
import { PhaseData, PhasePoint } from 'models/data.model'

const DrawSatellitesCharts = (props: { recalculate: boolean }) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const [phaseData, setPhaseData] = useState<PhaseData>([])
    const [loading, setLoading] = useState(true)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteNames[0]
            ? state.app.selectedSatelliteNames[0]
            : state.app.selectedStationName
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        setLoading(true)
        const JSONData = await fetchAndConcatByDateDataFromPublicDir(
            selectedName
        )
        const data = await JSONData.data.filter(
            (obj: PhasePoint) => obj.date <= endDate && obj.date >= startDate
        )
        setPhaseData(data)
        setLoading(false)
    }, [props.recalculate])

    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <ClipLoader loading={loading} size={150} />
                </Box>
            ) : (
                <Box>
                    {(chartsToShow.includes('ADEV') ||
                        chartsToShow.includes('MDEV') ||
                        chartsToShow.includes('HDEV') ||
                        chartsToShow.includes('ODEV')) && (
                        // props.chartType === ChartsTypes.Satellites ?
                        <DrawDEVChart
                            rerender={props.recalculate}
                            phaseData={phaseData}
                        />
                        // : <DrawStationsDEVChart startDate={startDate} endDate={endDate} DEVs={DEVs} />
                    )}
                    {chartsToShow.includes('Phase') && (
                        <DrawPhaseChart
                            rerender={props.recalculate || false}
                            phaseData={phaseData}
                        />
                    )}
                    {chartsToShow.includes('Frequency') && (
                        <DrawFrequencyChart
                            rerender={props.recalculate || false}
                            phaseData={phaseData}
                        />
                    )}
                    {chartsToShow.includes('Frequency Drift') && (
                        <DrawSatellitesFrequencyDriftChart
                            rerender={props.recalculate || false}
                            phaseData={phaseData}
                        />
                    )}
                </Box>
            )}
        </>
        // {loading ? (
        //     <Box
        //         sx={{
        //             display: 'flex',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             height: '50vh',
        //         }}
        //     >
        //         <ClipLoader loading={loading} size={150} />
        //     </Box>
        // ) : (

        // )}
    )
}

export default DrawSatellitesCharts
