import store from 'state/store'

export const fetchAndConcatByDateDataFromPublicDir = async (resourceName: string) => {
    const startDate = store.getState().app.startDate
    const endDate = store.getState().app.endDate

    const startYear =  1970 + Math.floor(startDate / 31536000000)
    const endYear =  1970 + Math.floor(endDate / 31536000000)

    let outputData: {data: {date: number, phase: number}[]} = {data: []};

    for(let i = startYear; i<=endYear ; i++){
        const response = await fetch(`${process.env.PUBLIC_URL}/data/${resourceName}-${i}.json`
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        const yearData: {data: {date: number, phase: number}[]} = await response.json();
        console.log(yearData)
        outputData.data = yearData.data;
        // for(let j = 0; j < outputData.data.length; j++){
        //     console.log(yearData.data[j])
        //     outputData.data[outputData.data.length + j] = yearData.data[j]
        // }
    }

    console.log(outputData)
    return outputData;
}