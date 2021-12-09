import React, { useMemo, useState } from 'react'
import { allanDev, overAllanDev } from 'functions/allanVariance'
import { modAllanDev } from '../../functions/allanVariance/allanVariance'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DEVChart } from '../Chart'

const DrawDEVChart = ({
    startDate,
    endDate, DEVs
}: {
    startDate: number
    endDate: number
    DEVs: string[]
}) => {
    const [data, setData] = useState<{[key: string]: { x: number; y: number }[]}[]>([])
    const [loading, setLoading] = useState(true)
    const selectedName = useAppSelector((state) =>
        state.app.selectedSatelliteName
            ? state.app.selectedSatelliteName
            : state.app.selectedStationName
    )

    useMemo(async () => {
        if (!selectedName) {
            setLoading(false)
            return
        }
        const DEVsObjects: {[key: string]: { x: number; y: number }[]}[] = []
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        const phases = data.map((obj: { date: number; phase: number }) => obj.phase);
        if (DEVs.includes('ADEV')){
            const allanDevData = allanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'ADEV': allanDevData })
        }
        if (DEVs.includes('MDEV')){
            const modAllanDevData = modAllanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'MDEV': modAllanDevData })
        }
        if (DEVs.includes('ODEV')){
            const overAllanDevData = overAllanDev(
                phases,
                startDate,
                endDate,
            )
            DEVsObjects.push({'ODEV': overAllanDevData })
        }

        setData(DEVsObjects)
        await setLoading(false)
    }, [DEVs, endDate, selectedName, startDate])

    return (
        <Box
            sx={{
                m: '10px auto',
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

export default DrawDEVChart
