import { medianOfArr } from 'functions/medianOfArray'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import { ChartData, PhaseData } from 'models/data.model'
import store from 'state/store'

export default function phaseToFreqDriftWithObjectOutput(
    data: PhaseData,
    tau: number
) {
    const zoomFix = store.getState().app.zoomFix
        ? store.getState().app.zoomFix
        : CHART_ZOOM_FIX

    const freqArrayData: number[] = []
    let freqDriftData: ChartData = []

    for (let i = 0; i < data.length - 1; i++) {
        freqArrayData.push((data[i + 1].phase - data[i].phase) / tau)
    }
    for (let i = 0; i < freqArrayData.length - 1; i++) {
        freqDriftData.push({
            y: ((freqArrayData[i + 1] - freqArrayData[i]) / tau) * zoomFix,
            x: data[i].date,
        })
    }

    //MAD Filter
    const onlyFreqDriftArray = freqDriftData.map(
        (obj: { x: number; y: number }) => obj.y
    )
    const medianOfNewData = medianOfArr(onlyFreqDriftArray)

    const madArrayValues = onlyFreqDriftArray.map((e) =>
        Math.abs((e - medianOfNewData) / 0.6745)
    )

    const madValue = medianOfArr(madArrayValues)
    const MADMultiply = store.getState().app.MADMultiply
        ? store.getState().app.MADMultiply
        : 3
    const multipliedMadValue = madValue * MADMultiply

    freqDriftData = freqDriftData.filter(
        (dateAndFreqObj) =>
            dateAndFreqObj.y < medianOfNewData + multipliedMadValue &&
            dateAndFreqObj.y > medianOfNewData - multipliedMadValue
    )

    return freqDriftData
}
