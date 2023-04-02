import { ChartsData } from 'models/data.model'
import ClockNoiseSquare from './ClockNoiseSquare'
import { StyledHeader, StyledTitle, StyledWrapper } from './styles'

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
                    rageStart={chartData[index].x * TAU_VALUE}
                    rageEnd={chartData[index + 1].x * TAU_VALUE}
                    aParameter={aParameter}
                    index={index}
                    xyValueArrayLengthMinusOne={xyValueArrayLengthMinusOne}
                />
            )
        })

        return (
            <StyledWrapper key={key}>
                <StyledHeader>{key}</StyledHeader>
                {clockNoiseSquares}
            </StyledWrapper>
        )
    })
    return (
        <div>
            <StyledTitle>Clock Noises</StyledTitle>
            {clockNoises}
        </div>
    )
}

export default ClockNoises
