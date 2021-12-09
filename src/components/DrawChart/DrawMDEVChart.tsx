import React, { useMemo, useState } from 'react'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'
import { modAllanDev } from '../../functions/allanVariance/allanVariance'

const DrawMDEVChart = ({
    startDate,
    endDate,
}: {
    startDate: number
    endDate: number
}) => {
    const [data, setData] = useState<{ x: number; y: number }[]>([])
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
        setLoading(true)
        const JSONData = await import(`assets/${selectedName}`)
        const data = await JSONData.data.filter(
            (obj: { date: number; phase: number }) =>
                obj.date <= endDate && obj.date >= startDate
        )
        const allanDevData = modAllanDev(
            data.map((obj: { date: number; phase: number }) => obj.phase),
            startDate,
            endDate,
        )
        setData(allanDevData)
        await setLoading(false)
    }, [endDate, selectedName, startDate])

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
                <DataChart data={data} id={'MDEV'} />
            )}
        </Box>
    )
}

export default DrawMDEVChart
