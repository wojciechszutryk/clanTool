import React, { useMemo, useState } from 'react'
import { allanDev } from 'functions/allanVariance'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { Box } from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { DataChart } from 'components'

const DrawADEVChart = () => {
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
        const data = await JSONData.data
        const allanDevData = allanDev(
            data.map((obj: { date: number; phase: number }) => obj.phase)
        )
        setData(allanDevData)
        await setLoading(false)
    }, [selectedName])

    return (
        <Box
            sx={{
                m: '10px auto',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {loading ? (
                <ClipLoader loading={loading} size={150} />
            ) : (
                <DataChart data={data} id={'ADEV'} />
            )}
        </Box>
    )
}

export default DrawADEVChart
