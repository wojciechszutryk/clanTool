import { generateLogTauData } from '../varianceHelpers'

const CHART_ZOOM_FIX = 1000000000000
const SMALLEST_SIZE_VALUE = 3
const MILISECOND_TO_SECOND = 1000

function calculateHadamardPhase(
    data: number[],
    m: number,
    tau: number,
    overlap = true
) {
    let size = 0
    let sigma = 0
    let stride = overlap ? 1 : m
    for (let i = 0; i < data.length - 3 * m; i += stride) {
        sigma +=
            (data[i + 3 * m] -
                3 * data[i + 2 * m] +
                3 * data[i + m] -
                data[i]) **
            2
        size++
    }

    if (size < SMALLEST_SIZE_VALUE) {
        return 0
    }

    let mult = 6 * tau ** 2 * size
    return Math.sqrt(sigma / mult)
}

export function hadamardDev(
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
        let dev = calculateHadamardPhase(data, m, tau, false) * zoomFix
        if (dev !== null) {
            result.push({ x: tau, y: dev })
        }
    }

    return result
}
