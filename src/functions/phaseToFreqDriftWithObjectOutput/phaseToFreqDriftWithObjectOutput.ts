import store from 'state/store'

export default function phaseToFreqDriftWithObjectOutput(
    data: { date: number; phase: number }[],
    tau: number
) {
    const zoomFix = store.getState().app.zoomFix
        ? store.getState().app.zoomFix
        : 1000000000000

    let freqArrayData: number[] = []
    let freqDriftData: { x: number; y: number }[] = []

    for (let i = 0; i < data.length - 1; i++) {
        freqArrayData.push((data[i + 1].phase - data[i].phase) / tau)
    }
    for (let i = 0; i < freqArrayData.length - 1; i++) {
        freqDriftData.push({
            y: ((freqArrayData[i + 1] - freqArrayData[i]) / tau) * zoomFix,
            x: data[i].date,
        })
    }

    //MAD temp removed
    // const onlyFreqDriftArray = freqDriftData.map(
    //     (obj: { x: number; y: number }) => obj.y
    // )
    //
    // const MADMultiply = store.getState().app.MADMultiply
    //     ? store.getState().app.MADMultiply
    //     : 3
    // const MADValue = (mad(onlyFreqDriftArray) / 0.6745) * MADMultiply
    //
    // freqDriftData = freqDriftData.filter(
    //     (dateAndFreqDriftObj) =>
    //         Math.abs(dateAndFreqDriftObj.y) < Math.abs(MADValue)
    // )

    return freqDriftData
}
