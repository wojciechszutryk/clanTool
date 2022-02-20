import { generateLogTauData } from '../varianceHelpers'

const CHART_ZOOM_FIX = 1000000000000
const SMALLEST_SIZE_VALUE = 3
const MILISECOND_TO_SECOND = 1000

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

export function allanDev(
    data: number[],
    startDate: number,
    endDate: number,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        1,
        // Math.floor( (endDate - startDate) / 5 / MILISECOND_TO_SECOND ),
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: { x: number; y: number }[] = []

    for (let m of tauLogData) {
        let tau = m * tau0
        let dev = calculateAllanPhase(data, m, tau, false) * zoomFix
        if (dev !== null) {
            result.push({ x: tau, y: dev })
        }
    }

    return result
}

export function overAllanDev(
    data: number[],
    startDate: number,
    endDate: number,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        1,
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: { x: number; y: number }[] = []

    for (let m of tauLogData) {
        let tau = m * tau0
        let dev = calculateAllanPhase(data, m, tau, true) * zoomFix
        if (dev !== null) {
            result.push({ x: tau, y: dev })
        }
    }

    return result
}

export function modAllanDev(
    data: number[],
    startDate: number,
    endDate: number,
    rate = 1,
    tau_data = 300,
    zoomFix = CHART_ZOOM_FIX
) {
    const tauLogData = generateLogTauData(
        1,
        Math.floor(data.length / 5),
        Number(tau_data)
    )

    let tau0 = 1 / rate
    let result: { x: number; y: number }[] = []

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
