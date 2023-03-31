import { memo, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import DrawSatellitesFrequencyDriftChart from './DrawSatellitesFrequencyDriftChart'
import { fetchDataFromPublicDir } from 'functions/fetchDataFromPublicDir'
import { ClipLoader } from 'react-spinners'
import { PhasesData, PhasePoint } from 'models/data.model'
import { useAppSelector } from 'hooks/useAppSelector'
import { Charts } from 'models/inputData.model'
import DrawDEVChart from './DrawSatellitesDEVChart'
import DrawPhaseChart from './DrawSatellitesPhaseChart'
import DrawFrequencyChart from './DrawSatellitesFrequencyChart'

const DrawSatellitesCharts = (props: { recalculate: boolean }) => {
    const chartsToShow = useAppSelector((state) => state.app.chartsToShow)
    const [phasesData, setPhasesData] = useState<PhasesData>({})
    const [loading, setLoading] = useState(true)
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    useMemo(async () => {
        if (!selectedNames) {
            setLoading(false)
            return
        }

        const phaseObjectsData: PhasesData = {}

        setLoading(true)

        for (let selectedName of selectedNames) {
            const JSONData = await fetchDataFromPublicDir(selectedName)
            const data = await JSONData.data.filter(
                (obj: PhasePoint) =>
                    obj.date <= endDate && obj.date >= startDate
            )
            phaseObjectsData[selectedName] = data
        }
        setPhasesData(phaseObjectsData)
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
                    {(chartsToShow.includes(Charts.ADEV) ||
                        chartsToShow.includes(Charts.MDEV) ||
                        chartsToShow.includes(Charts.HDEV) ||
                        chartsToShow.includes(Charts.ODEV)) && (
                        <DrawDEVChart
                            rerender={props.recalculate}
                            phasesData={phasesData}
                        />
                    )}
                    {chartsToShow.includes(Charts.Phase) &&
                        selectedNames.length === 1 && (
                            <DrawPhaseChart
                                rerender={props.recalculate || false}
                                phaseData={phasesData[selectedNames[0]]}
                            />
                        )}
                    {chartsToShow.includes(Charts.Frequency) &&
                        selectedNames.length === 1 && (
                            <DrawFrequencyChart
                                rerender={props.recalculate || false}
                                phaseData={phasesData[selectedNames[0]]}
                            />
                        )}
                    {chartsToShow.includes(Charts.FrequencyDrift) &&
                        selectedNames.length === 1 && (
                            <DrawSatellitesFrequencyDriftChart
                                rerender={props.recalculate || false}
                                phaseData={phasesData[selectedNames[0]]}
                            />
                        )}
                </Box>
            )}
        </>
    )
}

export default memo(DrawSatellitesCharts)
