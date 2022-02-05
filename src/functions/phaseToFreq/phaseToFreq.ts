import { mad } from 'mathjs'
import store from 'state/store'
import { medianOfArr } from '../medianOfArray/medianOfArray'

export default function phaseToFreq(
    data: number[],
    tau: number,
    fixZoom?: boolean
) {
    const zoomFix = store.getState().app.zoomFix ? store.getState().app.zoomFix : 1000000000000;
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
        fixZoom ? newData.push(((data[i + 1] - data[i]) / tau)*zoomFix) :
            newData.push((data[i + 1] - data[i]) / tau)
    }

    const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3;
    // const MADValue = medianOfArr(newData) / 0.6745 * MADMultiply
    const MADValue = mad(newData) / 0.6745 * MADMultiply
    // console.log(MADValue2)

    newData = newData.filter(freq => Math.abs(freq) < Math.abs(MADValue))


    return newData
}
