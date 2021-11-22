import React from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../functions/hooks/useAppDispach'
import { useAppSelector } from '../../functions/hooks/useAppSelector'
import { showToast } from '../../functions/showToast'
import { setEndDate, setStartDate } from '../../state/actions'

const DatePicker = ({startEnd}: {startEnd: 'start' | 'end'}) => {
    const startDate = useAppSelector((state) => state.app.startDate)
    const endDate = useAppSelector((state) => state.app.endDate)
    const dispatch = useAppDispatch()

    const handleChange = (newValue: Date | null) => {
        if (startEnd === 'start' && newValue){
            if (+newValue > +endDate) {
                showToast('Set date later than the end date')
            }
            else dispatch(setStartDate(newValue))
        }
        else if (startEnd === 'end' && newValue){
            if (newValue < startDate) {
                showToast('Set date earlier than the start date')
            }
            else dispatch(setEndDate(newValue))
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DateTimePicker
                    label={startEnd === 'start' ? 'Start date and Time' : 'Start end and Time'}
                    value={startEnd === 'start' ? startDate : endDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                 />
            </Stack>
        </LocalizationProvider>
    );
}

export default DatePicker
