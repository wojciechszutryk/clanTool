import React, { useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { modAllanDev } from '../../../../functions/allanVariance/allanVariance'
import freqToPhase from '../../../../functions/freqToPhase/freqToPhase'
import { useAppSelector } from '../../../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import phaseToFreq from '../../../../functions/phaseToFreq/phaseToFreq'
import { DEVChart } from '../../../../components/Chart'

const DrawSatellitesDEVChart = ({
    startDate,
    endDate, DEVs
}: {
    startDate: number
    endDate: number
    DEVs: string[]
}) => {
    const [data, setData] = useState<{[key: string]: { x: number; y: number }[]}[]>([])
    const [loading, setLoading] = useState(true)
    const selectedNames = useAppSelector((state) =>
        state.app.selectedSatelliteNames
    )

    const MADMultiply = useAppSelector((state) => state.app.MADMultiply)
    const tauType = useAppSelector((state) => state.app.tauType)

    const getDEVsDataForSatellite = async (selectedName: string) => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        const DEVsObjects: {[key: string]: { x: number; y: number }[]}[] = []
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )

        //outlier recognition - remove MAD in phaseToFreq
        const tau0 = (data[1].date - data[0].date) / 1000;
        const rawPhases = data.map((obj: { date: number; phase: number }) => obj.phase);
        const freq = phaseToFreq(
            rawPhases,  tau0
        )
        const phases = freqToPhase({data: freq, tau: tau0})

        if (DEVs.includes('ADEV')){
            const allanDevData = allanDev(
                phases,
                startDate,
                endDate,
            )
            const obj = {} as {[key: string]: { x: number; y: number }[]};
            obj[`${selectedName}-ADEV`] = allanDevData;
            DEVsObjects.push(obj)
        }
        if (DEVs.includes('MDEV')){
            const modAllanDevData = modAllanDev(
                phases,
                startDate,
                endDate,
            )
            const obj = {} as {[key: string]: { x: number; y: number }[]};
            obj[`${selectedName}-MDEV`] = modAllanDevData;
            DEVsObjects.push(obj)
        }
        if (DEVs.includes('ODEV')){
            const overAllanDevData = overAllanDev(
                phases,
                startDate,
                endDate,
            )
            const obj = {} as {[key: string]: { x: number; y: number }[]};
            obj[`${selectedName}-ODEV`] = overAllanDevData;
            DEVsObjects.push(obj)
        }
        return DEVsObjects;
    };

    useMemo(async () => {
        setLoading(true)
        let SatellitesDEVsObjects: {[key: string]: { x: number; y: number }[]}[] = [];
        for await (let selectedName of selectedNames){
            const data = await getDEVsDataForSatellite(selectedName);
            if (data) SatellitesDEVsObjects = [...SatellitesDEVsObjects, ...data];
        }
        console.log(SatellitesDEVsObjects)
        setData(SatellitesDEVsObjects)
        await setLoading(false)
    // }, [])
    // }, [DEVs, dispatch, getDEVsDataForSatellite, endDate, selectedNames, startDate, MADMultiply, tauType])
    }, [DEVs, endDate, selectedNames, startDate, MADMultiply, tauType])

    return (
        <Box
            sx={{
                m: '0px auto 30px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
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
                <DEVChart data={data} id={DEVs.join('-')} />
            )}
        </Box>
    )
}

export default DrawSatellitesDEVChart
