import { useAppDispatch } from 'hooks/useAppDispach'
import { useAppSelector } from 'hooks/useAppSelector'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { setTauType } from '../../state/actions'
import { TauTypes } from 'models/inputData.model'
import { useStyles } from './styles'

const TauTypeSelect = () => {
    const dispatch = useAppDispatch()
    const tauType = useAppSelector((state) => state.app.tauType)
    const classes = useStyles()

    const tauDisplayOptions: { [key: string]: JSX.Element } = {}
    tauDisplayOptions[TauTypes.powerOfTwo] = (
        <div className={classes.powerOf}>
            2<span>n</span>
        </div>
    )
    tauDisplayOptions[TauTypes.powerOfTen] = (
        <div className={classes.powerOf}>
            10<span>n</span>
        </div>
    )
    tauDisplayOptions[TauTypes.logarithmLike] = (
        <div>10,20,30...100,200... - nazwa robocza</div>
    )

    const selectTauOptions = Object.values(TauTypes).map((name: string) => (
        <MenuItem key={name} value={name}>
            {tauDisplayOptions[name]}
        </MenuItem>
    ))

    const handleChange = (event: SelectChangeEvent) => {
        const type = event.target.value as TauTypes
        dispatch(setTauType(type))
    }

    return (
        <FormControl sx={{ width: 140, marginRight: '20px' }}>
            <InputLabel id="station-select-label">Tau types</InputLabel>
            <Select
                labelId="select tau"
                id="tau-select"
                value={tauType}
                label="Tau Type"
                onChange={handleChange}
            >
                {selectTauOptions}
            </Select>
        </FormControl>
    )
}

export default TauTypeSelect
