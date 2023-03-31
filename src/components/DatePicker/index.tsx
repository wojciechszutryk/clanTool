import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import { showToast } from '../../functions/showToast'
import { setEndDate, setStartDate } from '../../state/actions'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'

const DatePicker = ({ startEnd }: { startEnd: 'start' | 'end' }) => {
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const dispatch = useAppDispatch()
    console.log(startDate, endDate)

    const handleChange = (newValue: Date | null) => {
        if (startEnd === 'start' && newValue) {
            if (+newValue > endDate) {
                showToast('Set date later than the end date')
            } else dispatch(setStartDate(+newValue))
        } else if (startEnd === 'end' && newValue) {
            if (+newValue < startDate) {
                showToast('Set date earlier than the start date')
            } else dispatch(setEndDate(+newValue))
        }
    }

    return (
        <DateTimePicker
            // minDate={
            //     startEnd === 'start'
            //         ? new Date(2014, 0, 1, 0, 0, 0, 0)
            //         : new Date(startDate)
            // }
            // maxDate={
            //     startEnd === 'start'
            //         ? new Date(endDate)
            //         : new Date(2021, 0, 1, 0, 0, 0, 0)
            // }
            // label={
            //     startEnd === 'start'
            //         ? 'Start date and Time'
            //         : 'Start end and Time'
            // }
            // value={startEnd === 'start' ? startDate : endDate}
            onChange={(value) => {
                console.log(dayjs(value))
            }}
            // inputFormat="dd-MM-Y HH:mm:SS"
            // renderInput={(params: TextFieldProps) => <TextField {...params} />}
        />
    )
}

export default DatePicker
