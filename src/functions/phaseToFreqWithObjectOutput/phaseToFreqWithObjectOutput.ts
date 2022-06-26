import { medianOfArr } from 'functions/medianOfArray/medianOfArray'
import store from 'state/store'

export default function phaseToFreqWithObjectOutput(
    data: { date: number; phase: number }[],
    tau: number,
    fixZoom?: boolean
) {
    const zoomFix = store.getState().app.zoomFix
        ? store.getState().app.zoomFix
        : 1000000000000

    let freqData: { x: number; y: number }[] = []

    for (let i = 0; i < data.length - 1; i++) {
        fixZoom
            ? freqData.push({
                  y: ((data[i + 1].phase - data[i].phase) / tau) * zoomFix,
                  x: data[i].date,
              })
            : freqData.push({
                  y: (data[i + 1].phase - data[i].phase) / tau,
                  x: data[i].date,
              })
    }

    //Mad Filter
    const onlyFreqArray = freqData.map((obj: { x: number; y: number }) => obj.y)
    const medianOfNewData = medianOfArr(onlyFreqArray)

    const madArrayValues = onlyFreqArray.map((e) =>
        Math.abs((e - medianOfNewData) / 0.6745)
    )

    const madValue = medianOfArr(madArrayValues)
    const MADMultiply = store.getState().app.MADMultiply
        ? store.getState().app.MADMultiply
        : 3
    const multipliedMadValue = madValue * MADMultiply

    freqData = freqData.filter(
        (dateAndFreqObj) =>
            dateAndFreqObj.y < medianOfNewData + multipliedMadValue &&
            dateAndFreqObj.y > medianOfNewData - multipliedMadValue
    )

    return freqData
}
