import { useAppDispatch } from 'hooks/useAppDispach'
import { useEffect } from 'react'
import {
    setSelectedSatelliteNames,
    setSelectedStationName,
} from 'state/actions'

/**
 * Hook for setting empty arrays of satellites and stations names
 */
const useEnterChartPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setSelectedSatelliteNames([]))
        dispatch(setSelectedStationName(''))
    }, [dispatch])
}

export default useEnterChartPage
