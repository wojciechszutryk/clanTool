import store from 'state/store'

export default function phaseToFreq(
    data: number[],
    tau: number,
    fixZoom?: boolean
) {
    const MADMultiply = store.getState().app.MADMultiply ? store.getState().app.MADMultiply : 3;
    const zoomFix = store.getState().app.zoomFix ? store.getState().app.zoomFix : 1000000000000;
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
        fixZoom ? newData.push(((data[i + 1] - data[i]) / tau)*zoomFix) :
            newData.push((data[i + 1] - data[i]) / tau)
    }
    return newData
}
