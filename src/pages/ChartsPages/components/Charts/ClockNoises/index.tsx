import { ChartsData } from 'models/data.model'
import ClockNoiseSquare from './ClockNoiseSquare'
import {
    StyledRowHeader,
    StyledTitle,
    StyledClockNoisesWrapper,
    StyledSingleRow,
} from './styles'

const TAU_VALUE = 300 //current tau value, set to multiply x axis values | to be changed when data sets changes

interface Props {
    data: ChartsData
}

const ClockNoises = ({ data }: Props) => {
    const clockNoises: JSX.Element[] = []
    data.forEach((chartData, key) => {
        const yValuesArr = chartData.map((obj) => obj.y)
        const xyValueArrayLengthMinusOne = yValuesArr.length - 1
        const deltaY =
            (Math.max(...yValuesArr) - Math.min(...yValuesArr)) /
            xyValueArrayLengthMinusOne
        const clockNoiseSquares = chartData.map((_, index) => {
            if (index === chartData.length - 1) return null
            const aParameter =
                (chartData[index + 1].y - chartData[index].y) / deltaY
            return (
                <ClockNoiseSquare
                    key={index}
                    rageStart={chartData[index].x * TAU_VALUE}
                    rageEnd={chartData[index + 1].x * TAU_VALUE}
                    aParameter={aParameter}
                    index={index}
                    xyValueArrayLengthMinusOne={xyValueArrayLengthMinusOne}
                />
            )
        })

        clockNoises.push(
            <StyledSingleRow key={key}>
                <StyledRowHeader>{key}</StyledRowHeader>
                {clockNoiseSquares}
            </StyledSingleRow>
        )
    })

    return (
        <StyledClockNoisesWrapper>
            <StyledTitle>Clock Noises</StyledTitle>
            {clockNoises}
        </StyledClockNoisesWrapper>
    )
}

export default ClockNoises
