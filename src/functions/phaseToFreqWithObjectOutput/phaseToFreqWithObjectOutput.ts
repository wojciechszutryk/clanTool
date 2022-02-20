import { mad } from 'mathjs'
import store from 'state/store'

export default function phaseToFreqWithObjectOutput(
    data: { date: number; phase: number }[],
    tau: number,
    fixZoom?: boolean
) {
    const zoomFix = store.getState().app.zoomFix ? store.getState().app.zoomFix : 1000000000000;

    let newData: { x: number; y: number }[] = [];

    for (let i = 0; i < data.length - 1; i++) {
        fixZoom ? newData.push({
            y: ((data[i + 1].phase - data[i].phase) / tau) *zoomFix,
            x: data[i].date
        })
        : newData.push({
            y: ((data[i + 1].phase - data[i].phase) / tau),
            x: data[i].date
        })
    }

    const onlyFreqArray = newData.map((obj: { x: number; y: number }) => obj.y)

    const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3;
    // const MADValue = medianOfArr(newData) / 0.6745 * MADMultiply
    const MADValue = mad(onlyFreqArray) / 0.6745 * MADMultiply
    // console.log(MADValue2)

    newData = newData.filter(dateAndFreqObj => Math.abs(dateAndFreqObj.y) < Math.abs(MADValue))

    return newData
}
