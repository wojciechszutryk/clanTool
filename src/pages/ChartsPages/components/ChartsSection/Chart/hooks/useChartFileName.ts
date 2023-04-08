import { useAppSelector } from 'hooks/useAppSelector'

interface Args {
    id: string
}

/**
 * This hook returns the filename of the chart based on the selected names and dates
 */
const useChartFileName = ({ id }: Args) => {
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const selectedNames = useAppSelector(
        (state) => state.app.selectedSatelliteNames
    )

    const filename =
        id +
        '-' +
        selectedNames.join('-') +
        '-' +
        new Date(startDate).toJSON().slice(0, 10).replaceAll('-', '.') +
        '-' +
        new Date(endDate).toJSON().slice(0, 10).replaceAll('-', '.')

    return filename
}

export default useChartFileName
