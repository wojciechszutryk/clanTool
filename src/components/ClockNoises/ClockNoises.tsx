import { Box, Button, Tooltip } from '@mui/material';
import React, { useMemo } from 'react'

const ClockNoises = ({data}: {data: {[key: string]: { x: number; y: number }[]}[]}) => {

    const squres = useMemo(()=> {
        return data.map(devObj => (
            <Box key={Object.keys(devObj)[0]}>
                {Object.values(devObj).map((xyValueArray) => (
                    xyValueArray.map((xyValue, index) => {
                        if(index === xyValueArray.length-1) return null;

                        //nie działa bo skale w x i y są nie takie same + po x zwiększa sie niereularnie
                        console.log(xyValueArray[index+1].y - xyValueArray[index].y);
                        
                        const aParameter = (xyValueArray[index+1].y - xyValueArray[index].y) / (xyValueArray[index+1].x - xyValueArray[index].x)
                        return (
                            <Tooltip key={index} title="Add" placement="top-start">
                                <Box>{aParameter}</Box>
                            </Tooltip>
                        )
                    })
                ))}
            </Box>
        ))
        // if(data.length === 0) return [];
        // const csvArray: (string | number)[][] = [];
        // const tauValues = Object.values(data[0])[0].map(xyData => xyData.x);
        // csvArray.push(['tau', ...tauValues])

        // for(let i=0 ; i < data.length ; i++){
        //     const devValues = Object.values(data[i])[0].map(xyData => xyData.y)
        //     csvArray.push([Object.keys(data[i])[0], ...devValues])
        // }
        // return csvArray
    }, [data]);

    return (
        <div>
            {squres}
        </div>
    );
}

export default ClockNoises
