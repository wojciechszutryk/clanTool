import { generateLogTauData } from 'functions/varianceHelpers'
import { CHART_ZOOM_FIX } from 'models/chartZoom.const'
import { ChartData } from 'models/data.model'
import { TauTypes } from 'models/inputData.model'

const SMALLEST_SIZE_VALUE = 3

/**
 * This is a helper function for calculating the Allan variance.
 */
function calculateAllanPhase(
    data: number[],
    m: number,
    tau: number,
    overlap = true
) {
    let size = 0
    let sigma = 0
    let stride = overlap ? 1 : m
    for (let i = 0; i < data.length - 2 * m; i += stride) {
        sigma += (data[i + 2 * m] - 2 * data[i + m] + data[i]) ** 2
        size++
    }

    if (size < SMALLEST_SIZE_VALUE) {
        return 0
    }

    let mult = 2 * size * tau ** 2
    return Math.sqrt(sigma / mult)
}

/**
 * This function calculates the standard Allan variance for a given data set.
 */
export function allanDev(
    data: number[],
    tauType?: TauTypes,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        tauType,
        1,
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: ChartData = []
    console.log(tau0)

    for (let m of tauLogData) {
        let tau = m * tau0
        let dev = calculateAllanPhase(data, m, tau, false) * zoomFix
        if (dev !== null) {
            result.push({ x: tau, y: dev })
        }
    }

    return result
}

/**
 * This function calculates the overlapped Allan variance for a given data set.
 */
export function overAllanDev(
    data: number[],
    tauType?: TauTypes,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        tauType,
        1,
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: ChartData = []

    for (let m of tauLogData) {
        let tau = m * tau0
        let dev = calculateAllanPhase(data, m, tau, true) * zoomFix
        if (dev !== null) {
            result.push({ x: tau, y: dev })
        }
    }

    return result
}

/**
 * This function calculates the modified Allan variance for a given data set.
 */
export function modAllanDev(
    data: number[],
    tauType?: TauTypes,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        tauType,
        1,
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: ChartData = []

    for (let m of tauLogData) {
        let tau = m * tau0
        let sigma = 0
        let s = 0

        for (let i = 0; i < m && i < data.length - 2 * m; i++) {
            s += data[i + 2 * m] - 2 * data[i + m] + data[i]
        }
        sigma += s ** 2

        for (let i = 1; i < data.length - 3 * m + 1; i++) {
            s +=
                data[i + 3 * m - 1] -
                3 * data[i + 2 * m - 1] +
                3 * data[i + m - 1] -
                data[i - 1]
            sigma += s ** 2
        }
        let size = data.length - 3 * m + 1
        let mult = 2 * size * m ** 2 * tau ** 2

        if (size >= SMALLEST_SIZE_VALUE)
            result.push({ x: tau, y: Math.sqrt(sigma / mult) * zoomFix })
    }
    return result
}
