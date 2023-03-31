import { madFilter } from 'functions/madFilter'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import store from 'state/store'

export default function phaseToFreq(
    data: number[],
    tau: number,
    fixZoom?: boolean
) {
    const zoomFix = store.getState().app.zoomFix
        ? store.getState().app.zoomFix
        : CHART_ZOOM_FIX
    let newData = []
    for (let i = 0; i < data.length - 1; i++) {
        fixZoom
            ? newData.push(((data[i + 1] - data[i]) / tau) * zoomFix)
            : newData.push((data[i + 1] - data[i]) / tau)
    }

    return madFilter(newData)
}
