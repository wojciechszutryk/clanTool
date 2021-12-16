import store from 'state/store'
import { medianOfArr } from '../medianOfArray/medianOfArray'

export default function phaseToFreqDrift(
    data: number[],
    tau: number
) {
    const zoomFix = store.getState().app.zoomFix ? store.getState().app.zoomFix : 1000000000000;

    let newData = []
    const powTau = tau * tau;
    for (let i = 0; i < data.length - 1; i++) {
        newData.push((data[i + 1] - data[i]) / powTau * zoomFix)
    }

    const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3;
    const MADValue = medianOfArr(newData) / 0.6745 * MADMultiply
    // const MADValue = mad(data) / 0.6745 * MADMultiply

    newData = newData.filter(freq => Math.abs(freq) < Math.abs(MADValue))

    return newData
}
