import { mad } from 'mathjs'
import store from 'state/store'
import { medianOfArr } from '../medianOfArray/medianOfArray'

export default function phaseToFreqDriftWithObjectOutput(
    data: { date: number; phase: number }[],
    tau: number
) {
    const zoomFix = store.getState().app.zoomFix ? store.getState().app.zoomFix : 1000000000000;

    let newData: { x: number; y: number }[] = [];

    const powTau = tau * tau;
    for (let i = 0; i < data.length - 1; i++) {
        newData.push({
            y: ((data[i + 1].phase - data[i].phase) / powTau) *zoomFix,
            x: data[i].date
        })
    }

    const onlyFreqDriftArray = newData.map((obj: { x: number; y: number }) => obj.y)

    const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3;
    const MADValue = mad(onlyFreqDriftArray) / 0.6745 * MADMultiply

    newData = newData.filter(dateAndFreqDriftObj => Math.abs(dateAndFreqDriftObj.y) < Math.abs(MADValue))

    return newData
}
