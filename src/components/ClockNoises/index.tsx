import ClockNoiseSquare from './ClockNoiseSquare'
import { Header, Title, Wrapper } from './styles'

const TAU_VALUE = 300 //current tau value, set to multiply x axis values | to be changed when data sets changes

const ClockNoises = ({
    data,
}: {
    data: { [key: string]: { x: number; y: number }[] }[]
}) => {
    return (
        <div>
            <Title>Clock Noises</Title>
            {data.map((devObj) => (
                <Wrapper key={Object.keys(devObj)[0]}>
                    <Header>{Object.keys(devObj)[0]}</Header>
                    {Object.values(devObj).map((xyValueArray) => {
                        const yValuesArr = xyValueArray.map((obj) => obj.y)
                        const xyValueArrayLengthMinusOne = yValuesArr.length - 1
                        const deltaY =
                            (Math.max(...yValuesArr) -
                                Math.min(...yValuesArr)) /
                            xyValueArrayLengthMinusOne
                        return xyValueArray.map((_, index) => {
                            if (index === xyValueArray.length - 1) return null
                            const aParameter =
                                (xyValueArray[index + 1].y -
                                    xyValueArray[index].y) /
                                deltaY
                            return (
                                <ClockNoiseSquare
                                    rageStart={
                                        xyValueArray[index].x * TAU_VALUE
                                    }
                                    rageEnd={
                                        xyValueArray[index + 1].x * TAU_VALUE
                                    }
                                    aParameter={aParameter}
                                    index={index}
                                    xyValueArrayLengthMinusOne={
                                        xyValueArrayLengthMinusOne
                                    }
                                />
                            )
                        })
                    })}
                </Wrapper>
            ))}
        </div>
    )
}

export default ClockNoises
