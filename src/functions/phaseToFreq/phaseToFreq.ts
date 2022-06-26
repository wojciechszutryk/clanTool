import { madFilter } from 'functions/madFilter/madFilter'
import store from 'state/store'

export default function phaseToFreq(
    data: number[],
    tau: number,
    fixZoom?: boolean
) {
    const zoomFix = store.getState().app.zoomFix
        ? store.getState().app.zoomFix
        : 1000000000000
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
        fixZoom
            ? newData.push(((data[i + 1] - data[i]) / tau) * zoomFix)
            : newData.push((data[i + 1] - data[i]) / tau)
    }

    return madFilter(newData)



    // const MADValue = medianOfArr(newData) / 0.6745 * MADMultiply
    // const MADValue = mad(newData) / 0.6745 * MADMultiply
    //
    // newData = newData.filter(freq => Math.abs(freq) < Math.abs(MADValue))
}
