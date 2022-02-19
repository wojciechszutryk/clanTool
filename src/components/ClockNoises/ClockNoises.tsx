import { Tooltip } from '@mui/material';
import React, { useMemo } from 'react'
import { BetweenMinusOneAndZeroSquare, BetweenZeroAndOneSquare, Header, LessThanMinusOneSquare, MoreThanOneSquare, Title, Wrapper } from './styles';

const ClockNoises = ({data}: {data: {[key: string]: { x: number; y: number }[]}[]}) => {

    const squres = useMemo(()=> {
        return data.map(devObj => (
            <Wrapper key={Object.keys(devObj)[0]}>
                <Header>{Object.keys(devObj)[0]}</Header>
                {Object.values(devObj).map((xyValueArray) => {
                    const yValuesArr = xyValueArray.map(obj => obj.y);
                    const xyValueArrayLengyhMinusOne = yValuesArr.length - 1;
                    const deltaY = (Math.max(...yValuesArr) - Math.min(...yValuesArr))/(xyValueArrayLengyhMinusOne)
                    return xyValueArray.map((xyValue, index) => {
                        if(index === xyValueArray.length-1) return null;
                        const aParameter = (xyValueArray[index+1].y - xyValueArray[index].y) / deltaY
                        if(aParameter < -1) return (
                            <Tooltip 
                                key={index}
                                title={`
                                    range: ${xyValueArray[index].x} - ${xyValueArray[index+1].x}
                                    value: ${aParameter}
                                `}
                                placement="top-start">
                                <LessThanMinusOneSquare widthPercentage={xyValueArrayLengyhMinusOne} />
                            </Tooltip>
                        )
                        if(aParameter > -1 && aParameter < 0) return (
                            <Tooltip 
                                key={index}
                                title={`
                                    range: ${xyValueArray[index].x} - ${xyValueArray[index+1].x}
                                    value: ${aParameter}
                                `}
                                placement="top-start">
                                <BetweenMinusOneAndZeroSquare widthPercentage={xyValueArrayLengyhMinusOne} />
                            </Tooltip>
                        )
                        if(aParameter > 0 && aParameter < 1) return (
                            <Tooltip 
                                key={index}
                                title={`
                                    range: ${xyValueArray[index].x} - ${xyValueArray[index+1].x}
                                    value: ${aParameter}
                                `}
                                placement="top-start">
                                <BetweenZeroAndOneSquare widthPercentage={xyValueArrayLengyhMinusOne} />
                            </Tooltip>
                        )
                        return (
                            <Tooltip 
                                key={index}
                                title={`
                                    range: ${xyValueArray[index].x} - ${xyValueArray[index+1].x}
                                    value: ${aParameter}
                                `}
                                placement="top-start">
                                <MoreThanOneSquare widthPercentage={xyValueArrayLengyhMinusOne} />
                            </Tooltip>
                        )
                    })
                })}
            </Wrapper>
        ))
    }, [data]);

    return (
        <div>
            <Title>Clock Noises</Title>
            {squres}
        </div>
    );
}

export default ClockNoises
