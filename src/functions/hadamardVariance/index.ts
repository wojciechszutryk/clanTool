import { generateLogTauData } from 'functions/varianceHelpers';
import { CHART_ZOOM_FIX } from 'models/chartZoom.const';
import { TauTypes } from 'models/inputData.model';

const SMALLEST_SIZE_VALUE = 3;

/**
 * This is a helper function for calculating the Allan variance.
 */
function calculateHadamardPhase(data: number[], m: number, tau: number, overlap = true) {
  let size = 0;
  let sigma = 0;
  let stride = overlap ? 1 : m;
  for (let i = 0; i < data.length - 3 * m; i += stride) {
    sigma += (data[i + 3 * m] - 3 * data[i + 2 * m] + 3 * data[i + m] - data[i]) ** 2;
    size++;
  }

  if (size < SMALLEST_SIZE_VALUE) {
    return 0;
  }

  let mult = 6 * tau ** 2 * size;
  return Math.sqrt(sigma / mult);
}

/**
 * This function calculates the Hadamard variance.
 */
export function hadamardDev(
  data: number[],
  tauType?: TauTypes,
  rate = 1,
  tau_data = 300,
  zoomFix = CHART_ZOOM_FIX,
) {
  const tauLogData = generateLogTauData(tauType, 1, Math.floor(data.length / 5), Number(tau_data));

  let tau0 = 1 / rate;
  let result: { x: number; y: number }[] = [];

  for (let m of tauLogData) {
    let tau = m * tau0;
    let dev = calculateHadamardPhase(data, m, tau, false) * zoomFix;
    if (dev !== null) {
      result.push({ x: tau, y: dev });
    }
  }

  return result;
}
