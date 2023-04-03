import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { showToast } from '../../functions/showToast'
import { setEndDate, setStartDate } from '../../state/actions'
import dayjs from 'dayjs'
import { StyledDatePicker } from './styles'

/**coverts number to dayjs date  */
const dayjsDate = (value: number) => dayjs(new Date(value))

interface Props {
    isStartDate?: boolean
}

const DatePicker = ({ isStartDate }: Props) => {
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const dispatch = useAppDispatch()

    const handleChange = (dayjsVlue: dayjs.Dayjs | null) => {
        if (!dayjsVlue) return

        const newValue = new Date(dayjsVlue.valueOf())

        if (isStartDate) {
            if (+newValue > endDate) {
                showToast('Set date later than the end date')
            } else dispatch(setStartDate(+newValue))
        } else if (!isStartDate) {
            if (+newValue < startDate) {
                showToast('Set date earlier than the start date')
            } else dispatch(setEndDate(+newValue))
        }
    }

    return (
        <StyledDatePicker
            minDate={
                isStartDate
                    ? dayjs(new Date(2014, 0, 1, 0, 0, 0, 0))
                    : dayjsDate(startDate)
            }
            maxDate={
                isStartDate
                    ? dayjsDate(endDate)
                    : dayjs(new Date(2021, 0, 1, 0, 0, 0, 0))
            }
            label={isStartDate ? 'Start date and Time' : 'Start date and Time'}
            defaultValue={
                isStartDate ? dayjsDate(startDate) : dayjsDate(endDate)
            }
            value={isStartDate ? dayjsDate(startDate) : dayjsDate(endDate)}
            onChange={handleChange}
        />
    )
}

export default DatePicker
