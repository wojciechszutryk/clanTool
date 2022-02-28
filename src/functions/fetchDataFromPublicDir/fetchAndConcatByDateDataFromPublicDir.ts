// import store from 'state/store'
//
// const DATA_FIRST_DATE = 2014 // date of first file TODO: move it to redux?

export const fetchAndConcatByDateDataFromPublicDir = async (resourceName: string) => {
    // const startDate = store.getState().app.startDate
    // const endDate = store.getState().app.endDate
    //
    // const startDateInDateFormat = new Date(startDate);
    // const endDateInDateFormat = new Date(endDate);
    // const startMonthsFormDataFirstDate = (startDateInDateFormat.getFullYear() - DATA_FIRST_DATE)*12 + startDateInDateFormat.getMonth();
    // const endMonthsFormDataFirstDate = (endDateInDateFormat.getFullYear() - DATA_FIRST_DATE)*12 + endDateInDateFormat.getMonth();

    // let outputData: {data: {date: number, phase: number}[]} = {data: []};

    // for(let i = startMonthsFormDataFirstDate; i<=endMonthsFormDataFirstDate ; i++){
    //     const year = DATA_FIRST_DATE + Math.floor(i/12);
    //     const month = i % 12 + 1 < 10 ? '0' + (i % 12 + 1): i % 12 + 1;
    //
    //     const response = await fetch(`${process.env.PUBLIC_URL}/data/${resourceName}-${year}-${month}.json`
    //         ,{
    //             headers : {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         }
    //     )
    //     const monthData: {data: {date: number, phase: number}[]} = await response.json();
    //     outputData.data = monthData.data;
    //     for(let j = 0; j < outputData.data.length; j++){
    //         outputData.data[outputData.data.length + j] = monthData.data[j]
    //     }
    // }
    const res: any = await fetch(`${process.env.PUBLIC_URL}/data/${resourceName}.json`
        ,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )

    return await res.json();
}